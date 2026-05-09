"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  type Article,
  type ArticleCategory,
  articleCategories,
} from "@/lib/insights-content";
import { cn } from "@/lib/utils";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Filter = "全部" | ArticleCategory;
const ALL_FILTERS: Filter[] = ["全部", ...articleCategories];

export function InsightsClient({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("全部");
  const filtered = useMemo(
    () =>
      filter === "全部"
        ? articles
        : articles.filter((a) => a.category === filter),
    [filter, articles],
  );

  return (
    <section className="border-t border-line py-16 md:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
              All articles · {articles.length}
            </p>
            <h2 className="text-display mt-3 text-[28px] font-semibold leading-tight text-ink md:text-[32px]">
              所有文章
            </h2>
          </div>

          {/* Category filter pills */}
          <ul
            className="-mx-5 flex shrink-0 flex-row gap-2 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0"
            role="tablist"
            aria-label="文章分类"
          >
            {ALL_FILTERS.map((cat) => {
              const isActive = filter === cat;
              return (
                <li key={cat} className="shrink-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
                      isActive
                        ? "border-line-strong bg-white/[0.06] text-ink"
                        : "border-line bg-transparent text-ink-muted hover:border-line-strong hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="insights-filter-dot"
                        className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Article grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(i * 0.04, 0.4),
                  ease: SPRING_EASE,
                }}
              >
                <ArticleCard article={a} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-ink-faint">
            该分类下暂无文章。
          </p>
        )}
      </Container>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group/card flex h-full flex-col rounded-2xl border border-line bg-white/[0.012] p-6 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.025]"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-md border border-line bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-bright">
          {article.category}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {article.date}
        </span>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold leading-[1.35] text-ink transition-colors duration-300 group-hover/card:text-brand-bright">
        {article.title}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.6] text-ink-muted">
        {article.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {article.readTime}
        </span>
        <ArrowRight
          size={14}
          className="text-ink-faint transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:text-brand-bright"
        />
      </div>
    </Link>
  );
}
