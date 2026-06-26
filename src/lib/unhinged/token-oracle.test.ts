import { describe, expect, it } from "vitest"
import { pickOracleQuote } from "@/lib/unhinged/token-oracle"

describe("pickOracleQuote", () => {
  it("returns doom lines when nearly maxed", () => {
    const line = pickOracleQuote(0.95, 50, 0)
    expect(line).toMatch(/TOKEN DEATH/i)
  })

  it("returns escalated doom line from expanded pool", () => {
    const line = pickOracleQuote(0.95, 50, 4)
    expect(line).toBe("THE WALL IS NOT A METAPHOR. IT IS TUESDAY.")
  })

  it("returns chill lines when usage is low", () => {
    const line = pickOracleQuote(0.1, 50, 0)
    expect(line).toMatch(/still in bed/i)
  })

  it("stays calm when cope intensity is very low even if maxed", () => {
    const line = pickOracleQuote(0.99, 10, 0)
    expect(line).toMatch(/still in bed/i)
  })

  it("is deterministic for a given seed and rotates with seed", () => {
    const a0 = pickOracleQuote(0.5, 50, 0)
    const a0again = pickOracleQuote(0.5, 50, 0)
    const a1 = pickOracleQuote(0.5, 50, 1)
    expect(a0).toBe(a0again)
    expect(a1).not.toBe(a0)
  })

  it("handles garbage inputs without throwing", () => {
    expect(typeof pickOracleQuote(NaN, NaN, NaN)).toBe("string")
    expect(typeof pickOracleQuote(-5, 200, -3)).toBe("string")
  })
})
