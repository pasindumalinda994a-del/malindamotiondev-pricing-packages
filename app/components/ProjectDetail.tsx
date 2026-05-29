import Link from "next/link";
import { waHref } from "../lib/contact";
import type { Project } from "../lib/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const waMessage = `Hi Malinda — I saw the ${project.title} project on malinda.motiondev and would like something similar. Can we discuss?`;

  return (
    <article className="w-full bg-zinc-50 py-16 text-zinc-900 dark:bg-black dark:text-zinc-50 md:py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 md:px-10 lg:px-16">
        <div>
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← All projects
          </Link>
        </div>

        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
            {project.category} · {project.year} · {project.plan} tier
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {project.tagline}
          </p>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {project.summary}
          </p>
        </header>

        <div className="space-y-4">
          {project.description.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white/90 p-6 dark:border-zinc-800 dark:bg-zinc-900/90">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
            Deliverables
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            {project.deliverables.map((item) => (
              <li key={item} className="flex gap-2 leading-snug">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
            Stack
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:flex-row sm:items-center">
          <a
            href={waHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#185FA5] px-6 py-3 text-sm font-semibold text-[#E6F1FB] shadow-md transition hover:bg-[#378ADD]"
          >
            Discuss a similar project ↗
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            View pricing
          </Link>
        </div>
      </div>
    </article>
  );
}
