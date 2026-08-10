/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFC530",
          "yellow-dark": "#F5B700",
          gold: "#F2A900",
          red: "#E31E24",
          "red-dark": "#C4161B",
          cream: "#FFF8E7",
          ink: "#231F20",
        },
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(35, 31, 32, 0.08)",
        "card-hover": "0 12px 30px rgba(35, 31, 32, 0.16)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(6deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(-4deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        wiggleIn: {
          "0%": { transform: "rotate(0deg) scale(0.8)", opacity: "0" },
          "60%": { transform: "rotate(9deg) scale(1.05)", opacity: "1" },
          "100%": { transform: "rotate(6deg) scale(1)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(227,30,36,0.45)" },
          "70%": { boxShadow: "0 0 0 10px rgba(227,30,36,0)" },
        },
        dashMove: {
          to: { strokeDashoffset: -24 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        floatSlow: "floatSlow 7s ease-in-out infinite",
        wiggleIn: "wiggleIn 0.7s cubic-bezier(.34,1.56,.64,1) forwards",
        pulseGlow: "pulseGlow 2s infinite",
        dashMove: "dashMove 1.2s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
