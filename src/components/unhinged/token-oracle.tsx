import { Sparkles } from "lucide-react"
import type { PluginDisplayState } from "@/lib/plugin-types"
import { useUnhingedAggregate } from "@/hooks/use-unhinged-aggregate"
import { oracleInputsFromPlugins, pickOracleQuote } from "@/lib/unhinged/token-oracle"
import { useUnhingedStore } from "@/stores/unhinged-store"

export function TokenOracle({ plugins }: { plugins: PluginDisplayState[] }) {
  const dramaticMode = useUnhingedStore((s) => s.dramaticMode)
  const copeIntensity = useUnhingedStore((s) => s.copeIntensity)
  const demoMode = useUnhingedStore((s) => s.demoMode)
  const demoScore = useUnhingedStore((s) => s.demoScore)
  const agg = useUnhingedAggregate(plugins)

  if (!dramaticMode) return null

  // In demo mode the slider drives both the usage tier and the rotation seed,
  // so scrubbing it cycles through every Oracle pool live.
  const { seed } = oracleInputsFromPlugins(plugins)
  const quote = pickOracleQuote(agg.usageFraction, copeIntensity, demoMode ? demoScore : seed)

  return (
    <div className="flex items-start gap-2 mb-3 px-3 py-2 rounded-md border border-border/50 bg-muted/30">
      <Sparkles size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
      <p className="text-xs italic text-muted-foreground">{quote}</p>
    </div>
  )
}
