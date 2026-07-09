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
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link href="/" className="link-mono mb-12 inline-block">
          ← home
        </Link>

        <header className="mb-16">
          <p className="mb-4 font-mono text-caption uppercase text-accent-amber">
            writing
          </p>
          <h1 className="font-heading text-title-1 leading-[1.05] text-text-primary">
            Field notes
            <span className="text-accent-amber">.</span>
          </h1>
          <p className="mt-5 max-w-[60ch] font-body text-lede leading-relaxed text-text-secondary">
            Occasional write-ups from shipping things — what broke, what I
            tried, what finally worked. Source of truth lives at{" "}
            <a
              href="https://ruddybuilds.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-mono"
            >
              ruddybuilds.substack.com
            </a>
            .
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="surface-inset p-8">
            <p className="mb-6 font-body text-body text-text-secondary">
              The feed didn&apos;t respond on this build. Head straight to
              Substack for the latest.
            </p>
            <a
              href="https://ruddybuilds.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center px-6 py-3 text-caption uppercase"
            >
              Open Substack →
            </a>
          </div>
        ) : (
          <ul className="border-t border-hairline">
            {posts.map((post) => (
              <li
                key={post.url}
                className="data-row grid grid-cols-1 gap-2 py-8 md:grid-cols-[8rem_1fr] md:gap-8"
              >
                <p className="font-mono text-caption uppercase text-text-muted md:pt-2">
                  {formatDate(post.pubDate)}
                </p>
                <div>
                  <h2 className="font-heading text-title-2 text-text-primary">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent-amber"
                    >
                      {post.title}
                    </a>
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 font-body text-body leading-relaxed text-text-secondary">
                      {post.excerpt}…
                    </p>
                  )}
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-mono mt-4 inline-block"
                  >
                    read on substack ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
