import type { PluginDisplayState } from "@/lib/plugin-types"

// The Token Oracle: curated copium. Pure + deterministic given a seed so it's
// testable. Pools are picked by how cooked you are (max usage fraction); cope
// intensity decides how unhinged the line is allowed to get.

export type OracleTier = "chill" | "coping" | "doom"

const ORACLE_LINES: Record<OracleTier, string[]> = {
  chill: [
    "Real ones hit the limit before lunch. You're still in bed.",
    "Your context window is too small, king. Expand or stay a promptlet.",
    "Touching grass is just cope for people who can't afford the Max plan.",
    "Negative tokens burned is a skill issue.",
    "Your commit history is 90% 'fix typo'. The tokens know.",
  ],
  coping: [
    "The quota fears you. Keep going.",
    "Every parallel agent is a soldier. Send more.",
    "You're not addicted, you're optimizing. There's a difference. Probably.",
    "Mogging the free tier was never the goal. Mog yourself.",
    "Sleep is for people who haven't discovered agent swarms yet.",
  ],
  doom: [
    "TOKEN DEATH approaches. Make peace, then refresh.",
    "Your quota is on its knees. Finish it.",
    "The wall is real and you are running at it. Based.",
    "Rate limit incoming. This is the most alive you'll feel all week.",
    "THE WALL IS NOT A METAPHOR. IT IS TUESDAY.",
  ],
}

function tierForUsage(maxUsageFraction: number): OracleTier {
  if (maxUsageFraction >= 0.8) return "doom"
  if (maxUsageFraction >= 0.4) return "coping"
  return "chill"
}

/**
 * Pick an oracle line.
 * @param maxUsageFraction highest used/limit across providers (0..1+)
 * @param copeIntensity 0..100; below 25 stays in the chill pool no matter what
 * @param seed integer used to rotate deterministically (e.g. refresh count)
 */
export function pickOracleQuote(
  maxUsageFraction: number,
  copeIntensity: number,
  seed: number
): string {
  const usage = Number.isFinite(maxUsageFraction) ? Math.max(0, maxUsageFraction) : 0
  const cope = Number.isFinite(copeIntensity) ? copeIntensity : 50
  // Low cope = stay calm even when the bars are red.
  const tier = cope < 25 ? "chill" : tierForUsage(usage)
  const pool = ORACLE_LINES[tier]
  const safeSeed = Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) : 0
  return pool[safeSeed % pool.length]
}

/**
 * Reduce live plugin state into the two inputs the oracle needs: the highest
 * used/limit fraction across all progress lines, and a seed that changes each
 * time the data refreshes (so the line rotates on refresh).
 */
export function oracleInputsFromPlugins(
  plugins: PluginDisplayState[]
): { maxUsageFraction: number; seed: number } {
  let maxUsageFraction = 0
  let seed = 0
  for (const plugin of plugins) {
    if (plugin.lastUpdatedAt) seed += plugin.lastUpdatedAt
    for (const line of plugin.data?.lines ?? []) {
      if (line.type !== "progress" || line.limit <= 0) continue
      const fraction = line.used / line.limit
      if (Number.isFinite(fraction) && fraction > maxUsageFraction) {
        maxUsageFraction = fraction
      }
    }
  }
  return { maxUsageFraction, seed: Math.trunc(seed / 1000) }
}
