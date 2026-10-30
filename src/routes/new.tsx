import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { addEvent, todayKey } from "@/lib/events";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/new")({
  head: () => ({
    meta: [
      { title: "New Event — Days Until" },
      { name: "description", content: "Name the thing you can't wait for and pick the date." },
      { property: "og:title", content: "New Event — Days Until" },
      { property: "og:description", content: "Name the thing you can't wait for and pick the date." },
    ],
  }),
  component: NewEvent,
});

function NewEvent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const valid = name.trim().length > 0 && date.length > 0;

  const start = () => {
    if (!valid) return;
    const ev = addEvent(name.trim(), date);
    navigate({ to: "/event/$id", params: { id: ev.id }, replace: true });
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-8 pt-6">
      <header className="flex items-center justify-between">
        <Link to="/" aria-label="Back" className="grid h-11 w-11 place-items-center rounded-full active:bg-muted">
          <ChevronLeft className="h-7 w-7" strokeWidth={3} />
        </Link>
        <ThemeToggle />
      </header>
      <h1 className="mt-4 text-center text-4xl font-black tracking-tight">New Event</h1>

      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event Name"
        className="mt-10 w-full rounded-2xl border-2 border-input bg-transparent px-5 py-5 text-3xl font-semibold outline-none placeholder:text-muted-foreground focus:border-foreground"
      />

      <label className="mt-5 block">
        <input
          type="date"
          min={todayKey()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-2xl border-2 border-input bg-transparent px-5 py-5 text-2xl font-bold outline-none focus:border-foreground dark:[color-scheme:dark]"
        />
        <span className="mt-2 block text-center font-semibold text-muted-foreground">Target Date</span>
      </label>

      <div className="flex-1" />
      <button
        onClick={start}
        disabled={!valid}
        className="w-full rounded-3xl bg-primary py-7 text-5xl font-black text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-30"
      >
        Start
      </button>
    </main>
  );
}
