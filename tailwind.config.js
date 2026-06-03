/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      colors: {
        nexus: {
          bg: "#0a0a0f",
          panel: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.08)",
          violet: "#7c3aed",
          cyan: "#06b6d4"
        }
      },
      boxShadow: {
        glow: "0 0 34px rgba(124,58,237,.26)"
      },
      keyframes: {
        ambient: {
          "0%, 100%": { boxShadow: "inset 0 0 42px rgba(124,58,237,.18), inset 0 0 90px rgba(6,182,212,.08)" },
          "50%": { boxShadow: "inset 0 0 70px rgba(124,58,237,.36), inset 0 0 130px rgba(6,182,212,.18)" }
        }
      },
      animation: {
        ambient: "ambient 2.4s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
