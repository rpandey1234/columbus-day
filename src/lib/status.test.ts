import { describe, expect, it } from "vitest";
import { states } from "../data/states";
import { adoptedStates, displayCategory } from "./status";

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

  it("lists dated adoptions in chronological order", () => {
    const adopted = adoptedStates(states, 2017).map((state) => state.postal);
    expect(adopted).toEqual(["SD", "AL", "MN", "VT", "AK", "OR"]);
  });
});
