import {
  Baby,
  Briefcase,
  Building2,
  ClipboardCheck,
  Code2,
  Cpu,
  Crown,
  Rocket,
  Scale,
  Search,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  Telescope,
  TrendingUp,
} from "lucide-react";

import type {
  CaseStudy,
  IndustrySolution,
  RoleSolution,
  StageSolution,
  TabConfig,
} from "@/lib/solutions-types";

// ---------- Hero copy ----------

export const heroCopy = {
  eyebrow: "SOLUTIONS",
  title: "按角色,按行业,按阶段",
  subtitle:
    "不同的跨境业务有不同的雷达需求。在这里找到最适合你的雷达组合。",
} as const;

// ---------- Tab config ----------

export const tabsConfig: readonly TabConfig[] = [
  { id: "role", label: "按角色", englishLabel: "By Role" },
  { id: "industry", label: "按行业", englishLabel: "By Industry" },
  { id: "stage", label: "按业务阶段", englishLabel: "By Stage" },
];

// ---------- Roles ----------

export const roles: readonly RoleSolution[] = [
  {
    id: "sellers",
    icon: Building2,
    title: "跨境卖家",
    englishTitle: "Cross-Border Sellers",
    scenario: "独立站、品牌方、平台卖家的全维度风险与机会管理。",
    description:
      "从选品到上架,从品牌建设到合规运营,跨境卖家面对的不只是销量问题,更是一系列「看不见的雷区」。出海雷达让选品决策有据可依、上架前风险可被识别、品牌资产被持续监控。",
    recommendedRadars: ["detection", "discovery", "brand"],
    painPoints: [
      "上架后才发现侵权,商品被下架",
      "不知道竞品在卖什么",
      "品牌被仿冒却毫不知情",
      "不同市场规则各异,合规成本高",
    ],
    href: "#sellers",
  },
  {
    id: "sourcing",
    icon: Search,
    title: "选品团队 / 选品代理",
    englishTitle: "Sourcing Teams",
    scenario: "把对的商品交给客户,前提是商品本身没有问题。",
    description:
      "选品团队每天处理上百个 SKU 候选清单,既要识别趋势,又要规避风险。从趋势发现到风险预筛,出海雷达让选品流程从「凭经验」走向「凭数据」。",
    recommendedRadars: ["discovery", "detection"],
    painPoints: [
      "爆品趋势识别滞后",
      "客户提交的清单需要逐一检测",
      "选品报告制作耗时",
      "团队协作信息不同步",
    ],
    href: "#sourcing",
  },
  {
    id: "compliance",
    icon: Scale,
    title: "合规与法务团队",
    englishTitle: "Compliance & Legal",
    scenario: "把零散的规则、法规、商标线索变成可管理的工作流。",
    description:
      "跨境合规涉及多平台规则、多国家法规、商标侵权风险等多个维度。出海雷达提供统一的工作台,让规则变化、商标监控、侵权预警都可被追踪、被处理、被复盘。",
    recommendedRadars: ["compliance", "detection", "brand"],
    painPoints: [
      "多平台规则变化无法及时跟进",
      "商标监控依赖人工巡检",
      "侵权处理流程不规范",
      "合规决策缺少数据支撑",
    ],
    href: "#compliance",
  },
  {
    id: "erp",
    icon: Code2,
    title: "ERP / SaaS 服务商",
    englishTitle: "ERP / SaaS Providers",
    scenario: "通过 API 把雷达能力嵌入你的系统。",
    description:
      "为客户提供跨境运营 SaaS,但底层风险与机会数据需要专业积累。出海雷达通过完整的 RESTful API,让你专注产品体验,把复杂的数据底座交给我们。",
    recommendedRadars: [
      "detection",
      "discovery",
      "brand",
      "compliance",
      "sentiment",
    ],
    painPoints: [
      "客户需要 IP 风险检测能力,但自建成本高",
      "API 调用稳定性是关键",
      "需要符合企业级 SLA",
      "希望保持品牌一致性,不暴露第三方",
    ],
    href: "#erp",
  },
  {
    id: "service-providers",
    icon: Briefcase,
    title: "跨境运营服务商",
    englishTitle: "Cross-Border Service Providers",
    scenario:
      "为客户提供跨境运营服务,需要给每一步决策提供数据支撑。",
    description:
      "运营服务商既要懂业务,又要懂数据。出海雷达让每一份给客户的报告都有真实数据支撑,让每一个建议都基于雷达扫描的实时信号。",
    recommendedRadars: [
      "detection",
      "discovery",
      "brand",
      "compliance",
      "sentiment",
    ],
    painPoints: [
      "给客户的报告缺少数据支撑",
      "数据来源分散,整合成本高",
      "难以监测客户品牌的实时风险",
      "团队协作工具不统一",
    ],
    href: "#service-providers",
  },
];

// ---------- Industries ----------

export const industries: readonly IndustrySolution[] = [
  {
    id: "electronics",
    icon: Cpu,
    title: "3C 数码 / 电子配件",
    englishTitle: "Electronics & Accessories",
    riskPoints: [
      "外观专利侵权高发",
      "品牌仿冒猖獗",
      "充电规范、CE / FCC 合规复杂",
      "功能描述涉及商标侵权",
    ],
    recommendedRadars: ["detection", "compliance", "brand"],
    caseHint:
      "某 3C 配件品牌通过检测雷达 + 品牌雷达,实现 6 个月零侵权下架。",
    href: "#electronics",
  },
  {
    id: "apparel",
    icon: Shirt,
    title: "服装 / 时尚",
    englishTitle: "Apparel & Fashion",
    riskPoints: [
      "图案版权侵权",
      "品牌商标抢注",
      "设计抄袭高发",
      "尺码材质合规要求",
    ],
    recommendedRadars: ["detection", "brand", "sentiment"],
    caseHint:
      "一家服装品牌通过舆情雷达发现并应对了一次潜在公关危机。",
    href: "#apparel",
  },
  {
    id: "home-furniture",
    icon: Sofa,
    title: "家居 / 家具",
    englishTitle: "Home & Furniture",
    riskPoints: [
      "外观专利密集",
      "设计抄袭风险",
      "建材安全合规要求",
      "欧盟 CE / 北美 ASTM 标准",
    ],
    recommendedRadars: ["detection", "compliance"],
    href: "#home-furniture",
  },
  {
    id: "beauty",
    icon: Sparkles,
    title: "美妆 / 个护",
    englishTitle: "Beauty & Personal Care",
    riskPoints: [
      "成分合规要求严格",
      "品牌保护重要",
      "功效宣称需谨慎",
      "多国家法规差异大",
    ],
    recommendedRadars: ["compliance", "brand", "sentiment"],
    href: "#beauty",
  },
  {
    id: "toys-baby",
    icon: Baby,
    title: "玩具 / 婴幼用品",
    englishTitle: "Toys & Baby",
    riskPoints: [
      "安全合规要求最高",
      "IP 授权复杂",
      "材质环保要求",
      "CPSC / EN71 等标准",
    ],
    recommendedRadars: ["detection", "compliance"],
    href: "#toys-baby",
  },
  {
    id: "appliances",
    icon: Smartphone,
    title: "家电 / 数码",
    englishTitle: "Appliances & Digital",
    riskPoints: [
      "专利密集竞争激烈",
      "能效合规要求",
      "电气安全标准",
      "品牌竞争激烈",
    ],
    recommendedRadars: ["detection", "compliance", "brand"],
    href: "#appliances",
  },
];

// ---------- Stages ----------

export const stages: readonly StageSolution[] = [
  {
    id: "research",
    stageNumber: 1,
    icon: Telescope,
    title: "选品研究",
    englishTitle: "Research",
    description:
      "寻找趋势、定位机会商品。这个阶段最重要的是「快速识别正在崛起的爆品」。",
    recommendedRadars: ["discovery", "detection"],
    keyAction: "用选品雷达发现机会,用检测雷达预筛风险",
  },
  {
    id: "prep",
    stageNumber: 2,
    icon: ClipboardCheck,
    title: "商品准备",
    englishTitle: "Prep",
    description:
      "风险检测、规避侵权。这个阶段是上架前的最后一道防线。",
    recommendedRadars: ["detection"],
    keyAction: "检测雷达全维度扫描:版权、商标、专利",
  },
  {
    id: "launch",
    stageNumber: 3,
    icon: Rocket,
    title: "上架运营",
    englishTitle: "Launch & Run",
    description:
      "跟踪规则变化、监控用户反馈。从这一刻开始,你的商品已经在市场上接受真实考验。",
    recommendedRadars: ["compliance", "sentiment"],
    keyAction: "合规雷达跟踪规则,舆情雷达监听评价",
  },
  {
    id: "brand-building",
    stageNumber: 4,
    icon: Crown,
    title: "品牌建设",
    englishTitle: "Brand Building",
    description:
      "品牌保护、舆情监控。当你的品牌开始有影响力,你需要主动守护它。",
    recommendedRadars: ["brand", "sentiment"],
    keyAction: "品牌雷达 24h 监控,舆情雷达提前预警",
  },
  {
    id: "scale",
    stageNumber: 5,
    icon: TrendingUp,
    title: "规模化扩张",
    englishTitle: "Scale",
    description:
      "全维度雷达 + API 集成。当业务进入规模化阶段,你需要把雷达能力嵌入业务流程。",
    recommendedRadars: [
      "detection",
      "discovery",
      "brand",
      "compliance",
      "sentiment",
    ],
    keyAction: "全部雷达 + API 接入 ERP / 内部系统",
  },
];

// ---------- Customer cases ----------

export const cases: readonly CaseStudy[] = [
  {
    id: "3c-zero-takedown",
    industryTag: "3C 数码",
    scaleTag: "中型品牌",
    title: "3C 配件品牌如何用检测雷达实现 6 个月零侵权下架",
    excerpt:
      "该品牌从「每周 2-3 次下架」到「半年零下架」,如何把检测雷达嵌入选品工作流是关键。",
    metrics: ["侵权下架 ↓ 95%", "SKU 通过率 ↑ 40%", "选品周期 ↓ 30%"],
    href: "/insights/3c-zero-takedown",
  },
  {
    id: "sourcing-hit-rate",
    industryTag: "选品代理",
    scaleTag: "50+ 客户",
    title: "选品代理用选品雷达将爆品命中率提升至 40%",
    excerpt:
      "过去爆品命中率不到 15%,通过选品雷达的趋势预测,这个数字在 4 个月内翻了 2.5 倍。",
    metrics: ["爆品命中率 15% → 40%", "客户续约率 ↑ 60%"],
    href: "/insights/sourcing-hit-rate",
  },
  {
    id: "compliance-multi-platform",
    industryTag: "跨境品牌",
    scaleTag: "5 平台 / 12 国",
    title: "合规团队用合规雷达管理 5 平台规则变化",
    excerpt:
      "5 个平台、12 个国家的规则变化原本需要 3 人专职跟进,现在合规雷达让 1 人就能搞定。",
    metrics: ["规则跟进人力 ↓ 67%", "违规风险事件 ↓ 80%"],
    href: "/insights/compliance-multi-platform",
  },
];

// ---------- Section copy ----------

export const casesSectionCopy = {
  eyebrow: "CASE STUDIES",
  title: "跨境企业如何使用出海雷达",
  subtitle: "真实场景,真实数据。",
  cta: "查看全部故事",
} as const;

export const bottomCtaCopy = {
  title: "找不到完全契合你的方案?",
  subtitle: "我们可以根据你的业务和团队结构定制雷达组合。",
  ctaPrimary: "联系销售",
  ctaSecondary: "查看产品矩阵",
} as const;
