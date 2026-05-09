import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Database,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BottomCTA } from "@/components/home/bottom-cta";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于 · About",
  description:
    "出海雷达是面向跨境企业的全球市场情报与风险预警平台,从 2023 年至今,我们用数据底座为 1,000+ 出海品牌提供雷达式预警。",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutCTA />
      <BottomCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(34,211,238,0.10), transparent 70%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            About {site.nameEn}
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[64px]">
            为跨境而生,
            <br />
            <span className="bg-gradient-to-r from-brand-bright to-accent-bright bg-clip-text text-transparent">
              为风险预警而建。
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.7] text-ink-muted">
            我们相信:跨境业务的每一次决策都值得被数据支撑、每一次风险都应该被提前看见。出海雷达把全球公开数据、平台数据与 AI 推理整合成五款专业雷达,让出海企业像看雷达一样,看清全球市场。
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
const ABOUT_STATS = [
  { value: "2023", label: "公司成立" },
  { value: "1,000+", label: "服务的跨境企业" },
  { value: "156", label: "覆盖国家与地区" },
  { value: "1 亿+", label: "知识产权数据条目" },
];

function AboutStats() {
  return (
    <section className="border-b border-line py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-4">
          {ABOUT_STATS.map((s, i) => (
            <div
              key={s.label}
              className="bg-bg p-8 text-center md:p-10 lg:p-12"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                {String(i + 1).padStart(2, "0")} / {String(ABOUT_STATS.length).padStart(2, "0")}
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

// ─── Story ───────────────────────────────────────────────────────────────────
function AboutStory() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              Our Story
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              我们为什么存在。
            </h2>
          </div>
          <div className="space-y-6 text-[17px] leading-[1.8] text-ink-muted">
            <p>
              <span className="text-ink">2022 年</span>,我们看到一家年 GMV 过亿的 3C 跨境品牌,因为一款上架前没人发现的外观专利侵权,全店铺被亚马逊在 24 小时内下架。三天后,它的所有备货被冻结、180 万美金的旺季销量化为乌有。
            </p>
            <p>
              这不是孤例。在我们调研的 200+ 出海品牌里,
              <span className="text-ink">每 3 家中就有 1 家</span>
              曾因侵权、合规或舆情风险遭遇过类似的「黑天鹅」。这些风险事前都有信号,但没人在看。
            </p>
            <p>
              出海雷达就是为了「让信号被看见」而建。从 2023 年成立至今,我们用专门为跨境业务设计的数据底座、AI 推理和五款专业雷达,为
              <span className="text-ink"> 1,000+ 跨境品牌</span>
              提供持续的风险与机会预警。
            </p>
            <p>
              我们的目标很简单:
              <span className="text-ink">把每一个跨境业务的「事后」 ,前置成「事前」</span>。
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Values ──────────────────────────────────────────────────────────────────
type Value = {
  icon: LucideIcon;
  title: string;
  englishTitle: string;
  description: string;
};

const VALUES: Value[] = [
  {
    icon: Database,
    title: "数据是底座,不是装饰",
    englishTitle: "Data as foundation",
    description:
      "我们投入 80% 的工程资源在数据底座的建设上 — 1 亿+ IP 记录、500+ 平台、24/7 实时监测,只为让每一个雷达信号都可信。",
  },
  {
    icon: Sparkles,
    title: "用 AI 解释,而不是堆砌",
    englishTitle: "AI as interpreter",
    description:
      "我们不展示原始数据,而是让 AI 告诉你「这意味着什么、下一步该怎么做」。降低专业门槛,让每个人都能用雷达。",
  },
  {
    icon: ShieldCheck,
    title: "克制比花哨更难",
    englishTitle: "Restraint is hard",
    description:
      "我们刻意保持产品克制 —— 拒绝噱头,拒绝花哨,只展示真正能改变决策的信号。在信息过载的时代,克制是奢侈品。",
  },
  {
    icon: Layers,
    title: "做长跑,不做爆款",
    englishTitle: "Built to last",
    description:
      "我们相信跨境业务是 10 年起步的长跑。我们的产品也按 10 年周期来打磨 —— 不追热点、不抢风口,只解决真问题。",
  },
];

function AboutValues() {
  return (
    <section className="border-b border-line bg-bg-subtle/40 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Values · 我们的原则
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[48px]">
            四件我们坚持的事。
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <article
              key={v.title}
              className="group relative flex flex-col rounded-2xl border border-line bg-bg p-7 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line-strong bg-white/[0.04]">
                  <v.icon size={18} strokeWidth={1.5} className="text-brand-bright" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  {String(i + 1).padStart(2, "0")} / {String(VALUES.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                {v.englishTitle}
              </p>
              <h3 className="mt-1.5 text-xl font-semibold leading-tight text-ink">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.65] text-ink-muted">
                {v.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────
const MILESTONES = [
  {
    year: "2023",
    quarter: "Q1",
    title: "出海雷达成立",
    description:
      "在杭州创立,首支团队来自跨境电商、合规法务与数据工程领域。",
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "检测雷达 V1.0 发布",
    description:
      "完成 USCO / USPTO / EUIPO 三大政府数据库接入,IP 检测覆盖 156 国家。",
  },
  {
    year: "2024",
    quarter: "Q2",
    title: "Chrome 浏览器插件上线",
    description: "把雷达能力带到选品现场 — 每一次浏览即一次实时风险扫描。",
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "API 开放与生态合作",
    description:
      "开放企业级 RESTful API,首批 12 家头部跨境 ERP / SaaS 接入。",
  },
  {
    year: "2026",
    quarter: "Q1",
    title: "选品 / 合规 / 品牌 / 舆情雷达",
    description: "完整产品矩阵进入公测阶段,五款雷达数据互通、能力协同。",
  },
];

function AboutTimeline() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              Milestones
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              一路走来。
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-ink-muted">
              从一个 3 人小团队到为 1,000+ 跨境品牌提供数据底座,我们走过了三年。
            </p>
          </div>
          <ol className="relative space-y-10 border-l border-line pl-8">
            {MILESTONES.map((m, i) => (
              <li key={`${m.year}-${m.quarter}-${i}`} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[37px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-line-strong bg-bg"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === MILESTONES.length - 1
                        ? "bg-brand-bright shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                        : "bg-line-strong"
                    }`}
                  />
                </span>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                  {m.year} · {m.quarter}
                </div>
                <h3 className="mt-1.5 text-lg font-semibold leading-tight text-ink">
                  {m.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-[1.65] text-ink-muted">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

// ─── In-page CTA ─────────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section className="border-b border-line py-20 md:py-24">
      <Container>
        <div className="bento-frame relative isolate overflow-hidden rounded-[24px] p-10 lg:p-14">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
                <Compass size={12} className="text-brand-bright" />
                Join us
              </p>
              <h2 className="text-display mt-5 text-[28px] font-semibold leading-[1.15] text-ink md:text-[32px]">
                想和我们一起,把出海风险前置?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-[1.65] text-ink-muted">
                我们正在招募工程师、产品经理与跨境合规专家。在出海雷达,每个人都参与决定产品的方向。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/careers"
                className="cta-inner-glow group inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
              >
                <span className="relative z-[2]">查看在招职位</span>
                <ArrowRight
                  size={14}
                  className="relative z-[2] transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-transparent px-6 text-sm font-medium text-ink transition-all hover:border-brand-bright/60 hover:text-brand-bright"
              >
                <Globe size={14} />
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
