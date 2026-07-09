"use client";

import Link from "next/link";
import MasonryGrid from "./MasonryGrid";
import SectionShell from "./SectionShell";
import { RuleDraw } from "./motion";
import {
  getProjectsByCategory,
  getProject,
  getVisibility,
  getProjectIndex,
  type Project,
} from "@/lib/projects";

function indexLabel(slug: string): string {
  return `03.${String(getProjectIndex(slug)).padStart(2, "0")}`;
}

/* Repo affordance — replaces the old "Private Beta" pill. Public work links out
   (cyan = verification); shipping work is footnoted; NSE alone is restricted. */
function RepoBadge({ project }: { project: Project }) {
  const v = getVisibility(project);
  if (v === "public" && project.github) {
    return (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link-mono link-mono-verify"
        aria-label={`${project.title} source on GitHub`}
      >
        source ↗
      </a>
    );
  }
  if (v === "private") {
    return (
      <span className="font-mono text-caption uppercase text-accent-amber-dim">
        restricted — case study only
      </span>
    );
  }
  return (
    <span className="font-mono text-caption uppercase text-text-muted">
      source: shipping soon
    </span>
  );
}

/* Shared card content — used by both the normal cards and the featured card. */
function CardContent({ project }: { project: Project }) {
  return (
    <>
      {/* Header */}
      <div className="border-b border-hairline p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-caption uppercase text-accent-amber">
            {indexLabel(project.slug)}
          </span>
          <RepoBadge project={project} />
        </div>
        <h3 className="mt-3 font-heading text-title-2 text-text-primary">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-caption uppercase text-text-secondary">
          {project.tagline}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Problem — rendered at Space Mono 14px to match masonry measurement */}
        <p className="font-mono text-sm leading-relaxed text-text-secondary">
          <span className="uppercase tracking-wider text-text-muted">
            incident —{" "}
          </span>
          {project.problem}
        </p>

        {/* Tech stack — one mono line, not a badge cloud */}
        <p className="font-mono text-mono-body text-text-muted">
          {project.techStack.join("  ·  ")}
        </p>

        {/* Description — Sora 16px to match masonry measurement */}
        <p className="font-body text-body text-text-secondary">
          {project.description}
        </p>

        {/* Highlights — ruled rows */}
        <div>
          {project.highlights.map((h, i) => (
            <div
              key={`${h.label}-${i}`}
              className="data-row grid grid-cols-1 gap-1 py-3 md:grid-cols-[minmax(0,7rem)_1fr] md:gap-4"
            >
              <span className="font-mono text-caption uppercase text-accent-amber">
                {h.label}
              </span>
              <span className="font-body text-mono-body text-text-secondary">
                {h.text}
              </span>
            </div>
          ))}
        </div>

        {project.caseStudy && (
          <Link href={`/projects/${project.slug}`} className="link-mono mt-1">
            open case file →
          </Link>
        )}
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-inset flex h-full flex-col">
      <CardContent project={project} />
    </article>
  );
}

/* Featured — FlashAudit, full width, with its measured benchmark table beside it. */
function FeaturedCard({ project }: { project: Project }) {
  const metrics = project.caseStudy?.metrics.slice(0, 3) ?? [];
  return (
    <article className="surface-panel mb-8 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col border-b border-hairline md:border-b-0 md:border-r">
        <CardContent project={project} />
      </div>
      <div className="flex flex-col p-5">
        <span className="mb-4 font-mono text-caption uppercase text-text-muted">
          fig. — flashaudit vs. gitleaks 8.18
        </span>
        <div className="flex-1">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="data-row grid grid-cols-[1fr_auto] items-baseline gap-4 py-4"
            >
              <span className="font-mono text-caption uppercase text-text-secondary">
                {m.label}
                {m.note ? (
                  <span className="block text-text-muted">{m.note}</span>
                ) : null}
              </span>
              <span className="font-mono text-2xl tabular-nums text-text-primary">
                {m.value}
              </span>
            </div>
          ))}
        </div>
        <Link href="/benchmarks" className="link-mono link-mono-verify mt-4">
          full methodology → /benchmarks
        </Link>
      </div>
    </article>
  );
}

/* Category sub-header — a drawn rule + label + file count. */
function CategoryHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-6 mt-16 first:mt-0">
      <RuleDraw />
      <p className="mt-4 font-mono text-caption uppercase text-text-secondary">
        {label} · {count} {count === 1 ? "file" : "files"}
      </p>
    </div>
  );
}

// Precompute masonry items at module load.
function buildMasonryItems(projects: Project[]) {
  return projects.map((project) => ({
    key: project.title,
    render: () => <ProjectCard project={project} />,
  }));
}

const flashaudit = getProject("flashaudit");
// FlashAudit is featured above the grid, so drop it from the systems masonry.
const SYSTEMS = getProjectsByCategory("systems-security").filter(
  (p) => p.slug !== "flashaudit",
);
const FINTECH = getProjectsByCategory("fintech");
const FULLSTACK = getProjectsByCategory("fullstack");

const SYSTEMS_ITEMS = buildMasonryItems(SYSTEMS);
const FINTECH_ITEMS = buildMasonryItems(FINTECH);
const FULLSTACK_ITEMS = buildMasonryItems(FULLSTACK);

export default function Projects() {
  return (
    <SectionShell
      id="projects"
      index="03"
      title="the record"
      meta={["11 projects", "3 domains", "measured, not claimed"]}
    >
      <h2 className="mb-10 font-heading text-title-1 text-text-primary">
        The Record<span className="text-accent-amber">.</span>
      </h2>

      <CategoryHeader
        label="§ A — systems & security"
        count={getProjectsByCategory("systems-security").length}
      />
      {flashaudit && <FeaturedCard project={flashaudit} />}
      <MasonryGrid items={SYSTEMS_ITEMS} />

      <CategoryHeader label="§ B — fintech & trading" count={FINTECH.length} />
      <MasonryGrid items={FINTECH_ITEMS} />

      <CategoryHeader
        label="§ C — full-stack products"
        count={FULLSTACK.length}
      />
      <MasonryGrid items={FULLSTACK_ITEMS} />
    </SectionShell>
  );
}
