import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "定价 · Pricing",
  description:
    "出海雷达透明定价 — Starter 免费试用 14 天 · Team ¥499/月起 · Enterprise 联系销售。按数据用量付费,不按谈判轮数付费。",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
