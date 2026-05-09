export type ProductStatus = "live" | "soon" | "planned";

export type Product = {
  id: "detection" | "discovery" | "brand" | "compliance" | "sentiment";
  name: string;
  nameEn: string;
  shortLine: string;
  description: string;
  capabilities: string[];
  color: string;
  colorClass: string;
  status: ProductStatus;
  statusLabel: string;
  href: string;
  comparison: {
    scenario: string;
    dataSurface: string;
    audience: string;
    api: boolean;
    plugin: boolean;
  };
};

export const products: Product[] = [
  {
    id: "detection",
    name: "检测雷达",
    nameEn: "Detection Radar",
    shortLine: "上架前一键检测版权、商标、专利侵权风险",
    description:
      "商品上架前一键检测版权、商标、专利侵权风险,降低跨境店铺被下架与维权诉讼的概率。",
    capabilities: [
      "三类 IP 全覆盖",
      "AI 风险解释",
      "Chrome 浏览器插件",
      "API 接入与批量扫描",
    ],
    color: "#FF4D4F",
    colorClass: "radar-detection",
    status: "live",
    statusLabel: "V1.0 已上线",
    href: "https://detection.overseasradar.com",
    comparison: {
      scenario: "上架前侵权风险检测",
      dataSurface: "USCO / USPTO / EUIPO 等",
      audience: "跨境卖家、选品代理",
      api: true,
      plugin: true,
    },
  },
  {
    id: "discovery",
    name: "选品雷达",
    nameEn: "Discovery Radar",
    shortLine: "基于 TikTok / Shopee 等平台的爆品趋势,定位机会商品",
    description:
      "整合 TikTok Shop、Shopee 等多平台的销售与内容数据,识别上升期商品并量化潜力。",
    capabilities: [
      "多平台爆品数据",
      "趋势预测模型",
      "利润测算与定价建议",
      "竞品矩阵分析",
    ],
    color: "#52C41A",
    colorClass: "radar-discovery",
    status: "soon",
    statusLabel: "即将上线",
    href: "https://discovery.overseasradar.com",
    comparison: {
      scenario: "选品研究与机会识别",
      dataSurface: "TikTok / Shopee / Amazon 等",
      audience: "选品团队、品牌方",
      api: true,
      plugin: false,
    },
  },
  {
    id: "brand",
    name: "品牌雷达",
    nameEn: "Brand Radar",
    shortLine: "24 小时监控相似品牌、商标抢注、疑似侵权商品",
    description:
      "为出海品牌方提供 7×24 的品牌侵权监测,从相似商标到疑似仿品商品,完整覆盖维权链路。",
    capabilities: [
      "商标实时监控",
      "疑似侵权线索",
      "维权工作流管理",
      "多平台覆盖",
    ],
    color: "#722ED1",
    colorClass: "radar-brand",
    status: "soon",
    statusLabel: "即将上线",
    href: "https://brand.overseasradar.com",
    comparison: {
      scenario: "品牌侵权监控与维权",
      dataSurface: "全球商标库 + 跨境平台商品",
      audience: "品牌方、法务团队",
      api: true,
      plugin: false,
    },
  },
  {
    id: "compliance",
    name: "合规雷达",
    nameEn: "Compliance Radar",
    shortLine: "跟踪平台规则、法规、类目限制的实时变更",
    description:
      "汇总跨境主流平台的规则更新与目标市场法规变化,在政策影响业务前提供变更预警。",
    capabilities: [
      "平台规则变化提醒",
      "法规与合规库",
      "类目限制查询",
      "多平台覆盖",
    ],
    color: "#FA8C16",
    colorClass: "radar-compliance",
    status: "soon",
    statusLabel: "即将上线",
    href: "https://compliance.overseasradar.com",
    comparison: {
      scenario: "平台规则与法规跟踪",
      dataSurface: "Amazon / eBay / 各国监管",
      audience: "合规、法务、运营总监",
      api: true,
      plugin: false,
    },
  },
  {
    id: "sentiment",
    name: "舆情雷达",
    nameEn: "Sentiment Radar",
    shortLine: "监控社媒、短视频、评论中关于品牌与商品的讨论",
    description:
      "整合海外社媒、短视频与评论数据,实时跟踪品牌口碑、关键词热度与潜在公关风险。",
    capabilities: [
      "多平台舆情抓取",
      "情感与立场分析",
      "公关危机预警",
      "PDF 报告导出",
    ],
    color: "#13C2C2",
    colorClass: "radar-sentiment",
    status: "soon",
    statusLabel: "即将上线",
    href: "https://sentiment.overseasradar.com",
    comparison: {
      scenario: "海外口碑与危机监测",
      dataSurface: "TikTok / X / YouTube / Reddit",
      audience: "品牌、市场、公关团队",
      api: true,
      plugin: false,
    },
  },
];

export function getProduct(id: Product["id"]) {
  return products.find((p) => p.id === id);
}
