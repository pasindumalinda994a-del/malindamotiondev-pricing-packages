import type { Metadata } from "next";
import { ProjectsSection } from "../components/ProjectsSection";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Projects | malinda.motiondev",
  description:
    "Selected web projects — Next.js, GSAP motion, and immersive experiences by Malinda MotionDev.",
};

export default function ProjectsPage() {
  return (
    <SiteShell active="projects">
      <ProjectsSection />
    </SiteShell>
  );
}
