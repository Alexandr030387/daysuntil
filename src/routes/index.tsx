import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronRight, Pin, Plus, Trash2 } from "lucide-react";
import { daysUntil, deleteEvent, formatDate, togglePin, useEvents } from "@/lib/events";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goals & Events — Days Until" },
      { name: "description", content: "All your countdowns in one bold, distraction-free list." },
      { property: "og:title", content: "Goals & Events — Days Until" },
      { property: "og:description", content: "All your countdowns in one bold, distraction-free list." },
    ],
  }),
  component: ListScreen,
});

const LAUNCH_FLAG = "days-until:launched";

function ListScreen() {
  const { events, ready } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready || sessionStorage.getItem(LAUNCH_FLAG)) return;
    sessionStorage.setItem(LAUNCH_FLAG, "1");
    const pinned = events.find((e) => e.isPinned);
    if (pinned) navigate({ to: "/event/$id", params: { id: pinned.id }, replace: true });
  }, [ready, events, navigate]);

  const sorted = [...events].sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || a.targetDate.localeCompare(b.targetDate));

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-32 pt-6">
      <header className="flex items-center justify-between">
        <span className="w-11" />
        <h1 className="text-xl font-black uppercase tracking-tight">Goals &amp; Events</h1>
        <ThemeToggle />
      </header>
      <div className="mx-auto mt-2 h-1 w-32 rounded-full bg-foreground" />

      {ready && sorted.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-3xl font-black">Nothing to count yet.</p>
          <p className="mt-2 font-semibold text-muted-foreground">Tap + to start your first countdown.</p>
        </div>
      )}

      <ul className="mt-8 space-y-3">
        {sorted.map((e) => {
          const d = daysUntil(e.targetDate);
          return (
            <li key={e.id} className="group flex items-stretch overflow-hidden rounded-2xl bg-muted">
              <Link to="/event/$id" params={{ id: e.id }} className="flex min-w-0 flex-1 items-center gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate text-xl font-extrabold">
                    {e.isPinned && <Pin className="h-4 w-4 shrink-0 fill-current" />}
                    <span className="truncate">{e.name}</span>
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {formatDate(e.targetDate)} · {d > 0 ? `${d} day${d === 1 ? "" : "s"}` : d === 0 ? "Today!" : "Done"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0" strokeWidth={3} />
              </Link>
              <button
                onClick={() => togglePin(e.id)}
                aria-label={e.isPinned ? "Unpin" : "Pin"}
                className="grid w-12 place-items-center active:bg-accent"
              >
                <Pin className={`h-5 w-5 ${e.isPinned ? "fill-current" : ""}`} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => confirm(`Delete "${e.name}"?`) && deleteEvent(e.id)}
                aria-label="Delete"
                className="grid w-12 place-items-center active:bg-accent"
              >
                <Trash2 className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </li>
          );
        })}
      </ul>

      <Link
        to="/new"
        aria-label="Add new event"
        className="fixed bottom-8 left-1/2 grid h-20 w-20 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl active:scale-95 transition-transform"
      >
        <Plus className="h-10 w-10" strokeWidth={3} />
      </Link>
    </main>
  );
}
