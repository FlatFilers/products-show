import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary-lighter": "#E7EEF0",
        "bg-primary-light": "#C0D1D8",
        "bg-primary-dark": "#B6CBD3",
        "text-primary-dark": "#39435A",
        "button-primary": "#396C82",
        primary: "#0875e1",
        dark: "#1E2535",
        "dark-gray": "#292D36",
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
