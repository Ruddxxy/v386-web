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
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent-amber transition-colors mb-12"
        >
          ← Home
        </Link>

        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
            // benchmarks
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] tracking-tight mb-6">
            Reproducible
            <br />
            <span className="text-gradient-amber">measurements</span>.
          </h1>
          <p className="text-lg text-text-secondary font-body leading-relaxed">
            If a number appears on this site, it was measured. Below is the
            setup so you can run it yourself and get the same result — or find a
            hole in my methodology.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight mb-2">
            FlashAudit vs. Gitleaks
          </h2>
          <p className="text-text-secondary mb-8">
            Secret scanning on an enterprise monorepo corpus.
          </p>

          <div className="mb-10 glass-card p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
              // setup
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  Hardware
                </dt>
                <dd className="text-text-primary mt-1">
                  MacBook Pro M1 Pro · 10 cores · 16 GB RAM
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  Dataset
                </dt>
                <dd className="text-text-primary mt-1">
                  847,000 files · mixed source languages · ~12 GB uncompressed
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  Rules
                </dt>
                <dd className="text-text-primary mt-1">
                  Shared baseline (AWS, GitHub, Stripe, generic high-entropy).
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  Measurement
                </dt>
                <dd className="text-text-primary mt-1">
                  Wall-clock via <code className="font-mono">hyperfine</code>{" "}
                  (N=10, warm). Peak RSS via{" "}
                  <code className="font-mono">/usr/bin/time -l</code>.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mb-10 glass-card p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-4">
              // commands
            </h3>
            <pre className="font-mono text-xs text-text-secondary overflow-x-auto bg-base-900/60 rounded p-4 border border-white/[0.06]">
              {`# FlashAudit
hyperfine --warmup 1 --runs 10 \\
  'flashaudit scan --repo ./enterprise-monorepo --format sarif > /dev/null'

# Gitleaks
hyperfine --warmup 1 --runs 10 \\
  'gitleaks detect --source ./enterprise-monorepo --report-path /dev/null'`}
            </pre>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-white/[0.12]">
                  <th className="text-left py-3 pr-4 text-text-muted font-normal uppercase tracking-widest text-xs">
                    Tool
                  </th>
                  <th className="text-left py-3 pr-4 text-text-muted font-normal uppercase tracking-widest text-xs">
                    Version
                  </th>
                  <th className="text-right py-3 pr-4 text-text-muted font-normal uppercase tracking-widest text-xs">
                    Wall-clock
                  </th>
                  <th className="text-right py-3 pr-4 text-text-muted font-normal uppercase tracking-widest text-xs">
                    Peak RSS
                  </th>
                  <th className="text-right py-3 text-text-muted font-normal uppercase tracking-widest text-xs">
                    Files/sec
                  </th>
                </tr>
              </thead>
              <tbody>
                {FLASHAUDIT_VS_GITLEAKS.map((row, i) => (
                  <tr
                    key={row.tool}
                    className={
                      i === 0
                        ? "border-b border-white/[0.06] text-accent-amber"
                        : "border-b border-white/[0.06] text-text-primary"
                    }
                  >
                    <td className="py-4 pr-4">{row.tool}</td>
                    <td className="py-4 pr-4 text-text-muted">{row.version}</td>
                    <td className="py-4 pr-4 text-right">{row.wallClock}</td>
                    <td className="py-4 pr-4 text-right">{row.peakRss}</td>
                    <td className="py-4 text-right">{row.filesPerSec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-mono text-xs text-text-muted mt-8 leading-relaxed">
            Numbers are median of 10 warm runs. Gitleaks was run with default
            concurrency; FlashAudit uses one OS thread per physical core. Raw{" "}
            <code>hyperfine</code> output lives in the repo at{" "}
            <a
              href="https://github.com/Ruddxxy/Flash-Audit-Core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-amber hover:text-accent-amber-bright"
            >
              /benchmarks/
            </a>
            .
          </p>
        </section>

        <section className="border-t border-white/[0.06] pt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
            // found an issue?
          </p>
          <p className="text-text-secondary leading-relaxed">
            If the methodology has a hole or your environment gets different
            numbers, I want to know. Open an issue on the{" "}
            <a
              href="https://github.com/Ruddxxy/Flash-Audit-Core/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-amber hover:text-accent-amber-bright"
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
