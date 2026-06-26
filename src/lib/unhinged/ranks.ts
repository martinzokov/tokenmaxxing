// Unhinged rank ladder, driven by the aggregate Seethe score (0-100). Higher
// burn = higher rank. Pure + ordered high-to-low so rankForScore picks the first
// threshold you clear.

export type Rank = { name: string; blurb: string }

const RANKS: { min: number; name: string; blurb: string }[] = [
  { min: 95, name: "Token Deity", blurb: "Ascended. The GPUs sing your name." },
  { min: 80, name: "Quota Chad", blurb: "Built different. The limit fears you." },
  { min: 65, name: "Sigma Maxxer", blurb: "Locked in. No notes." },
  { min: 45, name: "Quota Grinder", blurb: "Putting in the reps. Respectable." },
  { min: 25, name: "Cope Cadet", blurb: "Warming up. Still mostly cope." },
  { min: 10, name: "Token Tourist", blurb: "Just visiting. Go touch grass." },
  { min: 0, name: "Promptlet", blurb: "Barely registering. Embarrassing." },
]

/** All ranks low-to-high, with their entry threshold. */
export const ALL_RANKS = [...RANKS].reverse()

export function rankForScore(score: number): Rank {
  const s = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0
  const found = RANKS.find((r) => s >= r.min) ?? RANKS[RANKS.length - 1]
  return { name: found.name, blurb: found.blurb }
}
