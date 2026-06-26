import { Trophy } from "lucide-react"
import { ACHIEVEMENTS } from "@/lib/unhinged/achievements"
import { useUnhingedStore } from "@/stores/unhinged-store"

export function Achievements({ unlocked }: { unlocked: string[] }) {
  const dramaticMode = useUnhingedStore((s) => s.dramaticMode)
  if (!dramaticMode || unlocked.length === 0) return null

  const items = ACHIEVEMENTS.filter((a) => unlocked.includes(a.id))

  return (
    <div className="mb-3 px-3 py-1.5 rounded-md border border-border/50 bg-muted/20">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        <Trophy size={12} /> Based Log <span className="normal-case tracking-normal">({items.length}/{ACHIEVEMENTS.length})</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((a) => (
          <span
            key={a.id}
            className="text-[10px] px-1.5 py-0.5 rounded bg-muted/60 text-foreground/90 border border-border/40"
            title={a.desc}
          >
            {a.name}
          </span>
        ))}
      </div>
    </div>
  )
}
