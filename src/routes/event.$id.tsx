import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, List } from "lucide-react";
import { crossDate, daysUntil, formatDate, fromKey, toKey, todayKey, useEvents } from "@/lib/events";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/event/$id")({
  head: () => ({
    meta: [
      { title: "Countdown — Days Until" },
      { name: "description", content: "Cross off each day until your big event." },
      { property: "og:title", content: "Countdown — Days Until" },
      { property: "og:description", content: "Cross off each day until your big event." },
    ],
  }),
  component: CalendarScreen,
});

const WEEK = ["S", "M", "T", "W", "T", "F", "S"];

function CalendarScreen() {
  const { id } = Route.useParams();
  const { events, ready } = useEvents();
  const event = events.find((e) => e.id === id);
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [celebrating, setCelebrating] = useState(false);
  const touchX = useRef<number | null>(null);
  const today = todayKey();

  useEffect(() => {
    if (celebrating) {
      const t = setTimeout(() => {
        setCelebrating(false);
        if (event) crossDate(event.id, today);
      }, 1200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [celebrating, event, today]);

  if (!ready) return <main className="min-h-dvh" />;
  if (!event) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-3xl font-black">Event not found</p>
        <Link to="/" className="rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">All events</Link>
      </main>
    );
  }

  const crossed = new Set(event.manuallyCrossedDates);
  const shift = (n: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1));
  const first = month.getDay();
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: count }, (_, i) => toKey(new Date(month.getFullYear(), month.getMonth(), i + 1))),
  ];
  while (cells.length % 7) cells.push(null);
  const left = daysUntil(event.targetDate);

  const tap = (k: string) => {
    if (k !== today || crossed.has(k) || celebrating) return;
    navigator.vibrate?.(50);
    setCelebrating(true);
  };

  return (
    <main
      className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-8 pt-6"
      onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 60) shift(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <header className="flex items-center justify-between">
        <Link to="/" aria-label="All events" className="grid h-11 w-11 place-items-center rounded-full active:bg-muted">
          <List className="h-6 w-6" strokeWidth={3} />
        </Link>
        <ThemeToggle />
      </header>

      <div className="mt-2 text-center">
        <h1 className="text-4xl font-black leading-tight tracking-tight">{event.name}</h1>
        <p className="mt-1 text-lg font-semibold">{formatDate(event.targetDate)}</p>
        <p className="mt-6 text-7xl font-black tabular-nums">{Math.max(left, 0)}</p>
        <p className="text-sm font-extrabold uppercase tracking-widest">
          {left > 0 ? (left === 1 ? "day to go" : "days to go") : left === 0 ? "It's today!" : "Done"}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={() => shift(-1)} aria-label="Previous month" className="grid h-11 w-11 place-items-center rounded-full active:bg-muted">
          <ChevronLeft className="h-7 w-7" strokeWidth={3} />
        </button>
        <p className="text-2xl font-black uppercase tracking-tight">
          {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <button onClick={() => shift(1)} aria-label="Next month" className="grid h-11 w-11 place-items-center rounded-full active:bg-muted">
          <ChevronRight className="h-7 w-7" strokeWidth={3} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 text-center">
        {WEEK.map((w, i) => (
          <span key={i} className="pb-2 text-lg font-extrabold">{w}</span>
        ))}
        {cells.map((k, i) => {
          if (!k) return <span key={i} className="aspect-square" />;
          const isTarget = k === event.targetDate;
          const isCrossed = crossed.has(k);
          const isToday = k === today;
          const canTap = isToday && !isCrossed;
          return (
            <button
              key={k}
              onClick={() => tap(k)}
              disabled={!canTap}
              aria-label={fromKey(k).toDateString()}
              className="relative grid aspect-square place-items-center disabled:cursor-default"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-full text-xl font-bold tabular-nums ${
                  isTarget ? "bg-primary text-primary-foreground font-black" : ""
                } ${canTap ? "ring-[3px] ring-foreground" : ""}`}
              >
                {fromKey(k).getDate()}
              </span>
              {isCrossed && (
                <svg viewBox="0 0 40 40" className="pointer-events-none absolute inset-1 animate-strike" aria-hidden>
                  <path d="M8 8 L32 32 M32 8 L8 32" className="stroke-foreground" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {!crossed.has(today) && today <= event.targetDate && (
        <p className="mt-6 text-center font-bold">Tap today to cross it off.</p>
      )}

      {celebrating && (
        <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center">
          <div className="grid h-64 w-64 animate-pop place-items-center rounded-[3rem] bg-primary text-primary-foreground shadow-2xl">
            <Check className="h-44 w-44" strokeWidth={4} />
          </div>
        </div>
      )}
    </main>
  );
}
