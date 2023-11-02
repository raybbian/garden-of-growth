/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sarala': ['Sarala', 'sans-serif'],
      },
      fontSize: {
        title: "clamp(54.64px, 4dvw, 76.8px)",
        header: "clamp(27.32px, 2dvw, 38.4px)",
        subheader: "clamp(20.49px, 1.5dvw, 28.8px)",
        body: "clamp(13.66px, 1dvw, 19.2px)",
      },
    },
  },
  plugins: [],
}

