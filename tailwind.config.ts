import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "20px", md: "32px" },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // ── Radarsea dark palette ─────────────────────────────────────
        // Backgrounds: SaaS 2.0 pure-black + slightly raised tier
        bg: {
          DEFAULT: "#050505",
          subtle: "#0F0F0F",
        },
        // Text: white at descending alpha steps
        ink: {
          DEFAULT: "rgba(255, 255, 255, 0.949)",
          muted: "rgba(255, 255, 255, 0.722)",
          faint: "rgba(255, 255, 255, 0.4)",
        },
        // Hairline borders
        line: "rgba(255, 255, 255, 0.051)",
        "line-strong": "rgba(255, 255, 255, 0.16)",
        // Card surfaces — semi-transparent black on top of Hero gradient
        card: {
          DEFAULT: "rgba(0, 0, 0, 0.4)",
          deep: "rgba(0, 0, 0, 0.5)",
        },
        // Brand: Sansara-era magenta restored for the solid CTA button —
        // electric cyan still used for accents/highlights via brand-bright.
        brand: {
          DEFAULT: "#D946EF", // fuchsia-500 — primary CTA / brand color
          bright: "#00E5FF", // electric cyan — sweep arc, hover, lock state
          deep: "#A21CAF",
          hover: "#C026D3",
          subtle: "rgba(217, 70, 239, 0.08)",
        },
        // Fluorescent green — only for "data anomaly", "lock", "Live" labels
        accent: {
          DEFAULT: "#10B981",
          bright: "#00FF66", // fluorescent green
        },
        // Cyan-tinted highlight for code / mono callouts
        highlight: "#7DD3FC",
        // 5 radar product colors — re-mapped onto the warm→cool gradient
        radar: {
          detection: "#FFA07A",
          discovery: "#FF758C",
          brand: "#D946EF",
          compliance: "#7E22CE",
          sentiment: "#C779D0",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.65" }],
        lg: ["1.125rem", { lineHeight: "1.65" }],
        xl: ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["2rem", { lineHeight: "1.2" }],
        "4xl": ["2.5rem", { lineHeight: "1.15" }],
        "5xl": ["3.5rem", { lineHeight: "1.1" }],
        "6xl": ["4.5rem", { lineHeight: "1.05" }],
      },
      letterSpacing: {
        // Sansara uses very wide tracking on display type
        tightish: "-0.01em",
        tighter: "-0.02em",
        // New wide trackings for the Sansara aesthetic
        wide2: "0.1em",
        wide3: "0.2em",
        wide4: "0.3em",
        wide5: "0.4em",
        // For the 12px-tracked H1 at 48px = 0.25em
        hero: "0.25em",
      },
      maxWidth: {
        site: "1280px",
        prose: "880px",
      },
      borderRadius: {
        // Sansara prefers larger radii throughout
        DEFAULT: "8px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "48px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      backgroundImage: {
        "gradient-warm":
          "linear-gradient(135deg, #FFA07A 0%, #FF758C 100%)",
        "gradient-mid":
          "linear-gradient(135deg, #FF758C 0%, #D946EF 100%)",
        "gradient-cool":
          "linear-gradient(135deg, #D946EF 0%, #C779D0 100%)",
        "gradient-deep":
          "linear-gradient(135deg, #7E22CE 0%, #4A00E0 100%)",
        "gradient-spectrum":
          "linear-gradient(135deg, #FF7EB3 0%, #D946EF 50%, #7E22CE 100%)",
        "gradient-cta":
          "linear-gradient(101.41deg, #7E22CE 0%, #D946EF 100%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        // Slow drift for radial-orb decorations
        "orb-drift": {
          "0%, 100%": { transform: "rotate(0deg) translateY(0px)" },
          "50%": { transform: "rotate(2deg) translateY(-12px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.32, 0.72, 0, 1) both",
        "fade-in": "fade-in 0.4s cubic-bezier(0.32, 0.72, 0, 1) both",
        sweep: "sweep 6s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "orb-drift": "orb-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
