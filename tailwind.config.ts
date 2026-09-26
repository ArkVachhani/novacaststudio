import type { Config } from "tailwindcss";

// Tailwind is wired up and ready for future utility-class use, but the
// existing design system (ported from the approved prototype) lives in
// src/app/globals.css as CSS custom properties + component classes.
// Don't fight that system — extend Tailwind's theme here if you want to
// start using utility classes for *new* UI, referencing the same tokens.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        surface: "var(--surface)",
        border: "var(--border)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        accent: "var(--accent)",
        teal: "var(--teal)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;