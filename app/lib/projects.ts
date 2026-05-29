export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  plan: "Starter" | "Signature" | "Immersive";
  summary: string;
  description: string[];
  deliverables: string[];
  stack: string[];
  href?: string;
  accent: "sky" | "emerald" | "violet";
};

export const projects: Project[] = [
  {
    slug: "ceylon-trails",
    title: "Ceylon Trails",
    tagline: "Tour operator site with booking-led UX",
    category: "Travel & hospitality",
    year: "2025",
    plan: "Signature",
    summary:
      "Multi-day tour packages, animated itineraries, and WhatsApp-first enquiries for a Sri Lanka operator.",
    description: [
      "A premium travel presence built to convert browsing into WhatsApp conversations. Package tiers, day-by-day itineraries, and trust signals are structured so mobile visitors can compare options quickly.",
      "Scroll-driven section reveals and lightweight GSAP motion keep the experience feeling editorial without hurting Core Web Vitals on 4G connections.",
    ],
    deliverables: [
      "10-page Next.js site with Tailwind",
      "Package comparison and itinerary templates",
      "GSAP scroll sections and micro-interactions",
      "On-page SEO and performance pass",
      "CMS-ready content structure",
    ],
    stack: ["Next.js", "Tailwind CSS", "GSAP", "Vercel"],
    accent: "sky",
  },
  {
    slug: "studio-noir",
    title: "Studio Noir",
    tagline: "Architecture practice with cinematic pacing",
    category: "Creative studio",
    year: "2025",
    plan: "Starter",
    summary:
      "Five-page studio site focused on project galleries, credentials, and a streamlined contact funnel.",
    description: [
      "A restrained, typography-led layout for an architecture studio. Large imagery, generous whitespace, and subtle motion on hover and scroll reinforce craft without distracting from the work.",
      "Deployed with SSL, responsive breakpoints, and a contact form that routes enquiries to the team inbox.",
    ],
    deliverables: [
      "5-page responsive site",
      "Project gallery grid",
      "Contact form integration",
      "Basic SEO metadata",
      "2 revision rounds included in scope",
    ],
    stack: ["Next.js", "Tailwind CSS", "GSAP"],
    accent: "emerald",
  },
  {
    slug: "orbit-launch",
    title: "Orbit Launch",
    tagline: "Product landing with WebGL hero",
    category: "SaaS / product",
    year: "2024",
    plan: "Immersive",
    summary:
      "Immersive hero scene, shader-accented UI, and a narrative scroll path for a hardware startup pre-order campaign.",
    description: [
      "A launch page built around a Three.js hero with custom interactions and performance tuning for mid-range mobile GPUs.",
      "The rest of the page follows a Signature-tier content system—feature blocks, social proof, and FAQ—so marketing could iterate copy without redeploying the 3D layer.",
    ],
    deliverables: [
      "Custom WebGL hero scene",
      "Signature-tier marketing sections",
      "Advanced performance profiling",
      "Priority delivery window",
      "Handover and documentation session",
    ],
    stack: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
    accent: "violet",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
