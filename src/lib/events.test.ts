import { describe, expect, it } from "vitest";
import { daysUntil, reconcile, type DaysEvent } from "./events";

const base: DaysEvent = {
  id: "1",
  name: "Trip",
  targetDate: "2026-11-10",
  isPinned: false,
  manuallyCrossedDates: [],
  createdAt: "2026-10-27",
};

describe("reconcile", () => {
  it("crosses out past days the user forgot, but not today", () => {
    const [e] = reconcile([base], "2026-10-30");
    expect(e?.manuallyCrossedDates).toEqual(["2026-10-27", "2026-10-28", "2026-10-29"]);
  });
});

describe("daysUntil", () => {
  it("counts days to target", () => {
    expect(daysUntil("2026-11-10", "2026-10-30")).toBe(11);
  });
});
