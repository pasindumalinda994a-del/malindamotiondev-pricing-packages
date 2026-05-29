import { ScheduleMeetingWidget } from "./ScheduleMeetingWidget";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({
  active,
  children,
}: {
  active?: "pricing" | "projects";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <SiteHeader active={active} />
      <main className="flex w-full flex-col items-center">{children}</main>
      <ScheduleMeetingWidget />
    </div>
  );
}
