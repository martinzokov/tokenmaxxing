import type { UnhingedAggregate } from "./aggregate"

export type Achievement = {
  id: string
  name: string
  desc: string
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "maxxed", name: "!!! MAXXED !!!", desc: "Reached 90+ seethe. Token death is here." },
  { id: "deity", name: "Token Deity", desc: "Ascended to rank 95+. Datacenter knows you." },
  { id: "chad", name: "Quota Chad", desc: "Hit 80+ seethe. Rate limits fear you." },
  { id: "multi-cook", name: "Swarm Lord", desc: "3+ providers cooked at once." },
  { id: "doom", name: "Doom Chaser", desc: "Witnessed a live Doom Clock." },
  { id: "demo-max", name: "Preview God", desc: "Scrubbed demo to 100 seethe." },
]

export function checkAchievement(
  id: string,
  agg: UnhingedAggregate,
  dramatic: boolean,
  demo: boolean,
  hasDoom: boolean
): boolean {
  if (!dramatic) return false
  if (id === "maxxed") return agg.score >= 90
  if (id === "deity") return agg.score >= 95
  if (id === "chad") return agg.score >= 80
  if (id === "multi-cook") return agg.cooked >= 3
  if (id === "doom") return hasDoom
  if (id === "demo-max") return demo && agg.score >= 95
  return false
}
