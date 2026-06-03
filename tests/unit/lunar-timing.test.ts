import { describe, expect, it } from "vitest";

import {
  classifyLunarPhaseAngle,
  getLunarTimingFact,
} from "../../src/lib/lunar-timing";

describe("lunar timing", () => {
  it("classifies phase angles into four MVP buckets", () => {
    expect(classifyLunarPhaseAngle(0)).toBe("new");
    expect(classifyLunarPhaseAngle(44.9)).toBe("new");
    expect(classifyLunarPhaseAngle(45)).toBe("waxing");
    expect(classifyLunarPhaseAngle(120)).toBe("waxing");
    expect(classifyLunarPhaseAngle(180)).toBe("full");
    expect(classifyLunarPhaseAngle(224.9)).toBe("full");
    expect(classifyLunarPhaseAngle(225)).toBe("waning");
    expect(classifyLunarPhaseAngle(314.9)).toBe("waning");
    expect(classifyLunarPhaseAngle(315)).toBe("new");
  });

  it("returns a computed new moon timing fact for a known June 2026 lunation", () => {
    const fact = getLunarTimingFact("2026-06-15T03:00:00.000Z");

    expect(fact).toMatchObject({
      type: "moon_phase",
      key: "moon.new",
      phase: "new",
      label: "New moon",
      timezone: "UTC",
      computedBy: "astronomy_engine",
      confidence: "computed",
      relatedSymbolicKeys: ["new_moon"],
    });
    expect(fact.phaseAngleDegrees).toBeLessThan(1);
    expect(fact.dateStart).toBe("2026-06-15T00:00:00.000Z");
    expect(fact.dateEnd).toBe("2026-06-21T23:59:59.999Z");
  });

  it("returns a computed full moon timing fact for a known June 2026 lunation", () => {
    const fact = getLunarTimingFact("2026-06-30T00:00:00.000Z");

    expect(fact.key).toBe("moon.full");
    expect(fact.phase).toBe("full");
    expect(fact.label).toBe("Full moon");
    expect(fact.relatedSymbolicKeys).toEqual(["full_moon"]);
    expect(fact.phaseAngleDegrees).toBeGreaterThan(179);
    expect(fact.phaseAngleDegrees).toBeLessThan(181);
  });

  it("distinguishes waxing and waning fixed dates", () => {
    expect(getLunarTimingFact("2026-06-20T12:00:00.000Z").key).toBe(
      "moon.waxing",
    );
    expect(getLunarTimingFact("2026-07-05T00:00:00.000Z").key).toBe(
      "moon.waning",
    );
  });

  it("is deterministic for Date and ISO string inputs representing the same instant", () => {
    const isoFact = getLunarTimingFact("2026-06-30T00:00:00.000Z");
    const dateFact = getLunarTimingFact(new Date("2026-06-30T00:00:00.000Z"));

    expect(dateFact).toEqual(isoFact);
  });
});
