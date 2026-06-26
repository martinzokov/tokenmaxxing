import { Sparkles } from "lucide-react"
import type { PluginDisplayState } from "@/lib/plugin-types"
import { oracleInputsFromPlugins, pickOracleQuote } from "@/lib/unhinged/token-oracle"
import { useUnhingedStore } from "@/stores/unhinged-store"

export function TokenOracle({ plugins }: { plugins: PluginDisplayState[] }) {
  const dramaticMode = useUnhingedStore((s) => s.dramaticMode)
  const copeIntensity = useUnhingedStore((s) => s.copeIntensity)

  if (!dramaticMode) return null

  const { maxUsageFraction, seed } = oracleInputsFromPlugins(plugins)
  const quote = pickOracleQuote(maxUsageFraction, copeIntensity, seed)

  return (
    <div className="flex items-start gap-2 mb-3 px-3 py-2 rounded-md border border-border/50 bg-muted/30">
      <Sparkles size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
      <p className="text-xs italic text-muted-foreground">{quote}</p>
    </div>
  )
}
