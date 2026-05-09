"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MessagesSquare,
  Shield,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { products, type Product } from "@/lib/products";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SATELLITE_ICONS: Record<string, LucideIcon> = {
  discovery: TrendingUp,
  brand: BadgeCheck,
  compliance: Shield,
  sentiment: MessagesSquare,
};

// ─── Section ─────────────────────────────────────────────────────────────────
export function ProductSuiteSection() {
  const detection = products.find((p) => p.id === "detection");
  const satellites = products.filter((p) => p.id !== "detection");

  if (!detection) return null;

  return (
    <section className="border-t border-line">
      <Container>
        <div className="py-24 md:py-32 lg:py-40">
          <SectionHeader />

          <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 xl:grid-cols-[3fr_2fr] xl:items-stretch">
            <DetectionHero product={detection} />
            <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:h-full xl:grid-rows-2">
              {satellites.map((p) => (
                <SatelliteCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="max-w-[760px]">
      <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
        <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
        Product Suite
      </p>
      <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.05] text-ink md:text-[48px] lg:text-[56px]">
        五款雷达,
        <br />
        覆盖跨境业务全周期。
      </h2>
      <p className="mt-6 max-w-xl text-lg leading-[1.6] text-ink-muted">
        从选品到合规,从品牌到舆情,出海雷达让每个环节都有专属预警系统。
      </p>
    </div>
  );
}

// ─── Detection Hero (the only "live" product) ───────────────────────────────
function DetectionHero({ product }: { product: Product }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 80, damping: 18 });
  const smy = useSpring(my, { stiffness: 80, damping: 18 });
  const xPct = useTransform(smx, (v) => `${(v * 100).toFixed(1)}%`);
  const yPct = useTransform(smy, (v) => `${(v * 100).toFixed(1)}%`);
  const lightBg = useMotionTemplate`radial-gradient(ellipse 55% 70% at ${xPct} ${yPct}, rgba(34,211,238,0.12), rgba(34,211,238,0) 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: SPRING_EASE }}
      className="detection-hero bento-frame group/hero relative isolate flex flex-col overflow-hidden rounded-[24px] p-7 lg:p-9"
    >
      {/* Mouse-tracked ambient light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100"
        style={{ background: lightBg }}
      />

      {/* Two-column inner layout — text | scan UI */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <DetectionTextColumn product={product} />
        <DetectionScanMock />
      </div>
    </motion.div>
  );
}

function DetectionTextColumn({ product }: { product: Product }) {
  return (
    <div className="relative flex flex-col">
      {/* Live status pill */}
      <span
        data-cursor="lock"
        className="inline-flex items-center gap-2 self-start rounded-full border border-line-strong bg-card px-2.5 py-1 backdrop-blur-sm"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-bright opacity-75" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          Live · 已上线
        </span>
      </span>

      <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        Detection Radar
      </p>
      <h3 className="mt-2 text-[30px] font-semibold leading-[1.05] tracking-tight text-ink lg:text-[36px]">
        {product.name}
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-ink-muted">
        {product.description}
      </p>

      <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {product.capabilities.map((cap) => (
          <li
            key={cap}
            className="flex items-start gap-2 text-sm font-medium text-ink"
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className="mt-1 shrink-0 text-brand-bright"
            />
            <span>{cap}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 lg:mt-auto lg:pt-10">
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-inner-glow group relative inline-flex h-11 items-center gap-1.5 overflow-hidden rounded-full bg-brand px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-hover"
        >
          <span className="relative z-[2]">立即检测风险</span>
          <ArrowRight
            size={16}
            className="relative z-[2] transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  );
}

// ─── Scan UI window ──────────────────────────────────────────────────────────
function DetectionScanMock() {
  return (
    <div className="relative flex min-h-[340px] flex-col overflow-hidden rounded-[16px] border border-line-strong bg-bg-subtle/60 backdrop-blur-md lg:min-h-[420px]">
      {/* Window header */}
      <div className="relative flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          ip-detection › live
        </span>
        <span className="font-mono text-[10px] text-ink-faint">0x4F2A</span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-5">
        {/* Code stream behind */}
        <CodeStreamBackground />

        {/* Mock product card with scan line + result badges */}
        <div className="relative">
          <ProductMockCard />
          <ResultBadges />
        </div>

        {/* Status footer */}
        <div className="mt-auto flex items-center justify-between pt-5 font-mono text-[10px] text-ink-faint">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 animate-pulse rounded-full bg-brand-bright" />
            analyzing.frame ›› 0xA21F
          </span>
          <span>throughput 12.4kHz</span>
        </div>
      </div>
    </div>
  );
}

function ProductMockCard() {
  return (
    <div className="relative isolate overflow-hidden rounded-xl border border-line-strong bg-black/40 p-4 backdrop-blur-md">
      {/* Image area */}
      <div
        className="relative aspect-[5/3] overflow-hidden rounded-md bg-bg-subtle/60"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(255,255,255,0.02))",
        }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-12 w-12 rounded-md border border-line-strong" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Product info */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-3/4 rounded bg-line/70" />
        <div className="h-2.5 w-1/2 rounded bg-line/40" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">
          SKU#OR-2826-A
        </span>
        <span
          data-cursor="lock"
          className="font-mono text-xs text-brand-bright"
        >
          $24.99
        </span>
      </div>

      {/* CSS-driven scan line — duration swaps via --scan-duration */}
      <span aria-hidden className="detection-scan-line absolute inset-x-0" />
    </div>
  );
}

function ResultBadges() {
  const badges = [
    { i: 1, label: "Copyright", value: "Clear", tone: "good" as const },
    { i: 2, label: "Trademark", value: "Clear", tone: "good" as const },
    { i: 3, label: "Patent", value: "Flag · 1", tone: "alert" as const },
  ];
  return (
    <div className="absolute right-3 top-4 z-[3] flex flex-col items-end gap-2">
      {badges.map((b) => (
        <span
          key={b.label}
          data-cursor="lock"
          className={`detection-result-badge detection-result-badge--${b.i} flex items-center gap-1.5 rounded-md border border-line-strong bg-black/70 px-2 py-1 backdrop-blur-md`}
        >
          <span
            className={`font-mono text-[11px] font-bold ${
              b.tone === "good" ? "text-accent-bright" : "text-brand-bright"
            }`}
            style={{
              textShadow:
                b.tone === "good"
                  ? "0 0 6px rgba(0,255,102,0.6)"
                  : "0 0 6px rgba(0,229,255,0.6)",
            }}
          >
            {b.tone === "good" ? "✓" : "!"}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink">
            {b.label}
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.15em] ${
              b.tone === "good" ? "text-accent-bright" : "text-brand-bright"
            }`}
          >
            {b.value}
          </span>
        </span>
      ))}
    </div>
  );
}

function CodeStreamBackground() {
  const lines = [
    "analyze.tsx:42 › checking trademark database",
    "0x4F2A: [USPTO] 6,124 records loaded",
    "0x4F2B: [EUIPO] 4,892 records loaded",
    "pattern.match(sku) › 0.012s",
    "similarity.threshold = 0.78",
    "flagged.count = 1 ⚠",
    "completed.in = 1.234s",
    "[ ok ] all systems operational",
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-4 bottom-12 -z-[1] h-32 overflow-hidden opacity-25"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 30%, black 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 30%, black 80%, transparent)",
      }}
    >
      <div className="code-stream-track font-mono text-[9px] leading-[1.7] text-ink-faint">
        {[...lines, ...lines].map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Satellite (dormant) ─────────────────────────────────────────────────────
function SatelliteCard({ product }: { product: Product }) {
  const Icon = SATELLITE_ICONS[product.id] ?? TrendingUp;
  return (
    <article className="group/sat relative flex h-full min-h-[180px] flex-col rounded-[16px] border border-line bg-white/[0.018] p-5 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.03]">
      {/* Code-comment status (replaces "即将上线" pill) */}
      <span className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.04em] text-ink-faint">
        [ 研发中 ]
      </span>

      {/* Single monochrome line icon */}
      <Icon
        size={20}
        strokeWidth={1.5}
        className="text-ink-faint transition-colors duration-300 group-hover/sat:text-ink-muted"
      />

      {/* Title pinned to bottom */}
      <div className="mt-auto pt-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          {product.nameEn}
        </p>
        <h3 className="mt-1.5 text-[18px] font-semibold leading-tight text-ink-muted transition-colors duration-300 group-hover/sat:text-ink">
          {product.name}
        </h3>
      </div>
    </article>
  );
}
