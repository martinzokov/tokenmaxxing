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

  it("averages providers so one spike does not pin the score", () => {
    // 10% and 85% average to ~48, not 85 — each provider votes once.
    const s = computeSeetheLevel([plugin(10, 100), plugin(85, 100)])
    expect(s.score).toBe(48)
    expect(s.tier).toBe("SIMMERING")
  })

  it("clamps a single over-limit provider to 100", () => {
    const s = computeSeetheLevel([plugin(1337, 100)])
    expect(s.score).toBe(100)
    expect(s.tier).toBe("!!! MAXXED !!!")
    expect(s.tagline).toBe("TOKEN DEATH IS HERE. NO REFUNDS. GLORIOUS.")
  })

  it("a maxed demo provider does not pin a panel full of headroom", () => {
    // Four real providers at ~20% + one over-limit demo: well below MAXXED.
    const s = computeSeetheLevel([
      plugin(20, 100),
      plugin(20, 100),
      plugin(20, 100),
      plugin(20, 100),
      plugin(1337, 100),
    ])
    expect(s.score).toBe(36)
    expect(s.tier).toBe("LUKEWARM")
  })

  it("ignores zero/invalid limits", () => {
    const s = computeSeetheLevel([plugin(50, 0)])
    expect(s.score).toBe(0)
  })
})
