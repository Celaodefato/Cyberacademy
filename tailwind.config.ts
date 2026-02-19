import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-black": "#0a0a0a",
        "cyber-dark": "#111111",
        "cyber-panel": "#0d1a0d",
        "neon-green": "#00ff41",
        "neon-dim": "#00aa2a",
        "neon-bright": "#39ff14",
        "neon-yellow": "#ffff00",
        "neon-red": "#ff0040",
        "neon-blue": "#00d4ff",
        "terminal-border": "#1a3a1a",
        "terminal-bg": "#050f05",
      },
      fontFamily: {
        mono: ["'Fira Code'", "'DejaVu Sans Mono'", "'Courier New'", "monospace"],
      },
      boxShadow: {
        neon: "0 0 5px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff4130",
        "neon-sm": "0 0 3px #00ff41, 0 0 10px #00ff4160",
        "neon-red": "0 0 5px #ff0040, 0 0 20px #ff004060",
        "neon-blue": "0 0 5px #00d4ff, 0 0 20px #00d4ff60",
        "panel": "0 4px 20px rgba(0,255,65,0.08), inset 0 0 20px rgba(0,255,65,0.02)",
      },
      dropShadow: {
        neon: ["0 0 6px #00ff41", "0 0 20px #00ff41"],
        "neon-dim": ["0 0 4px #00aa2a"],
      },
      animation: {
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
        "type-cursor": "type-cursor 1s step-end infinite",
        "slide-in": "slide-in 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.85", filter: "brightness(0.8)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: "1" },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: "0.4" },
        },
        "type-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "slide-in": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px #00ff41, 0 0 20px #00ff4140" },
          "50%": { boxShadow: "0 0 10px #00ff41, 0 0 40px #00ff4180, 0 0 80px #00ff4130" },
        },
      },
      backgroundImage: {
        "grid-cyber":
          "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-cyber": "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
