"use client";

import { ArrowRight } from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";
import { RevealSection } from "@/components/home/reveal-section";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BottomCTA() {
  const { open: openContactSales } = useContactSales();
  return (
    <RevealSection className="border-t border-line py-32 md:py-40 lg:py-48">
      <div className="mx-auto max-w-site px-5 text-center md:px-8">
        <h2 className="text-display mx-auto max-w-3xl text-[36px] font-semibold leading-[1.1] text-ink md:text-[48px] lg:text-5xl">
          准备好让你的跨境业务,
          <br />
          被雷达守护吗?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.6] text-ink-muted">
          联系我们的解决方案专家,获得最适合你业务的雷达组合建议。
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openContactSales({ source: "bottom-cta" })}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "group",
            )}
          >
            联系销售
            <ArrowRight
              size={16}
              className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            />
          </button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => console.log("subscribe-insights")}
          >
            订阅行业洞察
          </Button>
        </div>
      </div>
    </RevealSection>
  );
}
