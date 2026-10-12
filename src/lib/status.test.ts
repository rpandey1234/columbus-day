import { describe, expect, it } from "vitest";
import { states } from "../data/states";
import { adoptedStates, displayCategory, indigenousFill } from "./status";

const southDakota = states.find((state) => state.postal === "SD");
const ohio = states.find((state) => state.postal === "OH");
const arizona = states.find((state) => state.postal === "AZ");

describe("displayCategory", () => {
  it("shows current status at the present year", () => {
    expect(southDakota && displayCategory(southDakota, 2026)).toBe("indigenous");
    expect(ohio && displayCategory(ohio, 2026)).toBe("indigenous");
    expect(arizona && displayCategory(arizona, 2026)).toBe("columbus");
  });

  it("adds a state only after its first observance", () => {
    expect(southDakota && displayCategory(southDakota, 1989)).toBe("not-yet");
    expect(southDakota && displayCategory(southDakota, 1990)).toBe("indigenous");
    expect(ohio && displayCategory(ohio, 2025)).toBe("not-yet");
  });

  it("uses a darker green for an earlier Indigenous observance", () => {
    const shade = (postal: string) => {
      const state = states.find((item) => item.postal === postal);
      return state ? indigenousFill(state.firstObservedYear) : "";
    };
    const weight = (hex: string) =>
      Number.parseInt(hex.slice(1, 3), 16) +
      Number.parseInt(hex.slice(3, 5), 16) +
      Number.parseInt(hex.slice(5, 7), 16);

    expect(weight(shade("SD"))).toBeLessThan(weight(shade("AL")));
    expect(weight(shade("AL"))).toBeLessThan(weight(shade("MN")));
    expect(shade("MN")).toBe(shade("VT"));
    expect(weight(shade("MN"))).toBeLessThan(weight(shade("MT")));
    expect(shade("OH")).toBe(shade("MT"));
  });

  it("lists dated adoptions in chronological order", () => {
    const adopted = adoptedStates(states, 2017).map((state) => state.postal);
    expect(adopted).toEqual(["SD", "AL", "MN", "VT", "AK", "OR"]);
  });
});
