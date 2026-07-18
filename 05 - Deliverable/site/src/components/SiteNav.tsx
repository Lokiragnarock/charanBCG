"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HOME_SECTIONS: { id: string; label: string }[] = [
  { id: "cover", label: "Cover" },
  { id: "why", label: "Why This" },
  { id: "problem", label: "The Problem" },
  { id: "sweet-spot", label: "Sweet Spot" },
  { id: "value-chain", label: "Corridor" },
  { id: "close", label: "Close" },
];

const PAGES: { href: string; label: string }[] = [
  { href: "/history", label: "History" },
  { href: "/clusters", label: "Clusters" },
  { href: "/platform", label: "Platform" },
  { href: "/appendix", label: "AI Use Case" },
];

/**
 * Sticky top nav, present on every route (mounted once in layout.tsx).
 * On "/" its section links are same-page hash anchors, tracked live via
 * IntersectionObserver. On any other route those same links become
 * "/#id" (a full navigation back to the scroll page), and the deep-page
 * link matching the current route is marked active instead.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("cover");

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -50% 0px" }
    );

    HOME_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  return (
    // Outer band is transparent and only as tall as the pill — deck-style
    // centered ribbon, not a full-width website header. inset-x-0 keeps it
    // fixed for centering math, but pointer-events-none on the band means
    // nothing outside the pill itself intercepts clicks.
    <nav
      aria-label="Site"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex h-[52px] items-center justify-center px-g3"
    >
      <div className="glow-signal-box pointer-events-auto flex max-w-full items-center gap-g3 overflow-x-auto whitespace-nowrap rounded-full border border-hairline bg-bg/80 px-g4 py-2 backdrop-blur-md">
        <Link
          href="/"
          className="micro-label mr-1 shrink-0 text-muted hover:text-signal"
        >
          PS4
        </Link>
        <div
          role="separator"
          aria-orientation="vertical"
          className="h-[14px] w-px shrink-0 bg-hairline"
        />
        {HOME_SECTIONS.map(({ id, label }, i) => (
          <Fragment key={id}>
            {i > 0 && (
              <div
                role="separator"
                aria-orientation="vertical"
                className="h-[14px] w-px shrink-0 bg-hairline"
              />
            )}
            <Link
              href={`/#${id}`}
              aria-current={isHome && active === id ? "true" : undefined}
              className={`micro-label shrink-0 transition-all duration-200 ease-out ${
                isHome && active === id
                  ? "scale-[1.1] !text-text opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              {label}
            </Link>
          </Fragment>
        ))}
        <div
          role="separator"
          aria-orientation="vertical"
          className="h-[14px] w-px shrink-0 bg-hairline"
        />
        {PAGES.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "true" : undefined}
            className={`micro-label shrink-0 transition-all duration-200 ease-out ${
              pathname === href
                ? "scale-[1.1] !text-signal opacity-100"
                : "text-muted opacity-80 hover:opacity-100 hover:text-text"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
