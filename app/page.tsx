import { AboutTeaser } from "@/components/home/about-teaser";
import { BottomCTA } from "@/components/home/bottom-cta";
import { DataFoundationSection } from "@/components/home/data-foundation-section";
import { InsightsPreview } from "@/components/home/insights-preview";
import { ProductSuiteSection } from "@/components/home/product-suite-section";
import { RadarseaHero } from "@/components/home/radarsea-hero";
import { SolutionsPreview } from "@/components/home/solutions-preview";
import { TrustBar } from "@/components/home/trust-bar";
import { ValuePropsSection } from "@/components/home/value-props-section";

export default function Home() {
  return (
    <>
      <RadarseaHero />
      <TrustBar />
      <ProductSuiteSection />
      <ValuePropsSection />
      <SolutionsPreview />
      <InsightsPreview />
      <DataFoundationSection />
      <AboutTeaser />
      <BottomCTA />
    </>
  );
}
