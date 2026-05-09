import * as React from "react";

import { cn } from "@/lib/utils";

export type SectionHeaderProps = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Visual alignment of the whole block. Defaults to "left". */
  align?: "left" | "center";
  className?: string;
};

/**
 * Section-level header used by the /solutions page (and any other page that
 * wants the same eyebrow + h2 + subtitle hierarchy). Renders a real `<h2>`
 * for SEO / accessibility — pair with section landmarks.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <header
      className={cn(
        "mb-16 max-w-[768px] lg:mb-20",
        isCenter && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[36px] lg:text-[44px]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-[640px] text-lg leading-[1.6] text-ink-muted",
            isCenter && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
