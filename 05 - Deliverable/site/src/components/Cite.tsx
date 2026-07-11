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
      console.warn(`Cite: unknown source id "${id}", not in ledger.json`);
    }
    return null;
  }

  return (
    <sup style={{ position: "relative" }}>
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
          aria-hidden
          className="pointer-events-none absolute z-50 opacity-0 transition-opacity duration-150 group-hover/cite:opacity-100 group-focus/cite:opacity-100 group-focus-visible/cite:opacity-100"
          style={{
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "6px",
            width: "max-content",
            maxWidth: "240px",
            padding: "6px 10px",
            background: "#0A0C0B",
            border: "1px solid var(--hairline)",
            borderRadius: "2px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "11px",
            lineHeight: 1.4,
            letterSpacing: "normal",
            textTransform: "none",
            fontWeight: 400,
            textAlign: "left",
            whiteSpace: "normal",
            color: "var(--text)",
            WebkitTextFillColor: "var(--text)",
            WebkitBackgroundClip: "border-box",
            backgroundClip: "border-box",
          }}
        >
          {source.title}
        </span>
      </button>
    </sup>
  );
}
