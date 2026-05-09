"use client";

import { Container } from "@/components/ui/container";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// ─── Tuning ──────────────────────────────────────────────────────────────────
const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// 2-phase loop (5s total):
//   Phase 0 (0–2.0s):    line draws + holds
//   Phase 1 (2.0–5.0s):  line pushed back blurred, 3 SKU cards spring in
const PHASE_DURATIONS = [2000, 3000] as const;

// ─── Top-level ───────────────────────────────────────────────────────────────
export function RadarseaHero() {
  return (
    <section className="relative isolate overflow-hidden bg-bg pt-32 pb-20 lg:pt-40 lg:pb-28">
      <PageGridBackdrop />
      <Container>
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:gap-16">
          <HeroCopy />
          <InsightLens />
        </div>
      </Container>
    </section>
  );
}

function PageGridBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-data-grid" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 70% 50%, rgba(0,229,255,0.06) 0%, rgba(0,229,255,0.012) 40%, rgba(5,5,5,0) 70%)",
        }}
      />
    </div>
  );
}

// ─── Left column ─────────────────────────────────────────────────────────────
function HeroCopy() {
  return (
    <div className="relative max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: SPRING_EASE, delay: 0.05 }}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-3 py-1.5 backdrop-blur-sm"
        data-cursor="lock"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent-bright opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_8px_rgba(0,255,102,0.7)]" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
          Live · 156 markets · 12.4k signals/min
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: SPRING_EASE, delay: 0.12 }}
        className="text-display mt-6 text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] text-ink md:text-[52px] lg:text-[60px]"
      >
        看透全球电商,
        <br />
        直达爆款 SKU。
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: SPRING_EASE, delay: 0.22 }}
        className="mt-6 max-w-sm font-mono text-[13px] leading-[1.7] text-ink-muted md:text-sm"
      >
        持续追踪 156 国家市场信号、TikTok 流量拐点与竞品价格动态——把全球电商大盘下钻到一个 SKU 的颗粒度。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: SPRING_EASE, delay: 0.32 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <PrimaryCTA />
        <GhostCTA />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint"
      >
        <span>Latency 240ms</span>
        <span aria-hidden className="hidden h-3 w-px bg-line md:block" />
        <span>SOC 2 · GDPR</span>
        <span aria-hidden className="hidden h-3 w-px bg-line md:block" />
        <span>200+ DTC brands</span>
      </motion.div>
    </div>
  );
}

// White solid CTA, dark text — no gradient
function PrimaryCTA() {
  return (
    <a
      href="#demo"
      className="group relative inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-medium text-bg transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
    >
      <span>申请 Demo</span>
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function GhostCTA() {
  return (
    <a
      href="#contact"
      className="group inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong bg-transparent px-6 text-sm font-medium text-ink transition-all duration-200 hover:border-brand-bright/60 hover:text-brand-bright"
    >
      <span>立即体验</span>
      <ArrowRight
        size={14}
        className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </a>
  );
}

// ─── Right column: Insight Lens ──────────────────────────────────────────────
function InsightLens() {
  const [phase, setPhase] = useState<0 | 1>(0);
  const [hovering, setHovering] = useState(false);
  const [cycleId, setCycleId] = useState(0);
  const reduceMotion = useReducedMotion();

  // 5s loop, frozen on Phase 1 when user hovers
  useEffect(() => {
    if (reduceMotion) {
      setPhase(1);
      return;
    }
    if (hovering) {
      setPhase(1);
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = (next: 0 | 1) => {
      if (cancelled) return;
      setPhase(next);
      if (next === 0) setCycleId((id) => id + 1);
      timer = setTimeout(() => {
        step(next === 0 ? 1 : 0);
      }, PHASE_DURATIONS[next]);
    };
    step(0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [hovering, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: SPRING_EASE, delay: 0.18 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative w-full"
    >
      <div className="bento-frame relative overflow-hidden rounded-[28px]">
        <div className="aspect-[5/4] sm:aspect-[16/11]">
          <div className="relative h-full w-full">
            <LensFrameChrome />

            <Layer active={phase === 0} pushed={phase === 1}>
              <TrendLineLayer cycleId={cycleId} />
            </Layer>

            <Layer active={phase === 1}>
              <CardsLayer key={`cards-${cycleId}`} />
            </Layer>
          </div>
        </div>
      </div>

      {/* Underglow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -bottom-12 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,229,255,0.16), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}

function Layer({
  active,
  pushed = false,
  children,
}: {
  active: boolean;
  pushed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : pushed ? 0.18 : 0,
        scale: active ? 1 : pushed ? 0.84 : 0.96,
        filter: pushed ? "blur(8px) brightness(0.5)" : "blur(0px)",
      }}
      transition={{ duration: 0.55, ease: SPRING_EASE }}
      className="absolute inset-0"
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Lens chrome ─────────────────────────────────────────────────────────────
function LensFrameChrome() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="absolute inset-x-5 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
            INSIGHT LENS · LIVE
          </span>
          <span className="hidden text-ink-faint md:inline">156 MKT</span>
        </div>
        <span className="hidden md:inline">240ms</span>
      </div>
      <CornerHair className="left-3 top-3" />
      <CornerHair className="right-3 top-3" rotate="rotate-90" />
      <CornerHair className="left-3 bottom-3" rotate="-rotate-90" />
      <CornerHair className="right-3 bottom-3" rotate="rotate-180" />
    </div>
  );
}

function CornerHair({ className, rotate }: { className: string; rotate?: string }) {
  return (
    <span className={`absolute h-3 w-3 ${className} ${rotate ?? ""}`}>
      <span className="absolute inset-y-0 left-0 w-px bg-line-strong" />
      <span className="absolute inset-x-0 top-0 h-px bg-line-strong" />
    </span>
  );
}

// ─── Phase 0: trend line (no area fill, sharp cyan stroke) ──────────────────
function TrendLineLayer({ cycleId }: { cycleId: number }) {
  return (
    <div className="relative h-full w-full">
      <svg
        className="absolute inset-0 h-full w-full px-8 py-14"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="rs-trend-stroke" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00FF66" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Faint Y grid */}
        {[12, 24, 36, 48].map((y) => (
          <line
            key={y}
            x1="2"
            x2="98"
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.15"
          />
        ))}
        <line x1="2" x2="98" y1="56" y2="56" stroke="rgba(255,255,255,0.10)" strokeWidth="0.2" />

        {/* Sharp trend stroke — drawn left → right, no area fill */}
        <motion.path
          key={`stroke-${cycleId}`}
          d="M 2 50 C 18 48, 26 40, 36 41 C 48 42, 56 38, 65 35 C 72 33, 76 32, 80 30 C 84 28, 88 24, 92 12"
          fill="none"
          stroke="url(#rs-trend-stroke)"
          strokeWidth="0.55"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: SPRING_EASE }}
        />

        {/* Apex glowing node */}
        <motion.g
          key={`apex-${cycleId}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4, ease: SPRING_EASE }}
        >
          <motion.circle
            cx="92"
            cy="12"
            r="1.4"
            fill="none"
            stroke="#00FF66"
            strokeWidth="0.2"
            animate={{ r: [1.4, 4], opacity: [0.85, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
          <circle cx="92" cy="12" r="1.4" fill="rgba(0,255,102,0.3)" />
          <circle cx="92" cy="12" r="0.7" fill="#00FF66" />
        </motion.g>
      </svg>

      {/* Mono labels */}
      <div className="absolute left-5 top-12 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        SMART HOME / TRASH CANS · 12M
      </div>
      <div className="absolute right-5 top-12 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        TREND
      </div>
      <motion.div
        key={`apex-label-${cycleId}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.45, duration: 0.4, ease: SPRING_EASE }}
        className="absolute right-[8%] top-[18%] font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-accent-bright"
        style={{ textShadow: "0 0 12px rgba(0,255,102,0.5)" }}
        data-cursor="lock"
      >
        +312% · INFLECTION
      </motion.div>
      <div className="absolute left-5 bottom-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        Q1 25
      </div>
      <div className="absolute right-5 bottom-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        Q1 26
      </div>
    </div>
  );
}

// ─── Phase 1: SKU intel cards ────────────────────────────────────────────────
type SkuCard = {
  id: string;
  header: string;
  metric: string;
  metricColor: string;
  footer: string;
};

const SKU_CARDS: SkuCard[] = [
  {
    id: "c1",
    header: "TIKTOK · TRAFFIC",
    metric: "+300%",
    metricColor: "#00FF66",
    footer: "24h surge · 4.2M views",
  },
  {
    id: "c2",
    header: "GMV · 30D",
    metric: "+218%",
    metricColor: "#00FF66",
    footer: "SH-AT-049 · 自动感应垃圾桶",
  },
  {
    id: "c3",
    header: "COMPETITOR · PRICE",
    metric: "−15%",
    metricColor: "#00E5FF",
    footer: "3 sellers · EU · NA · SEA",
  },
];

function CardsLayer() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-6 py-12 sm:px-10">
      <div className="grid w-full grid-cols-1 gap-3 sm:gap-3.5">
        <AnimatePresence mode="popLayout">
          {SKU_CARDS.map((card, i) => (
            <SKUCard key={card.id} card={card} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SKUCard({ card, index }: { card: SkuCard; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.94 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
        delay: index * 0.12,
      }}
      className="group/sku relative isolate overflow-hidden rounded-2xl bg-white/[0.025] backdrop-blur-md"
      style={{
        // 0.5px border per brief
        border: "0.5px solid rgba(255, 255, 255, 0.16)",
      }}
      data-cursor="lock"
    >
      {/* Glow underlay tinted by metric color */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-50"
        style={{
          background: `radial-gradient(ellipse 70% 120% at 100% 50%, ${card.metricColor}22, transparent 70%)`,
        }}
      />

      <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
            {card.header}
          </div>
          <div className="mt-2 truncate font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {card.footer}
          </div>
        </div>

        {/* Ultra-large fluorescent metric */}
        <div
          className="text-display shrink-0 text-[40px] font-semibold leading-none tracking-[-0.04em] sm:text-[48px] md:text-[56px]"
          style={{
            color: card.metricColor,
            textShadow: `0 0 18px ${card.metricColor}66, 0 0 38px ${card.metricColor}33`,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {card.metric}
        </div>
      </div>

      {/* Right edge accent line */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-4 bottom-4 w-px"
        style={{
          background: `linear-gradient(to bottom, transparent, ${card.metricColor}80, transparent)`,
        }}
      />
    </motion.div>
  );
}
