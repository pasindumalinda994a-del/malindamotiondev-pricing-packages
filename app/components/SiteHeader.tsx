import Link from "next/link";

const nav = [
  { href: "/", label: "Pricing" },
  { href: "/projects", label: "Projects" },
] as const;

export function SiteHeader({ active }: { active?: "pricing" | "projects" }) {
  return (
    <header className="w-full border-b border-zinc-200 py-4 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 md:px-10 lg:px-16">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          malinda.motiondev
        </Link>
        <nav
          className="flex items-center gap-1 sm:gap-2"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const isActive =
              (item.href === "/" && active === "pricing") ||
              (item.href === "/projects" && active === "projects");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-zinc-200/80 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
