import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FooterSubscribe } from "@/components/footer-subscribe";
import { RadarMark } from "@/components/radar-mark";
import { products } from "@/lib/products";
import { footerCompany, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand + subscribe */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-ink"
              aria-label={`${site.name} ${site.nameEn}`}
            >
              <RadarMark size={22} className="text-brand" />
              <span className="flex items-baseline gap-1.5">
                <span className="text-[15px] font-semibold tracking-tightish">
                  {site.name}
                </span>
                <span className="text-[13px] text-ink-faint tracking-wide">
                  {site.nameEn}
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-[15px] leading-[1.65] text-ink-muted">
              {site.tagline}。订阅 Insights,获得跨境出海的最新数据、政策与趋势观察。
            </p>

            <div className="max-w-sm">
              <FooterSubscribe />
              <p className="mt-2.5 text-xs text-ink-faint">
                每周一封,只发干货,可随时退订。
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-ink-muted">
              产品
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {products.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[14px] text-ink-muted hover:text-ink transition-colors"
                  >
                    {p.name}
                    <ArrowUpRight
                      size={12}
                      className="text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-ink-muted">
              公司
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-ink-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-line flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {site.name} {site.nameEn}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-ink-faint">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              隐私协议
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              服务条款
            </Link>
            <span className="text-ink-faint">沪ICP备 XXXXXXXX 号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
