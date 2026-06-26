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
  hydrate: () => Promise<void>
  setDramaticMode: (value: boolean) => void
  setCopeIntensity: (value: number) => void
}

export const useUnhingedStore = create<UnhingedStore>((set) => ({
  dramaticMode: DEFAULT_DRAMATIC_MODE,
  copeIntensity: DEFAULT_COPE_INTENSITY,
  hydrated: false,
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
}))
