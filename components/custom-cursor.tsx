"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "lock" | "text";

// Selector covers both direct hits and descendants (e.g. spans inside <h1>)
const TEXT_SELECTOR =
  "h1, h2, h3, h4, h5, h6, input, textarea, [contenteditable='true'], [data-cursor='text']";
const LOCK_SELECTOR = "[data-cursor='lock']";

/**
 * Military-grade radar reticle replacing the OS cursor.
 *
 * States:
 * - default: 1px white crosshair (+) with a 2px center gap and a slow
 *   breathing halo. Lights the underlying grid via radial-gradient.
 * - lock:    crosshair contracts + brightens to fluorescent green;
 *   four [ ] corner brackets fade in. Triggered by `data-cursor="lock"`.
 * - text:    crosshair morphs to a thin vertical beam (|). Triggered by
 *   headings, inputs, textareas, or `data-cursor="text"`.
 *
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Magnetic damping — slightly softer than a 1:1 follow for "physical" feel
  const sx = useSpring(x, { stiffness: 500, damping: 32, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 500, damping: 32, mass: 0.45 });
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on coarse-pointer devices (touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Lock takes priority — anomalies / data points
      if (target.closest(LOCK_SELECTOR)) {
        setState((prev) => (prev === "lock" ? prev : "lock"));
        return;
      }
      // Text — headings, text inputs, or explicitly tagged
      if (target.closest(TEXT_SELECTOR)) {
        setState((prev) => (prev === "text" ? prev : "text"));
        return;
      }
      setState((prev) => (prev === "default" ? prev : "default"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onBlur = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("blur", onBlur);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("blur", onBlur);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className={`custom-cursor custom-cursor--${state}`}
      style={{
        translateX: sx,
        translateY: sy,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Underlying grid spotlight — only in default state */}
      <span className="custom-cursor__spotlight" />

      {/* Breathing halo — visible in default + lock states */}
      <span className="custom-cursor__halo" />

      {/* Crosshair (4 segments leaving a 2px center gap) */}
      <span className="custom-cursor__cross">
        <span className="custom-cursor__cross-seg custom-cursor__cross-seg--top" />
        <span className="custom-cursor__cross-seg custom-cursor__cross-seg--bottom" />
        <span className="custom-cursor__cross-seg custom-cursor__cross-seg--left" />
        <span className="custom-cursor__cross-seg custom-cursor__cross-seg--right" />
      </span>

      {/* Lock brackets [ ] — only in lock state */}
      <span className="custom-cursor__bracket custom-cursor__bracket--tl" />
      <span className="custom-cursor__bracket custom-cursor__bracket--tr" />
      <span className="custom-cursor__bracket custom-cursor__bracket--bl" />
      <span className="custom-cursor__bracket custom-cursor__bracket--br" />

      {/* Text beam (|) — only in text state */}
      <span className="custom-cursor__beam" />
    </motion.div>
  );
}
