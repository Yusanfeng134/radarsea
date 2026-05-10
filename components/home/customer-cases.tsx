"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { RevealSection } from "@/components/home/reveal-section";

// Three detailed customer outcomes — different role from TrustBar's
// single hero quote + logo wall. This is the "deep proof" section,
// where buyers learn what other companies actually achieved.
type CustomerCase = {
  id: string;
  industryTag: string;
  scaleTag: string;
  metric: string;
  metricLabel: string;
  metricTone: "green" | "cyan";
  quote: string;
  attribution: string;
  productsUsed: string[];
  href: string;
};

const CASES: CustomerCase[] = [
  {
    id: "3c-zero-takedown",
    industryTag: "3C 配件出海",
    scaleTag: "年 GMV ¥1.2 亿",
    metric: "↓ 96%",
    metricLabel: "侵权下架率降幅",
    metricTone: "green",
    quote:
      "我们再也不用 8 个人专门做人工巡检 SKU 了 — 他们现在做更值钱的事。",
    attribution: "IP 团队负责人",
    productsUsed: ["检测雷达"],
    href: "/customers/3c-zero-takedown",
  },
  {
    id: "dtc-baby-discovery",
    industryTag: "DTC 母婴",
    scaleTag: "TikTok Shop 头部",
    metric: "3×",
    metricLabel: "爆款发现速度",
    metricTone: "cyan",
    quote:
      "新品上架前我们就知道这是不是机会 — 不靠运气,靠数据。",
    attribution: "选品总监",
    productsUsed: ["选品雷达", "检测雷达"],
    href: "/customers/dtc-baby-discovery",
  },
  {
    id: "fashion-eu-compliance",
    industryTag: "跨境快时尚",
    scaleTag: "EU + UK 直发",
    metric: "100%",
    metricLabel: "GPSR 一周内合规",
    metricTone: "green",
    quote:
      "GPSR 落地一周内,我们 4,200 个 SKU 全部完成合规审查。",
    attribution: "合规经理",
    productsUsed: ["合规雷达", "品牌雷达"],
    href: "/customers/fashion-eu-compliance",
  },
];

export function CustomerCases() {
  return (
    <RevealSection className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
              Customer Outcomes
            </p>
            <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-[52px]">
              别的客户拿到了什么数字。
            </h2>
            <p className="mt-6 text-base leading-[1.65] text-ink-muted md:text-lg">
              来自 1,000+ 接入客户的真实数据 · 完整案例可下载
            </p>
          </div>

          <Link
            href="/customers"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-ink transition-colors hover:text-brand-bright"
          >
            查看全部客户故事
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CASES.map((c) => (
            <CaseCard key={c.id} case={c} />
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function CaseCard({ case: c }: { case: CustomerCase }) {
  const accentClass =
    c.metricTone === "green" ? "text-accent-bright" : "text-brand-bright";
  const glowColor =
    c.metricTone === "green" ? "rgba(0,255,102,0.4)" : "rgba(0,229,255,0.4)";

  return (
    <article
      className="bento-frame group/case relative isolate flex flex-col overflow-hidden rounded-[20px] p-7 lg:p-8"
      data-cursor="lock"
    >
      {/* Industry + scale tags */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        <span>{c.industryTag}</span>
        <span aria-hidden className="h-2.5 w-px bg-line-strong" />
        <span>{c.scaleTag}</span>
      </div>

      {/* The metric — visual punch */}
      <div className="mt-7">
        <div
          className={`text-display text-[44px] font-semibold leading-none tracking-[-0.04em] tabular-nums ${accentClass} md:text-[52px]`}
          style={{ textShadow: `0 0 24px ${glowColor}` }}
        >
          {c.metric}
        </div>
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {c.metricLabel}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-7 h-px w-full bg-line" />

      {/* Quote */}
      <blockquote className="mt-6 flex-1">
        <p className="text-[15px] leading-[1.65] text-ink">
          <span className="text-ink-faint">「</span>
          {c.quote}
          <span className="text-ink-faint">」</span>
        </p>
        <footer className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
          — {c.attribution}
        </footer>
      </blockquote>

      {/* Footer — products used + read more */}
      <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          <span>使用</span>
          <span className="text-ink-muted">{c.productsUsed.join(" · ")}</span>
        </div>
        <Link
          href={c.href}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-muted transition-colors hover:text-brand-bright"
        >
          完整案例
          <ArrowUpRight
            size={11}
            className="transition-transform duration-300 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
