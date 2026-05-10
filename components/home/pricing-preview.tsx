"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";
import { RevealSection } from "@/components/home/reveal-section";

// 3-tier pricing — transparent floor stops the "must contact sales for
// every question" leak. Even simplified, it qualifies the visitor in
// 30 seconds rather than losing them in the funnel.
type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceUnit: string;
  features: string[];
  cta: string;
  ctaTone: "trial" | "contact";
  ctaHref?: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "适合个人卖家与早期出海团队",
    price: "免费",
    priceUnit: "14 天试用 · 无需信用卡",
    features: [
      "1 个用户",
      "100 次扫描 / 月",
      "Detection 雷达基础版",
      "Chrome 浏览器插件",
      "邮件支持",
    ],
    cta: "立即试用",
    ctaTone: "trial",
    ctaHref: "https://detection.overseasradar.com",
  },
  {
    id: "team",
    name: "Team",
    tagline: "适合中型卖家与品牌方",
    price: "¥499",
    priceUnit: "/月起 · 年付立省 17%",
    features: [
      "5 个用户",
      "10K 次扫描 / 月",
      "完整 5 款雷达",
      "API 接入与 webhook",
      "Chrome 插件 + ERP 集成",
      "工单 + 邮件支持",
    ],
    cta: "立即试用 14 天",
    ctaTone: "trial",
    ctaHref: "https://detection.overseasradar.com",
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "适合头部品牌与 ERP / SaaS 服务商",
    price: "联系销售",
    priceUnit: "定制方案 · 含 SLA",
    features: [
      "无限用户",
      "无限扫描",
      "完整 5 款雷达 + 优先功能",
      "完整 API + Webhook + 私有部署可选",
      "定制集成与 99.97% SLA",
      "专属 CSM 与季度业务回顾",
    ],
    cta: "联系销售",
    ctaTone: "contact",
  },
];

export function PricingPreview() {
  const { open: openContactSales } = useContactSales();

  return (
    <RevealSection className="border-t border-line bg-bg-subtle/40 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Pricing · 透明定价
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-[52px]">
            按数据用量付费,
            <br />
            不按谈判轮数付费。
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-ink-muted md:text-lg">
            14 天免费试用 · 无需信用卡 · 任何套餐都含 Detection 雷达
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              onContact={() =>
                openContactSales({ source: `pricing-${tier.id}` })
              }
            />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
          所有套餐均含 SOC 2 / GDPR / PIPL 合规 · 数据驻留可选
        </p>
      </div>
    </RevealSection>
  );
}

function TierCard({
  tier,
  onContact,
}: {
  tier: Tier;
  onContact: () => void;
}) {
  const isRecommended = !!tier.recommended;
  return (
    <article
      className={`relative isolate flex flex-col overflow-hidden rounded-[20px] p-7 lg:p-8 ${
        isRecommended
          ? "bento-frame"
          : "border border-line bg-white/[0.012] backdrop-blur-sm"
      }`}
      style={
        isRecommended
          ? {
              boxShadow: "0 0 0 1px rgba(0,229,255,0.18), 0 24px 48px rgba(0,0,0,0.3)",
            }
          : undefined
      }
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute right-6 top-6">
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-bright/40 bg-brand-bright/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-brand-bright">
            <Sparkles size={9} strokeWidth={2.5} />
            最受欢迎
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <h3 className="text-[20px] font-semibold leading-tight text-ink">
          {tier.name}
        </h3>
        <p className="mt-2 text-[13px] leading-[1.55] text-ink-muted">
          {tier.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mt-7">
        <div
          className={`text-display text-[36px] font-semibold leading-none tracking-tight md:text-[40px] ${
            tier.price === "免费"
              ? "text-accent-bright"
              : tier.price === "联系销售"
                ? "text-ink"
                : "text-ink"
          }`}
          style={
            tier.price === "免费"
              ? { textShadow: "0 0 18px rgba(0,255,102,0.35)" }
              : undefined
          }
        >
          {tier.price}
        </div>
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          {tier.priceUnit}
        </div>
      </div>

      <div className="mt-7 h-px w-full bg-line" />

      {/* Features */}
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-ink"
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className={`mt-1 shrink-0 ${
                isRecommended ? "text-brand-bright" : "text-ink-muted"
              }`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        {tier.ctaTone === "trial" ? (
          <a
            href={tier.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isRecommended
                ? "bg-white text-bg hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
                : "border border-line-strong bg-transparent text-ink hover:border-brand-bright/60 hover:text-brand-bright"
            }`}
          >
            <span>{tier.cta}</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        ) : (
          <button
            type="button"
            onClick={onContact}
            className="group inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full border border-line-strong bg-transparent text-sm font-medium text-ink transition-all duration-200 hover:border-brand-bright/60 hover:text-brand-bright"
          >
            <span>{tier.cta}</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>

      {/* Footer link to full pricing */}
      <Link
        href="/pricing"
        className="mt-4 inline-flex items-center justify-center gap-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint transition-colors hover:text-brand-bright"
      >
        完整定价对比 →
      </Link>
    </article>
  );
}
