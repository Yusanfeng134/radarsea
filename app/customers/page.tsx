import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";

import { BottomCTA } from "@/components/home/bottom-cta";
import { Container } from "@/components/ui/container";
import {
  customerCases,
  getFeaturedCustomerCase,
  type CustomerCase,
} from "@/lib/customers-content";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "客户故事 · Customers",
  description:
    "1,000+ 跨境品牌已用出海雷达把侵权下架率降到 4.6% · 看真实客户拿到了什么数字。",
};

export default function CustomersPage() {
  const featured = getFeaturedCustomerCase();
  const others = customerCases.filter((c) => !c.featured);

  return (
    <>
      <CustomersHero />
      {featured && <FeaturedCase case={featured} />}
      <CasesGrid cases={others} />
      <CustomersStats />
      <BottomCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function CustomersHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
            Customer Outcomes · 真实结果
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[64px]">
            1,000+ 跨境品牌,
            <br />
            用数据换确定性。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
            真实客户接入前后的对比数据。每一个数字都来自实战 — 不是宣传材料。
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Featured case ──────────────────────────────────────────────────────────
function FeaturedCase({ case: c }: { case: CustomerCase }) {
  const accentClass =
    c.metricTone === "green" ? "text-accent-bright" : "text-brand-bright";
  const glowColor =
    c.metricTone === "green" ? "rgba(0,255,102,0.4)" : "rgba(0,229,255,0.4)";

  return (
    <section className="border-b border-line py-16 md:py-20">
      <Container>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          ★ Featured · 重点案例
        </p>
        <article className="bento-frame relative mt-5 grid grid-cols-1 gap-8 overflow-hidden rounded-[24px] p-7 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:p-10">
          {/* Left — metric */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                <span>{c.industryTag}</span>
                <span aria-hidden className="h-2.5 w-px bg-line-strong" />
                <span>{c.scaleTag}</span>
              </div>

              <div className="mt-8" data-cursor="lock">
                <div
                  className={`text-display text-[64px] font-semibold leading-none tracking-[-0.04em] tabular-nums ${accentClass} md:text-[88px]`}
                  style={{ textShadow: `0 0 32px ${glowColor}` }}
                >
                  {c.metric}
                </div>
                <div className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted">
                  {c.metricLabel}
                </div>
              </div>
            </div>

            {/* Products used */}
            <div className="mt-10 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              <span>使用</span>
              {c.productsUsed.map((rId) => {
                const p = products.find((x) => x.id === rId);
                if (!p) return null;
                return (
                  <span
                    key={rId}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white/[0.018] px-2 py-1"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-ink-muted">{p.name}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right — quote + results */}
          <div className="flex flex-col justify-center">
            <Quote
              size={28}
              strokeWidth={1.5}
              className="text-ink-faint/60"
            />
            <blockquote className="mt-5 text-[20px] font-medium leading-[1.5] text-ink md:text-[22px]">
              {c.quote}
            </blockquote>
            <footer className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
              — {c.attribution}
            </footer>

            {c.results && c.results.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
                {c.results.map((r) => (
                  <div key={r.label}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      {r.label}
                    </div>
                    <div className="mt-1 font-mono text-[15px] font-semibold text-brand-bright">
                      {r.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link
              href={c.href}
              className="group mt-7 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink transition-colors hover:text-brand-bright"
            >
              查看完整案例
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}

// ─── Grid of other cases ────────────────────────────────────────────────────
function CasesGrid({ cases }: { cases: CustomerCase[] }) {
  return (
    <section className="border-b border-line py-20 md:py-28 lg:py-32">
      <Container>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          All cases · {cases.length}
        </p>
        <h2 className="text-display mt-3 text-[28px] font-semibold leading-tight text-ink md:text-[32px]">
          所有客户故事
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cases.map((c) => (
            <CaseCard key={c.id} case={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CaseCard({ case: c }: { case: CustomerCase }) {
  const accentClass =
    c.metricTone === "green" ? "text-accent-bright" : "text-brand-bright";
  const glowColor =
    c.metricTone === "green" ? "rgba(0,255,102,0.4)" : "rgba(0,229,255,0.4)";

  return (
    <Link
      href={c.href}
      className="group/case bento-frame relative isolate flex flex-col overflow-hidden rounded-[18px] p-6 transition-transform duration-300 hover:-translate-y-0.5"
      data-cursor="lock"
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        <span>{c.industryTag}</span>
        <span aria-hidden className="h-2.5 w-px bg-line-strong" />
        <span>{c.scaleTag}</span>
      </div>

      <div className="mt-6">
        <div
          className={`text-display text-[40px] font-semibold leading-none tracking-[-0.04em] tabular-nums ${accentClass} md:text-[44px]`}
          style={{ textShadow: `0 0 18px ${glowColor}` }}
        >
          {c.metric}
        </div>
        <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
          {c.metricLabel}
        </div>
      </div>

      <p className="mt-6 line-clamp-3 flex-1 text-[14px] leading-[1.6] text-ink">
        <span className="text-ink-faint">「</span>
        {c.quote}
        <span className="text-ink-faint">」</span>
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          — {c.attribution}
        </span>
        <ArrowUpRight
          size={12}
          className="text-ink-faint transition-all duration-300 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5 group-hover/case:text-brand-bright"
        />
      </div>
    </Link>
  );
}

// ─── Aggregate stats ────────────────────────────────────────────────────────
function CustomersStats() {
  const STATS = [
    { value: "1,000+", label: "出海品牌已接入" },
    { value: "12", label: "覆盖行业" },
    { value: "96%", label: "客户续约率" },
    { value: "240ms", label: "平均响应延迟" },
  ];
  return (
    <section className="border-b border-line py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="bg-bg p-8 text-center md:p-10 lg:p-12"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                {String(i + 1).padStart(2, "0")} / 04
              </div>
              <div className="text-display mt-4 text-3xl font-semibold tracking-tighter text-ink lg:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
