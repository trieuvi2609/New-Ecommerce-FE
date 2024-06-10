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
        primary: "#ffffff",
        secondary: "#000000",
        highlight: "#DB4444",
        placeholder: "#FAFAFA",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12px, lineHeight: 16px
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px, lineHeight: 20px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px, lineHeight: 24px
        lg: ["1.125rem", { lineHeight: "1.5rem" }], // 18px, lineHeight: 24px
        xl: ["1.25rem", { lineHeight: "1.5rem" }], // 20px, lineHeight: 24px
        "2xl": ["1.5rem", { lineHeight: "1.5rem" }], // 24px, lineHeight: 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px, lineHeight: 36px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
