import { describe, expect, it } from "vitest"
import { ALL_RANKS, rankForScore } from "@/lib/unhinged/ranks"

describe("rankForScore", () => {
  it("maps low scores to Promptlet and top to Token Deity", () => {
    expect(rankForScore(0).name).toBe("Promptlet")
    expect(rankForScore(5).name).toBe("Promptlet")
    expect(rankForScore(100).name).toBe("Token Deity")
  })

  it("climbs through the ladder", () => {
    expect(rankForScore(15).name).toBe("Token Tourist")
    expect(rankForScore(30).name).toBe("Cope Cadet")
    expect(rankForScore(50).name).toBe("Quota Grinder")
    expect(rankForScore(70).name).toBe("Sigma Maxxer")
    expect(rankForScore(85).name).toBe("Quota Chad")
  })

  it("clamps out-of-range and garbage input", () => {
    expect(rankForScore(200).name).toBe("Token Deity")
    expect(rankForScore(-5).name).toBe("Promptlet")
    expect(rankForScore(NaN).name).toBe("Promptlet")
  })

  it("lists ranks low-to-high", () => {
    expect(ALL_RANKS[0].name).toBe("Promptlet")
    expect(ALL_RANKS[ALL_RANKS.length - 1].name).toBe("Token Deity")
  })
})
