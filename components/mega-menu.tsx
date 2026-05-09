"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { RadarMark } from "@/components/radar-mark";
import { products } from "@/lib/products";

type MegaMenuProps = {
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function MegaMenu({
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
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
        <div className="grid grid-cols-6 divide-x divide-line">
          {products.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                console.log("nav-product", p.id);
                onSelect();
              }}
              className="group flex flex-col p-6 transition-colors duration-150 hover:bg-bg-subtle"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: p.color }}
                aria-hidden
              >
                <RadarMark size={14} />
              </span>
              <span className="mt-5 text-[15px] font-semibold text-ink transition-colors duration-150 group-hover:text-brand">
                {p.name}
              </span>
              <span className="mt-2 line-clamp-2 min-h-[42px] text-[13px] leading-[1.55] text-ink-muted">
                {p.shortLine}
              </span>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[12px] font-medium text-brand">
                访问官网
                <ArrowUpRight
                  size={11}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          ))}

          {/* Column 6 — Full matrix CTA */}
          <Link
            href="/products"
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
              探索完整产品矩阵
            </span>
            <span className="mt-2 text-[13px] leading-[1.55] text-ink-muted">
              5 款雷达,覆盖跨境业务全周期。数据互通,能力协同。
            </span>
            <span className="mt-auto inline-flex h-9 items-center gap-1 self-start rounded-full border border-line-strong bg-transparent pl-4 pr-3.5 text-[13px] font-medium text-ink-muted transition-colors duration-200 group-hover:border-brand-bright/60 group-hover:bg-white/[0.025] group-hover:text-brand-bright">
              查看产品矩阵
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
