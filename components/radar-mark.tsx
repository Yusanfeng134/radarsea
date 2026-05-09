import * as React from "react";
import { cn } from "@/lib/utils";

type RadarMarkProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Brand mark: three concentric circles + a sweep line.
 * Pure stroke; inherits currentColor from parent.
 */
export function RadarMark({ size = 22, className, ...props }: RadarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10.5" strokeWidth="1.25" opacity="0.9" />
      <circle cx="12" cy="12" r="6.5" strokeWidth="1" opacity="0.55" />
      <circle cx="12" cy="12" r="2.5" strokeWidth="1" opacity="0.85" />
      <path d="M12 12 L20 4" strokeWidth="1.25" />
    </svg>
  );
}
