import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseStudyProjects,
  getProject,
  getVisibility,
  getProjectIndex,
  type Project,
} from "@/lib/projects";
import SpecTable, { type SpecRow } from "@/components/SpecTable";

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
  const visibility = getVisibility(project);
  const caseNo = `03.${String(getProjectIndex(project.slug)).padStart(2, "0")}`;
  const metricRows: SpecRow[] = cs.metrics.map((m) => ({
    label: m.label,
    value: m.value,
    note: m.note,
  }));

  const meta: { k: string; v: string }[] = [
    { k: "case file", v: caseNo },
    {
      k: "classification",
      v: visibility === "private" ? "restricted" : "public",
    },
    { k: "category", v: project.category.replace("-", " & ") },
    { k: "language", v: project.programmingLanguage ?? project.techStack[0] },
  ];

  return (
    <main className="min-h-screen bg-base-950 text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdArticle(project)),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Back link */}
        <Link href="/#projects" className="link-mono mb-12 inline-block">
          ← the record
        </Link>

        {/* Header */}
        <header className="mb-14">
          <h1 className="font-heading text-title-1 leading-[1.05] text-text-primary">
            {project.title}
            <span className="text-accent-amber">.</span>
          </h1>
          <p className="mt-3 font-mono text-caption uppercase text-text-secondary">
            {project.tagline}
          </p>

          {/* Case-file band */}
          <div className="surface-inset mt-8 grid grid-cols-2 gap-x-6 gap-y-3 p-4 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.k} className="flex flex-col gap-1">
                <span className="font-mono text-caption uppercase text-text-muted">
                  {m.k}
                </span>
                <span className="font-mono text-mono-body uppercase text-text-primary">
                  {m.v}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 font-mono text-mono-body text-text-muted">
            {project.techStack.join("  ·  ")}
          </p>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-mono link-mono-verify mt-4 inline-block"
            >
              source ↗
            </a>
          )}
        </header>

        {/* Problem */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-caption uppercase text-accent-amber">
            the problem
          </h2>
          <p className="border-l-2 border-accent-amber pl-6 font-body text-lede leading-relaxed text-text-primary">
            {project.problem}
          </p>
        </section>

        {/* Overview */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-caption uppercase text-accent-amber">
            overview
          </h2>
          <p className="font-body text-body leading-relaxed text-text-secondary">
            {cs.overview}
          </p>
        </section>

        {/* Architecture */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-caption uppercase text-accent-amber">
            how it works
          </h2>
          <ul>
            {cs.architecture.map((point, i) => (
              <li
                key={i}
                className="data-row grid grid-cols-[2.5rem_1fr] gap-4 py-4 text-text-secondary"
              >
                <span className="font-mono text-mono-body text-accent-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-body leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Metrics */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-caption uppercase text-accent-amber">
            measured impact
          </h2>
          <SpecTable rows={metricRows} />
        </section>

        {/* What I'd change */}
        <section className="mb-14">
          <h2 className="mb-4 font-mono text-caption uppercase text-accent-amber">
            what I&apos;d change
          </h2>
          <p className="font-body text-body leading-relaxed text-text-secondary">
            {cs.whatIdChange}
          </p>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-start justify-between gap-6 border-t border-hairline pt-12 sm:flex-row sm:items-center">
          <p className="max-w-sm font-body text-body text-text-secondary">
            I take on systems work with clear, measurable outcomes.
          </p>
          <a
            href="mailto:rudranarayanmohapatro@gmail.com"
            className="btn-solid inline-flex flex-shrink-0 items-center px-6 py-3 text-caption uppercase"
          >
            Start a project
          </a>
        </section>
      </div>
    </main>
  );
}
