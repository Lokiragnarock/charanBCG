import Link from "next/link";

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/clusters", label: "Clusters" },
  { href: "/platform", label: "Platform" },
  { href: "/appendix", label: "Appendix" },
];

/**
 * Footer nav, present on every route (mounted once in layout.tsx). Plain
 * server component — no state, no client JS needed for a link list.
 */
export default function SiteFooter() {
  return (
    <footer className="relative w-full border-t border-hairline px-6 py-g4">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-g3">
        <div className="micro-label text-muted">
          BCG OutPrompt &middot; Problem 4 &middot; The Banana Case
        </div>
        <div className="flex flex-wrap gap-g3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="micro-label text-muted hover:text-signal"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
