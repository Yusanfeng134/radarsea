import { RevealSection } from "@/components/home/reveal-section";
import { valueProps } from "@/lib/home-content";

export function ValuePropsSection() {
  return (
    <RevealSection className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="mb-16 max-w-3xl md:mb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            Why OverseasRadar
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[48px] lg:text-5xl">
            为什么选择出海雷达。
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-ink-muted">
            不是另一个工具,而是一套完整的雷达系统。
          </p>
        </div>

        {/* gap-px on a bg-line parent creates 1px hairline dividers between cells */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
          {valueProps.map(({ id, icon: Icon, title, description }) => (
            <div
              key={id}
              className="bg-bg p-8 transition-colors duration-300 hover:bg-bg-subtle md:p-10"
            >
              <Icon size={24} strokeWidth={1.5} className="text-ink/70" />
              <h3 className="mt-6 text-2xl font-semibold leading-[1.3] tracking-tightish text-ink">
                {title}
              </h3>
              <p className="mt-3 leading-[1.65] text-ink-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
