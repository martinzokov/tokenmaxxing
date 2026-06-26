import type { PluginDisplayState } from "@/lib/plugin-types"

// "Seethe Level": an always-on 0-100 vibe score so even a healthy, all-green
// panel says something unhinged. Each provider votes once with its most-cooked
// usage line; the score is the average across providers. Averaging (not a global
// max) keeps one maxed sub-limit — or a demo plugin — from pinning you to MAXXED
// while your real bars still have plenty left.

export type SeetheLevel = {
  score: number
  tier: string
  tagline: string
}

const BANDS: { max: number; tier: string; tagline: string }[] = [
  { max: 9, tier: "COMATOSE", tagline: "Stone cold. Touch-grass champion. Genuinely embarrassing." },
  { max: 39, tier: "LUKEWARM", tagline: "The grind is fake. Maxx harder or stay mid forever." },
  { max: 69, tier: "SIMMERING", tagline: "Warming up. Dangerously mid. The quota can smell you." },
  { max: 89, tier: "SEETHING", tagline: "FULL SEND. THE QUOTA FEELS NOTHING. BASED." },
  { max: 100, tier: "!!! MAXXED !!!", tagline: "TOKEN DEATH IS HERE. NO REFUNDS. GLORIOUS." },
]

/** Tier + tagline for a 0-100 score. Exported so demo mode can synthesize a band. */
export function seetheBandForScore(score: number): { tier: string; tagline: string } {
  const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : 0
  const band = BANDS.find((b) => clamped <= b.max) ?? BANDS[BANDS.length - 1]
  return { tier: band.tier, tagline: band.tagline }
}

/** A provider's most-cooked usage line as a [0,1] fraction, or null if it has none. */
export function providerUsageFraction(plugin: PluginDisplayState): number | null {
  let max: number | null = null
  for (const line of plugin.data?.lines ?? []) {
    if (line.type !== "progress" || line.limit <= 0) continue
    const fraction = line.used / line.limit
    if (!Number.isFinite(fraction)) continue
    const clamped = Math.min(1, Math.max(0, fraction))
    if (max === null || clamped > max) max = clamped
  }
  return max
}

/** Average of each provider's most-cooked usage fraction, [0,1]. */
function overallSeetheFraction(plugins: PluginDisplayState[]): number {
  const fractions: number[] = []
  for (const plugin of plugins) {
    const fraction = providerUsageFraction(plugin)
    if (fraction !== null) fractions.push(fraction)
  }
  if (fractions.length === 0) return 0
  return fractions.reduce((sum, f) => sum + f, 0) / fractions.length
}

export function computeSeetheLevel(plugins: PluginDisplayState[]): SeetheLevel {
  const score = Math.round(overallSeetheFraction(plugins) * 100)
  return { score, ...seetheBandForScore(score) }
}
