import { describe, expect, it } from "vitest";
import {
  currentYear,
  dataCurrentAsOf,
  milestones,
  states,
  timelineStart,
} from "./states";
import type { Category } from "./states";

const categories: Category[] = ["indigenous", "columbus", "neither"];

describe("state dataset", () => {
  it("contains each state once", () => {
    expect(states).toHaveLength(50);
    expect(new Set(states.map((state) => state.postal)).size).toBe(50);
    expect(new Set(states.map((state) => state.fips)).size).toBe(50);
    expect(new Set(states.map((state) => state.name)).size).toBe(50);
  });

  it("uses two-digit FIPS codes and uppercase postal codes", () => {
    for (const state of states) {
      expect(state.fips).toMatch(/^\d{2}$/);
      expect(state.postal).toMatch(/^[A-Z]{2}$/);
      expect(categories).toContain(state.category);
    }
  });

  it("gives every state a source URL", () => {
    for (const state of states) {
      expect(state.sources.length).toBeGreaterThan(0);
      for (const source of state.sources) {
        expect(source.label.length).toBeGreaterThan(0);
        expect(source.url).toMatch(/^https?:\/\//);
      }
    }
  });

  it("keeps Indigenous year fields consistent", () => {
    for (const state of states) {
      if (state.category === "indigenous") {
        expect(state.observanceName).toBeTruthy();
      } else {
        expect(state.firstObservedYear).toBeNull();
        expect(state.permanentLawYear).toBeNull();
      }

      if (state.permanentLawYear !== null) {
        expect(state.firstObservedYear).not.toBeNull();
        expect(state.permanentLawYear).toBeGreaterThanOrEqual(
          state.firstObservedYear ?? 0,
        );
      }

      if (state.category === "neither") {
        expect(state.alsoColumbusDay).toBe(false);
        expect(state.officesClosed).toBe(false);
        expect(state.observanceName).toBeNull();
      }

      if (state.category === "columbus") {
        expect(state.alsoColumbusDay).toBe(true);
        expect(state.observanceName).toBeTruthy();
      }
    }
  });

  it("leaves Ohio, Pennsylvania, and Rhode Island undated", () => {
    for (const postal of ["OH", "PA", "RI"]) {
      const state = states.find((item) => item.postal === postal);
      expect(state?.category).toBe("indigenous");
      expect(state?.firstObservedYear).toBeNull();
      expect(state?.permanentLawYear).toBeNull();
      expect(state?.alsoColumbusDay).toBe(true);
    }
  });

  it("records the researched adoption years", () => {
    const years = Object.fromEntries(
      states
        .filter((state) => state.firstObservedYear !== null)
        .map((state) => [state.postal, state.firstObservedYear]),
    );
    expect(years).toEqual({
      SD: 1990,
      AL: 2000,
      MN: 2016,
      VT: 2016,
      AK: 2017,
      OR: 2017,
      OK: 2018,
      CA: 2019,
      ME: 2019,
      NM: 2019,
      WI: 2019,
      NE: 2020,
      HI: 2023,
      MT: 2025,
    });
  });

  it("publishes the national milestones and the review date", () => {
    expect(milestones.map((milestone) => milestone.year)).toEqual([
      1977, 1992, 2021,
    ]);
    expect(timelineStart).toBe(1977);
    expect(currentYear).toBe(2026);
    expect(dataCurrentAsOf).toBe("2026-10-12");
  });
});
