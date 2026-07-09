import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Benchmarks",
  description:
    "Reproducible benchmarks for the tools I've shipped. FlashAudit vs. Gitleaks on an enterprise monorepo corpus.",
  alternates: { canonical: "https://vector384.com/benchmarks" },
  openGraph: {
    title: "Benchmarks | VECTOR 384",
    description:
      "Reproducible benchmarks for the tools I've shipped. FlashAudit vs. Gitleaks on an enterprise monorepo corpus.",
    url: "https://vector384.com/benchmarks",
    type: "article",
  },
};

interface Row {
  tool: string;
  version: string;
  wallClock: string;
  peakRss: string;
  filesPerSec: string;
}

const FLASHAUDIT_VS_GITLEAKS: Row[] = [
  {
    tool: "FlashAudit Core",
    version: "0.5.0",
    wallClock: "0.4s",
    peakRss: "< 80 MB",
    filesPerSec: "~ 2.1M",
  },
  {
    tool: "Gitleaks",
    version: "8.18",
    wallClock: "~ 4s",
    peakRss: "~ 420 MB",
    filesPerSec: "~ 210K",
  },
];

export default function BenchmarksPage() {
  return (
    <main className="min-h-screen bg-base-950 text-text-primary">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link href="/" className="link-mono mb-12 inline-block">
          ← home
        </Link>

        <header className="mb-16">
          <p className="mb-4 font-mono text-caption uppercase text-accent-amber">
            benchmarks
          </p>
          <h1 className="font-heading text-title-1 leading-[1.05] text-text-primary">
            Reproducible measurements
            <span className="text-accent-amber">.</span>
          </h1>
          <p className="mt-5 max-w-[60ch] font-body text-lede leading-relaxed text-text-secondary">
            If a number appears on this site, it was measured. Below is the
            setup so you can run it yourself and get the same result — or find a
            hole in my methodology.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="mb-1 font-heading text-title-2 text-text-primary">
            FlashAudit vs. Gitleaks
          </h2>
          <p className="mb-8 font-mono text-mono-body text-text-muted">
            Secret scanning on an enterprise monorepo corpus.
          </p>

          {/* Setup */}
          <div className="surface-inset mb-8 p-5">
            <h3 className="mb-4 font-mono text-caption uppercase text-text-muted">
              setup
            </h3>
            <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {[
                {
                  k: "Hardware",
                  v: "MacBook Pro M1 Pro · 10 cores · 16 GB RAM",
                },
                {
                  k: "Dataset",
                  v: "847,000 files · mixed source languages · ~12 GB uncompressed",
                },
                {
                  k: "Rules",
                  v: "Shared baseline (AWS, GitHub, Stripe, generic high-entropy).",
                },
                {
                  k: "Measurement",
                  v: "Wall-clock via hyperfine (N=10, warm). Peak RSS via /usr/bin/time -l.",
                },
              ].map((row) => (
                <div
                  key={row.k}
                  className="data-row grid grid-cols-[7rem_1fr] items-baseline gap-4 py-3"
                >
                  <dt className="font-mono text-caption uppercase text-text-muted">
                    {row.k}
                  </dt>
                  <dd className="font-body text-mono-body text-text-primary">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Commands — a figure */}
          <figure className="surface-figure mb-10 overflow-hidden">
            <figcaption className="border-b border-hairline px-4 py-2 font-mono text-caption uppercase text-text-muted">
              fig. — reproduction commands
            </figcaption>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-text-secondary">
              {`# FlashAudit
hyperfine --warmup 1 --runs 10 \\
  'flashaudit scan --repo ./enterprise-monorepo --format sarif > /dev/null'

# Gitleaks
hyperfine --warmup 1 --runs 10 \\
  'gitleaks detect --source ./enterprise-monorepo --report-path /dev/null'`}
            </pre>
          </figure>

          {/* Results table */}
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-hairline-strong">
                  {[
                    "Tool",
                    "Version",
                    "Wall-clock",
                    "Peak RSS",
                    "Files/sec",
                  ].map((h, i) => (
                    <th
                      key={h}
                      className={`py-3 pr-4 font-normal text-caption uppercase text-text-muted ${
                        i < 2 ? "text-left" : "text-right"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FLASHAUDIT_VS_GITLEAKS.map((row, i) => (
                  <tr key={row.tool} className="border-b border-hairline">
                    <td
                      className={`py-4 pr-4 ${
                        i === 0
                          ? "border-l-2 border-accent-amber pl-3 text-text-primary"
                          : "text-text-primary"
                      }`}
                    >
                      {row.tool}
                    </td>
                    <td className="py-4 pr-4 text-text-muted">{row.version}</td>
                    <td className="py-4 pr-4 text-right tabular-nums">
                      {row.wallClock}
                    </td>
                    <td className="py-4 pr-4 text-right tabular-nums">
                      {row.peakRss}
                    </td>
                    <td className="py-4 text-right tabular-nums">
                      {row.filesPerSec}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 font-mono text-mono-body leading-relaxed text-text-muted">
            Numbers are median of 10 warm runs. Gitleaks was run with default
            concurrency; FlashAudit uses one OS thread per physical core. Raw{" "}
            hyperfine output lives in the repo at{" "}
            <a
              href="https://github.com/Ruddxxy/Flash-Audit-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="link-mono link-mono-verify"
            >
              /benchmarks/
            </a>
            .
          </p>
        </section>

        <section className="border-t border-hairline pt-12">
          <p className="mb-4 font-mono text-caption uppercase text-text-muted">
            found an issue?
          </p>
          <p className="font-body text-body leading-relaxed text-text-secondary">
            If the methodology has a hole or your environment gets different
            numbers, I want to know. Open an issue on the{" "}
            <a
              href="https://github.com/Ruddxxy/Flash-Audit-Core/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="link-mono link-mono-verify"
            >
              Flash-Audit-Core repo
            </a>{" "}
            or email me directly.
          </p>
        </section>
      </div>
    </main>
  );
}
