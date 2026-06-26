import { beforeEach, describe, expect, it } from "vitest"
import {
  DEFAULT_COPE_INTENSITY,
  DEFAULT_DRAMATIC_MODE,
  clampCopeIntensity,
  loadCopeIntensity,
  loadDramaticMode,
  saveCopeIntensity,
  saveDramaticMode,
} from "@/lib/unhinged/unhinged-settings"
import { getSettingsStoreMocks } from "@/test/settings-store-mock"

const { storeState, resetSettingsStoreMock } = getSettingsStoreMocks()

describe("unhinged settings", () => {
  beforeEach(() => {
    resetSettingsStoreMock()
  })

  it("defaults dramatic mode on when missing", async () => {
    await expect(loadDramaticMode()).resolves.toBe(DEFAULT_DRAMATIC_MODE)
  })

  it("round-trips dramatic mode", async () => {
    await saveDramaticMode(false)
    await expect(loadDramaticMode()).resolves.toBe(false)
  })

  it("ignores non-boolean dramatic mode", async () => {
    storeState.set("dramaticMode", "yes")
    await expect(loadDramaticMode()).resolves.toBe(DEFAULT_DRAMATIC_MODE)
  })

  it("defaults cope intensity when missing", async () => {
    await expect(loadCopeIntensity()).resolves.toBe(DEFAULT_COPE_INTENSITY)
  })

  it("round-trips and clamps cope intensity", async () => {
    await saveCopeIntensity(150)
    await expect(loadCopeIntensity()).resolves.toBe(100)
    await saveCopeIntensity(-5)
    await expect(loadCopeIntensity()).resolves.toBe(0)
  })

  it("clamps and rounds", () => {
    expect(clampCopeIntensity(50.4)).toBe(50)
    expect(clampCopeIntensity(NaN)).toBe(DEFAULT_COPE_INTENSITY)
    expect(clampCopeIntensity(999)).toBe(100)
  })
})
