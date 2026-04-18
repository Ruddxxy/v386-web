import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyProjects, getProject, type Project } from "@/lib/projects";

// Only the projects with a caseStudy object get a static page.
// Everything else 404s — we don't want thin routes diluting the crawl.
export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  const url = `https://vector384.com/projects/${project.slug}`;
  const title = `${project.title} — Case Study`;
  const description = project.caseStudy?.overview ?? project.description;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function jsonLdArticle(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${project.title} — Case Study`,
    description: project.caseStudy?.overview ?? project.description,
    author: { "@type": "Person", name: "Rudra Mahapatro" },
    url: `https://vector384.com/projects/${project.slug}`,
    mainEntity: {
      "@type": project.schemaType,
      name: project.title,
      description: project.description,
      ...(project.programmingLanguage && {
        programmingLanguage: project.programmingLanguage,
      }),
      ...(project.operatingSystem && {
        operatingSystem: project.operatingSystem,
      }),
      ...(project.github && { codeRepository: project.github }),
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();
  const cs = project.caseStudy!;

  return (
    <main className="min-h-screen bg-base-950 text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdArticle(project)),
        }}
      />

      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent-amber transition-colors mb-12"
        >
          ← Back to Arsenal
        </Link>

        {/* Header */}
        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // case study · {project.category.replace("-", " & ")}
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] tracking-tight mb-6">
            {project.title}
            <span className="text-accent-amber">.</span>
          </h1>
          <p className="text-xl text-text-secondary font-body leading-relaxed">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="px-3 py-1 surface-outline rounded-full text-accent-cyan font-mono text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-amber hover:text-accent-amber-bright transition-colors"
            >
              View on GitHub →
            </a>
          )}
        </header>

        {/* Problem */}
        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // the problem
          </h2>
          <p className="text-lg text-text-primary leading-relaxed border-l-2 border-accent-amber/40 pl-6 italic">
            {project.problem}
          </p>
        </section>

        {/* Overview */}
        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // overview
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            {cs.overview}
          </p>
        </section>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // how it works
          </h2>
          <ul className="space-y-4">
            {cs.architecture.map((point, i) => (
              <li key={i} className="flex gap-4 text-text-secondary">
                <span className="text-accent-amber font-mono text-sm flex-shrink-0 mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Metrics */}
        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // measured impact
          </h2>
          <div className="glass-card overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-accent-amber/30 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
              {cs.metrics.map((m) => (
                <div key={m.label} className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
                    {m.label}
                  </p>
                  <p className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
                    {m.value}
                  </p>
                  {m.note && (
                    <p className="font-mono text-[11px] text-accent-amber/70 mt-2">
                      {m.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What I'd change */}
        <section className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // what I&apos;d change
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            {cs.whatIdChange}
          </p>
        </section>

        {/* CTA */}
        <section className="border-t border-white/[0.06] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2">
              // want one of these for your stack?
            </p>
            <p className="text-text-primary font-body">
              I take on systems work with clear, measurable outcomes.
            </p>
          </div>
          <a
            href="mailto:rudranarayanmohapatro@gmail.com"
            className="btn-amber inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-mono uppercase tracking-wider text-sm flex-shrink-0"
          >
            Start a project
          </a>
        </section>
      </div>
    </main>
  );
}
