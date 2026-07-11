"use client";

import { useCiteStore } from "@/lib/store";
import { sources } from "@/lib/ledger";

/**
 * Site-wide citation mark: a small superscript arrow at the top-right of the
 * cited figure, exponent-style. Hover/focus shows the source name; click
 * opens the citation drawer. The host number itself carries no behavior.
 */
export default function Cite({ id }: { id: string }) {
  const open = useCiteStore((s) => s.open);
  const source = sources[id];

  if (!source) {
    // Build-time guard: a citation id not present in the ledger is a data error.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Cite: unknown source id "${id}" — not in ledger.json`);
    }
    return null;
  }

  return (
    <sup>
      <button
        type="button"
        onClick={() => open(id)}
        aria-label={`Source: ${source.title}`}
        className="group/cite relative cursor-pointer p-1 text-muted outline-none transition-colors duration-150 hover:text-text focus-visible:text-text"
        style={{ fontSize: "0.45em", lineHeight: 0 }}
      >
        ↗
        <span
          role="tooltip"
          className="micro-label pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 w-max max-w-[260px] -translate-x-1/2 whitespace-normal rounded-[2px] border border-hairline bg-bg px-3 py-2 text-left opacity-0 transition-opacity duration-150 group-hover/cite:opacity-100 group-focus/cite:opacity-100 group-focus-visible/cite:opacity-100"
        >
          {source.title}
        </span>
      </button>
    </sup>
  );
}
