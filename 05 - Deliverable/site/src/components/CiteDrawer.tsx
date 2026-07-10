"use client";

import { useCiteStore } from "@/lib/store";
import { sources, tagEmoji } from "@/lib/ledger";

export default function CiteDrawer() {
  const openId = useCiteStore((s) => s.openId);
  const close = useCiteStore((s) => s.close);
  const source = openId ? sources[openId] : null;

  return (
    <div
      aria-hidden={!source}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-panel/95 backdrop-blur-sm transition-transform duration-300 ease-out ${
        source ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {source && (
        <div className="mx-auto flex max-w-[1200px] items-start justify-between gap-6 px-6 py-6">
          <div className="flex items-start gap-4">
            <span className="mt-1 text-lg leading-none">
              {tagEmoji[source.tag]}
            </span>
            <div>
              <div className="micro-label mb-1">
                {source.tag} source · {source.year}
              </div>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg text-text hover:text-signal"
                >
                  {source.title}
                </a>
              ) : (
                <div className="font-display text-lg text-text">
                  {source.title}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close citation"
            className="micro-label shrink-0 border border-hairline px-3 py-2 hover:border-signal hover:text-signal"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
