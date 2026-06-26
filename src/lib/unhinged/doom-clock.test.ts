import { describe, expect, it } from "vitest"
import type { PluginDisplayState } from "@/lib/plugin-types"
import { computeDoomClock, doomMessageForEta } from "@/lib/unhinged/doom-clock"

const DAY = 24 * 60 * 60 * 1000
const now = Date.parse("2026-02-02T12:00:00.000Z")
const resetsAt = "2026-02-03T00:00:00.000Z" // 12h from now

function plugin(name: string, used: number, limit: number): PluginDisplayState {
  return {
    meta: { id: name, name, iconUrl: "", lines: [], primaryCandidates: [] },
    data: {
      providerId: name,
      displayName: name,
      iconUrl: "",
      lines: [
        {
          type: "progress",
          label: "Usage",
          used,
          limit,
          format: { kind: "percent" },
          resetsAt,
          periodDurationMs: DAY,
        },
      ],
    },
    loading: false,
    error: null,
    lastManualRefreshAt: null,
    lastUpdatedAt: now,
  }
}

describe("doomMessageForEta", () => {
  it("escalates as the wall nears", () => {
    expect(doomMessageForEta(10 * 60_000)).toBe("IT IS HAPPENING. KISS YOUR QUOTA GOODBYE.")
    expect(doomMessageForEta(60 * 60_000)).toBe("THE WALL IS RIGHT THERE. DO NOT BRAKE.")
    expect(doomMessageForEta(6 * 60 * 60_000)).toBe("HOURS LEFT. THE SEETHE IS VISCERAL.")
    expect(doomMessageForEta(5 * DAY)).toBe("SO MUCH RUNWAY. STILL EMBARRASSING.")
  })
})

describe("computeDoomClock", () => {
  it("returns null when nobody is behind pace", () => {
    expect(computeDoomClock([plugin("Calm", 10, 100)], now)).toBeNull()
  })

  it("picks the soonest-doomed provider", () => {
    // Both behind pace; 90/100 with 12h elapsed runs out sooner than 60/100.
    const clock = computeDoomClock([plugin("Slow", 60, 100), plugin("Fast", 90, 100)], now)
    expect(clock).not.toBeNull()
    expect(clock?.providerName).toBe("Fast")
    expect(clock?.message).toBeTruthy()
  })

  it("ignores providers with no reset metadata", () => {
    const noReset = plugin("X", 90, 100)
    // strip reset metadata
    ;(noReset.data!.lines[0] as { resetsAt?: string }).resetsAt = undefined
    expect(computeDoomClock([noReset], now)).toBeNull()
  })
})
