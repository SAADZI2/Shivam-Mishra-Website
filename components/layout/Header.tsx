"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";
import { useBooking } from "../booking/BookingProvider";
import { Calendar, ChevronDown, Menu, MessageCircle, Phone, X } from "../ui/icons";
import { nav, site, whatsappLink } from "@/content/site";

function isActive(pathname: string, href: string, children?: { href: string }[]) {
  if (pathname === href) return true;
  return !!children?.some((c) => c.href === pathname);
}

export default function Header() {
  const pathname = usePathname();
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-ivory/90 shadow-[0_1px_0_var(--color-line),0_18px_40px_-28px_rgb(10_45_28/0.35)] backdrop-blur-md"
            : "bg-ivory"
        }`}
      >
        <div className="shell flex h-[76px] items-center gap-4">
          <Logo />

          <nav aria-label="Main" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => {
                const active = isActive(pathname, item.href, item.children);
                return (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors ${
                        active ? "bg-mint text-forest-800" : "text-ink/75 hover:bg-mint/60 hover:text-forest-800"
                      }`}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                      )}
                    </Link>
                    {item.children && (
                      <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <ul className="w-[19rem] rounded-2xl bg-white p-2 shadow-[0_24px_60px_-20px_rgb(10_45_28/0.35)] ring-1 ring-line">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                aria-current={pathname === c.href ? "page" : undefined}
                                className={`block rounded-xl px-4 py-3 transition-colors hover:bg-sand ${
                                  pathname === c.href ? "bg-mint/70" : ""
                                }`}
                              >
                                <span className="block text-[0.9375rem] font-semibold text-forest-950">{c.label}</span>
                                <span className="mt-0.5 block text-[0.8125rem] text-muted">{c.desc}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5 xl:ml-3">
            <a
              href={site.phone.tel}
              className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-full px-1 text-[0.9375rem] font-semibold text-forest-800 transition-colors hover:text-forest-600 2xl:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-mint">
                <Phone className="h-4 w-4" />
              </span>
              {site.phone.display}
            </a>
            <a
              href={site.phone.tel}
              aria-label={`Call ${site.phone.display}`}
              title={site.phone.display}
              className="hidden h-11 w-11 place-items-center rounded-full border border-forest-800/15 text-forest-800 transition-colors hover:bg-mint sm:grid 2xl:hidden"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button type="button" onClick={() => open()} className="btn btn-forest hidden h-11 sm:inline-flex">
              <Calendar />
              Book appointment
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-forest-800/15 px-4 text-sm font-semibold text-forest-950 transition-colors hover:bg-mint xl:hidden"
            >
              <Menu className="h-5 w-5" />
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-50 flex flex-col bg-ivory transition-[opacity,visibility] duration-300 xl:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="shell flex h-[76px] shrink-0 items-center justify-between border-b border-line">
          <Logo onClick={() => setMenuOpen(false)} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-forest-800/15 px-4 text-sm font-semibold text-forest-950"
          >
            <X className="h-5 w-5" />
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
          <div className="shell grid gap-8 py-8 sm:grid-cols-2">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className={`block rounded-2xl px-4 py-3 font-display text-2xl ${
                    pathname === "/" ? "bg-mint text-forest-800" : "text-forest-950"
                  }`}
                >
                  Home
                </Link>
              </li>
              {nav
                .filter((n) => !n.children)
                .map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className={`block rounded-2xl px-4 py-3 font-display text-2xl ${
                        pathname === n.href ? "bg-mint text-forest-800" : "text-forest-950"
                      }`}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="space-y-6">
              {nav
                .filter((n) => n.children)
                .map((n) => (
                  <div key={n.label}>
                    <p className="px-4 text-sm font-semibold text-gold-ink">{n.label}</p>
                    <ul className="mt-1">
                      {n.children!.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`block rounded-2xl px-4 py-2.5 text-lg font-medium ${
                              pathname === c.href ? "bg-mint text-forest-800" : "text-ink"
                            }`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </nav>

        <div className="shell grid shrink-0 gap-3 border-t border-line py-5 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              open();
            }}
            className="btn btn-lg btn-forest w-full"
          >
            <Calendar />
            Book appointment
          </button>
          <a href={site.phone.tel} className="btn btn-lg btn-outline w-full">
            <Phone />
            Call {site.phone.display}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-whatsapp w-full">
            <MessageCircle />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
