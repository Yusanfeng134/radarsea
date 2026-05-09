/**
 * Type contracts for the /solutions page.
 *
 * Note: `RadarId` is a literal union (per spec) but must stay in sync with
 * `Product["id"]` in `lib/products.ts` — that file is the canonical source of
 * truth for the 5 radar products. If a new product is added there, this union
 * must also be extended (TypeScript will surface the mismatch at consumer
 * sites).
 */

import type { LucideIcon } from "lucide-react";

/** The 5 canonical radar product ids. Must match `Product["id"]`. */
export type RadarId =
  | "detection"
  | "discovery"
  | "brand"
  | "compliance"
  | "sentiment";

/** The three views available on /solutions. */
export type TabId = "role" | "industry" | "stage";

/** Sticky tab bar config. */
export type TabConfig = {
  id: TabId;
  label: string;
  englishLabel: string;
};

/** A role-based solution (cross-border seller, sourcing team, etc.). */
export type RoleSolution = {
  /** URL hash + react key. */
  id: string;
  icon: LucideIcon;
  title: string;
  englishTitle: string;
  /** One-line scenario shown in the collapsed card. */
  scenario: string;
  /** Multi-sentence narrative shown when expanded. */
  description: string;
  recommendedRadars: RadarId[];
  /** Typical pain points (3–4 items). */
  painPoints: string[];
  href: string;
};

/** An industry-vertical solution. */
export type IndustrySolution = {
  id: string;
  icon: LucideIcon;
  title: string;
  englishTitle: string;
  /** Industry-specific risk factors (3–4 items). */
  riskPoints: string[];
  recommendedRadars: RadarId[];
  /** Optional: one-line teaser pointing at a representative case. */
  caseHint?: string;
  href: string;
};

/** A solution organized by lifecycle stage. */
export type StageSolution = {
  id: string;
  /** Stage ordinal, 1 to 5. */
  stageNumber: 1 | 2 | 3 | 4 | 5;
  icon: LucideIcon;
  title: string;
  englishTitle: string;
  description: string;
  recommendedRadars: RadarId[];
  /** Concrete next action recommended for the stage. */
  keyAction: string;
};

/** A featured customer case used in the case-study preview. */
export type CaseStudy = {
  id: string;
  industryTag: string;
  scaleTag: string;
  title: string;
  excerpt: string;
  /** Optional quantified outcomes (e.g. "侵权下架 ↓ 95%"). */
  metrics?: string[];
  href: string;
};
