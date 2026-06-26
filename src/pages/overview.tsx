import { ProviderCard } from "@/components/provider-card"
import { Achievements } from "@/components/unhinged/achievements"
import { DoomClock } from "@/components/unhinged/doom-clock"
import { SeetheHeader } from "@/components/unhinged/seethe-header"
import { TokenOracle } from "@/components/unhinged/token-oracle"
import { useUnhingedAchievements } from "@/hooks/use-unhinged-achievements"
import { useNowTicker } from "@/hooks/use-now-ticker"
import { computeDoomClock } from "@/lib/unhinged/doom-clock"
import { Gauge } from "lucide-react"
import type { PluginDisplayState } from "@/lib/plugin-types"
import type { DisplayMode, ResetTimerDisplayMode, TimeFormatMode } from "@/lib/settings"

interface OverviewPageProps {
  plugins: PluginDisplayState[]
  onRetryPlugin?: (pluginId: string) => void
  displayMode: DisplayMode
  resetTimerDisplayMode: ResetTimerDisplayMode
  timeFormatMode?: TimeFormatMode
  onResetTimerDisplayModeToggle?: () => void
}

export function OverviewPage({
  plugins,
  onRetryPlugin,
  displayMode,
  resetTimerDisplayMode,
  timeFormatMode = "auto",
  onResetTimerDisplayModeToggle,
}: OverviewPageProps) {
  if (plugins.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-center">
        <Gauge size={28} className="text-muted-foreground/50" />
        <div className="text-sm font-medium text-foreground">No providers enabled</div>
        <div className="text-xs text-muted-foreground">
          Enable providers in Settings to start tracking usage.
        </div>
      </div>
    )
  }

  const now = useNowTicker({ intervalMs: 30_000 })
  const doom = computeDoomClock(plugins, now)
  const hasDoom = !!doom
  const unlocked = useUnhingedAchievements(plugins, hasDoom)

  return (
    <div>
      <SeetheHeader plugins={plugins} />
      <DoomClock plugins={plugins} />
      <TokenOracle plugins={plugins} />
      <Achievements unlocked={unlocked} />
      {plugins.map((plugin, index) => (
        <ProviderCard
          key={plugin.meta.id}
          name={plugin.meta.name}
          plan={plugin.data?.plan}
          showSeparator={index < plugins.length - 1}
          loading={plugin.loading}
          error={plugin.error}
          lines={plugin.data?.lines ?? []}
          skeletonLines={plugin.meta.lines}
          lastManualRefreshAt={plugin.lastManualRefreshAt}
          lastUpdatedAt={plugin.lastUpdatedAt}
          onRetry={onRetryPlugin ? () => onRetryPlugin(plugin.meta.id) : undefined}
          scopeFilter="overview"
          displayMode={displayMode}
          resetTimerDisplayMode={resetTimerDisplayMode}
          timeFormatMode={timeFormatMode}
          onResetTimerDisplayModeToggle={onResetTimerDisplayModeToggle}
        />
      ))}
    </div>
  )
}
