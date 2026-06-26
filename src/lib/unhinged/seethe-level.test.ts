import { describe, expect, it } from "vitest"
import type { PluginDisplayState } from "@/lib/plugin-types"
import { computeSeetheLevel } from "@/lib/unhinged/seethe-level"

function plugin(used: number, limit: number): PluginDisplayState {
  return {
    meta: { id: "p", name: "P", iconUrl: "", lines: [], primaryCandidates: [] },
    data: {
      providerId: "p",
      displayName: "P",
      iconUrl: "",
      lines: [{ type: "progress", label: "U", used, limit, format: { kind: "percent" } }],
    },
    loading: false,
    error: null,
    lastManualRefreshAt: null,
    lastUpdatedAt: null,
  }
}

describe("computeSeetheLevel", () => {
  it("is COMATOSE with no providers", () => {
    const s = computeSeetheLevel([])
    expect(s.score).toBe(0)
    expect(s.tier).toBe("COMATOSE")
  })

  it("tracks the most-burned provider", () => {
    const s = computeSeetheLevel([plugin(10, 100), plugin(85, 100)])
    expect(s.score).toBe(85)
    expect(s.tier).toBe("SEETHING")
  })

  it("clamps over-limit to MAXXED at 100", () => {
    const s = computeSeetheLevel([plugin(1337, 100)])
    expect(s.score).toBe(100)
    expect(s.tier).toBe("MAXXED")
  })

  it("ignores zero/invalid limits", () => {
    const s = computeSeetheLevel([plugin(50, 0)])
    expect(s.score).toBe(0)
  })
})
