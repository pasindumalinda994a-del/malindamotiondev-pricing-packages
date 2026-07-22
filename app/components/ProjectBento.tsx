import Link from "next/link";
import { waHref } from "../lib/contact";
import type { Project } from "../lib/projects";

function padIndex(n: number, total: number) {
  const w = String(total).length;
  return String(n).padStart(w, "0");
}

function BentoMetaBar({
  project,
  index,
  total,
  backHref,
}: {
  project: Project;
  index: number;
  total: number;
  backHref?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/15 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.14em] dark:border-white/15">
      <div className="flex flex-wrap items-center gap-4">
        {backHref ? (
          <Link
            href={backHref}
            className="transition hover:opacity-60"
          >
            ← Index
          </Link>
        ) : (
          <span>{project.category}</span>
        )}
        <span className="hidden text-black/50 sm:inline dark:text-white/50">
          {project.year}
        </span>
      </div>
      <span className="text-black/50 dark:text-white/50">
        Featured ({padIndex(index, total)}) / Index ({padIndex(index, total)})
      </span>
      <span className="ml-auto">{project.plan}</span>
    </div>
  );
}

function VisualCell({
  from,
  to,
  label,
  className = "",
}: {
  from: string;
  to: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-[min(42vw,320px)] overflow-hidden bg-black lg:min-h-[min(36vw,420px)] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${from} 0%, ${to} 55%, ${from}dd 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 14px,
            rgba(0,0,0,0.35) 14px,
            rgba(0,0,0,0.35) 15px
          )`,
        }}
      />
      {label ? (
        <span className="absolute left-4 top-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function TechCell({ project }: { project: Project }) {
  return (
    <div className="relative flex min-h-[min(38vw,280px)] flex-col justify-between overflow-hidden bg-[#dce8f5] p-5 lg:min-h-[min(36vw,420px)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, ${project.brandColor}44 0%, transparent 50%)`,
        }}
      />
      <p className="relative text-[10px] font-medium uppercase tracking-[0.18em] text-black/55">
        Stack / scope
      </p>
      <div className="relative my-4 flex flex-1 items-center justify-center">
        <div className="relative">
          <div
            className="flex h-28 w-28 items-center justify-center rounded-sm border-2 border-dashed border-black/25 font-mono text-4xl font-bold tracking-tighter text-black/80 sm:h-36 sm:w-36 sm:text-5xl"
            style={{ borderColor: `${project.brandColor}55` }}
          >
            {project.code}
          </div>
          <span className="absolute -right-6 top-2 font-mono text-[10px] text-black/45">
            15°
          </span>
          <span className="absolute -bottom-5 left-1/2 w-px -translate-x-1/2 bg-black/20" style={{ height: "2.5rem" }} />
        </div>
      </div>
      <ul className="relative flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border border-black/20 bg-white/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-black/70"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

type ProjectBentoProps = {
  project: Project;
  index: number;
  total: number;
  variant?: "preview" | "detail";
};

export function ProjectBento({
  project,
  index,
  total,
  variant = "preview",
}: ProjectBentoProps) {
  const isPreview = variant === "preview";
  const href = `/projects/${project.slug}`;
  const waMessage = `Hi Malinda — I saw the ${project.title} project on malinda.motiondev and would like something similar. Can we discuss?`;

  const brandCell = (
    <div
      className="relative flex min-h-[min(38vw,280px)] flex-col overflow-hidden lg:min-h-[min(36vw,420px)]"
      style={{
        backgroundColor: project.brandColor,
        color: project.brandForeground,
      }}
    >
      <BentoMetaBar project={project} index={index} total={total} backHref={isPreview ? undefined : "/projects"} />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.2em] opacity-80">
          {project.tagline}
        </p>
        <p
          className="text-center font-bold leading-[0.85] tracking-tighter"
          style={{ fontSize: "clamp(3.5rem, 14vw, 9rem)" }}
        >
          {project.code}
        </p>
        <p className="mt-4 max-w-md text-center text-sm leading-relaxed opacity-90 sm:text-base">
          {isPreview ? project.summary : project.title}
        </p>
      </div>
      {isPreview ? (
        <p className="border-t border-white/20 px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] opacity-90">
          View case study →
        </p>
      ) : null}
    </div>
  );

  const showcaseCell = (
    <div className="relative min-h-[min(42vw,320px)] overflow-hidden lg:min-h-[min(36vw,420px)]">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${project.showcaseFrom}, ${project.showcaseTo})`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.35),transparent_55%)]" />
      <div className="relative flex h-full flex-col justify-end p-5 sm:p-8">
        {isPreview ? (
          <>
            <p className="max-w-xl text-lg font-medium leading-snug text-white drop-shadow-sm sm:text-2xl">
              {project.title}
            </p>
            <p className="mt-2 max-w-lg text-sm text-white/85 sm:text-base">
              {project.summary}
            </p>
          </>
        ) : (
          <div className="max-w-2xl space-y-4 text-white">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h1>
            {project.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-sm leading-relaxed text-white/90 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const grid = (
    <div className="grid w-full grid-cols-1 border-black lg:grid-cols-3">
      {isPreview ? (
        <Link
          href={href}
          className="border-b-2 border-black transition hover:opacity-95 lg:border-r-2 lg:border-b-0"
        >
          <VisualCell
            from={project.visualFrom}
            to={project.visualTo}
            label={project.slug}
          />
        </Link>
      ) : (
        <VisualCell
          from={project.visualFrom}
          to={project.visualTo}
          label={project.slug}
          className="border-b-2 border-black lg:border-r-2 lg:border-b-0"
        />
      )}

      {isPreview ? (
        <Link
          href={href}
          className="border-b-2 border-black transition hover:opacity-95 lg:col-span-2"
        >
          {brandCell}
        </Link>
      ) : (
        <div className="border-b-2 border-black lg:col-span-2">{brandCell}</div>
      )}

      {isPreview ? (
        <Link
          href={href}
          className="border-b-2 border-black transition hover:opacity-95 lg:col-span-2 lg:border-r-2 lg:border-b-0"
        >
          {showcaseCell}
        </Link>
      ) : (
        <div className="border-b-2 border-black lg:col-span-2 lg:border-r-2 lg:border-b-0">
          {showcaseCell}
        </div>
      )}

      {isPreview ? (
        <Link href={href} className="transition hover:opacity-95">
          <TechCell project={project} />
        </Link>
      ) : (
        <TechCell project={project} />
      )}
    </div>
  );

  return (
    <article className="w-full overflow-hidden rounded-2xl border-2 border-black bg-white text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
      {grid}

      {!isPreview ? (
        <div className="grid w-full grid-cols-1 border-t-2 border-black lg:grid-cols-3">
          <section className="border-b-2 border-black p-6 lg:col-span-2 lg:border-r-2 lg:border-b-0">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
              Deliverables
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {project.deliverables.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-black pl-3 text-sm leading-snug dark:border-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col justify-center gap-3 p-6">
            <a
              href={waHref(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-2 border-black bg-black px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Discuss project ↗
            </a>
            <Link
              href="/"
              className="block border-2 border-black px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide transition hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
            >
              View pricing
            </Link>
          </section>
        </div>
      ) : null}
    </article>
  );
}
