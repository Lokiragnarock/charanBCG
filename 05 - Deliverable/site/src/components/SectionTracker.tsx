"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Mirrors SiteNav's HOME_SECTIONS — kept as a separate literal (not an
// import) so this component has no dependency on SiteNav's internals,
// just the same five section ids that already exist in page.tsx.
const MAIN_SECTIONS: { id: string; label: string }[] = [
  { id: "cover", label: "Cover" },
  { id: "why", label: "Why This" },
  { id: "problem", label: "The Problem" },
  { id: "sweet-spot", label: "Sweet Spot" },
  { id: "value-chain", label: "Reinvention" },
  { id: "close", label: "Close" },
];

// Deep pages get letters, not numbers — a deliberately different register
// from the five numbered main-scroll sections, same chip.
const DEEP_PAGES: { href: string; letter: string; label: string }[] = [
  { href: "/history", letter: "A", label: "History" },
  { href: "/clusters", letter: "B", label: "Clusters" },
  { href: "/platform", letter: "C", label: "Platform" },
  { href: "/appendix", letter: "D", label: "Appendix" },
];

/**
 * Persistent slide-number-style tracker, fixed bottom-right on every route.
 * On "/" it shows which of the 5 main sections is in view (via the same
 * IntersectionObserver pattern as SiteNav). On a deep page it shows the
 * page's letter plus a thin scroll-progress fill, so it still updates
 * live rather than just reflecting the URL on load.
 */
export default function SectionTracker() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState(MAIN_SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -50% 0px" }
    );

    MAIN_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (isHome) return;
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isHome, pathname]);

  const activeIndex = Math.max(
    0,
    MAIN_SECTIONS.findIndex((s) => s.id === activeId)
  );
  const deepPage = DEEP_PAGES.find((p) => p.href === pathname);

  if (!isHome && !deepPage) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <div className="glow-signal-box flex items-center gap-2 rounded-full border border-hairline bg-bg/80 px-3 py-1.5 backdrop-blur-md">
        {isHome ? (
          <>
            <span className="glow-signal-text font-mono text-[11px] text-signal">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[11px] text-muted">
              / {String(MAIN_SECTIONS.length).padStart(2, "0")}
            </span>
            <span className="micro-label hidden text-muted sm:inline">
              {MAIN_SECTIONS[activeIndex]?.label ?? ""}
            </span>
          </>
        ) : (
          <>
            <span className="glow-signal-text font-mono text-[11px] text-signal">
              {deepPage!.letter}
            </span>
            <span className="font-mono text-[11px] text-muted">/ D</span>
            <span className="micro-label hidden text-muted sm:inline">
              {deepPage!.label}
            </span>
            <span
              aria-hidden
              className="relative ml-1 h-[3px] w-10 shrink-0 overflow-hidden rounded-full bg-hairline"
            >
              <span
                className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-signal"
                style={{
                  transform: `scaleX(${progress})`,
                  transition: "transform 120ms linear",
                }}
              />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
