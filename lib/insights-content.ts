export type ArticleCategory =
  | "行业报告"
  | "趋势观察"
  | "客户故事"
  | "产品更新"
  | "合规洞察";

export type Article = {
  id: string;
  category: ArticleCategory;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
  /** Featured articles surface in the hero strip on /insights. */
  featured?: boolean;
};

export const articleCategories: ArticleCategory[] = [
  "行业报告",
  "趋势观察",
  "客户故事",
  "产品更新",
  "合规洞察",
];

export const articles: Article[] = [
  {
    id: "ip-2026-report",
    category: "行业报告",
    title: "2026 年跨境电商知识产权风险趋势报告",
    excerpt:
      "我们分析了 2026 年 1 万起跨境侵权案例,发现外观专利投诉占比首次超过商标——背后的市场结构变化值得每个出海品牌注意。",
    date: "2026-04-22",
    readTime: "12 分钟",
    href: "/insights/ip-2026-report",
    featured: true,
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
  {
    id: "amazon-2026-policy",
    category: "合规洞察",
    title: "亚马逊 2026 政策变更全景:7 类目新规与卖家应对",
    excerpt:
      "亚马逊在 2026 年上半年集中调整了 7 个类目的合规要求。我们整理了完整变更清单,并给出每个类目的应对动作。",
    date: "2026-03-18",
    readTime: "10 分钟",
    href: "/insights/amazon-2026-policy",
  },
  {
    id: "discovery-radar-launch",
    category: "产品更新",
    title: "选品雷达 V0.9 公测开启:更准的爆品趋势预测",
    excerpt:
      "经过 6 个月的内测,选品雷达正式开放公测。新版本引入了 7 天 / 30 天 / 90 天三档趋势模型,识别精度提升 41%。",
    date: "2026-03-10",
    readTime: "5 分钟",
    href: "/insights/discovery-radar-launch",
  },
  {
    id: "diy-tools-trend",
    category: "趋势观察",
    title: "欧洲 DIY 工具品类的反季增长:被忽视的细分机会",
    excerpt:
      "Q4 本应是 DIY 类目的淡季,但 2025 年欧洲 5 国数据显示出反季 18% 的增长。这背后藏着哪些选品线索?",
    date: "2026-02-28",
    readTime: "7 分钟",
    href: "/insights/diy-tools-trend",
  },
  {
    id: "anker-style-brand-protection",
    category: "客户故事",
    title: "从 Anker 看头部 DTC 品牌的全球商标布防",
    excerpt:
      "我们拆解了一家头部出海 DTC 品牌的全球商标矩阵——156 个国家、4,200 件注册、3 道侵权防线。",
    date: "2026-02-20",
    readTime: "9 分钟",
    href: "/insights/anker-style-brand-protection",
  },
  {
    id: "eu-gpsr",
    category: "合规洞察",
    title: "欧盟 GPSR 落地一周年:卖家踩过的坑与避坑清单",
    excerpt:
      "GPSR(通用产品安全条例)自 2024 年 12 月生效以来,已有数千个跨境店铺受影响。我们整理了高频问题与最佳实践。",
    date: "2026-02-08",
    readTime: "11 分钟",
    href: "/insights/eu-gpsr",
  },
  {
    id: "sentiment-radar-roadmap",
    category: "产品更新",
    title: "舆情雷达 2026 路线图:从监测到危机预案",
    excerpt:
      "我们计划在 2026 H1 推出舆情雷达的危机预案模块,把口碑波动从「事后处理」前置到「30 分钟预警 + 应对建议」。",
    date: "2026-01-30",
    readTime: "4 分钟",
    href: "/insights/sentiment-radar-roadmap",
  },
  {
    id: "tiktok-shop-us-q1",
    category: "行业报告",
    title: "TikTok Shop 美区 Q1 2026 数据简报",
    excerpt:
      "TikTok Shop 美区 Q1 2026:GMV 同比 +212%、活跃店铺 +48%、平均客单价同比 -7.4%——这些数字说明什么?",
    date: "2026-01-22",
    readTime: "8 分钟",
    href: "/insights/tiktok-shop-us-q1",
  },
  {
    id: "shein-sourcing",
    category: "趋势观察",
    title: "SHEIN 模式之外:海外快时尚的下一波结构性机会",
    excerpt:
      "当 SHEIN / Temu 占据头部流量,中腰部出海品牌该如何选品?我们看了 1,200 个 SKU 的数据。",
    date: "2026-01-12",
    readTime: "9 分钟",
    href: "/insights/shein-sourcing",
  },
  {
    id: "ugc-copyright",
    category: "合规洞察",
    title: "UGC 营销的版权红线:2026 跨境短视频维权白皮书",
    excerpt:
      "短视频投流爆款背后,UGC 素材的版权风险正在快速累积。我们汇总了 2025 年 1,400 起跨境 UGC 维权案。",
    date: "2025-12-28",
    readTime: "13 分钟",
    href: "/insights/ugc-copyright",
  },
];

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured);
}
