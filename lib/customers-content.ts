import type { Product } from "@/lib/products";

export type CustomerCase = {
  id: string;
  industryTag: string;
  scaleTag: string;
  /** Big-number outcome shown on the card and case header */
  metric: string;
  metricLabel: string;
  metricTone: "green" | "cyan";
  quote: string;
  attribution: string;
  productsUsed: Product["id"][];
  /** Long-form fields shown on the full case page (optional). */
  challenge?: string[];
  solution?: string[];
  results?: { label: string; value: string }[];
  /** Featured case appears in the hero strip on /customers */
  featured?: boolean;
  href: string;
};

export const customerCases: CustomerCase[] = [
  {
    id: "3c-zero-takedown",
    industryTag: "3C 配件出海",
    scaleTag: "年 GMV ¥1.2 亿",
    metric: "↓ 96%",
    metricLabel: "侵权下架率降幅",
    metricTone: "green",
    quote:
      "我们再也不用 8 个人专门做人工巡检 SKU 了 — 他们现在做更值钱的事。",
    attribution: "IP 团队负责人",
    productsUsed: ["detection"],
    challenge: [
      "上架后才发现侵权,平均每月被亚马逊下架 30+ SKU",
      "每月维权诉讼成本超过 ¥40 万",
      "8 个人 IP / 法务团队仍跟不上新 SKU 上架速度",
    ],
    solution: [
      "上架前通过 Detection 雷达批量扫描 — 12 秒内拿到三类 IP 风险报告",
      "Chrome 插件嵌入选品工作流 — 选品代理在 Amazon 浏览页实时检测",
      "RESTful API 对接公司 ERP — 新品自动闸门,人不用看",
    ],
    results: [
      { label: "侵权下架率", value: "28% → 1.1%" },
      { label: "IP 团队人力", value: "8 人 → 2 人 + 雷达" },
      { label: "维权诉讼成本", value: "¥40 万/月 → ¥4 万/月" },
      { label: "新品上架速度", value: "提升 4×" },
    ],
    featured: true,
    href: "/customers/3c-zero-takedown",
  },
  {
    id: "dtc-baby-discovery",
    industryTag: "DTC 母婴",
    scaleTag: "TikTok Shop 头部",
    metric: "3×",
    metricLabel: "爆款发现速度",
    metricTone: "cyan",
    quote: "新品上架前我们就知道这是不是机会 — 不靠运气,靠数据。",
    attribution: "选品总监",
    productsUsed: ["discovery", "detection"],
    challenge: [
      "选品团队凭经验,新品上架后 2-3 周才知道是不是爆款",
      "错过 TikTok Shop 上升期,等数据明显时市场已经饱和",
      "竞品从趋势出现到上架平均比我们快 3 周",
    ],
    solution: [
      "选品雷达提前识别上升期商品 — 7 天 / 30 天 / 90 天三档趋势模型",
      "上架前 Detection 雷达扫描 IP 风险,避免下架白干",
      "竞品矩阵对比 — 一键看到所有竞品 SKU 表现",
    ],
    results: [
      { label: "新品发现到上架", value: "3 周 → 5 天" },
      { label: "爆款命中率", value: "12% → 38%" },
      { label: "选品团队产出", value: "提升 3×" },
    ],
    href: "/customers/dtc-baby-discovery",
  },
  {
    id: "fashion-eu-compliance",
    industryTag: "跨境快时尚",
    scaleTag: "EU + UK 直发",
    metric: "100%",
    metricLabel: "GPSR 一周内合规",
    metricTone: "green",
    quote:
      "GPSR 落地一周内,我们 4,200 个 SKU 全部完成合规审查 — 零罚款,零下架。",
    attribution: "合规经理",
    productsUsed: ["compliance", "brand"],
    challenge: [
      "EU 通用产品安全条例 (GPSR) 2024-12 突然生效",
      "4,200 个在售 SKU 需要在 14 天内完成合规审查",
      "传统人工审查每个 SKU 需要 30 分钟 — 团队完全无法覆盖",
    ],
    solution: [
      "Compliance 雷达批量扫描 4,200 SKU — 7 天内全部完成",
      "AI 自动生成每个 SKU 的合规整改建议清单",
      "Brand 雷达持续监控 EU 市场仿冒情况",
    ],
    results: [
      { label: "合规审查完成", value: "7 天" },
      { label: "GPSR 罚款", value: "0 元" },
      { label: "EU 下架数量", value: "0 件" },
    ],
    href: "/customers/fashion-eu-compliance",
  },
  {
    id: "erp-saas-api-integration",
    industryTag: "跨境 ERP / SaaS",
    scaleTag: "服务 5,000+ 卖家",
    metric: "12×",
    metricLabel: "API 调用量增长",
    metricTone: "cyan",
    quote:
      "之前自建 IP 检测能力要 6 个月 + 200 万投入。Radarsea API 接入用了 3 周。",
    attribution: "CTO",
    productsUsed: ["detection", "compliance"],
    challenge: [
      "客户要求 ERP 内嵌 IP 风险检测能力",
      "自建需要对接 6+ 政府数据库,合规成本高",
      "数据更新维护需要专门团队",
    ],
    solution: [
      "RESTful API + Webhook 接入 — 3 周完成产品集成",
      "白标方案 — 数据由 Radarsea 提供,品牌由客户自有",
      "99.97% SLA 保障",
    ],
    results: [
      { label: "上线周期", value: "6 个月 → 3 周" },
      { label: "自建成本节约", value: "¥200 万+" },
      { label: "API 月调用量", value: "0 → 2.4M+" },
    ],
    href: "/customers/erp-saas-api-integration",
  },
  {
    id: "service-provider-data-driven",
    industryTag: "跨境运营服务商",
    scaleTag: "300+ 服务客户",
    metric: "↑ 65%",
    metricLabel: "客户续约率提升",
    metricTone: "green",
    quote: "现在每份给客户的报告都有 Radarsea 数据底座 — 客户买的不是 PPT。",
    attribution: "运营总监",
    productsUsed: ["detection", "discovery", "brand", "sentiment"],
    href: "/customers/service-provider-data-driven",
  },
  {
    id: "global-brand-monitoring",
    industryTag: "出海消费电子品牌",
    scaleTag: "156 国家在售",
    metric: "+14d",
    metricLabel: "仿冒预警提前期",
    metricTone: "cyan",
    quote: "Brand 雷达让我们在仿冒商品起量前 14 天就接到信号。",
    attribution: "全球品牌负责人",
    productsUsed: ["brand", "detection", "sentiment"],
    href: "/customers/global-brand-monitoring",
  },
];

export function getFeaturedCustomerCase(): CustomerCase | undefined {
  return customerCases.find((c) => c.featured);
}
