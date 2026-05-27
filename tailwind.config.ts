import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        display: ["var(--font-orbitron)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cyan: {
          glow: "#00f5ff",
          DEFAULT: "#06b6d4",
          dark: "#0891b2",
        },
        neural: {
          purple: "#7c3aed",
          blue: "#1d4ed8",
          cyan: "#06b6d4",
          dark: "#0a0a0f",
          darker: "#050508",
          navy: "#0d1117",
          card: "#0f1624",
          border: "#1e2d3d",
          glow: "#00f5ff",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "neural-pulse": "neuralPulse 2s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "border-glow": "borderGlow 2s ease-in-out infinite",
        "text-reveal": "textReveal 0.8s ease forwards",
        "matrix-rain": "matrixRain 20s linear infinite",
        "orbit": "orbit 20s linear infinite",
        "orbit-reverse": "orbit 20s linear infinite reverse",
        "typing": "typing 3.5s steps(40, end), blink 0.75s step-end infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "slide-down": "slideDown 0.6s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "spin-slow": "spin 8s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "loader-bar": "loaderBar 2s ease-in-out infinite",
        "aurora": "aurora 15s ease infinite",
        "morph": "morph 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" },
          "50%": { boxShadow: "0 0 60px rgba(6, 182, 212, 0.8), 0 0 100px rgba(6, 182, 212, 0.3)" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
        neuralPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(6, 182, 212, 0.3)" },
          "50%": { borderColor: "rgba(6, 182, 212, 1)" },
        },
        textReveal: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        matrixRain: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        blink: {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "cyan" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        loaderBar: {
          "0%": { width: "0%" },
          "50%": { width: "70%" },
          "100%": { width: "100%" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%", transform: "scale(1)" },
          "50%": { backgroundPosition: "100% 50%", transform: "scale(1.1)" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        glowPulse: {
          "0%": { filter: "drop-shadow(0 0 5px rgba(6, 182, 212, 0.5))" },
          "100%": { filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 1))" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neural-grid": "linear-gradient(rgba(6, 182, 212, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.07) 1px, transparent 1px)",
        "cyber-grid": "linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px)",
        "holographic": "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(124,58,237,0.1) 50%, rgba(6,182,212,0.1) 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)",
      },
      backgroundSize: {
        "neural-grid": "50px 50px",
        "cyber-grid": "40px 40px",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.2)",
        "neon-purple": "0 0 20px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.2)",
        "neon-green": "0 0 20px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.2)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "hologram": "0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 30px rgba(6, 182, 212, 0.05)",
        "card-glow": "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(6, 182, 212, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [animate],
};

export default config;
