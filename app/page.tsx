import { PricingSection } from "./components/PricingSection";
import { ScheduleMeetingWidget } from "./components/ScheduleMeetingWidget";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="w-full border-b border-zinc-200 py-4 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-6xl justify-center px-6 md:px-10 lg:px-16">
          <span
            className="font-mono text-lg font-semibold tracking-tight text-zinc-700 dark:text-zinc-300"
            aria-label="malinda.motiondev"
          >
            malinda.motiondev
          </span>
        </div>
      </header>
      <main className="flex w-full flex-col items-center">
        <PricingSection />
      </main>
      <ScheduleMeetingWidget />
    </div>
  );
}
