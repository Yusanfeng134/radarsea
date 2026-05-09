export const site = {
  name: "出海雷达",
  nameEn: "OverseasRadar",
  tagline: "跨境业务的全维雷达预警系统",
  domain: "overseasradar.com",
  email: {
    sales: "sales@overseasradar.com",
    bd: "bd@overseasradar.com",
    support: "support@overseasradar.com",
    talent: "talent@overseasradar.com",
  },
};

export type MegaId = "products" | "solutions";

export type NavItem = {
  label: string;
  href: string;
  /** If set, hovering this nav item opens the matching mega menu. */
  megaId?: MegaId;
};

export const primaryNav: NavItem[] = [
  { label: "产品", href: "/products", megaId: "products" },
  { label: "解决方案", href: "/solutions", megaId: "solutions" },
  { label: "行业洞察", href: "/insights" },
  { label: "关于", href: "/about" },
];

export const footerCompany: NavItem[] = [
  { label: "关于我们", href: "/about" },
  { label: "加入我们", href: "/careers" },
  { label: "联系我们", href: "/contact" },
  { label: "行业洞察", href: "/insights" },
];
