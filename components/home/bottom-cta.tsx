"use client";

import { ArrowRight, Download } from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";
import { RevealSection } from "@/components/home/reveal-section";

export function BottomCTA() {
  const { open: openContactSales } = useContactSales();
  return (
    <RevealSection className="border-t border-line py-28 md:py-36 lg:py-44">
      <div className="mx-auto max-w-site px-5 text-center md:px-8">
        <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
          <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
          Get Started · 现在开始
        </p>
        <h2 className="text-display mx-auto mt-6 max-w-3xl text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-[52px]">
          立即开始第一次扫描。
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
          14 天免费 · 无需信用卡 · 30 秒注册 · Detection 雷达已上线
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Primary — self-serve trial path */}
          <a
            href="https://detection.overseasradar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-inner-glow group inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-7 text-sm font-medium text-bg transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
          >
            <span className="relative z-[2]">立即免费试用</span>
            <ArrowRight
              size={16}
              className="relative z-[2] transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>

          {/* Secondary — contact sales for enterprise */}
          <button
            type="button"
            onClick={() => openContactSales({ source: "bottom-cta" })}
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-transparent px-7 text-sm font-medium text-ink transition-all duration-200 hover:border-brand-bright/60 hover:text-brand-bright"
          >
            <span>联系销售</span>
            <ArrowRight
              size={16}
              className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </button>
        </div>

        {/* Tertiary — gated lead magnet (replaces "订阅行业洞察") */}
        <button
          type="button"
          onClick={() =>
            openContactSales({ source: "bottom-cta-report-download" })
          }
          className="group mt-8 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint transition-colors hover:text-brand-bright"
        >
          <Download size={12} strokeWidth={2} />
          下载 2026 跨境 IP 风险报告 →
        </button>
      </div>
    </RevealSection>
  );
}
