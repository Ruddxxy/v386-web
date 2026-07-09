import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-950": "#0E1018",
        "base-900": "#141826",
        "base-800": "#1A2030",
        "base-700": "#232838",
        "base-600": "#2E3444",
        "accent-amber": "#E5A537",
        "accent-amber-bright": "#F0C05C",
        "accent-amber-dim": "#B8863A",
        "accent-cyan": "#3FBDD4",
        "accent-cyan-dim": "#2A8FA3",
        "text-primary": "#E2E6EE",
        "text-secondary": "#8B93A8",
        "text-muted": "#697084",
        "color-danger": "#D4544A",
        "color-success": "#3DAA6D",
      },
      // Structure = hairlines, not glass. `border-hairline` is the primary rule.
      borderColor: {
        hairline: "rgba(255,255,255,0.08)",
        "hairline-strong": "rgba(255,255,255,0.14)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"], // Syne — display only, never < 22px
        body: ["var(--font-body)"], // Sora — running text
        mono: ["var(--font-mono)"], // Space Mono — numbers, labels, commands
      },
      // The dossier type scale. Big numbers live in `spec-value` (Space Mono)
      // so they read as instrument output, not marketing.
      fontSize: {
        display: [
          "clamp(2.75rem, 6.5vw, 5.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "title-1": [
          "clamp(2rem, 3.5vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "title-2": [
          "1.375rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        lede: ["1.1875rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "spec-value": [
          "clamp(2.25rem, 4vw, 3.5rem)",
          { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        caption: ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.14em" }],
        "mono-body": ["0.8125rem", { lineHeight: "1.6" }],
      },
    },
  },
  plugins: [],
};

export default config;
