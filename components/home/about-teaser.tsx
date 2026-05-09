"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Geo-Data Matrix data ───────────────────────────────────────────────────
const VB = { w: 600, h: 360 };

// Approximate continent rectangles for the dot field
const REGIONS = [
  { x0: 60, x1: 215, y0: 58, y1: 178, density: 0.55 }, // North America
  { x0: 145, x1: 235, y0: 188, y1: 320, density: 0.5 }, // South America
  { x0: 245, x1: 350, y0: 50, y1: 195, density: 0.55 }, // Europe
  { x0: 285, x1: 380, y0: 150, y1: 300, density: 0.5 }, // Africa
  { x0: 350, x1: 540, y0: 50, y1: 205, density: 0.55 }, // Asia
  { x0: 500, x1: 580, y0: 230, y1: 320, density: 0.5 }, // Australia
];

// Deterministic dot field — no Math.random so SSR matches CSR
const DOT_CELL = 8;
type Dot = { cx: number; cy: number };
const DOTS: Dot[] = (() => {
  const dots: Dot[] = [];
  const cols = Math.floor(VB.w / DOT_CELL);
  const rows = Math.floor(VB.h / DOT_CELL);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * DOT_CELL + DOT_CELL / 2;
      const cy = r * DOT_CELL + DOT_CELL / 2;
      let density = 0;
      for (const region of REGIONS) {
        if (
          cx >= region.x0 &&
          cx <= region.x1 &&
          cy >= region.y0 &&
          cy <= region.y1
        ) {
          density = Math.max(density, region.density);
        }
      }
      if (density === 0) continue;
      const n = Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453);
      const v = n - Math.floor(n);
      if (v < density) dots.push({ cx, cy });
    }
  }
  return dots;
})();

type DataNodeShape = { id: string; name: string; x: number; y: number };
const NODES: DataNodeShape[] = [
  { id: "ny", name: "New York", x: 135, y: 110 },
  { id: "lon", name: "London", x: 285, y: 90 },
  { id: "tyo", name: "Tokyo", x: 510, y: 125 },
  { id: "sgp", name: "Singapore", x: 470, y: 200 },
  { id: "sao", name: "São Paulo", x: 195, y: 285 },
];

type LinkShape = { id: string; a: string; b: string };
const LINKS: LinkShape[] = [
  { id: "ny-lon", a: "ny", b: "lon" },
  { id: "lon-tyo", a: "lon", b: "tyo" },
  { id: "tyo-sgp", a: "tyo", b: "sgp" },
  { id: "ny-sgp", a: "ny", b: "sgp" },
  { id: "sao-ny", a: "sao", b: "ny" },
];

const nodeById = (id: string): DataNodeShape =>
  NODES.find((n) => n.id === id) as DataNodeShape;

// ─── Section ─────────────────────────────────────────────────────────────────
export function AboutTeaser() {
  return (
    <section className="relative border-t border-line bg-bg py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="grid min-h-[60vh] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AboutTeaserCopy />
          <GeoDataMatrix />
        </div>
      </div>
    </section>
  );
}

// ─── Left: text ──────────────────────────────────────────────────────────────
function AboutTeaserCopy() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: SPRING_EASE }}
        className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted"
      >
        <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
        About Us
      </motion.p>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.85, ease: SPRING_EASE }}
        className="text-display mt-6 max-w-2xl text-[36px] font-bold leading-[1.1] text-ink md:text-[44px] lg:text-[52px]"
      >
        我们相信,
        <br />
        跨境业务的下一个十年,
        <br />
        需要一套全新的雷达系统。
      </motion.h2>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: SPRING_EASE }}
        className="mt-7 max-w-md font-mono text-[13px] leading-[1.7] tracking-[0.01em] text-ink-muted"
      >
        出海雷达由一群相信「数据 + AI + 跨境」未来的人创办。
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: SPRING_EASE }}
        className="mt-12"
      >
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-brand-bright"
        >
          了解我们
          <ArrowRight
            size={14}
            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Right: Geo-Data Matrix ──────────────────────────────────────────────────
function GeoDataMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  // Parallax: 3 layers, increasing speed bottom → top (z-axis depth)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.6 });
  const baseX = useTransform(smx, (v) => v * 0.3);
  const baseY = useTransform(smy, (v) => v * 0.3);
  const linksX = useTransform(smx, (v) => v * 0.6);
  const linksY = useTransform(smy, (v) => v * 0.6);
  const nodesX = useTransform(smx, (v) => v * 1.0);
  const nodesY = useTransform(smy, (v) => v * 1.0);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cxView = ((e.clientX - rect.left) / rect.width) * VB.w;
    const cyView = ((e.clientY - rect.top) / rect.height) * VB.h;
    const dxNorm =
      (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dyNorm =
      (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mx.set(dxNorm * 8); // ±8 viewBox units
    my.set(dyNorm * 8);

    // Magnetic detection — find nearest node within threshold
    let nearestId: string | null = null;
    let nearestDist = Infinity;
    for (const node of NODES) {
      const dist = Math.hypot(cxView - node.x, cyView - node.y);
      if (dist < 60 && dist < nearestDist) {
        nearestDist = dist;
        nearestId = node.id;
      }
    }
    setHoveredId(nearestId);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
    setHoveredId(null);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.0, ease: SPRING_EASE }}
      className="relative aspect-[5/3] w-full"
    >
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="atm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          {/* Each link as a path so animateMotion can track it */}
          {LINKS.map((l) => {
            const a = nodeById(l.a);
            const b = nodeById(l.b);
            return (
              <path
                key={`def-${l.id}`}
                id={`atm-link-${l.id}`}
                d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              />
            );
          })}
        </defs>

        {/* Layer 1 — dot field (slowest parallax, ~10% white) */}
        <motion.g style={{ x: baseX, y: baseY }}>
          {DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r="0.8"
              fill="rgba(255,255,255,0.10)"
            />
          ))}
        </motion.g>

        {/* Layer 2 — connection lines */}
        <motion.g style={{ x: linksX, y: linksY }}>
          {LINKS.map((l, i) => (
            <ConnectionLine
              key={l.id}
              link={l}
              from={nodeById(l.a)}
              to={nodeById(l.b)}
              index={i}
              revealed={inView}
              isLit={hoveredId === l.a || hoveredId === l.b}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </motion.g>

        {/* Layer 3 — data nodes (fastest parallax) */}
        <motion.g style={{ x: nodesX, y: nodesY }}>
          {NODES.map((n, i) => (
            <DataNode
              key={n.id}
              node={n}
              index={i}
              revealed={inView}
              isHovered={hoveredId === n.id}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
}

// ─── Connection line ─────────────────────────────────────────────────────────
function ConnectionLine({
  link,
  from,
  to,
  index,
  revealed,
  isLit,
  reduceMotion,
}: {
  link: LinkShape;
  from: DataNodeShape;
  to: DataNodeShape;
  index: number;
  revealed: boolean;
  isLit: boolean;
  reduceMotion: boolean;
}) {
  // Sparse, irregular timing so transmissions don't feel uniform
  const transmitDur = 4 + ((index * 1.7) % 3.5);
  const transmitBegin = 2.4 + index * 1.3;

  return (
    <>
      <motion.path
        d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
        fill="none"
        stroke={isLit ? "rgba(0,255,102,0.5)" : "rgba(255,255,255,0.13)"}
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          revealed
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          duration: 0.65,
          delay: 0.95 + index * 0.13,
          ease: SPRING_EASE,
        }}
        style={{ transition: "stroke 0.3s ease" }}
      />
      {/* Sparse data transmission particle */}
      {!reduceMotion && revealed && (
        <circle r={0.9} fill="#00FF66">
          <animateMotion
            dur={`${transmitDur}s`}
            begin={`${transmitBegin}s`}
            repeatCount="indefinite"
          >
            <mpath href={`#atm-link-${link.id}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.06;0.94;1"
            dur={`${transmitDur}s`}
            begin={`${transmitBegin}s`}
            repeatCount="indefinite"
          />
        </circle>
      )}
    </>
  );
}

// ─── Data node ───────────────────────────────────────────────────────────────
function DataNode({
  node,
  index,
  revealed,
  isHovered,
  reduceMotion,
}: {
  node: DataNodeShape;
  index: number;
  revealed: boolean;
  isHovered: boolean;
  reduceMotion: boolean;
}) {
  // Stagger entry pings — not perfectly uniform
  const entryDelay = 1.4 + index * 0.18 + ((index % 2) * 0.07);

  return (
    <g>
      {/* Outer breathing halo — 4s loop, brighter & wider when hovered */}
      {!reduceMotion && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          fill="none"
          stroke="#00FF66"
          strokeWidth="0.4"
          initial={{ opacity: 0 }}
          animate={
            revealed
              ? {
                  r: isHovered ? [11, 16, 11] : [6, 10, 6],
                  opacity: isHovered ? [0.85, 0.4, 0.85] : [0.45, 0.12, 0.45],
                }
              : { opacity: 0 }
          }
          transition={{
            r: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            },
            opacity: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            },
          }}
        />
      )}

      {/* Entry ping — one-shot expanding ring */}
      {!reduceMotion && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          fill="none"
          stroke="#00FF66"
          strokeWidth="0.5"
          initial={{ r: 2, opacity: 0 }}
          animate={
            revealed ? { r: [2, 22], opacity: [0.95, 0] } : { r: 2, opacity: 0 }
          }
          transition={{
            duration: 1.3,
            delay: entryDelay,
            ease: "easeOut",
          }}
        />
      )}

      {/* Mid halo (glow disc) */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        fill="rgba(0,255,102,0.20)"
        filter="url(#atm-glow)"
        initial={{ r: 0, opacity: 0 }}
        animate={
          revealed
            ? { r: isHovered ? 7 : 4.5, opacity: 1 }
            : { r: 0, opacity: 0 }
        }
        transition={{
          duration: 0.5,
          delay: revealed ? entryDelay + 0.05 : 0,
          ease: SPRING_EASE,
        }}
      />

      {/* Inner fluorescent dot */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        fill="#00FF66"
        initial={{ r: 0, opacity: 0 }}
        animate={
          revealed
            ? { r: isHovered ? 3 : 2, opacity: 0.95 }
            : { r: 0, opacity: 0 }
        }
        transition={{
          duration: 0.45,
          delay: revealed ? entryDelay + 0.12 : 0,
          ease: SPRING_EASE,
        }}
      />

      {/* Core white pip — anchor point */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        fill="#FFFFFF"
        initial={{ r: 0, opacity: 0 }}
        animate={revealed ? { r: 1.1, opacity: 1 } : { r: 0, opacity: 0 }}
        transition={{
          duration: 0.4,
          delay: revealed ? entryDelay + 0.18 : 0,
          ease: SPRING_EASE,
        }}
      />
    </g>
  );
}
