import type { PluginDisplayState } from "@/lib/plugin-types"
import { computeSeetheLevel } from "@/lib/unhinged/seethe-level"
import { useUnhingedStore } from "@/stores/unhinged-store"

// Color the score by how cooked you are — green when calm, red when maxxed.
function scoreColor(score: number): string {
  if (score >= 90) return "text-red-500"
  if (score >= 70) return "text-orange-500"
  if (score >= 40) return "text-yellow-500"
  return "text-green-500"
}

function barColor(score: number): string {
  if (score >= 90) return "bg-red-500"
  if (score >= 70) return "bg-orange-500"
  if (score >= 40) return "bg-yellow-500"
  return "bg-green-500"
}

export function SeetheHeader({ plugins }: { plugins: PluginDisplayState[] }) {
  const dramaticMode = useUnhingedStore((s) => s.dramaticMode)

  if (!dramaticMode) return null

  const { score, tier, tagline } = computeSeetheLevel(plugins)

  return (
    <div className="mb-3 px-3 py-2 rounded-md border border-border/50 bg-muted/30">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Seethe Level
        </span>
        <span className={`text-lg font-bold tabular-nums leading-none ${scoreColor(score)}`}>
          {score}
          <span className="text-[10px] font-normal text-muted-foreground"> / 100 · {tier}</span>
        </span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${barColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-1 text-[11px] italic text-muted-foreground">{tagline}</p>
    </div>
  )
}
