import { useEffect, useState } from "react";

export type DaysEvent = {
  id: string;
  name: string;
  targetDate: string; // YYYY-MM-DD
  isPinned: boolean;
  manuallyCrossedDates: string[];
  createdAt?: string; // YYYY-MM-DD, used for auto-reconciliation
};

const KEY = "days-until:events";
const listeners = new Set<() => void>();

export function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromKey(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function todayKey(): string {
  return toKey(new Date());
}

export function loadEvents(): DaysEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DaysEvent[]) : [];
  } catch {
    return [];
  }
}

export function saveEvents(events: DaysEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(events));
  listeners.forEach((l) => l());
}

/** Cross out every day from creation (or first crossed day) up to yesterday. */
export function reconcile(events: DaysEvent[], today = todayKey()): DaysEvent[] {
  return events.map((e) => {
    const start = e.createdAt ?? [...e.manuallyCrossedDates].sort()[0];
    if (!start) return e;
    const set = new Set(e.manuallyCrossedDates);
    const end = e.targetDate < today ? e.targetDate : today;
    const cur = fromKey(start);
    while (toKey(cur) < end) {
      set.add(toKey(cur));
      cur.setDate(cur.getDate() + 1);
    }
    if (e.targetDate < today) set.add(e.targetDate);
    return { ...e, manuallyCrossedDates: [...set].sort() };
  });
}

export function useEvents() {
  const [events, setEvents] = useState<DaysEvent[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setEvents(loadEvents());
    const reconciled = reconcile(loadEvents());
    localStorage.setItem(KEY, JSON.stringify(reconciled));
    setEvents(reconciled);
    setReady(true);
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);
  return { events, ready };
}

export function addEvent(name: string, targetDate: string): DaysEvent {
  const ev: DaysEvent = {
    id: crypto.randomUUID(),
    name,
    targetDate,
    isPinned: false,
    manuallyCrossedDates: [],
    createdAt: todayKey(),
  };
  saveEvents([...loadEvents(), ev]);
  return ev;
}

export function togglePin(id: string) {
  saveEvents(
    loadEvents().map((e) => ({ ...e, isPinned: e.id === id ? !e.isPinned : false })),
  );
}

export function deleteEvent(id: string) {
  saveEvents(loadEvents().filter((e) => e.id !== id));
}

export function crossDate(id: string, key: string) {
  saveEvents(
    loadEvents().map((e) =>
      e.id === id && !e.manuallyCrossedDates.includes(key)
        ? { ...e, manuallyCrossedDates: [...e.manuallyCrossedDates, key].sort() }
        : e,
    ),
  );
}

export function daysUntil(targetDate: string, today = todayKey()): number {
  return Math.round((fromKey(targetDate).getTime() - fromKey(today).getTime()) / 86400000);
}

export function formatDate(k: string): string {
  return fromKey(k).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}
