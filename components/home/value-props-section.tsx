import { RevealSection } from "@/components/home/reveal-section";

// Comparison rows — old generic value props ("data-driven / AI-powered /
// connected suite") replaced with quantified before/after deltas. The point
// is contrast: let buyers see "我现在 vs 用了之后" in numbers, not slogans.
type ComparisonRow = {
  dimension: string;
  legacy: string;
  radarsea: string;
  delta?: string;
};

const COMPARISON: ComparisonRow[] = [
  {
    dimension: "IP 检测时间",
    legacy: "2–3 个工作日",
    radarsea: "12 秒",
    delta: "约 1,800× 更快",
  },
  {
    dimension: "覆盖国家",
    legacy: "1–3 个市场",
    radarsea: "156 个市场",
  },
  {
    dimension: "错过侵权风险率",
    legacy: "47%(人工巡检)",
    radarsea: "4.6%",
    delta: "−42 个百分点",
  },
  {
    dimension: "团队人力",
    legacy: "8–12 人 IP / 合规",
    radarsea: "1–2 人 + 雷达",
  },
];

export function ValuePropsSection() {
  return (
    <RevealSection className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-18">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
            Why OverseasRadar
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px] lg:text-[52px]">
            从「事后处理」到「事前预警」,
            <br />
            数字会说话。
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-ink-muted md:text-lg">
            来自 1,000+ 跨境品牌接入前后的对比数据 · 2025 Q4 调研
          </p>
        </div>

        {/* Comparison table — bento-frame surface, mono leftmost column,
            highlighted rightmost (Radarsea) column */}
        <div className="bento-frame relative isolate mx-auto max-w-4xl overflow-hidden rounded-[24px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th
                    scope="col"
                    className="px-6 py-5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-ink-faint"
                  >
                    维度
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-ink-faint"
                  >
                    传统流程
                  </th>
                  <th
                    scope="col"
                    className="relative px-6 py-5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-brand-bright"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
                      出海雷达
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.dimension}
                    className={
                      i === COMPARISON.length - 1
                        ? ""
                        : "border-b border-line"
                    }
                  >
                    {/* Dimension label */}
                    <th
                      scope="row"
                      className="px-6 py-6 text-left text-[15px] font-medium text-ink"
                    >
                      {row.dimension}
                    </th>

                    {/* Legacy column — muted */}
                    <td className="px-6 py-6 align-middle">
                      <div className="font-mono text-[15px] text-ink-faint line-through decoration-line-strong/60 decoration-[1.5px]">
                        {row.legacy}
                      </div>
                    </td>

                    {/* Radarsea column — emphasized */}
                    <td className="relative px-6 py-6 align-middle">
                      <div className="font-mono text-[18px] font-semibold text-brand-bright md:text-[20px]">
                        {row.radarsea}
                      </div>
                      {row.delta && (
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-bright">
                          {row.delta}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right-column accent — vertical glow ribbon */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-12 bottom-12 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(0,229,255,0.4), transparent)",
            }}
          />
        </div>

        {/* Footnote */}
        <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
          数据基于 1,000+ 接入客户的工作流对比 · 完整方法论见{" "}
          <span className="text-ink underline decoration-line-strong underline-offset-4">
            /methodology
          </span>
        </p>
      </div>
    </RevealSection>
  );
}
