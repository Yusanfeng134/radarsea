"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { RevealSection } from "@/components/home/reveal-section";
import { products } from "@/lib/products";
import { roles } from "@/lib/solutions-content";
import type { RoleSolution } from "@/lib/solutions-types";
import { cn } from "@/lib/utils";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Which 4 roles surface on the home preview. Pulling from the canonical
// /solutions data avoids duplicating copy across two files.
const PREVIEW_ROLE_IDS = ["sellers", "sourcing", "compliance", "erp"] as const;
const previewRoles: RoleSolution[] = PREVIEW_ROLE_IDS.map((id) =>
  roles.find((r) => r.id === id),
).filter((r): r is RoleSolution => Boolean(r));

export function SolutionsPreview() {
  const [activeId, setActiveId] = useState<string>(previewRoles[0]?.id ?? "");
  const active =
    previewRoles.find((r) => r.id === activeId) ?? previewRoles[0];

  if (!active) return null;

  return (
    <RevealSection className="border-t border-line bg-bg-subtle py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <Header />

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-8 xl:grid-cols-[300px_1fr]">
          <RoleTabList
            roles={previewRoles}
            activeId={active.id}
            onSelect={setActiveId}
          />
          <RoleDetail
            role={active}
            index={previewRoles.indexOf(active)}
            total={previewRoles.length}
          />
        </div>
      </div>
    </RevealSection>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div className="max-w-2xl">
      <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
        <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
        Solutions
      </p>
      <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.05] text-ink md:text-[48px] lg:text-[56px]">
        不同角色,
        <br />
        各取所需。
      </h2>
      <p className="mt-6 text-lg leading-[1.6] text-ink-muted">
        切换角色,即时查看推荐雷达组合与典型痛点 — 无需跳转新页面。
      </p>
    </div>
  );
}

// ─── Tab list ────────────────────────────────────────────────────────────────
function RoleTabList({
  roles,
  activeId,
  onSelect,
}: {
  roles: RoleSolution[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="解决方案角色"
      className="-mx-5 flex flex-row gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
    >
      {roles.map((role) => {
        const isActive = role.id === activeId;
        const Icon = role.icon;
        return (
          <button
            key={role.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`role-panel-${role.id}`}
            id={`role-tab-${role.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(role.id)}
            className={cn(
              "group relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 lg:shrink",
              isActive
                ? "border-line-strong bg-white/[0.04]"
                : "border-line bg-white/[0.012] hover:border-line-strong hover:bg-white/[0.025]",
            )}
          >
            <Icon
              size={18}
              strokeWidth={1.5}
              className={cn(
                "shrink-0 transition-colors duration-300",
                isActive ? "text-brand-bright" : "text-ink-faint",
              )}
            />
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  "whitespace-nowrap text-sm font-medium leading-tight transition-colors duration-300 lg:whitespace-normal",
                  isActive ? "text-ink" : "text-ink-muted",
                )}
              >
                {role.title}
              </div>
              <div
                className={cn(
                  "mt-0.5 hidden font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 lg:block",
                  isActive ? "text-brand-bright/70" : "text-ink-faint",
                )}
              >
                {role.englishTitle}
              </div>
            </div>
            {isActive && (
              <motion.span
                layoutId="solutions-active-indicator"
                aria-hidden
                className="absolute right-3 hidden h-1.5 w-1.5 rounded-full bg-brand-bright shadow-[0_0_8px_rgba(34,211,238,0.8)] lg:block"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Detail panel ────────────────────────────────────────────────────────────
function RoleDetail({
  role,
  index,
  total,
}: {
  role: RoleSolution;
  index: number;
  total: number;
}) {
  const Icon = role.icon;
  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={role.id}
        id={`role-panel-${role.id}`}
        role="tabpanel"
        aria-labelledby={`role-tab-${role.id}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: SPRING_EASE }}
        className="bento-frame relative isolate overflow-hidden rounded-[24px] p-7 lg:p-9"
      >
        <header className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-line-strong bg-white/[0.04]">
            <Icon size={22} strokeWidth={1.5} className="text-brand-bright" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {role.englishTitle}
            </p>
            <h3 className="mt-1 text-[26px] font-semibold leading-tight text-ink lg:text-[28px]">
              {role.title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">{role.scenario}</p>
          </div>
          <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint lg:block">
            ROLE {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </header>

        <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-ink-muted">
          {role.description}
        </p>

        <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-[1fr_minmax(0,260px)] md:gap-8">
          {/* Pain points */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              典型痛点 · Pain points
            </p>
            <ul className="mt-3.5 space-y-2.5">
              {role.painPoints.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-sm leading-[1.55] text-ink-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended radars */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              推荐组合 · Radars
            </p>
            <ul className="mt-3.5 flex flex-col gap-2">
              {role.recommendedRadars.map((rId) => {
                const product = products.find((p) => p.id === rId);
                if (!product) return null;
                return (
                  <li
                    key={rId}
                    className="flex items-center gap-2.5 rounded-[10px] border border-line bg-white/[0.018] px-3 py-2"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: product.color,
                        boxShadow: `0 0 8px ${product.color}80`,
                      }}
                    />
                    <span className="text-sm font-medium text-ink">
                      {product.name}
                    </span>
                    <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                      {product.nameEn.replace(" Radar", "")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end border-t border-line pt-5">
          <Link
            href={`/solutions${role.href}`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand-bright"
          >
            查看完整方案
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
