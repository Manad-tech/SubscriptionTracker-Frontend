/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        foreground: "#F1F5F9",

        card: "#1E293B",
        cardForeground: "#F1F5F9",

        border: "#334155",

        primary: "#6366F1",
        primaryForeground: "#FFFFFF",

        secondary: "#1F2937",
        secondaryForeground: "#F1F5F9",

        muted: "#475569",
        mutedForeground: "#94A3B8",

        accent: "#6366F1",
        accentForeground: "#FFFFFF",
      }
    },
  },
  plugins: [],
}