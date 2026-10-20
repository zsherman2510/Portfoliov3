/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0c",
        coal: "#141416",
        paper: "#ecebe6",
        mute: "#8d8b85",
        line: "rgba(236,235,230,0.12)",
        signal: "#3ee6a0",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1440px" },
    },
  },
  plugins: [],
};
