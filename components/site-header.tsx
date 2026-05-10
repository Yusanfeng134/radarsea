"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Globe,
  Menu,
  X,
} from "lucide-react";

import { useContactSales } from "@/components/contact-sales-modal";
import { DataMegaMenu } from "@/components/data-mega-menu";
import { MegaMenu } from "@/components/mega-menu";
import { SolutionsMegaMenu } from "@/components/solutions-mega-menu";
import { Button } from "@/components/ui/button";
import { RadarMark } from "@/components/radar-mark";
import { products } from "@/lib/products";
import { primaryNav, site, type MegaId } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMegaId, setOpenMegaId] = React.useState<MegaId | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSubOpen, setMobileSubOpen] = React.useState<string | null>(null);
  const [lang, setLang] = React.useState<"中" | "EN">("中");
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: openContactSales } = useContactSales();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMegaId(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMobileSubOpen(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = (id: MegaId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMegaId(id);
  };
  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMegaId(null), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-smooth",
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-bg",
      )}
      onMouseLeave={closeMega}
    >
      <div className="container-site">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-ink"
            aria-label={`${site.name} ${site.nameEn}`}
            onClick={() => setMobileOpen(false)}
          >
            <RadarMark
              size={22}
              className="text-brand transition-transform duration-500 ease-smooth group-hover:rotate-45"
            />
            <span className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-semibold tracking-tightish">
                {site.name}
              </span>
              <span className="hidden text-[13px] tracking-wide text-ink-faint sm:inline">
                {site.nameEn}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
            {primaryNav.map((item) => {
              if (item.megaId) {
                const id = item.megaId;
                const isActive = openMegaId === id;
                return (
                  <button
                    key={item.href}
                    type="button"
                    className={cn(
                      "inline-flex h-10 items-center gap-1 rounded-md px-4 text-sm",
                      "text-ink-muted transition-colors hover:text-ink",
                      isActive && "text-ink",
                    )}
                    onMouseEnter={() => openMega(id)}
                    onMouseLeave={closeMega}
                    onFocus={() => openMega(id)}
                    onClick={() =>
                      setOpenMegaId((prev) => (prev === id ? null : id))
                    }
                    aria-expanded={isActive}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        isActive && "rotate-180",
                      )}
                    />
                  </button>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-10 items-center rounded-md px-4 text-sm text-ink-muted transition-colors hover:text-ink"
                  onMouseEnter={closeMega}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setLang((v) => (v === "中" ? "EN" : "中"))}
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[13px] text-ink-muted transition-colors hover:text-ink"
              aria-label="切换语言"
            >
              <Globe size={14} />
              <span>{lang}</span>
            </button>
            <span className="mx-1 h-4 w-px bg-line" aria-hidden />
            <button
              type="button"
              onClick={() => console.log("login")}
              className="h-9 rounded-md px-3 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              登录
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => openContactSales({ source: "header" })}
            >
              联系销售
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-bg-subtle lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menus — one slot per id, mutually exclusive */}
      <AnimatePresence>
        {openMegaId === "products" && (
          <MegaMenu
            key="products"
            onSelect={() => setOpenMegaId(null)}
            onMouseEnter={() => openMega("products")}
            onMouseLeave={closeMega}
          />
        )}
        {openMegaId === "data" && (
          <DataMegaMenu
            key="data"
            onSelect={() => setOpenMegaId(null)}
            onMouseEnter={() => openMega("data")}
            onMouseLeave={closeMega}
          />
        )}
        {openMegaId === "solutions" && (
          <SolutionsMegaMenu
            key="solutions"
            onSelect={() => setOpenMegaId(null)}
            onMouseEnter={() => openMega("solutions")}
            onMouseLeave={closeMega}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-bg lg:hidden"
          >
            <div className="container-site flex flex-col py-6">
              {primaryNav.map((item) =>
                // Only "产品" gets the mobile-drawer accordion (it has 5
                // sub-products listed). "解决方案" stays a flat link on
                // mobile — the mega-menu deep links are a desktop-only
                // affordance.
                item.megaId === "products" ? (
                  <div key={item.href} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSubOpen((prev) =>
                          prev === item.href ? null : item.href,
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-base text-ink"
                      aria-expanded={mobileSubOpen === item.href}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "text-ink-faint transition-transform duration-200",
                          mobileSubOpen === item.href && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileSubOpen === item.href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.2,
                            ease: [0, 0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-4">
                            {products.map((p) => (
                              <a
                                key={p.id}
                                href={p.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                  console.log("nav-product", p.id);
                                  setMobileOpen(false);
                                }}
                                className="-mx-2 flex items-start gap-3 rounded-lg px-2 py-2.5 active:bg-bg-subtle"
                              >
                                <span
                                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
                                  style={{ backgroundColor: p.color }}
                                  aria-hidden
                                >
                                  <RadarMark size={14} />
                                </span>
                                <div className="flex-1">
                                  <div className="text-[14px] font-medium text-ink">
                                    {p.name}
                                  </div>
                                  <div className="mt-0.5 line-clamp-2 text-[12px] leading-[1.55] text-ink-muted">
                                    {p.shortLine}
                                  </div>
                                </div>
                              </a>
                            ))}
                            <Link
                              href="/products"
                              onClick={() => setMobileOpen(false)}
                              className="mt-1 flex items-center justify-between rounded-lg bg-bg-subtle px-3 py-3 text-sm font-medium text-brand"
                            >
                              查看完整产品矩阵
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-base text-ink"
                  >
                    {item.label}
                    <ArrowUpRight size={16} className="text-ink-faint" />
                  </Link>
                ),
              )}

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setMobileOpen(false);
                    openContactSales({ source: "header-mobile" });
                  }}
                >
                  联系销售
                </Button>
                <div className="flex items-center justify-between px-1 text-sm text-ink-muted">
                  <button
                    type="button"
                    onClick={() => console.log("login")}
                    className="py-2"
                  >
                    登录
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang((v) => (v === "中" ? "EN" : "中"))}
                    className="inline-flex items-center gap-1.5 py-2"
                  >
                    <Globe size={14} />
                    <span>{lang}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
