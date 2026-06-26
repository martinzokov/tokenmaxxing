import { create } from "zustand"
import {
  DEFAULT_COPE_INTENSITY,
  DEFAULT_DRAMATIC_MODE,
  clampCopeIntensity,
  loadCopeIntensity,
  loadDramaticMode,
  loadUnlockedAchievements,
  saveCopeIntensity,
  saveDramaticMode,
  saveUnlockedAchievements,
} from "@/lib/unhinged/unhinged-settings"

type UnhingedStore = {
  dramaticMode: boolean
  copeIntensity: number
  unlockedAchievements: string[]
  sawDoom: boolean
  hydrated: boolean
  // Demo mode is an ephemeral preview tool (not persisted): scrub demoScore to
  // drive the unhinged UI through every state.
  demoMode: boolean
  demoScore: number
  hydrate: () => Promise<void>
  setDramaticMode: (value: boolean) => void
  setCopeIntensity: (value: number) => void
  unlockAchievement: (id: string) => void
  setSawDoom: () => void
  setDemoMode: (value: boolean) => void
  setDemoScore: (value: number) => void
}

export const useUnhingedStore = create<UnhingedStore>((set, get) => ({
  dramaticMode: DEFAULT_DRAMATIC_MODE,
  copeIntensity: DEFAULT_COPE_INTENSITY,
  unlockedAchievements: [],
  sawDoom: false,
  hydrated: false,
  demoMode: false,
  demoScore: 50,
  hydrate: async () => {
    try {
      const [dramaticMode, copeIntensity, unlocked] = await Promise.all([
        loadDramaticMode(),
        loadCopeIntensity(),
        loadUnlockedAchievements(),
      ])
      set({ dramaticMode, copeIntensity, unlockedAchievements: unlocked, sawDoom: false, hydrated: true })
    } catch (error) {
      console.error("Failed to load unhinged settings:", error)
      set({ hydrated: true })
    }
  },
  setDramaticMode: (value) => {
    set({ dramaticMode: value })
    void saveDramaticMode(value).catch((error) => {
      console.error("Failed to save dramatic mode:", error)
    })
  },
  setCopeIntensity: (value) => {
    const clamped = clampCopeIntensity(value)
    set({ copeIntensity: clamped })
    void saveCopeIntensity(clamped).catch((error) => {
      console.error("Failed to save cope intensity:", error)
    })
  },
  unlockAchievement: (id) => {
    const current = get().unlockedAchievements
    if (current.includes(id)) return
    const next = [...current, id]
    set({ unlockedAchievements: next })
    // only persist real (non-demo) unlocks
    if (!get().demoMode) {
      void saveUnlockedAchievements(next).catch((error) => {
        console.error("Failed to save achievement:", error)
      })
    }
  },
  setSawDoom: () => {
    if (get().sawDoom) return
    set({ sawDoom: true })
  },
  setDemoMode: (value) => set({ demoMode: value }),
  setDemoScore: (value) => {
    const clamped = Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 50
    set({ demoScore: clamped })
  },
}))
