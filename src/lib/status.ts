import type { Category, StateRecord } from "../data/states";
import { currentYear } from "../data/states";

export type DisplayCategory = Category | "not-yet";

export function displayCategory(state: StateRecord, year: number): DisplayCategory {
  if (year >= currentYear) return state.category;
  if (
    state.category === "indigenous" &&
    state.firstObservedYear !== null &&
    state.firstObservedYear <= year
  ) {
    return "indigenous";
  }
  return "not-yet";
}

export function categoryLabel(category: DisplayCategory): string {
  switch (category) {
    case "indigenous":
      return "Indigenous Peoples’ Day";
    case "columbus":
      return "Columbus Day only";
    case "neither":
      return "Does not observe";
    case "not-yet":
      return "Not yet adopted";
  }
}

export function officeLabel(officesClosed: boolean): string {
  return officesClosed ? "State offices closed" : "State offices open";
}

export function adoptedStates(states: StateRecord[], year: number): StateRecord[] {
  return states
    .filter(
      (state) =>
        state.firstObservedYear !== null && state.firstObservedYear <= year,
    )
    .sort((a, b) => {
      const yearGap = (a.firstObservedYear ?? 0) - (b.firstObservedYear ?? 0);
      return yearGap || a.name.localeCompare(b.name);
    });
}
