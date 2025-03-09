import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary))",
        secondary: "rgba(var(--color-secondary))",
        tertiary: "rgba(var(--color-tertiary))",
      },
      spacing: {
        pixelSize: "var(--pixel-size)", // Default value; you can change it as needed
      },
      animation: {
        fastPulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Faster pulse animation (0.75s)
      },
    },
  },
  plugins: [nextui()],
};
