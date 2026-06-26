import type { PluginDisplayState } from "@/lib/plugin-types"

// "Seethe Level": an always-on 0-100 vibe score so even a healthy, all-green
// panel says something unhinged. Driven by how hard you're burning across every
// provider (max fraction = how cooked your most-constrained quota is).

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

/** Highest used/limit fraction across all progress lines, clamped to [0,1]. */
function maxUsageFraction(plugins: PluginDisplayState[]): number {
  let max = 0
  for (const plugin of plugins) {
    for (const line of plugin.data?.lines ?? []) {
      if (line.type !== "progress" || line.limit <= 0) continue
      const fraction = line.used / line.limit
      if (Number.isFinite(fraction) && fraction > max) max = fraction
    }
  }
  return Math.min(1, Math.max(0, max))
}

export function computeSeetheLevel(plugins: PluginDisplayState[]): SeetheLevel {
  const score = Math.round(maxUsageFraction(plugins) * 100)
  const band = BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1]
  return { score, tier: band.tier, tagline: band.tagline }
}
