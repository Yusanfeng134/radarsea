import { Container } from "@/components/ui/container";

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
};

/**
 * Shared layout for legal pages (Privacy / Terms).
 * Lives outside `app/` so it can export multiple symbols without violating
 * Next.js's page-file export constraints.
 */
export function LegalPage({
  title,
  englishTitle,
  lastUpdated,
  sections,
}: {
  title: string;
  englishTitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
              {englishTitle}
            </p>
            <h1 className="text-display mt-6 text-[40px] font-semibold leading-[1.05] text-ink md:text-[48px]">
              {title}
            </h1>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
              Last updated · {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* TOC */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                目录 · Contents
              </p>
              <nav className="mt-4">
                <ol className="flex flex-col gap-2.5">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-sm leading-[1.5] text-ink-muted transition-colors hover:text-brand-bright"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Content */}
            <article className="max-w-2xl space-y-12">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold leading-tight text-ink md:text-2xl">
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-[1.8] text-ink-muted">
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
