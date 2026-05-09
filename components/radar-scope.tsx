import * as React from "react";
import { cn } from "@/lib/utils";

type RadarScopeProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Card-variant mark: radar scope view (semi-circle arcs + scan line).
 * Distinct from the brand-mark RadarMark (full concentric circles).
 * Pure stroke; inherits currentColor.
 */
export function RadarScope({
  size = 32,
  className,
  ...props
}: RadarScopeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Baseline */}
      <line x1="2.5" y1="22" x2="29.5" y2="22" strokeWidth="0.75" opacity="0.25" />
      {/* Outer arc */}
      <path d="M4 22 A 12 12 0 0 1 28 22" strokeWidth="1.5" opacity="0.95" />
      {/* Middle arc */}
      <path d="M9 22 A 7 7 0 0 1 23 22" strokeWidth="1.25" opacity="0.55" />
      {/* Inner arc */}
      <path d="M13 22 A 3 3 0 0 1 19 22" strokeWidth="1" opacity="0.4" />
      {/* Scan beam */}
      <line x1="16" y1="22" x2="25" y2="13" strokeWidth="1.5" />
      {/* Origin dot */}
      <circle cx="16" cy="22" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}
