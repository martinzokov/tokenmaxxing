import { describe, expect, it } from "vitest"
import type { PaceResult } from "@/lib/pace-status"
import {
  formatDeficitText,
  formatRunsOutText,
  getPaceStatusText,
} from "@/lib/pace-tooltip"
import { formatResetRelativeLabel } from "@/lib/reset-tooltip"
import { aggregateFromScore } from "@/lib/unhinged/aggregate"
import { doomMessageForEta } from "@/lib/unhinged/doom-clock"
import { formatDramaticPrimaryValue } from "@/lib/unhinged/dramatic-primary"
import { rankForScore } from "@/lib/unhinged/ranks"
import { seetheBandForScore } from "@/lib/unhinged/seethe-level"
import { pickOracleQuote } from "@/lib/unhinged/token-oracle"

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const resetsAtMs = Date.parse("2026-02-03T00:00:00.000Z")
const nowMs = Date.parse("2026-02-02T12:00:00.000Z")

/** Logs extreme outputs so verification captures literal strings in test output. */
function logEvidence(label: string, value: string) {
  console.log(`[unhinged-evidence] ${label}: ${value}`)
}

describe("extreme strings evidence", () => {
  it("emits escalated dramatic outputs at demoScore 95+", () => {
    const paceBehind = getPaceStatusText("behind", true)
    const paceAhead = getPaceStatusText("ahead", true)
    const deficit = formatDeficitText(5, { kind: "percent" }, "left", true)
    const runsOut = formatRunsOutText({
      paceResult: { status: "behind", projectedUsage: 200 } as PaceResult,
      used: 80,
      limit: 100,
      periodDurationMs: ONE_DAY_MS,
      resetsAtMs,
      nowMs,
      dramatic: true,
    })
    const reset = formatResetRelativeLabel(nowMs, "2026-02-02T14:00:00.000Z", true)
    const oracle = pickOracleQuote(0.95, 50, 4)
    const doom = doomMessageForEta(10 * 60_000)
    const band = seetheBandForScore(95)
    const rank = rankForScore(95)
    const agg = aggregateFromScore(95)
    const primaryLeftPct = formatDramaticPrimaryValue(40, { kind: "percent" }, "left")
    const primaryUsedPct = formatDramaticPrimaryValue(93, { kind: "percent" }, "used")

    logEvidence("paceBehind", paceBehind)
    logEvidence("paceAhead", paceAhead)
    logEvidence("deficit", deficit!)
    logEvidence("runsOut", runsOut!)
    logEvidence("reset", reset!)
    logEvidence("oracle", oracle)
    logEvidence("doom", doom)
    logEvidence("tier", band.tier)
    logEvidence("tagline", band.tagline)
    logEvidence("rankBlurb", rank.blurb)
    logEvidence("aggTier", agg.tier)
    logEvidence("primaryLeftPct", primaryLeftPct)
    logEvidence("primaryUsedPct", primaryUsedPct)

    expect(paceBehind).toBe("!!! TOKEN DEATH IMMINENT !!!")
    expect(paceAhead).toBe("COPING LIKE A PROMPTLET (barely)")
    expect(deficit).toBe("5% OBLITERATED")
    expect(runsOut).toMatch(/^!!! TOKEN DEATH in /)
    expect(reset).toBe("RESPAWNS in 2h 0m")
    expect(oracle).toBe("THE WALL IS NOT A METAPHOR. IT IS TUESDAY.")
    expect(doom).toBe("IT IS HAPPENING. KISS YOUR QUOTA GOODBYE.")
    expect(band.tier).toBe("!!! MAXXED !!!")
    expect(rank.blurb).toBe("ASCENDED. THE DATACENTER KNOWS YOUR NAME.")
    expect(agg.tier).toBe("!!! MAXXED !!!")

    expect(primaryLeftPct).toBe("40% TO GO")
    expect(primaryUsedPct).toBe("93% OBLITERATED")
  })

  it("keeps sane-mode strings byte-for-byte at dramatic=false", () => {
    const paceAhead = getPaceStatusText("ahead", false)
    const paceOnTrack = getPaceStatusText("on-track", false)
    const paceBehind = getPaceStatusText("behind", false)
    const reset = formatResetRelativeLabel(nowMs, "2026-02-02T14:00:00.000Z", false)
    const runsOut = formatRunsOutText({
      paceResult: { status: "behind", projectedUsage: 200 } as PaceResult,
      used: 80,
      limit: 100,
      periodDurationMs: ONE_DAY_MS,
      resetsAtMs,
      nowMs,
      dramatic: false,
    })

    logEvidence("sane-ahead", paceAhead)
    logEvidence("sane-onTrack", paceOnTrack)
    logEvidence("sane-behind", paceBehind)
    logEvidence("sane-reset", reset!)
    logEvidence("sane-runsOut", runsOut!)

    expect(paceAhead).toBe("Plenty of room")
    expect(paceOnTrack).toBe("Right on target")
    expect(paceBehind).toBe("Will run out")
    expect(reset).toBe("Resets in 2h 0m")
    expect(runsOut).toMatch(/^Runs out in /)
  })
})