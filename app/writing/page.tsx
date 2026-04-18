import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Field notes from shipping Rust, C++, and security tooling. Mirrored from the Substack; source of truth at ruddybuilds.substack.com.",
  alternates: { canonical: "https://vector384.com/writing" },
  openGraph: {
    title: "Writing | VECTOR 384",
    description: "Field notes from shipping Rust, C++, and security tooling.",
    url: "https://vector384.com/writing",
    type: "website",
  },
};

// Rebuild once a day. Substack RSS doesn't change often and we want
// reliable static pages even if Substack is flaky at request time.
export const revalidate = 86400;

const SUBSTACK_FEED = "https://ruddybuilds.substack.com/feed";

interface Post {
  title: string;
  url: string;
  pubDate: string;
  excerpt: string;
}

// Minimal RSS parser — Substack emits well-formed XML with <item> entries.
// We deliberately avoid a dependency here; the shape is stable and our needs are small.
function parseRss(xml: string): Post[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  return items.slice(0, 3).map((raw) => {
    const pick = (tag: string): string => {
      const cdata = raw.match(
        new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`),
      );
      if (cdata) return cdata[1];
      const plain = raw.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
      return plain ? plain[1] : "";
    };
    const rawExcerpt = pick("description");
    const excerpt = rawExcerpt
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 220);
    return {
      title: pick("title").trim(),
      url: pick("link").trim(),
      pubDate: pick("pubDate").trim(),
      excerpt,
    };
  });
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch(SUBSTACK_FEED, {
      next: { revalidate: 86400 },
      headers: { "user-agent": "vector384.com build fetcher" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml);
  } catch {
    return [];
  }
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function WritingPage() {
  const posts = await fetchPosts();

  return (
    <main className="min-h-screen bg-base-950 text-text-primary">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent-amber transition-colors mb-12"
        >
          ← Home
        </Link>

        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // writing
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] tracking-tight mb-6">
            Field notes
            <span className="text-accent-amber">.</span>
          </h1>
          <p className="text-lg text-text-secondary font-body leading-relaxed">
            Occasional write-ups from shipping things — what broke, what I
            tried, what finally worked. Source of truth lives at{" "}
            <a
              href="https://ruddybuilds.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-amber hover:text-accent-amber-bright underline underline-offset-4"
            >
              ruddybuilds.substack.com
            </a>
            .
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-text-secondary mb-4">
              The feed didn&apos;t respond on this build. Head straight to
              Substack for the latest.
            </p>
            <a
              href="https://ruddybuilds.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-mono uppercase tracking-wider text-sm"
            >
              Open Substack →
            </a>
          </div>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.url} className="glass-card p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-3">
                  {formatDate(post.pubDate)}
                </p>
                <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-3">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-amber transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>
                {post.excerpt && (
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {post.excerpt}…
                  </p>
                )}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-amber hover:text-accent-amber-bright transition-colors"
                >
                  Read on Substack →
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
