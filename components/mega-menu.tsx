"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  MessagesSquare,
  ScanSearch,
  Shield,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";
import { products, type Product } from "@/lib/products";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Five visually-distinct line icons — replaces the colored-circle treatment
const PRODUCT_ICONS: Record<Product["id"], LucideIcon> = {
  detection: ScanSearch,
  discovery: TrendingUp,
  brand: BadgeCheck,
  compliance: Shield,
  sentiment: MessagesSquare,
};

type MegaMenuProps = {
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function MegaMenu({
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  // Tooltip for "coming soon" satellite cells
  const [tooltipNodeId, setTooltipNodeId] = React.useState<string | null>(null);
  const tooltipX = useMotionValue(-100);
  const tooltipY = useMotionValue(-100);
  const tipX = useSpring(tooltipX, { stiffness: 320, damping: 28, mass: 0.4 });
  const tipY = useSpring(tooltipY, { stiffness: 320, damping: 28, mass: 0.4 });

  const handleSatelliteEnter = (id: string) => setTooltipNodeId(id);
  const handleSatelliteLeave = () => setTooltipNodeId(null);
  const handleSatelliteMove = (e: React.MouseEvent<HTMLDivElement>) => {
    tooltipX.set(e.clientX + 14);
    tooltipY.set(e.clientY + 14);
  };

  const detection = products.find((p) => p.id === "detection") as Product;
  const satellites = products.filter((p) => p.id !== "detection");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.16, ease: [0, 0, 0.2, 1] }}
      className="absolute inset-x-0 top-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        setTooltipNodeId(null);
      }}
    >
      {/* Surface — fully opaque pure black so high-contrast page content
          can't bleed through. Soft shadow underneath gives the floating
          depth that the previous translucent bg was trying to achieve. */}
      <div className="relative border-b border-line-strong/70 bg-bg shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-line-strong"
        />

        <div className="mx-auto w-full max-w-site">
          <div className="grid grid-cols-6 divide-x divide-line">
            {/* Column 1 — Detection (Live, fully clickable) */}
            <DetectionCell product={detection} onSelect={onSelect} />

            {/* Columns 2-5 — Coming soon (frozen, tooltip-only) */}
            {satellites.map((p) => (
              <SatelliteCell
                key={p.id}
                product={p}
                onMouseEnter={() => handleSatelliteEnter(p.id)}
                onMouseLeave={handleSatelliteLeave}
                onMouseMove={handleSatelliteMove}
              />
            ))}

            {/* Column 6 — Global conversion */}
            <GlobalCTACell onSelect={onSelect} />
          </div>
        </div>
      </div>

      {/* Tooltip layer — follows cursor over satellite cells */}
      <AnimatePresence>
        {tooltipNodeId && (
          <motion.div
            key="mega-tooltip"
            aria-hidden
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.16, ease: SPRING_EASE }}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              x: tipX,
              y: tipY,
              pointerEvents: "none",
              zIndex: 60,
            }}
            className="rounded-md border border-line-strong bg-black/92 px-2.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              <span className="text-ink-faint">[ </span>
              Status:{" "}
              <span className="text-brand-bright">研发中</span>
              <span className="text-ink-faint"> ]</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Column 1: Detection (Live) ─────────────────────────────────────────────
function DetectionCell({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: () => void;
}) {
  const Icon = PRODUCT_ICONS.detection;

  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        console.log("nav-product", product.id);
        onSelect();
      }}
      className="group relative flex h-full flex-col p-6 transition-colors duration-200 hover:bg-white/[0.05]"
      data-cursor="lock"
    >
      <Icon
        size={22}
        strokeWidth={1.25}
        className="text-ink transition-[color,filter] duration-300 group-hover:text-accent-bright group-hover:[filter:drop-shadow(0_0_8px_rgba(0,255,102,0.55))]"
      />

      <div className="mt-7 flex items-center gap-2">
        <span className="text-[15px] font-semibold text-ink">{product.name}</span>

        {/* Live indicator */}
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-1 w-1">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-bright opacity-80" />
            <span className="relative h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_5px_rgba(0,255,102,0.8)]" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent-bright">
            Live
          </span>
        </span>

        {/* Hover-only arrow — slides in next to the title */}
        <ArrowRight
          size={12}
          strokeWidth={2}
          className="-translate-x-1 opacity-0 text-ink transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </div>

      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-ink-muted">
        {product.shortLine}
      </p>
    </a>
  );
}

// ─── Columns 2-5: Frozen ecosystem ──────────────────────────────────────────
function SatelliteCell({
  product,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: {
  product: Product;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const Icon = PRODUCT_ICONS[product.id];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className="relative flex h-full flex-col p-6 select-none"
    >
      <Icon size={22} strokeWidth={1.25} className="text-ink-faint/80" />

      <span className="mt-7 text-[15px] font-medium text-ink-faint">
        {product.name}
      </span>

      <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-ink-faint/65">
        {product.shortLine}
      </p>
    </div>
  );
}

// ─── Column 6: Global CTA ───────────────────────────────────────────────────
function GlobalCTACell({ onSelect }: { onSelect: () => void }) {
  const { open: openContactSales } = useContactSales();

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-bg-subtle/60 p-6">
      <CodeStreamBackdrop />

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.75)]" />
            Global Demo
          </span>
        </p>
        <h3 className="mt-3 text-[16px] font-semibold leading-[1.3] tracking-[-0.005em] text-ink">
          将出海数据,
          <br />
          转化为确定性增长。
        </h3>
        <p className="mt-3 text-[12px] leading-[1.55] text-ink-muted">
          5 款雷达,数据互通,能力协同。
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          openContactSales({ source: "mega-menu-products" });
          onSelect();
        }}
        className="cta-beam group/btn relative mt-6 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-bg/90 px-4 text-[13px] font-medium text-ink transition-colors duration-200 hover:text-brand-bright"
      >
        <span className="relative z-[2]">申请总账号 Demo</span>
        <ArrowRight
          size={12}
          strokeWidth={2}
          className="relative z-[2] transition-transform duration-300 group-hover/btn:translate-x-0.5"
        />
      </button>
    </div>
  );
}

// ─── Code-stream backdrop ───────────────────────────────────────────────────
const CODE_STREAM_LINES = [
  "0x4F2A · NA · ok",
  "tx_ack = 240ms",
  "regions = 156",
  "signals/min = 12.4k",
  "lat_p99 = 240ms",
  "0x2C8E · EU · gdpr",
  "uptime = 99.97%",
  "throughput = 12.4kHz",
  "schema.v = 4.2.1",
  "0x9D31 · APAC · ok",
];

function CodeStreamBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.18]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
      }}
    >
      <div className="code-stream-track px-3 font-mono text-[8px] leading-[2.1] text-ink-faint whitespace-nowrap">
        {[...CODE_STREAM_LINES, ...CODE_STREAM_LINES].map((l, i) => (
          <div key={i} className="text-brand-bright/40 first:mt-1">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
