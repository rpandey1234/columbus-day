import { nativeSharePercent } from "../data/nativePopulation";
import type { Category, StateRecord } from "../data/states";

export type MapColoring = "status" | "adoption" | "population";

export const lowPopulation = "#e4d3bc";
export const highPopulation = "#3d2414";

const ranked = Object.entries(nativeSharePercent)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .reduce<Record<string, number>>((ranks, [postal, share], index, entries) => {
    const previous = entries[index - 1];
    ranks[postal] = previous && previous[1] === share ? ranks[previous[0]] : index + 1;
    return ranks;
  }, {});

function mixHex(from: string, to: string, amount: number): string {
  const channels = [0, 2, 4].map((offset) => {
    const start = Number.parseInt(from.slice(offset + 1, offset + 3), 16);
    const end = Number.parseInt(to.slice(offset + 1, offset + 3), 16);
    return Math.round(start + (end - start) * amount);
  });
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function nativeShare(postal: string): number {
  const share = nativeSharePercent[postal];
  if (share === undefined) throw new Error(`Missing Native population share for ${postal}`);
  return share;
}

export function nativeRank(postal: string): number {
  const rank = ranked[postal];
  if (rank === undefined) throw new Error(`Missing Native population rank for ${postal}`);
  return rank;
}

export function formatShare(share: number): string {
  return share.toFixed(1);
}

export function populationFill(share: number): string {
  const highest = Math.max(...Object.values(nativeSharePercent));
  return mixHex(lowPopulation, highPopulation, Math.min(1, Math.max(0, share / highest)));
}

export function shareStats(values: number[]): { mean: number; median: number } {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return { mean, median };
}

export function populationReading(category: Category, share: number): string | null {
  if (category !== "indigenous" && share >= 2.5) {
    return "High Native population, but no same-day statewide Indigenous observance.";
  }
  if (category === "indigenous" && share < 0.75) {
    return "This state uses an Indigenous name despite a small Native population share.";
  }
  return null;
}

export function populationExceptions(states: StateRecord[]): {
  highWithoutIndigenousName: StateRecord[];
  lowWithIndigenousName: StateRecord[];
} {
  return {
    highWithoutIndigenousName: states
      .filter((state) => state.category !== "indigenous" && nativeShare(state.postal) >= 2.5)
      .sort((a, b) => nativeShare(b.postal) - nativeShare(a.postal) || a.name.localeCompare(b.name)),
    lowWithIndigenousName: states
      .filter((state) => state.category === "indigenous" && nativeShare(state.postal) < 0.75)
      .sort((a, b) => nativeShare(a.postal) - nativeShare(b.postal) || a.name.localeCompare(b.name)),
  };
}
