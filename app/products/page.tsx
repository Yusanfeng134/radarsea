import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Puzzle,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BottomCTA } from "@/components/home/bottom-cta";
import { Container } from "@/components/ui/container";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "产品 · Products",
  description:
    "出海雷达由 5 款专业雷达构成:检测、选品、品牌、合规、舆情。覆盖跨境业务从选品到舆情的全周期场景。",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsOverviewStrip />
      <ProductsDetailSections />
      <ComparisonTable />
      <BottomCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function ProductsHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(34,211,238,0.08), transparent 65%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Product Suite · 5 Radars
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[64px]">
            五款雷达,
            <br />
            守护跨境业务全周期。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
            从选品趋势识别到合规风险预警,从品牌侵权监控到全球舆情扫描——每一款雷达都是为跨境出海某一关键环节而生。
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── 5 product chip strip (anchor nav) ───────────────────────────────────────
function ProductsOverviewStrip() {
  return (
    <section className="border-b border-line bg-bg-subtle/40 py-6">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {products.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.018] px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: p.color,
                    boxShadow: `0 0 6px ${p.color}80`,
                  }}
                />
                <span>{p.name}</span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint sm:inline">
                  {p.nameEn.replace(" Radar", "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// ─── Per-product detail sections ─────────────────────────────────────────────
function ProductsDetailSections() {
  return (
    <div className="bg-bg">
      {products.map((product, i) => (
        <ProductDetailSection
          key={product.id}
          product={product}
          index={i}
          total={products.length}
        />
      ))}
    </div>
  );
}

function ProductDetailSection({
  product,
  index,
  total,
}: {
  product: (typeof products)[number];
  index: number;
  total: number;
}) {
  const isLive = product.status === "live";
  const reverse = index % 2 === 1;

  return (
    <section
      id={product.id}
      className="scroll-mt-20 border-b border-line py-20 md:py-28 lg:py-32"
    >
      <Container>
        <div
          className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span
                className={`inline-flex h-[22px] items-center rounded-[4px] px-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] ${
                  isLive
                    ? "bg-accent-bright/15 text-accent-bright"
                    : "bg-line text-ink-muted"
                }`}
              >
                {isLive ? "Live · 已上线" : "Soon · 即将上线"}
              </span>
            </div>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              {product.nameEn}
            </p>
            <h2 className="text-display mt-2 text-[36px] font-semibold leading-[1.05] text-ink md:text-[44px]">
              {product.name}
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-[1.65] text-ink-muted">
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
                    className="mt-1 shrink-0"
                    style={{ color: product.color }}
                  />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {isLive ? (
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-inner-glow group relative inline-flex h-11 items-center gap-1.5 overflow-hidden rounded-full bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
                >
                  <span className="relative z-[2]">访问 {product.name} 官网</span>
                  <ArrowUpRight
                    size={16}
                    className="relative z-[2] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                <span className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong bg-card px-6 text-sm font-medium text-ink-muted">
                  开放预约 · 联系销售优先体验
                </span>
              )}
              <Link
                href="/contact"
                className="group inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong bg-transparent px-6 text-sm font-medium text-ink transition-all hover:border-brand-bright/60 hover:text-brand-bright"
              >
                咨询方案
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Detail card with structured info */}
          <ProductDetailCard product={product} />
        </div>
      </Container>
    </section>
  );
}

function ProductDetailCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "典型场景", value: product.comparison.scenario },
    { label: "数据来源", value: product.comparison.dataSurface },
    { label: "目标用户", value: product.comparison.audience },
    {
      label: "API 接入",
      value: <BoolBadge ok={product.comparison.api} icon={Code2} />,
    },
    {
      label: "浏览器插件",
      value: <BoolBadge ok={product.comparison.plugin} icon={Puzzle} />,
    },
  ];

  return (
    <div
      className="bento-frame relative isolate overflow-hidden rounded-[24px] p-7 lg:p-8"
      style={
        {
          // Per-product accent color injected as a CSS var
          "--p-color": product.color,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -top-12 h-32 -z-[1]"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${product.color}26, transparent 70%)`,
        }}
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          Product spec
        </span>
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: product.color,
            boxShadow: `0 0 8px ${product.color}`,
          }}
          aria-hidden
        />
      </div>

      <dl className="mt-5 divide-y divide-line">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[110px_1fr] gap-4 py-3.5"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              {row.label}
            </dt>
            <dd className="text-sm leading-[1.55] text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BoolBadge({
  ok,
  icon: Icon,
}: {
  ok: boolean;
  icon: LucideIcon;
}) {
  return ok ? (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-ink">
      <Icon size={12} strokeWidth={2} className="text-brand-bright" />
      支持
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-transparent px-2 py-1 font-mono text-[11px] text-ink-faint">
      <X size={12} strokeWidth={2} />
      暂未支持
    </span>
  );
}

// ─── Comparison table ────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows: { label: string; key: keyof (typeof products)[number]["comparison"] | "status" }[] = [
    { label: "状态", key: "status" },
    { label: "典型场景", key: "scenario" },
    { label: "数据来源", key: "dataSurface" },
    { label: "目标用户", key: "audience" },
    { label: "API", key: "api" },
    { label: "浏览器插件", key: "plugin" },
  ];

  return (
    <section className="border-b border-line bg-bg-subtle/30 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Comparison
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-5xl">
            一张表看清五款雷达。
          </h2>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-bg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr className="border-b border-line bg-white/[0.018]">
                  <th className="sticky left-0 bg-white/[0.018] px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                    属性
                  </th>
                  {products.map((p) => (
                    <th
                      key={p.id}
                      className="px-5 py-4 text-left align-bottom"
                      scope="col"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: p.color,
                            boxShadow: `0 0 6px ${p.color}80`,
                          }}
                        />
                        <span className="text-sm font-semibold text-ink">
                          {p.name}
                        </span>
                      </div>
                      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                        {p.nameEn.replace(" Radar", "")}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-b-0">
                    <th
                      scope="row"
                      className="sticky left-0 bg-bg px-5 py-4 text-left font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-ink-faint"
                    >
                      {row.label}
                    </th>
                    {products.map((p) => (
                      <td key={p.id} className="px-5 py-4 align-top">
                        <ComparisonCell product={p} field={row.key} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ComparisonCell({
  product,
  field,
}: {
  product: (typeof products)[number];
  field: keyof (typeof products)[number]["comparison"] | "status";
}) {
  if (field === "status") {
    return product.status === "live" ? (
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent-bright">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
        Live
      </span>
    ) : (
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
        — 即将上线
      </span>
    );
  }
  if (field === "api" || field === "plugin") {
    const ok = product.comparison[field];
    return ok ? (
      <Check
        size={14}
        strokeWidth={2.5}
        className="text-brand-bright"
        aria-label="支持"
      />
    ) : (
      <X size={14} strokeWidth={2} className="text-ink-faint" aria-label="不支持" />
    );
  }
  return (
    <span className="text-[13px] leading-[1.55] text-ink-muted">
      {product.comparison[field]}
    </span>
  );
}

