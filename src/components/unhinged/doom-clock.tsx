import { Skull } from "lucide-react"
import type { PluginDisplayState } from "@/lib/plugin-types"
import { useNowTicker } from "@/hooks/use-now-ticker"
import { computeDoomClock } from "@/lib/unhinged/doom-clock"
import { useUnhingedStore } from "@/stores/unhinged-store"

export function DoomClock({ plugins }: { plugins: PluginDisplayState[] }) {
  const dramaticMode = useUnhingedStore((s) => s.dramaticMode)
  const now = useNowTicker({ intervalMs: 30_000 })

  if (!dramaticMode) return null

  const doom = computeDoomClock(plugins, now)
  if (!doom) return null

  return (
    <div className="flex items-start gap-2 mb-3 px-3 py-2 rounded-md border border-red-500/40 bg-red-500/10">
      <Skull size={14} className="mt-0.5 shrink-0 text-red-500" />
      <div className="text-xs">
        <div className="font-semibold text-red-500">
          {doom.providerName} hits the wall in {doom.durationText}
        </div>
        <div className="text-muted-foreground">{doom.message}</div>
      </div>
    </div>
  )
}
