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
        "text-muted": "#515868",
        "color-danger": "#D4544A",
        "color-success": "#3DAA6D",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.25)",
        "glow-amber":
          "0 0 20px rgba(229, 165, 55, 0.12), 0 0 40px rgba(229, 165, 55, 0.04)",
        "glow-cyan":
          "0 0 20px rgba(63, 189, 212, 0.12), 0 0 40px rgba(63, 189, 212, 0.04)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
      backgroundImage: {
        "gradient-mesh":
          "radial-gradient(ellipse at 20% 20%, rgba(229, 165, 55, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(63, 189, 212, 0.025) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
