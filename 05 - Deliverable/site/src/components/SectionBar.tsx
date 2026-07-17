"use client";

import { Fragment, useEffect, useState } from "react";

const SECTIONS: { id: string; label: string }[] = [
  { id: "s1", label: "The ₹100 Problem" },
  { id: "history", label: "Precedence" },
  { id: "banana-split", label: "Rupee Split" },
  { id: "value-chain", label: "Theni Corridor" },
  { id: "s2", label: "The Chain" },
  { id: "s3", label: "Living Model" },
  { id: "s4", label: "Sweet Spot" },
  { id: "s5", label: "Footnotes" },
];

/**
 * Slide-deck footer strip: section names in a row with hairline separators,
 * fixed to the bottom of the viewport. The section straddling the viewport
 * centerline is highlighted (observer with rootMargin -50%/-50%, threshold 0,
 * so even the very tall pinned S1 activates correctly).
 */
export default function SectionBar() {
  const [active, setActive] = useState("s1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/80 backdrop-blur-sm"
    >
      <div className="flex h-[44px] items-center justify-start gap-g3 overflow-x-auto whitespace-nowrap px-g3 sm:justify-center">
        {SECTIONS.map(({ id, label }, i) => (
          <Fragment key={id}>
            {i > 0 && (
              <div
                role="separator"
                aria-orientation="vertical"
                className="h-[16px] w-px shrink-0 bg-hairline"
              />
            )}
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`micro-label shrink-0 origin-center transition-all duration-200 ease-out ${
                active === id
                  ? "scale-[1.15] !text-text opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              {label}
            </a>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
