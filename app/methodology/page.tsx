import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  Microscope,
  Scale,
  Sigma,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BottomCTA } from "@/components/home/bottom-cta";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "方法论 · Methodology",
  description:
    "出海雷达 AI 评分如何工作 · 模型准确率 · 我们在哪里还会判错。AI 不是说出来的,是论证出来的。",
};

export default function MethodologyPage() {
  return (
    <>
      <MethodologyHero />
      <ScoringPrinciples />
      <ModelBenchmarks />
      <Calibration />
      <BiasMitigation />
      <BottomCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function MethodologyHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Methodology · 方法论
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[60px]">
            AI 不是说出来的,
            <br />
            是论证出来的。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
            我们的每一个风险评分、每一个趋势预测都有可解释的算法路径 —
            模型准确率、训练数据、判错场景全部公开。
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Scoring principles · per-radar explanation ─────────────────────────────
type Principle = {
  icon: LucideIcon;
  product: string;
  englishName: string;
  scoringTitle: string;
  description: string;
  inputs: string[];
};

const PRINCIPLES: Principle[] = [
  {
    icon: Microscope,
    product: "检测雷达",
    englishName: "Detection",
    scoringTitle: "三类 IP 风险综合评分",
    description:
      "每个 SKU 对照 USPTO + EUIPO + CNIPA 等 18 个 IP 数据库做向量化匹配,综合版权 / 商标 / 外观专利三类风险输出 0-100 分综合分。",
    inputs: [
      "图片相似度(感知哈希 + 视觉 transformer)",
      "文本相似度(BERT 中英双语向量)",
      "类目一致性(SPS 国际分类)",
      "权利人活跃度(近 24 个月维权记录)",
    ],
  },
  {
    icon: Sigma,
    product: "选品雷达",
    englishName: "Discovery",
    scoringTitle: "趋势速率 + 利润潜力",
    description:
      "结合 TikTok / Amazon / Shopee 三大数据源做时间序列预测,7 天 / 30 天 / 90 天三档窗口分别建模,综合销量速度 + 评论增速 + 价格弹性输出爆款概率。",
    inputs: [
      "销量速度(滚动差分序列)",
      "评论增速 + 情感梯度",
      "价格弹性(竞品矩阵 cross-elasticity)",
      "搜索量 / 点击率(GA4 + 平台后台)",
    ],
  },
  {
    icon: Scale,
    product: "合规雷达",
    englishName: "Compliance",
    scoringTitle: "法规变化影响度",
    description:
      "实时追踪 50+ 跨境平台规则与 30+ 国家监管法规,新规出台后 4 小时内对你 SKU 库自动跑一次影响评估,标注哪些 SKU 需要修改、哪些可继续在售。",
    inputs: [
      "法规文本语义解析(LLM + 规则引擎)",
      "类目映射(法规 ↔ HS Code ↔ 平台分类)",
      "在售 SKU 属性匹配",
      "整改建议优先级(基于商业影响)",
    ],
  },
];

function ScoringPrinciples() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Scoring · 评分原理
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px]">
            每一个评分都可被解释。
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-ink-muted md:text-lg">
            每款雷达的评分逻辑都对客户开放 — 你可以追溯任何一条预警是怎么算出来的。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <article
              key={p.product}
              className="bento-frame relative isolate flex flex-col overflow-hidden rounded-[18px] p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line-strong bg-white/[0.04]">
                  <p.icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-brand-bright"
                  />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                  {p.englishName}
                </span>
              </div>
              <h3 className="mt-6 text-[18px] font-semibold leading-tight text-ink">
                {p.product} · {p.scoringTitle}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.65] text-ink-muted">
                {p.description}
              </p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                  关键输入特征
                </p>
                <ul className="mt-3 space-y-2">
                  {p.inputs.map((input) => (
                    <li
                      key={input}
                      className="flex items-start gap-2 text-[12.5px] leading-[1.55] text-ink-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-bright" />
                      <span>{input}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Model benchmarks ────────────────────────────────────────────────────────
function ModelBenchmarks() {
  const ROWS = [
    {
      product: "Detection · IP 风险检测",
      precision: "96.4%",
      recall: "91.2%",
      sampleSize: "10,247",
      lastEval: "2025-12-18",
    },
    {
      product: "Discovery · 7 天爆款命中",
      precision: "82.1%",
      recall: "76.8%",
      sampleSize: "5,180",
      lastEval: "2025-12-12",
    },
    {
      product: "Discovery · 30 天爆款命中",
      precision: "88.7%",
      recall: "84.3%",
      sampleSize: "5,180",
      lastEval: "2025-12-12",
    },
    {
      product: "Compliance · 法规影响判定",
      precision: "94.5%",
      recall: "89.1%",
      sampleSize: "3,460",
      lastEval: "2025-11-28",
    },
  ];
  return (
    <section className="border-b border-line bg-bg-subtle/30 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              <Sigma size={12} className="text-brand-bright" />
              Benchmarks
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              模型准确率
              <br />
              全部公开。
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-ink-muted">
              所有数字基于人工标注的盲测样本。模型每季度重新评估,benchmarks 每月更新。
            </p>
            <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
              Last update · 2025-12-18
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-bg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-line bg-white/[0.018]">
                    <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      模型 / 任务
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      Precision
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      Recall
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      样本量
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      最近评估
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, i) => (
                    <tr
                      key={row.product}
                      className={
                        i === ROWS.length - 1 ? "" : "border-b border-line"
                      }
                    >
                      <td className="px-5 py-4 text-[13px] font-medium text-ink">
                        {row.product}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[14px] font-semibold text-brand-bright tabular-nums">
                        {row.precision}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[14px] font-semibold text-accent-bright tabular-nums">
                        {row.recall}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[12.5px] text-ink-muted tabular-nums">
                        {row.sampleSize}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-[11.5px] text-ink-faint">
                        {row.lastEval}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Where we get it wrong ──────────────────────────────────────────────────
function Calibration() {
  const CASES = [
    {
      title: "外观专利的「颜色变体」",
      description:
        "同一外观专利的「颜色或表面纹理」变体,我们的视觉相似度算法可能给出过高分数。建议人工复核 0.85+ 区间。",
    },
    {
      title: "TikTok 区域性爆款的早期信号",
      description:
        "新兴市场(中东、拉美)的爆款数据稀疏,7 天窗口模型在这些地区表现较弱。建议用 30 天窗口。",
    },
    {
      title: "中文商标 vs 英文商标的多语种映射",
      description:
        "中文商标对应的英文翻译可能存在多义,语义匹配模型在某些专业类目(医疗 / 化工)精度仅约 78%。",
    },
    {
      title: "新规生效后 24h 内的合规判定",
      description:
        "新法规刚发布时,我们 LLM 解析可能不准确,会有 4-8 小时缓冲期由人工合规师复核。期间评分标注为「待复核」。",
    },
  ];
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <AlertTriangle size={12} className="text-accent-bright" />
            Honest Calibration · 我们的局限
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px]">
            我们在哪里还会判错。
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-ink-muted md:text-lg">
            激进透明 — 我们公开模型当前还做不好的场景。诚实比假装完美更值得信任。
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-line bg-white/[0.012] p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-accent-bright"
                />
                <div>
                  <h3 className="text-[15px] font-semibold leading-tight text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-ink-muted">
                    {c.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Bias mitigation ────────────────────────────────────────────────────────
function BiasMitigation() {
  return (
    <section className="border-b border-line bg-bg-subtle/30 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <Scale size={12} className="text-brand-bright" />
            Bias Mitigation · 偏见缓解
          </p>
          <h2 className="text-display mt-6 text-[28px] font-semibold leading-[1.2] text-ink md:text-[34px]">
            数据集采样,
            <br />
            会刻意覆盖不同地区与语言。
          </h2>

          <div className="mt-10 space-y-6 text-[15px] leading-[1.8] text-ink-muted">
            <p>
              <span className="text-ink">语言覆盖:</span>
              我们的 NLP 模型在中 / 英 / 日 / 韩 / 西班牙 / 阿拉伯 6 种语言上单独训练评估,不是英文模型直接翻译。
            </p>
            <p>
              <span className="text-ink">地区覆盖:</span>
              训练数据每季度按 156 个目标市场的真实交易量加权重采样,避免模型过拟合到美 / 欧高频市场。
            </p>
            <p>
              <span className="text-ink">类目覆盖:</span>
              避免某些热门类目(3C / 服饰)在训练集中过度代表。冷门类目(B2B 工业品 / 宠物 / 户外)单独保留 1,000+ 标注样本做验证。
            </p>
            <p>
              <span className="text-ink">人工复核:</span>
              所有 0.85+ 高风险预警在送达客户前都经过 IP 律师人工复核 — 模型只做预筛,不做最终判定。
            </p>
          </div>

          <Link
            href="/data-sources"
            className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand-bright"
          >
            数据来源与覆盖详情
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
