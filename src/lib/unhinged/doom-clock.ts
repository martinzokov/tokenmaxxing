import type { PluginDisplayState } from "@/lib/plugin-types"
import { calculatePaceStatus } from "@/lib/pace-status"
import { formatCompactDuration } from "@/lib/pace-tooltip"

export type DoomClock = {
  providerName: string
  etaMs: number
  durationText: string
  message: string
}

/** Escalating doom as the wall gets closer. */
export function doomMessageForEta(etaMs: number): string {
  const minutes = etaMs / 60_000
  if (minutes <= 30) return "It is happening. Say goodbye to your quota."
  if (minutes <= 120) return "The wall is in sight. There is no slowing down now."
  if (minutes <= 12 * 60) return "Hours left. The seethe builds."
  if (minutes <= 48 * 60) return "The clock is ticking, promptlet."
  return "Plenty of runway. Embarrassing, honestly."
}

/**
 * Find the provider that will hit its limit soonest (behind pace, ETA before
 * reset) and build a doom-clock readout. Returns null if nobody is doomed.
 */
export function computeDoomClock(
  plugins: PluginDisplayState[],
  nowMs: number
): DoomClock | null {
  let soonest: { providerName: string; etaMs: number } | null = null

  for (const plugin of plugins) {
    for (const line of plugin.data?.lines ?? []) {
      if (line.type !== "progress") continue
      if (!line.resetsAt || !line.periodDurationMs) continue
      const resetsAtMs = Date.parse(line.resetsAt)
      if (!Number.isFinite(resetsAtMs)) continue

      const pace = calculatePaceStatus(line.used, line.limit, resetsAtMs, line.periodDurationMs, nowMs)
      if (!pace || pace.status !== "behind") continue

      const rate = pace.projectedUsage / line.periodDurationMs
      if (rate <= 0) continue
      const etaMs = (line.limit - line.used) / rate
      const remainingMs = resetsAtMs - nowMs
      if (etaMs <= 0 || etaMs >= remainingMs) continue

      if (!soonest || etaMs < soonest.etaMs) {
        soonest = { providerName: plugin.meta.name, etaMs }
      }
    }
  }

  if (!soonest) return null
  const durationText = formatCompactDuration(soonest.etaMs)
  if (!durationText) return null

  return {
    providerName: soonest.providerName,
    etaMs: soonest.etaMs,
    durationText,
    message: doomMessageForEta(soonest.etaMs),
  }
}
