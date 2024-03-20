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
        primary: "#0875e1",
        dark: "#1E2535",
        "primary-dark": "#005cbf",
        "project-onboarding": "#17B9A7",
        "embedded-portal": "#EFBC73",
        "file-feed": "#CD2659",
        "dynamic-portal": "#3A7CB9",
        destructive: "#ef4444",
      },
    },
    variants: {
      extend: {
        fill: ["group-hover"],
        borderRadius: ["first", "last"],
      },
    },
  },
  plugins: [],
};
export default config;
