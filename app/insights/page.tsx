import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { InsightsClient } from "@/app/insights/insights-client";
import {
  InsightsSearchForm,
  NewsletterForm,
} from "@/app/insights/insights-forms";
import { Container } from "@/components/ui/container";
import {
  articles,
  getFeaturedArticle,
} from "@/lib/insights-content";

export const metadata: Metadata = {
  title: "行业洞察 · Insights",
  description:
    "出海雷达发布的跨境行业研究、趋势观察、合规洞察、客户故事与产品更新。",
};

export default function InsightsPage() {
  const featured = getFeaturedArticle();
  const others = articles.filter((a) => !a.featured);

  return (
    <>
      <InsightsHero />
      {featured && <FeaturedArticleCard article={featured} />}
      <InsightsClient articles={others} />
      <NewsletterCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function InsightsHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Insights · 第一方研究
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[60px]">
            行业洞察。
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.65] text-ink-muted">
            来自出海雷达数据底座的研究报告、趋势观察、合规洞察与客户故事——每一篇都基于真实数据。
          </p>

          {/* Search bar (mock — wire up to backend later) */}
          <InsightsSearchForm />
        </div>
      </Container>
    </section>
  );
}

// ─── Featured ────────────────────────────────────────────────────────────────
function FeaturedArticleCard({ article }: { article: typeof articles[number] }) {
  return (
    <section className="border-b border-line py-16 md:py-20">
      <Container>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          ★ Featured · 编辑推荐
        </p>
        <Link
          href={article.href}
          className="bento-frame group/feat mt-5 grid grid-cols-1 gap-6 overflow-hidden rounded-[24px] p-7 transition-colors lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:p-9"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-line-strong bg-white/[0.05] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-bright">
                {article.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                {article.date} · {article.readTime}
              </span>
            </div>
            <h2 className="text-display mt-5 text-[28px] font-semibold leading-[1.15] text-ink md:text-[36px] lg:text-[40px]">
              {article.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.7] text-ink-muted lg:text-[17px]">
              {article.excerpt}
            </p>
            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright">
              阅读全文
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover/feat:translate-x-0.5"
              />
            </span>
          </div>

          {/* Visual placeholder — abstract data visualization */}
          <div className="relative isolate flex min-h-[220px] items-center justify-center overflow-hidden rounded-[16px] border border-line-strong bg-bg-subtle/60 lg:min-h-[280px]">
            <FeaturedVisualization />
          </div>
        </Link>
      </Container>
    </section>
  );
}

function FeaturedVisualization() {
  return (
    <svg
      viewBox="0 0 280 220"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="feat-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0.3" />
          <stop offset="1" stopColor="#34D399" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="feat-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0.18" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="20"
          x2="260"
          y1={y}
          y2={y}
          stroke="rgba(255,255,255,0.04)"
        />
      ))}
      <path
        d="M 20 170 C 50 165, 70 155, 90 152 C 120 148, 140 130, 165 125 C 195 119, 220 100, 260 50"
        fill="none"
        stroke="url(#feat-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 20 170 C 50 165, 70 155, 90 152 C 120 148, 140 130, 165 125 C 195 119, 220 100, 260 50 L 260 200 L 20 200 Z"
        fill="url(#feat-fill)"
      />
      <circle cx="260" cy="50" r="3" fill="#34D399" />
      <circle
        cx="260"
        cy="50"
        r="6"
        fill="none"
        stroke="#34D399"
        strokeWidth="1"
        opacity="0.4"
      />
      <text
        x="248"
        y="38"
        textAnchor="end"
        className="fill-accent-bright"
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fill: "#34D399",
        }}
      >
        +312%
      </text>
    </svg>
  );
}

// ─── Newsletter CTA ──────────────────────────────────────────────────────────
function NewsletterCTA() {
  return (
    <section className="border-t border-line py-24 md:py-28">
      <Container>
        <div className="bento-frame relative isolate overflow-hidden rounded-[24px] p-10 text-center lg:p-14">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
            Newsletter
          </p>
          <h2 className="text-display mx-auto mt-5 max-w-xl text-[28px] font-semibold leading-[1.15] text-ink md:text-[36px]">
            每两周一份,把最有用的跨境信号送到你的邮箱。
          </h2>
          <NewsletterForm />
          <p className="mt-4 text-xs text-ink-faint">每两周一封 · 随时可退订</p>
        </div>
      </Container>
    </section>
  );
}
