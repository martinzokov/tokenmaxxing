import { describe, expect, it } from "vitest"
import { formatDramaticPrimaryValue } from "./dramatic-primary"

describe("formatDramaticPrimaryValue", () => {
  it("produces TO GO for left display", () => {
    expect(formatDramaticPrimaryValue(7, { kind: "percent" }, "left")).toBe("7% TO GO")
    expect(formatDramaticPrimaryValue(3800, { kind: "count", suffix: "requests" }, "left")).toBe("3,800 requests TO GO")
    expect(formatDramaticPrimaryValue(12.5, { kind: "dollars" }, "left")).toBe("$12.50 TO GO")
  })

  it("produces OBLITERATED for used display", () => {
    expect(formatDramaticPrimaryValue(93, { kind: "percent" }, "used")).toBe("93% OBLITERATED")
    expect(formatDramaticPrimaryValue(42000, { kind: "count", suffix: "tokens" }, "used")).toBe("42,000 tokens OBLITERATED")
  })

  it("rounds percent", () => {
    expect(formatDramaticPrimaryValue(7.2, { kind: "percent" }, "left")).toBe("7% TO GO")
  })
})
