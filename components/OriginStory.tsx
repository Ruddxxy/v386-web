"use client";

import Link from "next/link";
import TechStack from "./TechStack";
import PretextObstacleText from "./pretext/PretextObstacleText";
import SectionShell from "./SectionShell";
import { Reveal } from "./motion";
import { ORIGIN_TEXTS } from "@/lib/pretext-registry";

const IDENTITY: { key: string; value: string; accent?: boolean }[] = [
  { key: "name", value: "Rudra Mahapatro" },
  { key: "handle", value: "VECTOR384", accent: true },
  { key: "status", value: "available" },
  { key: "location", value: "India · working globally" },
  { key: "clearance", value: "systems · security · trading" },
];

function NarrativeBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="grid grid-cols-1 gap-2 py-10 md:grid-cols-[140px_1fr] md:gap-8">
      <span className="font-mono text-caption uppercase text-accent-amber md:pt-1">
        {label}
      </span>
      <div>{children}</div>
    </Reveal>
  );
}

/* Chapter 04 — origin. The biography sits after the evidence and the record:
   dossier logic reads proof before background. */
export default function OriginStory() {
  return (
    <SectionShell
      id="origin"
      index="04"
      title="origin"
      meta={["python → c++ → rust", "why · path · mission"]}
    >
      {/* Pull quote — solid, no gradient */}
      <Reveal>
        <h2 className="max-w-[24ch] font-heading text-title-1 leading-tight text-text-primary text-balance">
          Most engineers build for the happy path. I build for the moment
          everything goes wrong<span className="text-accent-amber">.</span>
        </h2>
      </Reveal>

      {/* identity.conf — a spec-sheet dl */}
      <Reveal className="mt-12 max-w-xl">
        <div className="surface-inset">
          <div className="border-b border-hairline px-4 py-2">
            <span className="font-mono text-caption uppercase text-text-muted">
              identity.conf
            </span>
          </div>
          <dl className="px-4 py-1">
            {IDENTITY.map((row) => (
              <div
                key={row.key}
                className="data-row grid grid-cols-[8rem_1fr] items-baseline gap-4 py-3"
              >
                <dt className="font-mono text-caption uppercase text-text-muted">
                  {row.key}
                </dt>
                <dd
                  className={`font-mono text-mono-body ${
                    row.accent ? "text-accent-amber" : "text-text-primary"
                  }`}
                >
                  {row.key === "status" ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-color-success"
                        aria-hidden
                      />
                      {row.value}
                    </span>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* Narrative */}
      <div className="mt-8">
        <NarrativeBlock label="§ 1 — the why">
          <p className="max-w-[62ch] font-body text-lede text-text-secondary">
            {ORIGIN_TEXTS["origin:the-why"].text}
          </p>
        </NarrativeBlock>

        {/* The Path — the signature: prose flows around the stack inventory.
            Rendered full-width (label inline, not in the margin) so the flow
            container clears PretextObstacleText's desktop width threshold. */}
        <Reveal className="py-10">
          <span className="font-mono text-caption uppercase text-accent-amber">
            § 2 — the path
          </span>
          <div className="mt-4">
            <PretextObstacleText
              text={ORIGIN_TEXTS["origin:the-path"].text}
              registryKey="origin:the-path"
              fontKey="body-xl"
              lineHeight={32}
              obstacle={{
                top: 0,
                height: 460,
                width: 280,
                side: "right",
                gap: 28,
              }}
              obstacleContent={<TechStack />}
            />
          </div>
        </Reveal>

        <NarrativeBlock label="§ 3 — the mission">
          <p className="max-w-[62ch] font-body text-lede text-text-secondary">
            {ORIGIN_TEXTS["origin:the-mission"].text}
          </p>
        </NarrativeBlock>
      </div>

      {/* Bridge to engagement */}
      <Reveal className="mt-8">
        <Link href="#services" className="link-mono">
          engagement terms ↓
        </Link>
      </Reveal>
    </SectionShell>
  );
}
