"use client";

import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type RevealSectionProps = {
  className?: string;
  children: React.ReactNode;
  id?: string;
};

/**
 * Wraps a `<section>` with a fade-in + slide-up reveal that fires once when
 * the section enters the viewport. Used for all home below-the-fold sections.
 */
export function RevealSection({ className, children, id }: RevealSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
}
