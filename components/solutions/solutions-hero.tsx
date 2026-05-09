"use client";

import { motion, type Variants } from "framer-motion";

import { Container } from "@/components/ui/container";
import { heroCopy } from "@/lib/solutions-content";

// Stagger child entrance — page-load animation, plays once on mount.
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function SolutionsHero() {
  return (
    <section className="border-b border-line">
      <Container>
        <motion.div
          className="mx-auto max-w-[864px] pb-16 pt-24 text-center md:pb-20 md:pt-32 lg:pb-24 lg:pt-40"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted"
          >
            {heroCopy.eyebrow}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink md:text-[48px] lg:text-[60px]"
          >
            {heroCopy.title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.6] text-ink-muted md:text-lg"
          >
            {heroCopy.subtitle}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
