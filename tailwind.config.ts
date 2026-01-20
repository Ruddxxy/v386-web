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
        void: "#000000",
        stark: "#FFFFFF",
        orange: "#FF6600",
      },
      fontFamily: {
        serif: ["Times New Roman", "Times", "serif"],
        mono: ["monospace"],
      },
      borderWidth: {
        "4": "4px",
      },
      boxShadow: {
        hard: "8px 8px 0px 0px #000000",
        "hard-orange": "8px 8px 0px 0px #FF6600",
        "hard-white": "8px 8px 0px 0px #FFFFFF",
        "hard-sm": "4px 4px 0px 0px #000000",
        "hard-sm-orange": "4px 4px 0px 0px #FF6600",
      },
    },
  },
  plugins: [],
};

export default config;
