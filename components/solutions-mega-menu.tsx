"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { RadarMark } from "@/components/radar-mark";
import { tabsConfig } from "@/lib/solutions-content";
import type { TabId } from "@/lib/solutions-types";

type SolutionsMegaMenuProps = {
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const summaries: Record<
  TabId,
  { icon: LucideIcon; description: string }
> = {
  role: {
    icon: Users,
    description:
      "跨境卖家、选品团队、合规法务、ERP / SaaS、运营服务商 5 类角色,每类一套专属雷达组合。",
  },
  industry: {
    icon: Layers,
    description:
      "3C、服装、家居、美妆、玩具、家电 6 大跨境行业的关键风险与推荐雷达。",
  },
  stage: {
    icon: Workflow,
    description:
      "选品研究、商品准备、上架运营、品牌建设、规模化扩张 5 个跨境业务阶段的雷达策略。",
  },
};

export function SolutionsMegaMenu({
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: SolutionsMegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
      className="absolute inset-x-0 top-full border-t border-b border-line bg-bg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto w-full max-w-site">
        <div className="grid grid-cols-4 divide-x divide-line">
          {tabsConfig.map((tab) => {
            const summary = summaries[tab.id];
            const Icon = summary.icon;
            return (
              <Link
                key={tab.id}
                href="/solutions"
                onClick={() => {
                  console.log("nav-solution", tab.id);
                  onSelect();
                }}
                className="group flex flex-col p-6 transition-colors duration-150 hover:bg-bg-subtle"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-subtle"
                  aria-hidden
                >
                  <Icon size={18} strokeWidth={1.5} className="text-ink/70" />
                </span>
                <span className="mt-5 flex items-baseline gap-2 text-[15px] font-semibold text-ink transition-colors duration-150 group-hover:text-brand">
                  {tab.label}
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-faint">
                    {tab.englishLabel}
                  </span>
                </span>
                <span className="mt-2 line-clamp-3 text-[13px] leading-[1.55] text-ink-muted">
                  {summary.description}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[12px] font-medium text-brand">
                  查看
                  <ArrowUpRight
                    size={11}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            );
          })}

          {/* Column 4 — full /solutions entry */}
          <Link
            href="/solutions"
            onClick={onSelect}
            className="group flex flex-col bg-gradient-to-b from-bg to-bg-subtle p-6"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/[0.03]"
              aria-hidden
            >
              <RadarMark size={22} className="text-brand-bright" />
            </span>
            <span className="mt-5 text-[15px] font-semibold text-ink transition-colors duration-150 group-hover:text-brand-bright">
              探索完整解决方案
            </span>
            <span className="mt-2 text-[13px] leading-[1.55] text-ink-muted">
              不知道哪个角度最适合?进入完整解决方案页,按需切换三种视角。
            </span>
            <span className="mt-auto inline-flex h-9 items-center gap-1 self-start rounded-full border border-line-strong bg-transparent pl-4 pr-3.5 text-[13px] font-medium text-ink-muted transition-colors duration-200 group-hover:border-brand-bright/60 group-hover:bg-white/[0.025] group-hover:text-brand-bright">
              查看全部
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
