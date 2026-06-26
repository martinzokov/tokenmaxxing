import { beforeEach, describe, expect, it, vi } from "vitest"
import { makePluginTestContext } from "../test-helpers.js"

const loadPlugin = async () => {
  await import("./plugin.js")
  return globalThis.__openusage_plugin
}

const createCtx = (overrides) => makePluginTestContext(overrides, vi)

describe("doomtokenmaxxer plugin", () => {
  beforeEach(() => {
    delete globalThis.__openusage_plugin
    if (vi.resetModules) vi.resetModules()
    vi.useRealTimers()
  })

  it("returns dramatic fake data", async () => {
    const plugin = await loadPlugin()
    const result = plugin.probe(createCtx())
    expect(plugin.id).toBe("doomtokenmaxxer")
    expect(result.plan).toBe("schizo-max")
    expect(result.lines.length).toBeGreaterThanOrEqual(5)
  })

  it("has progress lines with reset metadata", async () => {
    const plugin = await loadPlugin()
    const result = plugin.probe(createCtx())
    const seethe = result.lines.find((l) => l.label === "Daily seethe")
    expect(seethe.type).toBe("progress")
    expect(seethe.used).toBeGreaterThan(0)
    expect(seethe.limit).toBeGreaterThan(seethe.used)
    expect(seethe.resetsAt).toBeTruthy()
    expect(seethe.periodDurationMs).toBeGreaterThan(0)
  })

  it("rotates an oracle line", async () => {
    const plugin = await loadPlugin()
    const result = plugin.probe(createCtx())
    const oracle = result.lines.find((l) => l.label === "Oracle says")
    expect(oracle.type).toBe("text")
    expect(typeof oracle.value).toBe("string")
    expect(oracle.value.length).toBeGreaterThan(0)
  })
})
