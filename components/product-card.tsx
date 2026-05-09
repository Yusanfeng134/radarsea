"use client";

import * as React from "react";
import { ArrowRight, Check, ExternalLink } from "lucide-react";

import { RadarScope } from "@/components/radar-scope";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    name,
    nameEn,
    shortLine,
    capabilities,
    color,
    status,
    statusLabel,
    href,
  } = product;
  const isLive = status === "live";

  // Hex-with-alpha so we can use raw CSS vars without color-mix.
  const cssVars = {
    "--p-color": color,
    "--p-border-hover": `${color}80`, // 50% alpha
    "--p-bg-strong": `${color}26`, // 15% alpha
    "--p-bg-weak": `${color}0D`, // 5% alpha
    "--p-status-bg": `${color}1F`, // ~12% alpha
  } as React.CSSProperties;

  return (
    <article
      style={cssVars}
      className={cn(
        "group/card relative flex flex-col rounded-2xl border-[1.5px] border-line bg-bg p-8",
        "transition-[border-color,transform,background-color] duration-300 ease-smooth",
        "hover:[border-color:var(--p-border-hover)] hover:-translate-y-0.5",
      )}
    >
      {/* Status badge */}
      <span
        className={cn(
          "absolute right-7 top-7 inline-flex h-[22px] items-center rounded-[4px] px-2 text-[11px] font-medium",
          isLive
            ? "[background-color:var(--p-status-bg)] [color:var(--p-color)]"
            : "bg-line text-ink-muted",
        )}
      >
        {statusLabel}
      </span>

      {/* Icon area — square gradient with radar scope inside */}
      <div
        aria-hidden
        className="flex h-16 w-16 items-center justify-center rounded-[12px] [background-image:linear-gradient(135deg,var(--p-bg-strong)_0%,var(--p-bg-weak)_100%)]"
      >
        <RadarScope
          size={32}
          style={{ color: "var(--p-color)" } as React.CSSProperties}
        />
      </div>

      {/* Title block */}
      <div className="mt-7">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
          {nameEn}
        </p>
        <h3 className="mt-1.5 text-2xl font-semibold leading-[1.3] tracking-tightish text-ink">
          {name}
        </h3>
      </div>

      {/* One-line value description */}
      <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">
        {shortLine}。
      </p>

      {/* Core capabilities */}
      <ul className="mt-6 flex flex-col gap-2.5">
        {capabilities.map((cap) => (
          <li
            key={cap}
            className="flex items-start gap-2.5 text-sm font-medium text-ink"
          >
            <Check
              size={14}
              strokeWidth={2.5}
              className="mt-1 shrink-0 [color:var(--p-color)]"
            />
            <span>{cap}</span>
          </li>
        ))}
      </ul>

      {/* Visit link — pinned to bottom */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => console.log("visit-product", id)}
        className="group/link mt-auto inline-flex items-center gap-1 self-start pt-7 text-sm font-medium [color:var(--p-color)]"
      >
        <span>访问 {name} 官网</span>
        <ArrowRight
          size={14}
          className="transition-transform duration-300 ease-smooth group-hover/link:translate-x-1"
        />
        <ExternalLink
          size={11}
          className="opacity-0 transition-opacity duration-200 group-hover/link:opacity-60"
        />
      </a>
    </article>
  );
}
