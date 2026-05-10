"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
  Sparkles,
} from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// /pricing — full pricing detail. Same 3 tiers as the home preview but
// with full feature comparison table, annual/monthly toggle, FAQ.

type Billing = "monthly" | "annual";

type Tier = {
  id: "starter" | "team" | "enterprise";
  name: string;
  tagline: string;
  monthlyPrice: number | "free" | "custom";
  // annual savings vs 12× monthly
  annualMultiplier?: number; // e.g. 10 means 10 months for 12 (17% off)
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
    monthlyPrice: "free",
    cta: "立即试用",
    ctaTone: "trial",
    ctaHref: "https://detection.overseasradar.com",
  },
  {
    id: "team",
    name: "Team",
    tagline: "适合中型卖家与品牌方",
    monthlyPrice: 499,
    annualMultiplier: 10, // 17% off
    cta: "立即试用 14 天",
    ctaTone: "trial",
    ctaHref: "https://detection.overseasradar.com",
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "适合头部品牌与 ERP / SaaS 服务商",
    monthlyPrice: "custom",
    cta: "联系销售",
    ctaTone: "contact",
  },
];

type FeatureGroup = {
  group: string;
  features: {
    name: string;
    starter: string | boolean;
    team: string | boolean;
    enterprise: string | boolean;
  }[];
};

const FEATURE_TABLE: FeatureGroup[] = [
  {
    group: "用户与扫描",
    features: [
      { name: "用户席位", starter: "1", team: "5", enterprise: "无限" },
      {
        name: "每月扫描次数",
        starter: "100",
        team: "10K",
        enterprise: "无限",
      },
      {
        name: "API 调用",
        starter: false,
        team: "10K / 月",
        enterprise: "无限",
      },
    ],
  },
  {
    group: "雷达产品",
    features: [
      {
        name: "Detection 雷达 (检测)",
        starter: "基础版",
        team: "完整版",
        enterprise: "完整版 + 优先功能",
      },
      {
        name: "Discovery 雷达 (选品)",
        starter: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Brand 雷达 (品牌)",
        starter: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Compliance 雷达 (合规)",
        starter: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Sentiment 雷达 (舆情)",
        starter: false,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    group: "接入与集成",
    features: [
      { name: "Chrome 浏览器插件", starter: true, team: true, enterprise: true },
      { name: "RESTful API", starter: false, team: true, enterprise: true },
      { name: "Webhook", starter: false, team: true, enterprise: true },
      { name: "ERP 集成模板", starter: false, team: true, enterprise: true },
      {
        name: "私有部署",
        starter: false,
        team: false,
        enterprise: "可选",
      },
    ],
  },
  {
    group: "支持与 SLA",
    features: [
      { name: "邮件支持", starter: true, team: true, enterprise: true },
      { name: "工单 + 优先回复", starter: false, team: true, enterprise: true },
      {
        name: "专属 CSM",
        starter: false,
        team: false,
        enterprise: true,
      },
      {
        name: "SLA",
        starter: false,
        team: "99% uptime",
        enterprise: "99.97% + 7×24",
      },
      {
        name: "季度业务回顾",
        starter: false,
        team: false,
        enterprise: true,
      },
    ],
  },
  {
    group: "合规与安全",
    features: [
      {
        name: "数据驻留区",
        starter: "中国",
        team: "中国 / 新加坡",
        enterprise: "中国 / 新加坡 / 欧盟",
      },
      {
        name: "合规认证",
        starter: "GDPR · PIPL",
        team: "GDPR · PIPL · SOC 2",
        enterprise: "GDPR · PIPL · SOC 2 · ISO 27001",
      },
    ],
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "试用期间需要绑定信用卡吗?",
    a: "不需要。Starter 套餐 14 天免费试用,无任何支付信息要求。试用结束后可以选择继续免费用基础版,或升级到付费套餐。",
  },
  {
    q: "中途升级或降级套餐会怎样?",
    a: "随时可在控制台升降级。升级立即生效,差额按比例计费;降级在下个计费周期生效,余额可继续使用。",
  },
  {
    q: "Enterprise 套餐的定价是怎么计算的?",
    a: "Enterprise 按团队规模、扫描量级、SLA 要求、私有部署需求综合定价。一般起价从 ¥80,000/年起,具体以销售对接的方案书为准。",
  },
  {
    q: "5 款雷达全部上线了吗?",
    a: "Detection 雷达已 V1.0 上线;Discovery / Brand / Compliance / Sentiment 4 款雷达正在内测,Team 与 Enterprise 客户优先邀测。详细路线图见 /products。",
  },
  {
    q: "可以只买其中某几款雷达吗?",
    a: "Team 套餐起包含全部 5 款雷达,数据互通能力协同。如果只需要单款,Starter 免费版的 Detection 雷达就能解决 80% 的 IP 风险检测场景。",
  },
  {
    q: "数据会被怎样使用?",
    a: "你提交的扫描数据仅用于为你提供服务,不会出售给第三方。完整隐私政策见 /privacy,数据驻留与合规细节见 /trust。",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <>
      <PricingHero />
      <BillingToggle billing={billing} onChange={setBilling} />
      <PricingTiers billing={billing} />
      <FeatureComparison />
      <FaqSection />
      <PricingFooter />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function PricingHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-12 lg:pt-40 lg:pb-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Pricing · 透明定价
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[60px]">
            按数据用量付费,
            <br />
            不按谈判轮数付费。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
            14 天免费试用 · 无需信用卡 · 任何套餐都含 Detection 雷达
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Billing toggle ─────────────────────────────────────────────────────────
function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <section className="py-10 md:py-12">
      <Container>
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="计费周期"
            className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-white/[0.018] p-1 backdrop-blur-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => onChange("monthly")}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                billing === "monthly"
                  ? "bg-white/[0.08] text-ink"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              月付
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billing === "annual"}
              onClick={() => onChange("annual")}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                billing === "annual"
                  ? "bg-white/[0.08] text-ink"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              年付
              <span className="rounded-full bg-accent-bright/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-accent-bright">
                省 17%
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Tier cards ──────────────────────────────────────────────────────────────
function PricingTiers({ billing }: { billing: Billing }) {
  const { open: openContactSales } = useContactSales();
  return (
    <section className="border-b border-line pb-24 md:pb-32 lg:pb-40">
      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {TIERS.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              billing={billing}
              onContact={() =>
                openContactSales({ source: `pricing-page-${tier.id}` })
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TierCard({
  tier,
  billing,
  onContact,
}: {
  tier: Tier;
  billing: Billing;
  onContact: () => void;
}) {
  const isRecommended = !!tier.recommended;
  const monthlyDisplay = computeDisplayPrice(tier, billing);

  return (
    <article
      className={cn(
        "relative isolate flex flex-col overflow-hidden rounded-[20px] p-7 lg:p-8",
        isRecommended
          ? "bento-frame"
          : "border border-line bg-white/[0.012] backdrop-blur-sm",
      )}
      style={
        isRecommended
          ? {
              boxShadow:
                "0 0 0 1px rgba(0,229,255,0.18), 0 24px 48px rgba(0,0,0,0.3)",
            }
          : undefined
      }
    >
      {isRecommended && (
        <div className="absolute right-6 top-6">
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-bright/40 bg-brand-bright/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-brand-bright">
            <Sparkles size={9} strokeWidth={2.5} />
            最受欢迎
          </span>
        </div>
      )}

      <div>
        <h2 className="text-[20px] font-semibold leading-tight text-ink">
          {tier.name}
        </h2>
        <p className="mt-2 text-[13px] leading-[1.55] text-ink-muted">
          {tier.tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mt-7">
        <div className="flex items-baseline gap-2">
          <div
            className={cn(
              "text-display text-[36px] font-semibold leading-none tracking-tight md:text-[44px]",
              tier.monthlyPrice === "free"
                ? "text-accent-bright"
                : "text-ink",
            )}
            style={
              tier.monthlyPrice === "free"
                ? { textShadow: "0 0 18px rgba(0,255,102,0.35)" }
                : undefined
            }
          >
            {monthlyDisplay.amount}
          </div>
          {monthlyDisplay.unit && (
            <span className="font-mono text-[12px] text-ink-muted">
              {monthlyDisplay.unit}
            </span>
          )}
        </div>
        <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          {monthlyDisplay.subline}
        </div>
      </div>

      <div className="mt-7 h-px w-full bg-line" />

      {/* Top 5 features */}
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {topFeaturesFor(tier.id).map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-ink"
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className={cn(
                "mt-1 shrink-0",
                isRecommended ? "text-brand-bright" : "text-ink-muted",
              )}
            />
            <span>{f}</span>
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
            className={cn(
              "group inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full text-sm font-medium transition-all duration-200",
              isRecommended
                ? "bg-white text-bg hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
                : "border border-line-strong bg-transparent text-ink hover:border-brand-bright/60 hover:text-brand-bright",
            )}
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
    </article>
  );
}

function computeDisplayPrice(
  tier: Tier,
  billing: Billing,
): { amount: string; unit?: string; subline: string } {
  if (tier.monthlyPrice === "free") {
    return {
      amount: "免费",
      subline: "14 天试用 · 无需信用卡",
    };
  }
  if (tier.monthlyPrice === "custom") {
    return {
      amount: "联系销售",
      subline: "定制方案 · 含 SLA",
    };
  }
  if (billing === "monthly") {
    return {
      amount: `¥${tier.monthlyPrice}`,
      unit: "/月",
      subline: "按月付,随时取消",
    };
  }
  // annual
  const annualMonthly = tier.annualMultiplier
    ? Math.round((tier.monthlyPrice * tier.annualMultiplier) / 12)
    : tier.monthlyPrice;
  return {
    amount: `¥${annualMonthly}`,
    unit: "/月,年付",
    subline: `年付立省 17% · ¥${annualMonthly * 12}/年`,
  };
}

function topFeaturesFor(tierId: Tier["id"]): string[] {
  const map: Record<Tier["id"], string[]> = {
    starter: [
      "1 个用户席位",
      "100 次扫描 / 月",
      "Detection 雷达基础版",
      "Chrome 浏览器插件",
      "邮件支持",
    ],
    team: [
      "5 个用户席位",
      "10K 次扫描 / 月",
      "完整 5 款雷达",
      "API + Webhook + ERP 集成",
      "工单 + 优先支持 + 99% SLA",
    ],
    enterprise: [
      "无限用户与扫描",
      "完整 5 款雷达 + 优先功能",
      "API · Webhook · 私有部署可选",
      "99.97% SLA + 7×24 支持",
      "专属 CSM 与季度业务回顾",
    ],
  };
  return map[tierId];
}

// ─── Feature comparison table ───────────────────────────────────────────────
function FeatureComparison() {
  return (
    <section className="border-b border-line bg-bg-subtle/30 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Feature Comparison
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-5xl">
            完整功能对比。
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-bg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr className="border-b border-line bg-white/[0.018]">
                  <th className="sticky left-0 bg-white/[0.018] px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                    功能
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t.id}
                      className="px-5 py-4 text-left align-bottom"
                    >
                      <div
                        className={cn(
                          "text-sm font-semibold",
                          t.recommended ? "text-brand-bright" : "text-ink",
                        )}
                      >
                        {t.name}
                      </div>
                      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                        {t.recommended ? "Recommended" : "—"}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_TABLE.map((group) => (
                  <FeatureGroupRows key={group.group} group={group} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureGroupRows({ group }: { group: FeatureGroup }) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className="border-t border-line bg-white/[0.012] px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-brand-bright"
        >
          {group.group}
        </td>
      </tr>
      {group.features.map((f) => (
        <tr key={f.name} className="border-t border-line">
          <th
            scope="row"
            className="sticky left-0 bg-bg px-5 py-4 text-left text-[14px] font-medium text-ink"
          >
            {f.name}
          </th>
          <td className="px-5 py-4 align-middle">
            <FeatureValue value={f.starter} />
          </td>
          <td className="px-5 py-4 align-middle">
            <FeatureValue value={f.team} highlight />
          </td>
          <td className="px-5 py-4 align-middle">
            <FeatureValue value={f.enterprise} />
          </td>
        </tr>
      ))}
    </>
  );
}

function FeatureValue({
  value,
  highlight,
}: {
  value: string | boolean;
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <Check
        size={16}
        strokeWidth={2.5}
        className={highlight ? "text-brand-bright" : "text-ink-muted"}
      />
    );
  }
  if (value === false) {
    return <Minus size={14} strokeWidth={2} className="text-ink-faint" />;
  }
  return (
    <span
      className={cn(
        "font-mono text-[12.5px]",
        highlight ? "text-brand-bright" : "text-ink",
      )}
    >
      {value}
    </span>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
function FaqSection() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              <HelpCircle size={12} className="text-brand-bright" />
              FAQ
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              常见问题。
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-ink-muted">
              没找到你想问的?{" "}
              <a
                href="mailto:sales@overseasradar.com"
                className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand-bright hover:decoration-brand-bright/60"
              >
                直接邮件销售
              </a>
              。
            </p>
          </div>
          <dl className="space-y-8">
            {FAQ.map((item, i) => (
              <div key={i} className="border-b border-line pb-8 last:border-b-0">
                <dt className="text-[16px] font-semibold leading-tight text-ink">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-bright">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  · {item.q}
                </dt>
                <dd className="mt-3 text-[15px] leading-[1.7] text-ink-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

// ─── Footer CTA ─────────────────────────────────────────────────────────────
function PricingFooter() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="bento-frame relative overflow-hidden rounded-[24px] p-10 text-center lg:p-14">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
            <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
            Still deciding
          </p>
          <h2 className="text-display mx-auto mt-5 max-w-2xl text-[28px] font-semibold leading-[1.15] text-ink md:text-[36px]">
            不确定哪个套餐适合你?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.65] text-ink-muted">
            Detection 雷达 14 天免费试用,先用,再决定。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://detection.overseasradar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-inner-glow group inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-medium text-bg transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)]"
            >
              <span className="relative z-[2]">立即免费试用</span>
              <ArrowRight
                size={14}
                className="relative z-[2] transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
            <Link
              href="/customers"
              className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong bg-transparent px-6 text-sm font-medium text-ink transition-all duration-200 hover:border-brand-bright/60 hover:text-brand-bright"
            >
              看客户故事
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
