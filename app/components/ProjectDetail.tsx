import { projects, type Project } from "../lib/projects";
import { PageContainer } from "./PageContainer";
import { ProjectBento } from "./ProjectBento";

export function ProjectDetail({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;

  return (
    <section className="w-full bg-zinc-50 py-20 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <PageContainer>
        <ProjectBento
          project={project}
          index={index}
          total={projects.length}
          variant="detail"
        />
      </PageContainer>
    </section>
  );
}
