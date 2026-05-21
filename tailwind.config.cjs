/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0b1a",
        midnight: "#0b1026",
        electric: "#3aa0ff",
        glow: "#7ad6ff",
        mist: "#d7e5ff",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(10, 20, 60, 0.65)",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["Inter Tight", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(1200px 600px at 15% 10%, rgba(58, 160, 255, 0.25), transparent 60%), radial-gradient(900px 500px at 80% 10%, rgba(122, 214, 255, 0.18), transparent 55%), linear-gradient(180deg, #0a0b1a 0%, #10163a 55%, #0b1026 100%)",
      },
    },
  },
  plugins: [],
};
