import type { Category, StateRecord } from "../data/states";
import { currentYear, states } from "../data/states";

export type DisplayCategory = Category | "not-yet";

export const earlyIndigenous = "#063526";
export const lateIndigenous = "#8fcebb";

const adoptionYears = states
  .map((state) => state.firstObservedYear)
  .filter((year): year is number => year !== null);
const earliestAdoption = Math.min(...adoptionYears);
const latestAdoption = Math.max(...adoptionYears);

function mixHex(from: string, to: string, amount: number): string {
  const channels = [0, 2, 4].map((offset) => {
    const start = Number.parseInt(from.slice(offset + 1, offset + 3), 16);
    const end = Number.parseInt(to.slice(offset + 1, offset + 3), 16);
    return Math.round(start + (end - start) * amount);
  });
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function indigenousFill(firstObservedYear: number | null): string {
  if (firstObservedYear === null || earliestAdoption === latestAdoption) {
    return lateIndigenous;
  }
  const amount =
    (firstObservedYear - earliestAdoption) / (latestAdoption - earliestAdoption);
  return mixHex(earlyIndigenous, lateIndigenous, Math.min(1, Math.max(0, amount)));
}

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
