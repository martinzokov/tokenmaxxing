import type { PluginDisplayState } from "@/lib/plugin-types"
import { ACHIEVEMENTS, checkAchievement } from "@/lib/unhinged/achievements"
import { useUnhingedAggregate } from "./use-unhinged-aggregate"
import { useUnhingedStore } from "@/stores/unhinged-store"
import { useEffect } from "react"

export function useUnhingedAchievements(plugins: PluginDisplayState[], hasDoom: boolean) {
  const dramaticMode = useUnhingedStore((s) => s.dramaticMode)
  const demoMode = useUnhingedStore((s) => s.demoMode)
  const sawDoom = useUnhingedStore((s) => s.sawDoom)
  const unlock = useUnhingedStore((s) => s.unlockAchievement)
  const agg = useUnhingedAggregate(plugins)

  useEffect(() => {
    if (!dramaticMode) return
    const currentDoom = hasDoom || sawDoom
    for (const ach of ACHIEVEMENTS) {
      if (checkAchievement(ach.id, agg, dramaticMode, demoMode, currentDoom)) {
        unlock(ach.id)
      }
    }
  }, [agg.score, agg.cooked, hasDoom, sawDoom, dramaticMode, demoMode, unlock])

  // auto mark sawDoom if passed
  useEffect(() => {
    if (hasDoom) {
      useUnhingedStore.getState().setSawDoom()
    }
  }, [hasDoom])

  return useUnhingedStore((s) => s.unlockedAchievements)
}
