import { RevealSection } from "@/components/home/reveal-section";
import { trustBrands } from "@/lib/home-content";

export function TrustBar() {
  return (
    <RevealSection className="relative border-t border-line py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-site px-5 md:px-8">
        {/* Featured customer quote with quantified result.
            B2B decision-makers are 80% influenced by other customers'
            numbers, not by logo walls. The logo wall stays below as
            breadth proof; this quote provides depth proof. */}
        <figure className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint"
          >
            <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_5px_rgba(0,255,102,0.7)]" />
            Customer Outcome · 2026 Q1
          </span>
          <blockquote className="mt-5 text-balance text-[20px] font-medium leading-[1.5] text-ink md:text-[24px] lg:text-[28px]">
            <span className="text-ink-faint">「</span>
            6 个月 0 侵权下架,我们把人手从巡检中解放出来,
            <span className="text-brand-bright">做真正能赚钱的事</span>。
            <span className="text-ink-faint">」</span>
          </blockquote>
          <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            — 头部 3C 配件出海品牌 · IP 团队负责人
          </figcaption>
        </figure>

        {/* Brand-trust signal sits below the quote */}
        <p className="mt-14 text-center text-sm text-ink-muted">
          正被 <span className="font-medium text-ink">1,000+</span> 跨境出海品牌信赖
        </p>
      </div>

      {/* Infinite marquee — pauses on hover, edges fade out */}
      <div
        className="trust-marquee group relative mt-8 overflow-hidden"
        aria-label="客户与合作伙伴"
      >
        <div className="trust-marquee__track flex w-max items-center gap-12 md:gap-16">
          {[...trustBrands, ...trustBrands].map((b, i) => (
            <span
              key={`${b.name}-${i}`}
              aria-hidden={i >= trustBrands.length || undefined}
              className={`shrink-0 select-none whitespace-nowrap text-[22px] leading-none text-ink-faint transition-colors duration-300 hover:text-ink md:text-[26px] ${b.className}`}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
