"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import gsap from "gsap";
import { waHref } from "../lib/contact";

import "react-day-picker/style.css";

const TIMEZONE_NOTE =
  "Time is in your local timezone. If you need Sri Lanka time specifically, say so in your message.";

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function buildTimeSlots(): string[] {
  const slots: string[] = [];
  const endMinutes = 17 * 60 + 30;
  let t = 9 * 60;
  while (t <= endMinutes) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    t += 30;
  }
  return slots;
}

function formatSlotLabel(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function ScheduleMeetingWidget() {
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const timeSelectRef = useRef<HTMLSelectElement>(null);

  const titleId = useId();
  const dialogId = useId();

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
    startOfDay(new Date())
  );
  const [time, setTime] = useState("09:00");
  const [note, setNote] = useState("");

  const timeSlots = useMemo(() => buildTimeSlots(), []);

  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(() => addDays(today, 60), [today]);

  const disabledMatchers = useMemo(
    () => [{ before: today }, { after: maxDate }],
    [today, maxDate]
  );

  useLayoutEffect(() => {
    const fab = fabRef.current;
    if (!fab) return;
    const onEnter = () => {
      gsap.to(fab, { scale: 1.04, duration: 0.2, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(fab, { scale: 1, duration: 0.2, ease: "power2.out" });
    };
    fab.addEventListener("mouseenter", onEnter);
    fab.addEventListener("mouseleave", onLeave);
    return () => {
      fab.removeEventListener("mouseenter", onEnter);
      fab.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const skipFirstCloseAnim = useRef(true);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      gsap.killTweensOf(panel);
      if (open) {
        gsap.fromTo(
          panel,
          { autoAlpha: 0, y: 20, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "power2.out",
          }
        );
        skipFirstCloseAnim.current = false;
      } else if (skipFirstCloseAnim.current) {
        gsap.set(panel, { autoAlpha: 0, y: 20, scale: 0.96 });
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          y: 20,
          scale: 0.96,
          duration: 0.22,
          ease: "power2.in",
        });
      }
    }, panel);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      timeSelectRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => fabRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !time) return;

    const dateLine = dateFormatter.format(selectedDate);
    const timeLine = `${formatSlotLabel(time)} (${TIMEZONE_NOTE})`;
    const noteBlock = note.trim()
      ? note.trim()
      : "(no additional message)";

    const message = `Hi Malinda — I'd like to schedule a meeting.

Date: ${dateLine}
Time: ${timeLine}

Additional message:
${noteBlock}`;

    window.open(waHref(message), "_blank", "noopener,noreferrer");
  }

  const canSubmit = Boolean(selectedDate && time);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-[calc(100vw-3rem)] flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
      <div
        ref={panelRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="schedule-meeting-panel w-[min(100vw-3rem,20rem)] origin-bottom-right rounded-2xl border border-zinc-200 bg-white/95 p-4 text-zinc-900 shadow-xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-50"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <h2 id={titleId} className="text-sm font-semibold tracking-tight">
          Schedule a meeting
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Pick a date and time. We&apos;ll open WhatsApp with your details.
        </p>

        <form className="mt-3 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="schedule-meeting-picker flex justify-center">
            <DayPicker
              mode="single"
              required={false}
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledMatchers}
              startMonth={today}
              endMonth={maxDate}
              className="rdp-root w-full text-sm"
              classNames={{
                month_caption:
                  "flex justify-center py-1 font-medium text-zinc-800 dark:text-zinc-100",
                weekdays: "text-zinc-500 dark:text-zinc-400",
                day_button: "text-zinc-800 dark:text-zinc-100",
              }}
            />
          </div>

          <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Time
            <select
              ref={timeSelectRef}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-sky-500/30 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {formatSlotLabel(slot)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Additional message
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Project type, budget, links…"
              className="resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-sky-500/30 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            />
          </label>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                requestAnimationFrame(() => fabRef.current?.focus());
              }}
              className="flex-1 rounded-lg border border-zinc-300 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 rounded-lg bg-[#185FA5] py-2 text-sm font-semibold text-[#E6F1FB] transition hover:bg-[#378ADD] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send via WhatsApp
            </button>
          </div>
        </form>
      </div>

      <button
        ref={fabRef}
        type="button"
        onClick={() => {
          setOpen((wasOpen) => {
            if (wasOpen) {
              requestAnimationFrame(() => fabRef.current?.focus());
            }
            return !wasOpen;
          });
        }}
        aria-expanded={open}
        aria-controls={dialogId}
        className="inline-flex items-center gap-2 rounded-full bg-[#185FA5] px-5 py-3 text-sm font-semibold text-[#E6F1FB] shadow-lg ring-2 ring-white/20 transition hover:bg-[#378ADD] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:ring-zinc-900/60 dark:focus:ring-offset-zinc-900"
      >
        <svg
          className="h-5 w-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Schedule meeting
      </button>
    </div>
  );
}
