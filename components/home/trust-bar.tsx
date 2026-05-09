import { RevealSection } from "@/components/home/reveal-section";
import { trustBrands } from "@/lib/home-content";

export function TrustBar() {
  return (
    <RevealSection className="relative border-t border-line py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-site px-5 text-center md:px-8">
        <p className="text-sm text-ink-muted">
          正被 <span className="font-medium text-ink">1,000+</span> 跨境出海品牌信赖
        </p>
      </div>

      {/* Infinite marquee — pauses on hover, edges fade out */}
      <div
        className="trust-marquee group relative mt-10 overflow-hidden"
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
