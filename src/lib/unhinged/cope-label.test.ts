import { describe, expect, it } from "vitest"
import { copeLabelForIntensity } from "@/lib/unhinged/cope-label"

describe("copeLabelForIntensity", () => {
  it("returns BEYOND REASON only when dramatic mode is on", () => {
    expect(copeLabelForIntensity(90, true)).toBe("BEYOND REASON")
    expect(copeLabelForIntensity(90, false)).toBe("Maximally unhinged")
  })

  it("keeps mid-band labels unchanged in sane mode", () => {
    expect(copeLabelForIntensity(50, false)).toBe("Mildly cooked")
    expect(copeLabelForIntensity(10, false)).toBe("Touching grass")
  })
})