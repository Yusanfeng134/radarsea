import type { Metadata } from "next";

import { SolutionsClient } from "@/components/solutions/solutions-client";

export const metadata: Metadata = {
  title: "解决方案 - 出海雷达",
  description:
    "按角色、按行业、按业务阶段,找到最适合你的雷达组合。",
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
