import * as React from "react";

import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

type RadarVisualizationProps = {
  size?: number;
  className?: string;
};

// Polar coordinates for the 5 product dots — varied radii/angles for an
// organic, "scope" feel rather than evenly distributed.
const dotPositions: { id: (typeof products)[number]["id"]; angle: number; radius: number }[] = [
  { id: "detection", angle: 35, radius: 0.62 },
  { id: "discovery", angle: 110, radius: 0.78 },
  { id: "brand", angle: 175, radius: 0.5 },
  { id: "compliance", angle: 245, radius: 0.85 },
  { id: "sentiment", angle: 320, radius: 0.7 },
];

/**
 * Larger decorative radar — concentric rings + center brand dot + 5 product dots.
 * Static (no animation) by default. Used in AboutTeaser. Rendered on the
 * server (no client-only features), so React.memo is unnecessary.
 */
export function RadarVisualization({
  size = 320,
  className,
}: RadarVisualizationProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 6;

  // 4 concentric rings at decreasing scale
  const rings = [0.95, 0.7, 0.45, 0.2].map((scale) => maxRadius * scale);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* Concentric rings */}
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(10, 10, 10, 0.09)"
          strokeWidth={1}
        />
      ))}

      {/* Faint dashed crosshair */}
      <line
        x1={cx - maxRadius}
        y1={cy}
        x2={cx + maxRadius}
        y2={cy}
        stroke="rgba(10, 10, 10, 0.05)"
        strokeWidth={1}
        strokeDasharray="2 5"
      />
      <line
        x1={cx}
        y1={cy - maxRadius}
        x2={cx}
        y2={cy + maxRadius}
        stroke="rgba(10, 10, 10, 0.05)"
        strokeWidth={1}
        strokeDasharray="2 5"
      />

      {/* Static scan beam in brand color */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + maxRadius * 0.95 * Math.cos((-50 * Math.PI) / 180)}
        y2={cy + maxRadius * 0.95 * Math.sin((-50 * Math.PI) / 180)}
        stroke="rgba(0, 102, 255, 0.28)"
        strokeWidth={1.25}
        strokeLinecap="round"
      />

      {/* 5 product dots */}
      {dotPositions.map(({ id, angle, radius }) => {
        const product = products.find((p) => p.id === id);
        if (!product) return null;
        const r = maxRadius * radius;
        const rad = (angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy - r * Math.sin(rad); // flip Y for screen coords
        return (
          <g key={id}>
            <circle cx={x} cy={y} r={10} fill={product.color} opacity={0.16} />
            <circle cx={x} cy={y} r={4.5} fill={product.color} />
          </g>
        );
      })}

      {/* Center brand mark */}
      <circle
        cx={cx}
        cy={cy}
        r={11}
        fill="none"
        stroke="rgba(0, 102, 255, 0.22)"
        strokeWidth={1}
      />
      <circle cx={cx} cy={cy} r={5.5} fill="#0066FF" />
    </svg>
  );
}
