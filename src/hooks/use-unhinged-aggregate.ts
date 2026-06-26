import type { PluginDisplayState } from "@/lib/plugin-types"
import { aggregateFromScore, computeAggregate, type UnhingedAggregate } from "@/lib/unhinged/aggregate"
import { useUnhingedStore } from "@/stores/unhinged-store"

/** Real aggregate from enabled providers, or the demo override when demo mode is on. */
export function useUnhingedAggregate(plugins: PluginDisplayState[]): UnhingedAggregate {
  const demoMode = useUnhingedStore((s) => s.demoMode)
  const demoScore = useUnhingedStore((s) => s.demoScore)
  return demoMode ? aggregateFromScore(demoScore) : computeAggregate(plugins)
}
