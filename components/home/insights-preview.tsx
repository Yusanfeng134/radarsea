import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealSection } from "@/components/home/reveal-section";
import { insightsPreview } from "@/lib/home-content";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InsightsPreview() {
  return (
    <RevealSection className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="mb-16 flex flex-col gap-6 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              Insights
            </p>
            <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[48px] lg:text-5xl">
              跨境出海,我们的观察。
            </h2>
          </div>
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            查看全部洞察
            <ArrowRight
              size={14}
              className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
          {insightsPreview.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex flex-col bg-bg p-8 transition-colors duration-300 hover:bg-bg-subtle"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                {article.category}
              </p>
              <h3 className="mt-6 line-clamp-2 text-2xl font-semibold leading-[1.3] tracking-tightish text-ink">
                {article.title}
              </h3>
              <p className="mt-4 line-clamp-2 flex-1 text-sm leading-[1.6] text-ink-muted">
                {article.excerpt}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-faint">
                <span>{formatDate(article.date)}</span>
                <span>{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
