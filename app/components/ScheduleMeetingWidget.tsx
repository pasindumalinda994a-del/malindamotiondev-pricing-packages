"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
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

function pushHalfHourSlots(
  slots: string[],
  startMinutes: number,
  endMinutes: number
): void {
  const step = 30;
  let t = startMinutes;
  while (t <= endMinutes) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    t += step;
  }
}

/** 8:00–12:00 (noon) and 20:00–23:30 (8pm toward midnight), 30-minute steps */
function buildTimeSlots(): string[] {
  const slots: string[] = [];
  pushHalfHourSlots(slots, 8 * 60, 12 * 60);
  pushHalfHourSlots(slots, 20 * 60, 23 * 60 + 30);
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

function isValidEmail(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ScheduleMeetingWidget() {
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const timeGroupRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const titleId = useId();
  const dialogId = useId();
  const timeLabelId = useId();
  const nameFieldId = useId();
  const emailFieldId = useId();

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
    startOfDay(new Date())
  );
  const [time, setTime] = useState("08:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const timeSlots = useMemo(() => buildTimeSlots(), []);

  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(() => addDays(today, 60), [today]);

  const disabledMatchers = useMemo(
    () => [{ before: today }, { after: maxDate }],
    [today, maxDate]
  );

  const defaultClassNames = useMemo(() => getDefaultClassNames(), []);

  const dayPickerClassNames = useMemo(
    () => ({
      ...defaultClassNames,
      root: `${defaultClassNames.root} w-full text-base`,
      months: `${defaultClassNames.months} flex w-full justify-center`,
      month: `${defaultClassNames.month} relative w-full px-0.5`,
      month_caption: `${defaultClassNames.month_caption} mb-2 flex h-12 items-center justify-center`,
      caption_label: `${defaultClassNames.caption_label} text-base font-semibold tabular-nums text-zinc-900 dark:text-zinc-50`,
      nav: `${defaultClassNames.nav} absolute inset-x-0 top-0 flex items-center justify-between`,
      button_previous: `${defaultClassNames.button_previous} inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm outline-none transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-sky-500/40 disabled:pointer-events-none disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700`,
      button_next: `${defaultClassNames.button_next} inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm outline-none transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-sky-500/40 disabled:pointer-events-none disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700`,
      chevron: `${defaultClassNames.chevron} size-5 fill-zinc-600 dark:fill-zinc-300`,
      month_grid: `${defaultClassNames.month_grid} w-full border-collapse rounded-xl border border-zinc-200/90 dark:border-zinc-600/80`,
      weekdays: `${defaultClassNames.weekdays} mb-1`,
      weekday: `${defaultClassNames.weekday} text-[0.7rem] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 sm:text-xs`,
      week: `${defaultClassNames.week}`,
      day: `${defaultClassNames.day} p-0 text-center`,
      day_button: `${defaultClassNames.day_button} m-auto flex size-12 max-w-full items-center justify-center rounded-lg text-base font-medium text-zinc-800 outline-none transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:text-zinc-100 dark:hover:bg-zinc-800`,
      selected: `${defaultClassNames.selected} rounded-lg font-semibold`,
      today: `${defaultClassNames.today} font-semibold`,
      outside: `${defaultClassNames.outside}`,
      disabled: `${defaultClassNames.disabled}`,
    }),
    [defaultClassNames]
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

  useLayoutEffect(() => {
    if (!open) return;
    const picker = pickerRef.current;
    if (!picker) return;

    const ctx = gsap.context(() => {
      const weeks = picker.querySelectorAll(".rdp-week");
      if (!weeks.length) return;
      gsap.killTweensOf(weeks);
      gsap.fromTo(
        weeks,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.22,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.04,
        }
      );
    }, picker);

    return () => ctx.revert();
  }, [open]);

  const firstTimePulse = useRef(true);

  useLayoutEffect(() => {
    if (firstTimePulse.current) {
      firstTimePulse.current = false;
      return;
    }
    const group = timeGroupRef.current;
    if (!group) return;
    const el = group.querySelector<HTMLElement>('[role="radio"][aria-checked="true"]');
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 1.06,
          duration: 0.12,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [time]);

  const monthAnimCleanupRef = useRef<(() => void) | null>(null);

  const handleMonthChange = useCallback(() => {
    monthAnimCleanupRef.current?.();

    const picker = pickerRef.current;
    if (!picker) return;
    const monthEl = picker.querySelector(".rdp-month");
    if (!monthEl) return;

    const ctx = gsap.context(() => {
      gsap.killTweensOf(monthEl);
      gsap.fromTo(
        monthEl,
        { autoAlpha: 0.88, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.24,
          ease: "power2.out",
        }
      );
    }, picker);

    const tid = window.setTimeout(() => {
      ctx.revert();
      if (monthAnimCleanupRef.current === cleanup) {
        monthAnimCleanupRef.current = null;
      }
    }, 400);

    const cleanup = () => {
      window.clearTimeout(tid);
      ctx.revert();
    };
    monthAnimCleanupRef.current = cleanup;
  }, []);

  useLayoutEffect(() => () => monthAnimCleanupRef.current?.(), []);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nameInputRef.current?.focus();
      });
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

  const handleTimeRadioKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const i = timeSlots.indexOf(time);
      if (i < 0) return;

      let next = i;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          next = Math.min(i + 1, timeSlots.length - 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          next = Math.max(i - 1, 0);
          break;
        case "Home":
          e.preventDefault();
          next = 0;
          break;
        case "End":
          e.preventDefault();
          next = timeSlots.length - 1;
          break;
        default:
          return;
      }

      if (next === i) return;
      setTime(timeSlots[next]);
      queueMicrotask(() => {
        const buttons =
          timeGroupRef.current?.querySelectorAll<HTMLButtonElement>(
            "button[role=\"radio\"]"
          );
        buttons?.[next]?.focus();
      });
    },
    [time, timeSlots]
  );

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
    const nameLine = name.trim();
    const emailLine = email.trim();
    if (!selectedDate || !time || !nameLine || !isValidEmail(emailLine)) return;

    const dateLine = dateFormatter.format(selectedDate);
    const timeLine = `${formatSlotLabel(time)} (${TIMEZONE_NOTE})`;
    const noteBlock = note.trim()
      ? note.trim()
      : "(no additional message)";

    const message = `Hi Malinda — I'd like to schedule a meeting.

Name: ${nameLine}
Email: ${emailLine}

Date: ${dateLine}
Time: ${timeLine}

Additional message:
${noteBlock}`;

    window.open(waHref(message), "_blank", "noopener,noreferrer");
  }

  const canSubmit = Boolean(
    selectedDate &&
      time &&
      name.trim().length > 0 &&
      isValidEmail(email)
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[min(38rem,calc(100vw-1.25rem))] flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)] pr-[max(1rem,env(safe-area-inset-right))] pl-[max(0.75rem,env(safe-area-inset-left))]">
      <div
        ref={panelRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="schedule-meeting-panel max-h-[min(calc(100dvh-6rem),calc(100svh-6rem))] w-full max-w-[min(36rem,calc(100vw-1.5rem))] origin-bottom-right overflow-y-auto overflow-x-hidden overscroll-y-contain rounded-2xl border border-zinc-200 bg-white/95 p-4 text-zinc-900 shadow-xl backdrop-blur-sm [-webkit-overflow-scrolling:touch] dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-50"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <h2 id={titleId} className="text-sm font-semibold tracking-tight">
          Schedule a meeting
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Add your details, pick a date and time. We&apos;ll open WhatsApp with
          everything filled in.
        </p>

        <form className="mt-3 flex flex-col gap-3" onSubmit={handleSubmit}>
          <label
            htmlFor={nameFieldId}
            className="flex flex-col gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
          >
            Name
            <input
              ref={nameInputRef}
              id={nameFieldId}
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-sky-500/30 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            />
          </label>

          <label
            htmlFor={emailFieldId}
            className="flex flex-col gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
          >
            Email
            <input
              id={emailFieldId}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-sky-500/30 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            />
          </label>

          <div ref={pickerRef} className="schedule-meeting-picker flex justify-center">
            <DayPicker
              mode="single"
              required={false}
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledMatchers}
              startMonth={today}
              endMonth={maxDate}
              fixedWeeks
              showOutsideDays
              animate={false}
              navLayout="around"
              onMonthChange={handleMonthChange}
              className="rdp-root w-full"
              classNames={dayPickerClassNames}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span
              id={timeLabelId}
              className="text-xs font-medium text-zinc-600 dark:text-zinc-300"
            >
              Time
            </span>
            <div
              ref={timeGroupRef}
              role="radiogroup"
              aria-labelledby={timeLabelId}
              onKeyDown={handleTimeRadioKeyDown}
              className="schedule-time-chips flex flex-wrap gap-1.5"
            >
              {timeSlots.map((slot) => {
                const selected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTime(slot)}
                    className={
                      selected
                        ? "min-h-9 min-w-[4.75rem] rounded-lg border border-[#185FA5] bg-[#185FA5]/12 px-2.5 py-1.5 text-xs font-semibold text-[#0f4d8a] outline-none transition focus-visible:ring-2 focus-visible:ring-sky-500/50 dark:border-sky-400 dark:bg-sky-400/15 dark:text-sky-100"
                        : "min-h-9 min-w-[4.75rem] rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 outline-none transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-700/80"
                    }
                  >
                    {formatSlotLabel(slot)}
                  </button>
                );
              })}
            </div>
          </div>

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
