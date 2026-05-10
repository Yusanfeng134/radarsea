import {
  Building2,
  Code2,
  Database,
  Layers,
  Scale,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { Product } from "@/lib/products";

// ---------- Value props ----------

export type ValueProp = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const valueProps: ValueProp[] = [
  {
    id: "data-driven",
    icon: Database,
    title: "数据驱动的决策",
    description:
      "整合全球公开数据、平台数据、第三方授权数据,让每一个跨境决策都有数据支撑。",
  },
  {
    id: "ai-augmented",
    icon: Sparkles,
    title: "AI 赋能的洞察",
    description:
      "不只给数据,还用 AI 解释「这意味着什么」「下一步该怎么做」,降低专业门槛。",
  },
  {
    id: "connected-suite",
    icon: Layers,
    title: "完整的产品矩阵",
    description:
      "五款雷达数据互通、能力协同、统一账号体系,跨境业务的全周期都在一个生态。",
  },
];

// ---------- Solutions preview ----------

export type Solution = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  radars: Product["id"][];
};

export const solutions: Solution[] = [
  {
    id: "sellers",
    icon: Building2,
    title: "跨境卖家",
    description: "独立站、品牌方、平台卖家的全维度风险与机会管理。",
    radars: ["detection", "discovery", "brand"],
  },
  {
    id: "sourcing",
    icon: Search,
    title: "选品团队",
    description: "从趋势发现到风险筛查,选品决策更快更稳。",
    radars: ["discovery", "detection"],
  },
  {
    id: "compliance",
    icon: Scale,
    title: "合规与法务",
    description: "法规变化、商标监控、侵权预警的统一工作台。",
    radars: ["compliance", "detection", "brand"],
  },
  {
    id: "erp",
    icon: Code2,
    title: "ERP / SaaS 服务商",
    description: "通过 API 把雷达能力嵌入你的系统。",
    radars: ["detection", "discovery", "brand", "compliance", "sentiment"],
  },
];

// ---------- Insights preview ----------

export type InsightPreview = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
};

export const insightsPreview: InsightPreview[] = [
  {
    id: "ip-2026-report",
    category: "行业报告",
    title: "2026 年跨境电商知识产权风险趋势报告",
    excerpt:
      "我们分析了 2026 年 1 万起跨境侵权案例,发现外观专利投诉占比首次超过商标——背后的市场结构变化值得每个出海品牌注意。",
    date: "2026-04-22",
    readTime: "12 分钟",
    href: "/insights/ip-2026-report",
  },
  {
    id: "tiktok-shop-2026",
    category: "趋势观察",
    title: "TikTok Shop 新规解读:卖家必须知道的 7 个变化",
    excerpt:
      "从店铺资质到内容合规,TikTok 在 2026 Q2 一次性更新了 7 项核心规则,我们逐条拆解对中小卖家的实际影响。",
    date: "2026-04-15",
    readTime: "8 分钟",
    href: "/insights/tiktok-shop-2026",
  },
  {
    id: "3c-zero-takedown",
    category: "客户故事",
    title: "3C 配件品牌如何用检测雷达 6 个月零侵权下架",
    excerpt:
      "一家年 GMV 过亿的 3C 配件出海品牌,在接入检测雷达后实现了 6 个月内 0 侵权下架记录,这是他们的工作流。",
    date: "2026-03-28",
    readTime: "6 分钟",
    href: "/insights/3c-zero-takedown",
  },
];

// ---------- Data foundation stats ----------

export type DataStat = {
  id: string;
  value: string;
  label: string;
};

export const dataStats: DataStat[] = [
  { id: "ip", value: "1 亿+", label: "USPTO · EUIPO · CNIPA 全量 IP 数据" },
  { id: "platforms", value: "500+", label: "TikTok · Amazon · Shopee 等跨境平台" },
  { id: "realtime", value: "240ms", label: "实时数据刷新延迟" },
  { id: "companies", value: "1,000+", label: "出海品牌已接入" },
];

// ---------- Trust bar brands ----------
// Each brand is rendered as a styled wordmark to mimic that brand's actual
// type treatment. To swap in a real SVG/PNG mark, replace the rendered span
// in components/home/trust-bar.tsx with an <Image> or inline SVG.

export type TrustBrand = {
  name: string;
  /** Tailwind classes that approximate each brand's wordmark style */
  className: string;
};

export const trustBrands: TrustBrand[] = [
  { name: "Anker", className: "font-bold tracking-tight" },
  { name: "SHEIN", className: "font-light italic tracking-[0.18em]" },
  { name: "Temu", className: "font-extrabold tracking-tight" },
  { name: "Insta360", className: "font-medium tracking-[0.01em]" },
  { name: "DJI", className: "font-black tracking-[0.22em]" },
  { name: "Xiaomi", className: "font-medium" },
  { name: "Roborock", className: "font-semibold tracking-tight" },
  { name: "EcoFlow", className: "font-bold" },
  { name: "UGREEN", className: "font-medium tracking-[0.18em]" },
  { name: "Halara", className: "font-light italic tracking-tight" },
  { name: "CIDER", className: "font-light tracking-[0.32em]" },
  { name: "Govee", className: "font-semibold tracking-[0.04em]" },
];
