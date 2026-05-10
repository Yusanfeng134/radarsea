"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  Globe,
  ShieldCheck,
  Sigma,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";

// ─── Data pillar cells ──────────────────────────────────────────────────────
type DataPillar = {
  id: string;
  icon: LucideIcon;
  title: string;
  englishTitle: string;
  description: string;
  href: string;
};

const PILLARS: DataPillar[] = [
  {
    id: "data-sources",
    icon: Database,
    title: "数据底座",
    englishTitle: "Data Foundation",
    description: "1 亿+ IP 数据 / 500+ 跨境平台 / 政府数据库清单与刷新频率",
    href: "/data-sources",
  },
  {
    id: "coverage",
    icon: Globe,
    title: "覆盖地图",
    englishTitle: "Coverage Map",
    description: "156 国家可视化 · 全量监测 / 部分覆盖 / 仅信号采集 三级",
    href: "/data-sources#coverage",
  },
  {
    id: "trust",
    icon: ShieldCheck,
    title: "信任中心",
    englishTitle: "Trust Center",
    description: "SOC 2 · GDPR · PIPL · 子处理者清单与渗透测试报告",
    href: "/trust",
  },
  {
    id: "methodology",
    icon: Sigma,
    title: "方法论",
    englishTitle: "Methodology",
    description: "AI 评分原理 · 模型准确率 · 我们在哪里还会判错",
    href: "/methodology",
  },
];

type DataMegaMenuProps = {
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function DataMegaMenu({
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: DataMegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.16, ease: [0, 0, 0.2, 1] }}
      className="absolute inset-x-0 top-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative border-b border-line-strong/70 bg-bg shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-line-strong"
        />

        <div className="mx-auto w-full max-w-site">
          <div className="grid grid-cols-5 divide-x divide-line">
            {PILLARS.map((pillar) => (
              <PillarCell
                key={pillar.id}
                pillar={pillar}
                onSelect={onSelect}
              />
            ))}

            {/* Column 5 — Data Demo CTA */}
            <DataDemoCell onSelect={onSelect} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Pillar cell — now LIVE (target pages built) ────────────────────────────
function PillarCell({
  pillar,
  onSelect,
}: {
  pillar: DataPillar;
  onSelect: () => void;
}) {
  const Icon = pillar.icon;
  return (
    <Link
      href={pillar.href}
      onClick={onSelect}
      className="group relative flex h-full flex-col p-6 transition-colors duration-200 hover:bg-white/[0.04]"
    >
      <Icon
        size={22}
        strokeWidth={1.25}
        className="text-ink transition-[color,filter] duration-300 group-hover:text-brand-bright group-hover:[filter:drop-shadow(0_0_8px_rgba(0,229,255,0.5))]"
      />

      <div className="mt-7 flex items-center gap-2">
        <span className="text-[15px] font-semibold text-ink">
          {pillar.title}
        </span>
        <ArrowRight
          size={12}
          strokeWidth={2}
          className="-translate-x-1 opacity-0 text-ink transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </div>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        {pillar.englishTitle}
      </span>

      <p className="mt-3 line-clamp-3 text-[13px] leading-[1.55] text-ink-muted">
        {pillar.description}
      </p>
    </Link>
  );
}

// ─── Column 5: Data Demo CTA ────────────────────────────────────────────────
function DataDemoCell({ onSelect }: { onSelect: () => void }) {
  const { open: openContactSales } = useContactSales();
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-bg-subtle/60 p-6">
      <CodeStreamBackdrop />

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-1 w-1">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-bright opacity-80" />
              <span className="relative h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_5px_rgba(0,255,102,0.8)]" />
            </span>
            Live · Data Demo
          </span>
        </p>
        <h3 className="mt-3 text-[16px] font-semibold leading-[1.3] tracking-[-0.005em] text-ink">
          看 60 秒,
          <br />
          看清我们的数据底座。
        </h3>
        <p className="mt-3 text-[12px] leading-[1.55] text-ink-muted">
          数据词典 / 接入 SDK / 政府数据库与平台数据访问 demo。
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          openContactSales({ source: "mega-menu-data" });
          onSelect();
        }}
        className="cta-beam group/btn relative mt-6 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-bg/90 px-4 text-[13px] font-medium text-ink transition-colors duration-200 hover:text-brand-bright"
      >
        <span className="relative z-[2]">预约数据 Demo</span>
        <ArrowRight
          size={12}
          strokeWidth={2}
          className="relative z-[2] transition-transform duration-300 group-hover/btn:translate-x-0.5"
        />
      </button>
    </div>
  );
}

// ─── Code-stream backdrop (mono data lines, 18s loop) ───────────────────────
const CODE_STREAM_LINES = [
  "uspto.records = 6,124,832",
  "euipo.records = 4,892,104",
  "cnipa.sync = 240ms",
  "tiktok.platforms = 28",
  "amazon.refresh = 60s",
  "regions = 156",
  "data_residency = cn / sg / eu",
  "soc2.type_ii = ✓",
  "gdpr = ✓",
  "uptime = 99.97%",
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
