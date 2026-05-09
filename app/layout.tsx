import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { CustomCursor } from "@/components/custom-cursor";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

// Radarsea visual brand: Inter for sans (Linear/Vercel-leaning),
// JetBrains Mono for code/labels (sharp at small sizes).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

// Substitute for Geist Mono (not yet exported in this next/font/google version);
// JetBrains Mono is the closest widely-available dev-style mono on Google Fonts.
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} ${site.nameEn} · ${site.tagline}`,
    template: `%s · ${site.name} ${site.nameEn}`,
  },
  description:
    "出海雷达是面向跨境企业的全球市场情报与风险预警平台,通过检测、选品、品牌、合规、舆情五款专业雷达,在风险来临前提供预警。",
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: `${site.name} ${site.nameEn}`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${monoFont.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand focus:text-white focus:px-3 focus:py-2 focus:rounded-md focus:text-sm"
        >
          跳到主要内容
        </a>
        <CustomCursor />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
