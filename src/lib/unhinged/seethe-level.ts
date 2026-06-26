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
  { max: 9, tier: "COMATOSE", tagline: "Stone cold. Touch-grass champion. Embarrassing." },
  { max: 39, tier: "LUKEWARM", tagline: "The grind is fake. Maxx harder." },
  { max: 69, tier: "SIMMERING", tagline: "Warming up. Dangerously mid." },
  { max: 89, tier: "SEETHING", tagline: "Now we're cooking. Based." },
  { max: 100, tier: "MAXXED", tagline: "Token death imminent. Glorious." },
]

/** A provider's most-cooked usage line as a [0,1] fraction, or null if it has none. */
function providerUsageFraction(plugin: PluginDisplayState): number | null {
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
  const band = BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1]
  return { score, tier: band.tier, tagline: band.tagline }
}
