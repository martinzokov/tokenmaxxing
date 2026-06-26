// Example "meme provider": returns dramatic fake data + funny lines, no network.
// Use this as a template for building your own unhinged providers. Excluded from
// bundling (like `mock`) — it ships nothing real, it's a reference + test fixture.
(function () {
  var ORACLE = [
    "Your context window is too small, king.",
    "The quota fears you. Keep going.",
    "Real ones hit the limit before lunch.",
    "Touching grass is just cope for the GPU-poor.",
  ]

  function probe() {
    var _24h = 24 * 60 * 60 * 1000
    var _7d = 7 * _24h
    // Rotate the roast so every refresh feels alive.
    var oracle = ORACLE[Math.floor(Date.now() / 60000) % ORACLE.length]

    return {
      plan: "schizo-max",
      lines: [
        {
          type: "progress",
          label: "Daily seethe",
          used: 420690,
          limit: 500000,
          format: { kind: "count", suffix: "tokens" },
          resetsAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          periodDurationMs: _24h,
          color: "#ff2a2a",
        },
        {
          type: "progress",
          label: "Weekly cope",
          used: 1337000,
          limit: 5000000,
          format: { kind: "count", suffix: "tokens" },
          resetsAt: new Date(Date.now() + 3 * _24h).toISOString(),
          periodDurationMs: _7d,
          color: "#00ff9f",
        },
        { type: "text", label: "Oracle says", value: oracle },
        { type: "badge", label: "Rank", text: "Quota Chad", color: "#ff2a2a" },
        { type: "text", label: "Days since last rate limit", value: "0 (based)" },
      ],
    }
  }

  globalThis.__openusage_plugin = { id: "doomtokenmaxxer", probe }
})()
