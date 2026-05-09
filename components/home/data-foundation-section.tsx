"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

import { RevealSection } from "@/components/home/reveal-section";
import { dataStats } from "@/lib/home-content";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Section ─────────────────────────────────────────────────────────────────
export function DataFoundationSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  // Trigger count-ups when the grid is ~30% visible
  const inView = useInView(gridRef, { once: true, amount: 0.3 });

  return (
    <RevealSection className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-site px-5 md:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Data Foundation
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[48px] lg:text-5xl">
            我们的数据底座。
          </h2>
          <p className="mt-6 text-lg leading-[1.6] text-ink-muted">
            整合官方公开数据与授权第三方数据源。
          </p>
        </div>

        <div
          ref={gridRef}
          className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-4"
        >
          {dataStats.map((stat, i) => (
            <StatCell
              key={stat.id}
              stat={stat}
              index={i}
              total={dataStats.length}
              inView={inView}
            />
          ))}
        </div>

        <p className="text-center text-sm text-ink-faint">
          数据来源:USCO / USPTO / EUIPO 等政府公开数据库,以及授权第三方数据服务商。
        </p>
      </div>
    </RevealSection>
  );
}

// ─── Stat cell ───────────────────────────────────────────────────────────────
function StatCell({
  stat,
  index,
  total,
  inView,
}: {
  stat: { id: string; value: string; label: string };
  index: number;
  total: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.08,
        ease: SPRING_EASE,
      }}
      whileHover={{ y: -3 }}
      className="group relative isolate bg-bg p-10 text-center transition-colors duration-300 lg:p-12"
    >
      {/* Top edge cyan beam — slides in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-brand-bright to-transparent opacity-0 transition-all duration-500 ease-out group-hover:scale-x-100 group-hover:opacity-100"
      />

      {/* Index pill */}
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
        0{index + 1}
        <span className="mx-1 text-line-strong">/</span>
        0{total}
      </div>

      {/* Number */}
      <div className="text-display mt-4 text-4xl font-semibold tracking-tighter text-ink tabular-nums lg:text-6xl">
        <StatValue stat={stat} inView={inView} delay={0.3 + index * 0.08} />
      </div>

      {/* Label */}
      <div className="mt-3 text-sm text-ink-muted transition-colors duration-300 group-hover:text-ink">
        {stat.label}
      </div>

      {/* Hover ambient cyan glow from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 50% 0%, rgba(34,211,238,0.10), transparent 65%)",
        }}
      />
    </motion.div>
  );
}

// ─── Per-stat dispatch ───────────────────────────────────────────────────────
function StatValue({
  stat,
  inView,
  delay,
}: {
  stat: { id: string; value: string };
  inView: boolean;
  delay: number;
}) {
  switch (stat.id) {
    case "ip":
      return (
        <CountUp
          to={1}
          duration={1.6}
          delay={delay}
          inView={inView}
          format={formatYi}
        />
      );
    case "platforms":
      return (
        <CountUp
          to={500}
          duration={1.6}
          delay={delay}
          inView={inView}
          format={formatPlus}
        />
      );
    case "realtime":
      return (
        <RatioCountUp
          left={24}
          right={7}
          duration={1.6}
          delay={delay}
          inView={inView}
        />
      );
    case "companies":
      return (
        <CountUp
          to={1000}
          duration={1.8}
          delay={delay}
          inView={inView}
          format={formatCommaPlus}
        />
      );
    default:
      return <>{stat.value}</>;
  }
}

// ─── Format strategies ───────────────────────────────────────────────────────
const formatYi = (n: number) =>
  n >= 0.995 ? "1 亿+" : `${n.toFixed(1)} 亿+`;
const formatPlus = (n: number) => `${Math.round(n)}+`;
const formatCommaPlus = (n: number) => `${Math.round(n).toLocaleString()}+`;
const formatPlain = (n: number) => `${Math.round(n)}`;

// ─── Count-up primitive ──────────────────────────────────────────────────────
function CountUp({
  to,
  from = 0,
  duration,
  delay = 0,
  format,
  inView,
}: {
  to: number;
  from?: number;
  duration: number;
  delay?: number;
  format: (n: number) => string;
  inView: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(from);
  const formatRef = useRef(format);
  formatRef.current = format;
  const [display, setDisplay] = useState(() => formatRef.current(from));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(formatRef.current(to));
      return;
    }
    const unsub = motionValue.on("change", (v) => {
      setDisplay(formatRef.current(v));
    });
    const controls = animate(motionValue, to, {
      duration,
      delay,
      ease: SPRING_EASE,
    });
    return () => {
      unsub();
      controls.stop();
    };
  }, [inView, to, duration, delay, motionValue, reduceMotion]);

  return <>{display}</>;
}

// ─── Ratio count-up (used for "24/7") ────────────────────────────────────────
function RatioCountUp({
  left,
  right,
  duration,
  delay,
  inView,
}: {
  left: number;
  right: number;
  duration: number;
  delay: number;
  inView: boolean;
}) {
  return (
    <span className="inline-flex items-baseline">
      <CountUp
        to={left}
        duration={duration}
        delay={delay}
        inView={inView}
        format={formatPlain}
      />
      <span className="mx-1 text-ink-faint">/</span>
      <CountUp
        to={right}
        duration={duration * 0.75}
        delay={delay + 0.2}
        inView={inView}
        format={formatPlain}
      />
    </span>
  );
}
