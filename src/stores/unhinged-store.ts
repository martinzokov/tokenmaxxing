import { create } from "zustand"
import {
  DEFAULT_COPE_INTENSITY,
  DEFAULT_DRAMATIC_MODE,
  clampCopeIntensity,
  loadCopeIntensity,
  loadDramaticMode,
  saveCopeIntensity,
  saveDramaticMode,
} from "@/lib/unhinged/unhinged-settings"

type UnhingedStore = {
  dramaticMode: boolean
  copeIntensity: number
  hydrated: boolean
  // Demo mode is an ephemeral preview tool (not persisted): scrub demoScore to
  // drive the unhinged UI through every state.
  demoMode: boolean
  demoScore: number
  hydrate: () => Promise<void>
  setDramaticMode: (value: boolean) => void
  setCopeIntensity: (value: number) => void
  setDemoMode: (value: boolean) => void
  setDemoScore: (value: number) => void
}

export const useUnhingedStore = create<UnhingedStore>((set) => ({
  dramaticMode: DEFAULT_DRAMATIC_MODE,
  copeIntensity: DEFAULT_COPE_INTENSITY,
  hydrated: false,
  demoMode: false,
  demoScore: 50,
  hydrate: async () => {
    try {
      const [dramaticMode, copeIntensity] = await Promise.all([
        loadDramaticMode(),
        loadCopeIntensity(),
      ])
      set({ dramaticMode, copeIntensity, hydrated: true })
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
  setDemoMode: (value) => set({ demoMode: value }),
  setDemoScore: (value) => {
    const clamped = Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : 50
    set({ demoScore: clamped })
  },
}))
