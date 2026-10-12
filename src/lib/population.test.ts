import { describe, expect, it } from "vitest";
import { states } from "../data/states";
import { nativeSharePercent } from "../data/nativePopulation";
import {
  formatShare,
  nativeRank,
  nativeShare,
  populationExceptions,
  populationFill,
  populationReading,
  shareStats,
} from "./population";

describe("native population", () => {
  it("covers every state once", () => {
    const postals = states.map((state) => state.postal);
    expect(Object.keys(nativeSharePercent).sort()).toEqual([...postals].sort());
    expect(new Set(Object.keys(nativeSharePercent)).size).toBe(50);
  });

  it("ranks Alaska first and West Virginia last", () => {
    expect(nativeRank("AK")).toBe(1);
    expect(nativeRank("WV")).toBe(50);
    expect(nativeShare("AK")).toBeGreaterThan(nativeShare("NM"));
  });

  it("gives Indigenous Peoples’ Day states the higher average share", () => {
    const shares = (category: string) =>
      states.filter((state) => state.category === category).map((state) => nativeShare(state.postal));
    const indigenous = shareStats(shares("indigenous"));
    const columbus = shareStats(shares("columbus"));
    expect(indigenous.mean).toBeGreaterThan(columbus.mean);
    expect(formatShare(indigenous.mean)).toBe("3.7");
    expect(formatShare(columbus.mean)).toBe("1.0");
    expect(formatShare(indigenous.median)).toBe("1.4");
  });

  it("uses a darker color for a larger population share", () => {
    const weight = (hex: string) =>
      Number.parseInt(hex.slice(1, 3), 16) +
      Number.parseInt(hex.slice(3, 5), 16) +
      Number.parseInt(hex.slice(5, 7), 16);
    expect(weight(populationFill(nativeShare("AK")))).toBeLessThan(
      weight(populationFill(nativeShare("WV"))),
    );
  });

  it("names the population exceptions", () => {
    const exceptions = populationExceptions(states);
    expect(exceptions.highWithoutIndigenousName.map((state) => state.postal)).toEqual([
      "AZ",
      "ND",
      "WY",
    ]);
    expect(exceptions.lowWithIndigenousName.map((state) => state.postal)).toContain("HI");
    expect(exceptions.lowWithIndigenousName.map((state) => state.postal)).toContain("VT");
    expect(exceptions.lowWithIndigenousName.map((state) => state.postal)).toContain("AL");
    expect(populationReading("columbus", nativeShare("AZ"))).toMatch(/High Native population/);
    expect(populationReading("indigenous", nativeShare("VT"))).toMatch(/small Native population/);
  });
});
