import Link from "next/link";
import { projects, type Project } from "../lib/projects";

const accentRing: Record<Project["accent"], string> = {
  sky: "from-sky-500/20 via-sky-400/5 to-transparent",
  emerald:
    "from-emerald-500/20 via-emerald-400/5 to-transparent",
  violet:
    "from-violet-500/20 via-violet-400/5 to-transparent",
};

const planBadge: Record<Project["plan"], string> = {
  Starter:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  Signature:
    "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  Immersive:
    "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
};

export function ProjectsSection() {
  return (
    <section className="w-full bg-zinc-50 py-20 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:px-10 lg:px-16">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
            Selected work
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Recent builds across travel, studios, and product launches — Next.js,
            motion, and immersive experiences.
          </p>
        </header>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 shadow-sm backdrop-blur-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:hover:border-zinc-700"
              >
                <div
                  className={`relative h-36 bg-gradient-to-br ${accentRing[project.accent]}`}
                  aria-hidden
                >
                  <div className="absolute inset-0 flex items-end p-5">
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${planBadge[project.plan]}`}
                    >
                      {project.plan}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-zinc-900 group-hover:text-sky-700 dark:text-zinc-50 dark:group-hover:text-sky-300">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {project.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 text-sm font-medium text-sky-700 dark:text-sky-300">
                    View case study →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Want something similar?{" "}
          <Link
            href="/"
            className="font-medium text-sky-700 underline-offset-2 hover:underline dark:text-sky-300"
          >
            Compare pricing tiers
          </Link>{" "}
          or reach out via WhatsApp from the homepage.
        </p>
      </div>
    </section>
  );
}
