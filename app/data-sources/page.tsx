import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, Globe } from "lucide-react";

import { BottomCTA } from "@/components/home/bottom-cta";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "数据底座 · Data Sources",
  description:
    "出海雷达数据底座 · 1 亿+ IP 数据 / 500+ 跨境平台 / 156 国家覆盖 / 240ms 实时刷新 · USPTO / EUIPO / CNIPA 等政府数据库直连。",
};

export default function DataSourcesPage() {
  return (
    <>
      <DataSourcesHero />
      <KeyStats />
      <GovernmentDatabases />
      <PlatformSources />
      <CoverageMap />
      <ResidencyAndCompliance />
      <BottomCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function DataSourcesHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(0,229,255,0.08), transparent 70%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Data Foundation · 数据底座
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[64px]">
            我们的数据是真的,
            <br />
            而且能被验证。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
            直接对接政府主管部门数据库 + 500+ 跨境平台实时抓取 ·
            **不依赖二手转售**。每一条都标注出处,每一次刷新都有时间戳。
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Key stats grid ─────────────────────────────────────────────────────────
function KeyStats() {
  const STATS = [
    { value: "1 亿+", label: "知识产权数据条目" },
    { value: "500+", label: "跨境平台数据源" },
    { value: "156", label: "覆盖国家与地区" },
    { value: "240ms", label: "实时数据刷新延迟" },
  ];
  return (
    <section className="border-b border-line py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="bg-bg p-8 text-center md:p-10 lg:p-12">
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

// ─── Government databases ───────────────────────────────────────────────────
type GovDatabase = {
  abbr: string;
  name: string;
  region: string;
  records: string;
  syncCadence: string;
  lastSync: string;
};

const GOV_DATABASES: GovDatabase[] = [
  {
    abbr: "USPTO",
    name: "United States Patent and Trademark Office",
    region: "美国",
    records: "6.1M",
    syncCadence: "60s",
    lastSync: "2 分钟前",
  },
  {
    abbr: "EUIPO",
    name: "European Union Intellectual Property Office",
    region: "欧盟 27 国",
    records: "4.8M",
    syncCadence: "60s",
    lastSync: "1 分钟前",
  },
  {
    abbr: "CNIPA",
    name: "中国国家知识产权局",
    region: "中国",
    records: "12.3M",
    syncCadence: "240s",
    lastSync: "3 分钟前",
  },
  {
    abbr: "JPO",
    name: "Japan Patent Office",
    region: "日本",
    records: "2.4M",
    syncCadence: "1h",
    lastSync: "27 分钟前",
  },
  {
    abbr: "KIPO",
    name: "Korean Intellectual Property Office",
    region: "韩国",
    records: "1.8M",
    syncCadence: "1h",
    lastSync: "42 分钟前",
  },
  {
    abbr: "WIPO Madrid",
    name: "World Intellectual Property Organization · Madrid System",
    region: "全球 130+ 成员国",
    records: "0.8M",
    syncCadence: "24h",
    lastSync: "8 小时前",
  },
  {
    abbr: "USCO",
    name: "United States Copyright Office",
    region: "美国",
    records: "2.4M",
    syncCadence: "24h",
    lastSync: "11 小时前",
  },
  {
    abbr: "UKIPO",
    name: "UK Intellectual Property Office",
    region: "英国",
    records: "1.2M",
    syncCadence: "1h",
    lastSync: "18 分钟前",
  },
  {
    abbr: "DPMA",
    name: "Deutsches Patent- und Markenamt",
    region: "德国",
    records: "1.6M",
    syncCadence: "1h",
    lastSync: "12 分钟前",
  },
  {
    abbr: "INPI",
    name: "Institut National de la Propriété Industrielle",
    region: "法国",
    records: "1.1M",
    syncCadence: "1h",
    lastSync: "33 分钟前",
  },
];

function GovernmentDatabases() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              <Database size={12} className="text-brand-bright" />
              Government Databases
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              政府数据库
              <br />
              全量直连。
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-ink-muted">
              主流出海市场的 IP 主管部门数据 — 由我们直接对接,不依赖二手转售。每条记录附原始出处与最近一次同步时间戳。
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-bg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-line bg-white/[0.018]">
                    <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      数据库
                    </th>
                    <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      地区
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      记录数
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      刷新
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      最近同步
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GOV_DATABASES.map((db, i) => (
                    <tr
                      key={db.abbr}
                      className={
                        i === GOV_DATABASES.length - 1
                          ? ""
                          : "border-b border-line"
                      }
                    >
                      <td className="px-5 py-4 align-top">
                        <div className="font-mono text-[12.5px] font-semibold text-brand-bright">
                          {db.abbr}
                        </div>
                        <div className="mt-1 text-[11px] leading-[1.4] text-ink-faint">
                          {db.name}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[13px] text-ink-muted">
                        {db.region}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[14px] font-semibold text-ink tabular-nums">
                        {db.records}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[12px] text-ink-muted">
                        {db.syncCadence}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent-bright">
                          <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_4px_rgba(0,255,102,0.7)]" />
                          {db.lastSync}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-line bg-white/[0.012] px-5 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                ↑ 主要 10 个 · 完整 {GOV_DATABASES.length}+ 数据库清单见{" "}
                <span className="text-brand-bright">下载数据词典 PDF</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Platform sources ───────────────────────────────────────────────────────
const PLATFORM_GROUPS: { group: string; items: string[] }[] = [
  {
    group: "综合电商平台",
    items: [
      "Amazon",
      "eBay",
      "AliExpress",
      "Walmart",
      "Mercado Libre",
      "Coupang",
      "Rakuten",
      "Shopee",
      "Lazada",
      "Tokopedia",
      "Allegro",
      "Cdiscount",
    ],
  },
  {
    group: "短视频与社媒",
    items: [
      "TikTok Shop",
      "Instagram Shopping",
      "Facebook Marketplace",
      "YouTube Shopping",
      "Pinterest",
      "X (Twitter)",
      "Snapchat",
    ],
  },
  {
    group: "独立站与 DTC",
    items: [
      "Shopify",
      "BigCommerce",
      "WooCommerce",
      "Magento",
      "Squarespace",
      "Wix",
    ],
  },
  {
    group: "海外仓 / 物流",
    items: [
      "Amazon FBA",
      "ShipBob",
      "ShipStation",
      "FedEx",
      "DHL",
      "UPS",
    ],
  },
  {
    group: "本地化与小语种",
    items: [
      "Otto (DE)",
      "Bol.com (NL)",
      "Cdiscount (FR)",
      "Trendyol (TR)",
      "Noon (UAE)",
      "Jumia (Africa)",
    ],
  },
];

function PlatformSources() {
  const total = PLATFORM_GROUPS.reduce((acc, g) => acc + g.items.length, 0);
  return (
    <section className="border-b border-line bg-bg-subtle/30 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Platform Sources · 跨境平台
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-[52px]">
            500+ 平台,
            <br />
            头部 + 长尾 全覆盖。
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-ink-muted md:text-lg">
            不只盯着头部 5-10 个平台 — 长尾市场往往是机会洼地与风险源头。
          </p>
        </div>

        <div className="mt-14 space-y-10">
          {PLATFORM_GROUPS.map((g) => (
            <div key={g.group}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-bright">
                {g.group} · {g.items.length}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-white/[0.018] px-3 py-1.5 text-[13px] text-ink-muted transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.04] hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
          上面是头部 {total} 个 · 完整 500+ 平台清单与各自刷新频率见{" "}
          <span className="text-brand-bright">下载数据词典 PDF</span>
        </p>
      </Container>
    </section>
  );
}

// ─── Coverage map ───────────────────────────────────────────────────────────
function CoverageMap() {
  return (
    <section
      id="coverage"
      className="scroll-mt-20 border-b border-line py-24 md:py-32 lg:py-40"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              <Globe size={12} className="text-brand-bright" />
              Coverage · 覆盖
            </p>
            <h2 className="text-display mt-5 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px]">
              156 个国家,
              <br />
              三级覆盖深度。
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.65] text-ink-muted">
              不同市场有不同的数据可获得性 — 我们清晰标注每个国家的覆盖深度,从全量监测到信号采集,绝不模糊承诺。
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
                <div>
                  <div className="text-[15px] font-medium text-ink">
                    全量监测 · 78 个国家
                  </div>
                  <div className="mt-1 text-[13px] leading-[1.55] text-ink-muted">
                    政府数据库直连 + 平台数据 + 实时刷新 — 美 / 欧 / 日韩 / 东南亚等核心出海市场
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
                <div>
                  <div className="text-[15px] font-medium text-ink">
                    部分覆盖 · 52 个国家
                  </div>
                  <div className="mt-1 text-[13px] leading-[1.55] text-ink-muted">
                    平台数据 + 公开 IP 注册库 — 拉美、中东、非洲新兴市场
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-line-strong" />
                <div>
                  <div className="text-[15px] font-medium text-ink">
                    信号采集 · 26 个国家
                  </div>
                  <div className="mt-1 text-[13px] leading-[1.55] text-ink-muted">
                    舆情与社媒数据 + 爆款信号 — 长尾市场,数据更新较慢
                  </div>
                </div>
              </li>
            </ul>

            <Link
              href="/coverage"
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand-bright"
            >
              查看交互式覆盖地图
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Visual placeholder — abstract dot map */}
          <div className="bento-frame relative aspect-[5/3] overflow-hidden rounded-[20px]">
            <DotWorldMap />
          </div>
        </div>
      </Container>
    </section>
  );
}

// Static abstract continent dot field — same family as AboutTeaser's
// Geo-Data Matrix but server-rendered (no parallax / no interaction).
function DotWorldMap() {
  const VB = { w: 600, h: 360 };
  const REGIONS = [
    { x0: 60, x1: 215, y0: 58, y1: 178, density: 0.55 },
    { x0: 145, x1: 235, y0: 188, y1: 320, density: 0.5 },
    { x0: 245, x1: 350, y0: 50, y1: 195, density: 0.55 },
    { x0: 285, x1: 380, y0: 150, y1: 300, density: 0.5 },
    { x0: 350, x1: 540, y0: 50, y1: 205, density: 0.55 },
    { x0: 500, x1: 580, y0: 230, y1: 320, density: 0.5 },
  ];
  const DOT_CELL = 8;
  const dots: { cx: number; cy: number }[] = [];
  const cols = Math.floor(VB.w / DOT_CELL);
  const rows = Math.floor(VB.h / DOT_CELL);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * DOT_CELL + DOT_CELL / 2;
      const cy = r * DOT_CELL + DOT_CELL / 2;
      let density = 0;
      for (const region of REGIONS) {
        if (
          cx >= region.x0 &&
          cx <= region.x1 &&
          cy >= region.y0 &&
          cy <= region.y1
        ) {
          density = Math.max(density, region.density);
        }
      }
      if (density === 0) continue;
      const n = Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453);
      const v = n - Math.floor(n);
      if (v < density) dots.push({ cx, cy });
    }
  }

  // Hot nodes (full coverage = green) + secondary nodes (partial = cyan)
  const NODES = [
    { x: 135, y: 110, tone: "green" },
    { x: 285, y: 90, tone: "green" },
    { x: 510, y: 125, tone: "green" },
    { x: 470, y: 200, tone: "green" },
    { x: 195, y: 285, tone: "cyan" },
    { x: 320, y: 240, tone: "cyan" },
    { x: 540, y: 270, tone: "cyan" },
  ];

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r="0.8"
          fill="rgba(255,255,255,0.10)"
        />
      ))}
      {NODES.map((n, i) => {
        const color = n.tone === "green" ? "#00FF66" : "#00E5FF";
        const glow =
          n.tone === "green"
            ? "rgba(0,255,102,0.6)"
            : "rgba(0,229,255,0.6)";
        return (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="6"
              fill={`${color}33`}
            />
            <circle cx={n.x} cy={n.y} r="2.5" fill={color}>
              <animate
                attributeName="opacity"
                values="1;0.4;1"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={n.x}
              cy={n.y}
              r="2.5"
              fill="none"
              stroke={color}
              strokeWidth="0.4"
              opacity="0.5"
              style={{ filter: `drop-shadow(0 0 4px ${glow})` }}
            >
              <animate
                attributeName="r"
                values="2.5;10;2.5"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Data residency + compliance ────────────────────────────────────────────
function ResidencyAndCompliance() {
  const ITEMS = [
    { label: "数据驻留区", value: "中国 / 新加坡 / 欧盟 三选" },
    { label: "GDPR", value: "✓ 全量符合" },
    { label: "PIPL", value: "✓ 全量符合" },
    { label: "SOC 2 Type II", value: "✓ 已认证" },
    { label: "ISO 27001", value: "✓ 已认证" },
    { label: "传输加密", value: "TLS 1.3" },
    { label: "静态加密", value: "AES-256" },
    { label: "审计日志保留", value: "7 年" },
  ];
  return (
    <section className="border-b border-line bg-bg-subtle/30 py-20 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
            Residency · Compliance
          </p>
          <h2 className="text-display mt-5 text-[28px] font-semibold leading-tight text-ink md:text-[32px]">
            数据驻留与合规。
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
          {ITEMS.map((it) => (
            <div
              key={it.label}
              className="bg-bg p-5 text-center"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                {it.label}
              </div>
              <div className="mt-3 font-mono text-[13px] text-ink">
                {it.value}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
          完整安全架构与子处理者清单见{" "}
          <Link
            href="/trust"
            className="text-brand-bright underline decoration-brand-bright/40 underline-offset-4 transition-colors hover:decoration-brand-bright"
          >
            /trust 信任中心 →
          </Link>
        </p>
      </Container>
    </section>
  );
}
