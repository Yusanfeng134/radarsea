"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, ChevronDown } from "lucide-react";

import { products } from "@/lib/products";
import type { RoleSolution } from "@/lib/solutions-types";
import { cn } from "@/lib/utils";

type RoleCardProps = {
  data: RoleSolution;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

const SMOOTH_EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * One accordion-style role card.
 *
 * Architecture:
 * - Controlled component (isExpanded + onToggle from parent) so expand state
 *   is preserved when the user switches Tab away and back.
 * - Title row uses a real `<button>` (the toggle target). To stay HTML-valid
 *   we render the title as a `<span>` rather than an `<h3>` — heading
 *   hierarchy is provided at the section level (h2 above this list).
 * - The expanded body lives outside the button so its links / CTAs aren't
 *   nested inside an interactive element.
 */
export function RoleCard({ data, index, isExpanded, onToggle }: RoleCardProps) {
  const Icon = data.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: SMOOTH_EASE,
      }}
      className={cn(
        "rounded-2xl border bg-bg transition-colors duration-300",
        isExpanded
          ? "border-ink/15"
          : "border-line hover:border-ink/15 hover:bg-bg-subtle/50",
      )}
    >
      {/* ---------- Collapsed header (also the toggle button) ---------- */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`role-${data.id}-detail`}
        className="group flex w-full items-center gap-5 rounded-2xl p-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:gap-6 md:p-8"
      >
        {/* Icon block */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ink/[0.04]"
          aria-hidden
        >
          <Icon size={22} strokeWidth={1.5} className="text-ink/70" />
        </div>

        {/* Title + scenario */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="text-xl font-semibold leading-[1.3] tracking-tightish text-ink md:text-2xl">
              {data.title}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-faint">
              {data.englishTitle}
            </span>
          </div>
          <p className="mt-1.5 line-clamp-1 text-sm leading-[1.5] text-ink-muted md:text-[15px]">
            {data.scenario}
          </p>
        </div>

        {/* Radar dots (desktop only, to avoid crowding mobile) */}
        <div className="hidden items-center gap-1.5 md:flex" aria-hidden>
          {data.recommendedRadars.map((rId) => {
            const product = products.find((p) => p.id === rId);
            return (
              <span
                key={rId}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: product?.color }}
              />
            );
          })}
        </div>

        {/* Chevron — rotates when expanded */}
        <motion.span
          aria-hidden
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: SMOOTH_EASE }}
          className="shrink-0"
        >
          <ChevronDown size={20} strokeWidth={1.75} className="text-ink-muted" />
        </motion.span>
      </button>

      {/* ---------- Expanded body ---------- */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`role-${data.id}-detail`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: SMOOTH_EASE },
              opacity: { duration: 0.25, delay: 0.05 },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 md:px-8 md:pb-10">
              <div aria-hidden className="mb-8 h-px bg-line" />

              <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
                {/* Left 7/12: description + pain points */}
                <div className="md:col-span-7">
                  <p className="mb-8 text-[17px] leading-[1.65] text-ink/85 md:text-lg">
                    {data.description}
                  </p>

                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    典型痛点
                  </p>
                  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {data.painPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5"
                      >
                        <AlertCircle
                          size={16}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0 text-ink-muted"
                          aria-hidden
                        />
                        <span className="text-sm leading-[1.5] text-ink-muted">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right 5/12: recommended radars + CTA */}
                <div className="md:col-span-5">
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    推荐雷达组合
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {data.recommendedRadars.map((rId) => {
                      const product = products.find((p) => p.id === rId);
                      if (!product) return null;
                      return (
                        <div
                          key={rId}
                          className="flex items-center gap-3 rounded-lg border border-line bg-bg p-3"
                        >
                          <div
                            aria-hidden
                            className="h-8 w-8 shrink-0 rounded-lg"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${product.color}33 0%, ${product.color}14 100%)`,
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-ink">
                              {product.name}
                            </div>
                            <div className="line-clamp-1 text-xs text-ink-muted">
                              {product.nameEn}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <a
                    href={data.href}
                    onClick={(event) => {
                      event.preventDefault();
                      console.log("solution-detail", data.id);
                    }}
                    className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-brand"
                  >
                    查看完整方案
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 ease-smooth group-hover/cta:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
