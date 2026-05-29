import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "../../components/ProjectDetail";
import { SiteShell } from "../../components/SiteShell";
import { getAllProjectSlugs, getProject } from "../../lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | malinda.motiondev`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <SiteShell active="projects">
      <ProjectDetail project={project} />
    </SiteShell>
  );
}
