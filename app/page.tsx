import { AboutTeaser } from "@/components/home/about-teaser";
import { BottomCTA } from "@/components/home/bottom-cta";
import { CustomerCases } from "@/components/home/customer-cases";
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
      {/* DataFoundation moved up — for a data brand, "我们的数据底座" must
          surface immediately after the product, not be buried at #7. */}
      <DataFoundationSection />
      <ValuePropsSection />
      <SolutionsPreview />
      {/* Deep customer proof — comes after Solutions ("which role / what
          fits") so that "what others actually achieved" lands at the
          decision moment. */}
      <CustomerCases />
      <InsightsPreview />
      <AboutTeaser />
      <BottomCTA />
    </>
  );
}
