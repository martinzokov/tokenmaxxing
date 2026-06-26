import { describe, expect, it } from "vitest"
import type { PluginDisplayState } from "@/lib/plugin-types"
import { aggregateFromScore, computeAggregate } from "@/lib/unhinged/aggregate"

function plugin(name: string, used: number, limit: number): PluginDisplayState {
  return {
    meta: { id: name, name, iconUrl: "", lines: [], primaryCandidates: [] },
    data: {
      providerId: name,
      displayName: name,
      iconUrl: "",
      lines: [{ type: "progress", label: "U", used, limit, format: { kind: "percent" } }],
    },
    loading: false,
    error: null,
    lastManualRefreshAt: null,
    lastUpdatedAt: null,
  }
}

describe("computeAggregate", () => {
  it("aggregates real providers into score + rank + cooked count", () => {
    const agg = computeAggregate([plugin("A", 90, 100), plugin("B", 10, 100)])
    expect(agg.score).toBe(50) // (0.9 + 0.1) / 2
    expect(agg.rank.name).toBe("Quota Grinder")
    expect(agg.cooked).toBe(1) // only A >= 80%
    expect(agg.total).toBe(2)
    expect(agg.hottestProvider).toBe("A")
    expect(agg.usageFraction).toBeCloseTo(0.5)
  })

  it("reports empty state cleanly", () => {
    const agg = computeAggregate([])
    expect(agg.score).toBe(0)
    expect(agg.rank.name).toBe("Promptlet")
    expect(agg.total).toBe(0)
    expect(agg.hottestProvider).toBeNull()
  })
})

describe("aggregateFromScore", () => {
  it("synthesizes a demo aggregate from a chosen score", () => {
    const agg = aggregateFromScore(85)
    expect(agg.score).toBe(85)
    expect(agg.tier).toBe("SEETHING")
    expect(agg.rank.name).toBe("Quota Chad")
    expect(agg.cooked).toBe(1)
    expect(agg.hottestProvider).toBe("DEMO")
  })

  it("clamps demo score", () => {
    expect(aggregateFromScore(999).score).toBe(100)
    expect(aggregateFromScore(-10).score).toBe(0)
    expect(aggregateFromScore(NaN).score).toBe(0)
  })
})
