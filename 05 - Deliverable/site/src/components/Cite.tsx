"use client";

import { useCiteStore } from "@/lib/store";
import { sources } from "@/lib/ledger";

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
    <button
      type="button"
      onClick={() => open(id)}
      aria-label={`Source: ${source.title}`}
      className="font-mono text-signal align-super cursor-pointer hover:underline"
      style={{ fontSize: "0.6em", lineHeight: 0 }}
    >
      [{id.split("-")[0]}]
    </button>
  );
}
