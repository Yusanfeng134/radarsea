"use client";

import { ArrowUpRight, Search } from "lucide-react";

/**
 * Mock search bar — wire `onSubmit` up to your search backend / Algolia /
 * Typesense when ready. Currently just prevents default reload.
 */
export function InsightsSearchForm() {
  return (
    <form
      className="mx-auto mt-10 flex h-11 w-full max-w-md items-center gap-2 rounded-full border border-line-strong bg-white/[0.025] px-4 backdrop-blur-md transition-colors focus-within:border-brand-bright/60"
      onSubmit={(e) => e.preventDefault()}
    >
      <Search size={14} className="shrink-0 text-ink-faint" />
      <input
        type="search"
        placeholder="搜索文章 · TikTok / GPSR / 选品..."
        className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
        aria-label="搜索洞察文章"
      />
      <kbd className="hidden rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:inline">
        ⌘K
      </kbd>
    </form>
  );
}

/**
 * Mock newsletter signup. Replace `onSubmit` with your provider
 * (Resend / Loops / ConvertKit / etc.) when you have one.
 */
export function NewsletterForm() {
  return (
    <form
      className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 rounded-full border border-line-strong bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand-bright/60 focus:outline-none"
        aria-label="邮箱地址"
      />
      <button
        type="submit"
        className="cta-inner-glow group inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
      >
        <span className="relative z-[2]">订阅</span>
        <ArrowUpRight size={14} className="relative z-[2]" />
      </button>
    </form>
  );
}
