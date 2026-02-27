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
        "base-950": "#0A0E1A",
        "base-900": "#0F1629",
        "base-800": "#151D35",
        "accent-amber": "#F59E0B",
        "accent-amber-bright": "#FBBF24",
        "accent-cyan": "#06B6D4",
        "text-primary": "#E8ECF4",
        "text-secondary": "#8892A8",
        "text-muted": "#4A5568",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.3)",
        "glow-amber": "0 0 20px rgba(245, 158, 11, 0.15), 0 0 40px rgba(245, 158, 11, 0.05)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.15), 0 0 40px rgba(6, 182, 212, 0.05)",
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
          "radial-gradient(ellipse at 20% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
