"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";
import { RevealSection } from "@/components/home/reveal-section";
import { insightsPreview } from "@/lib/home-content";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Reframe from "blog" to "research" — for a data brand, the publication
// surface should signal first-party research authority, not casual
// blogging. Layout: 1 large featured + 2 stacked = 1+2 asymmetric grid.
export function InsightsPreview() {
  const { open: openContactSales } = useContactSales();
  const featured = insightsPreview[0];
  const others = insightsPreview.slice(1, 3);

  return (
    <RevealSection className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
              Research · 第一方研究
            </p>
            <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-[52px]">
              出海雷达数据研究。
            </h2>
            <p className="mt-5 text-base leading-[1.65] text-ink-muted md:text-lg">
              基于 1,000+ 接入客户与 156 国家公开数据的第一方研究 ·
              每两周更新
            </p>
          </div>
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-ink transition-colors hover:text-brand-bright"
          >
            查看全部研究
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {/* Featured · large card with gated PDF download */}
          <FeaturedReportCard
            article={featured}
            onDownload={() =>
              openContactSales({
                source: `research-download-${featured.id}`,
              })
            }
          />

          {/* Two smaller cards stacked */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {others.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

function FeaturedReportCard({
  article,
  onDownload,
}: {
  article: (typeof insightsPreview)[number];
  onDownload: () => void;
}) {
  return (
    <article className="bento-frame group/feat relative isolate flex flex-col overflow-hidden rounded-[20px] p-7 lg:p-9">
      {/* Featured badge */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-bright/40 bg-brand-bright/10 px-2.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-brand-bright">
          <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_4px_rgba(0,229,255,0.8)]" />
          Featured Report
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {article.category}
        </span>
      </div>

      <Link
        href={article.href}
        className="mt-6 block group-hover/feat:[&_h3]:text-brand-bright"
      >
        <h3 className="text-display text-[26px] font-semibold leading-[1.2] text-ink transition-colors duration-300 md:text-[30px] lg:text-[34px]">
          {article.title}
        </h3>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-ink-muted">
          {article.excerpt}
        </p>
      </Link>

      {/* Metadata strip */}
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
        <span>{formatDate(article.date)}</span>
        <span aria-hidden className="h-2.5 w-px bg-line-strong" />
        <span>{article.readTime}</span>
        <span aria-hidden className="h-2.5 w-px bg-line-strong" />
        <span>数据源:1,000+ 客户实战</span>
        <span aria-hidden className="h-2.5 w-px bg-line-strong" />
        <span>作者:出海雷达研究团队</span>
      </div>

      {/* Dual CTA: read inline OR download gated PDF */}
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={onDownload}
          className="cta-inner-glow group/dl inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-medium text-bg transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
        >
          <span className="relative z-[2] inline-flex items-center gap-1.5">
            <Download size={14} strokeWidth={2} />
            下载完整报告 PDF
          </span>
        </button>
        <Link
          href={article.href}
          className="group/read inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong bg-transparent px-5 text-sm font-medium text-ink transition-all duration-200 hover:border-brand-bright/60 hover:text-brand-bright"
        >
          <span>阅读摘要</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/read:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

function ArticleCard({
  article,
}: {
  article: (typeof insightsPreview)[number];
}) {
  return (
    <Link
      href={article.href}
      className="group/card flex h-full flex-col rounded-2xl border border-line bg-white/[0.012] p-6 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.025]"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-bright">
        {article.category}
      </p>
      <h3 className="mt-4 line-clamp-2 text-[18px] font-semibold leading-[1.3] text-ink transition-colors duration-300 group-hover/card:text-brand-bright">
        {article.title}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-[1.6] text-ink-muted">
        {article.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
        <span>{formatDate(article.date)}</span>
        <span>{article.readTime}</span>
      </div>
    </Link>
  );
}
