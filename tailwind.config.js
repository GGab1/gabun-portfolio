export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0E14",
        glass: "rgba(255,255,255,0.06)",
        accent: "#3DF5FF",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};
