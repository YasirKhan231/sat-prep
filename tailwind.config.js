/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#1e1e1e",
        tertiary: "#282828",
        accent: "#3B82F6",
        accentSecondary: "#2563EB",
        success: "#4EAD6D",
        border: "#333333",
      },
    },
  },
  plugins: [],
};
