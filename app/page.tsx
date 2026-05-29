import type { Metadata } from "next";
import { PricingSection } from "./components/PricingSection";
import { SiteShell } from "./components/SiteShell";

export const metadata: Metadata = {
  title: "Pricing | malinda.motiondev",
  description:
    "Premium web development pricing — Next.js, motion, and immersive experiences.",
};

export default function Home() {
  return (
    <SiteShell active="pricing">
      <PricingSection />
    </SiteShell>
  );
}
