"use client";

/**
 * Stack inventory — the obstacle that "The Path" narrative flows around in the
 * origin section. Restyled from a pill cloud into a framed, ruled inventory so
 * the pretext text-flow reads as a captioned technical figure, not an effect.
 * Proficiency is encoded by BOTH a dot colour and a text label (not colour alone).
 */
type ProficiencyLevel = "core" | "proficient" | "familiar";

interface TechItem {
  name: string;
  level: ProficiencyLevel;
}

const DOT_COLORS: Record<ProficiencyLevel, string> = {
  core: "bg-accent-amber",
  proficient: "bg-accent-cyan",
  familiar: "bg-text-muted",
};

const LEVEL_LABEL: Record<ProficiencyLevel, string> = {
  core: "core",
  proficient: "prof",
  familiar: "fam",
};

const TECH_ITEMS: TechItem[] = [
  { name: "Rust", level: "core" },
  { name: "C / C++", level: "core" },
  { name: "Python", level: "core" },
  { name: "Next.js", level: "core" },
  { name: "Metasploit", level: "core" },
  { name: "Burp Suite", level: "core" },
  { name: "Go", level: "proficient" },
  { name: "PostgreSQL", level: "proficient" },
  { name: "Docker", level: "proficient" },
  { name: "Redis", level: "proficient" },
  { name: "LangChain", level: "proficient" },
  { name: "TensorFlow", level: "familiar" },
];

export default function TechStack() {
  return (
    <div className="w-full">
      <div className="surface-inset">
        <div className="flex items-center justify-between border-b border-hairline px-3 py-2">
          <span className="font-mono text-caption uppercase text-text-secondary">
            stack inventory
          </span>
          <span className="font-mono text-caption uppercase text-text-muted">
            by depth
          </span>
        </div>
        <div className="px-3 py-1">
          {TECH_ITEMS.map((item) => (
            <div
              key={item.name}
              className="data-row grid grid-cols-[1fr_auto] items-center gap-3 py-1.5"
            >
              <span className="flex items-center gap-2 font-mono text-mono-body text-text-secondary">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${DOT_COLORS[item.level]}`}
                  aria-hidden
                />
                {item.name}
              </span>
              <span className="font-mono text-caption uppercase text-text-muted">
                {LEVEL_LABEL[item.level]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 font-mono text-caption uppercase text-text-muted">
        fig. 02 — stack inventory, by depth
      </p>
    </div>
  );
}
