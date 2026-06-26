// Unhinged rank ladder, driven by the aggregate Seethe score (0-100). Higher
// burn = higher rank. Pure + ordered high-to-low so rankForScore picks the first
// threshold you clear.

export type Rank = { name: string; blurb: string }

const RANKS: { min: number; name: string; blurb: string }[] = [
  { min: 95, name: "Token Deity", blurb: "ASCENDED. THE DATACENTER KNOWS YOUR NAME." },
  { min: 80, name: "Quota Chad", blurb: "BUILT DIFFERENT. RATE LIMITS FEAR YOU." },
  { min: 65, name: "Sigma Maxxer", blurb: "LOCKED IN. NO NOTES. NO MERCY." },
  { min: 45, name: "Quota Grinder", blurb: "PUTTING IN THE REPS. THE WALL IS NERVOUS." },
  { min: 25, name: "Cope Cadet", blurb: "WARMING UP. STILL MOSTLY COPE. BARELY." },
  { min: 10, name: "Token Tourist", blurb: "JUST VISITING. GO TOUCH GRASS. SERIOUSLY." },
  { min: 0, name: "Promptlet", blurb: "BARELY REGISTERING. GENUINELY EMBARRASSING." },
]

/** All ranks low-to-high, with their entry threshold. */
export const ALL_RANKS = [...RANKS].reverse()

export function rankForScore(score: number): Rank {
  const s = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0
  const found = RANKS.find((r) => s >= r.min) ?? RANKS[RANKS.length - 1]
  return { name: found.name, blurb: found.blurb }
}
