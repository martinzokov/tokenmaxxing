import type { PluginDisplayState } from "@/lib/plugin-types"
import { computeSeetheLevel, providerUsageFraction, seetheBandForScore } from "@/lib/unhinged/seethe-level"
import { rankForScore, type Rank } from "@/lib/unhinged/ranks"

// The DoomTokenMaxxer brain: one unhinged readout aggregated from every real,
// enabled provider. Lives in the frontend because sandboxed plugins can't see
// each other — the React side is the only place that holds all provider state.

export type UnhingedAggregate = {
  score: number // 0-100 seethe
  tier: string
  tagline: string
  rank: Rank
  usageFraction: number // score / 100, for the Oracle
  cooked: number // providers at/over 80%
  total: number // providers with any usage line
  hottestProvider: string | null
}

const COOKED_THRESHOLD = 0.8

export function computeAggregate(plugins: PluginDisplayState[]): UnhingedAggregate {
  const { score, tier, tagline } = computeSeetheLevel(plugins)

  let cooked = 0
  let total = 0
  let hottestProvider: string | null = null
  let hottestFraction = -1

  for (const plugin of plugins) {
    const fraction = providerUsageFraction(plugin)
    if (fraction === null) continue
    total += 1
    if (fraction >= COOKED_THRESHOLD) cooked += 1
    if (fraction > hottestFraction) {
      hottestFraction = fraction
      hottestProvider = plugin.meta.name
    }
  }

  return {
    score,
    tier,
    tagline,
    rank: rankForScore(score),
    usageFraction: score / 100,
    cooked,
    total,
    hottestProvider,
  }
}

/** Demo override: synthesize a plausible aggregate from a chosen 0-100 score. */
export function aggregateFromScore(score: number): UnhingedAggregate {
  const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : 0
  const fraction = clamped / 100
  return {
    score: clamped,
    ...seetheBandForScore(clamped),
    rank: rankForScore(clamped),
    usageFraction: fraction,
    cooked: fraction >= COOKED_THRESHOLD ? 1 : 0,
    total: 1,
    hottestProvider: "DEMO",
  }
}
