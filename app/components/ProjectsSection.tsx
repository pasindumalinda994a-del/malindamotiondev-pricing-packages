import Link from "next/link";
import { projects } from "../lib/projects";
import { PageContainer } from "./PageContainer";
import { ProjectBento } from "./ProjectBento";

export function ProjectsSection() {
  const total = projects.length;

  return (
    <section className="w-full bg-zinc-50 py-20 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <PageContainer className="gap-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
            Selected work
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Recent builds across travel, studios, and product launches.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <ProjectBento
              key={project.slug}
              project={project}
              index={i + 1}
              total={total}
              variant="preview"
            />
          ))}
        </div>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Want something similar?{" "}
          <Link
            href="/"
            className="font-medium text-sky-700 underline-offset-2 hover:underline dark:text-sky-300"
          >
            Compare pricing tiers
          </Link>
        </p>
      </PageContainer>
    </section>
  );
}
