import type { ResetTimerDisplayMode, TimeFormatMode } from "@/lib/settings"
import { formatCompactDuration } from "@/lib/pace-tooltip"

const timeFormatterCache = new Map<TimeFormatMode, Intl.DateTimeFormat>()

export function getTimeFormatter(mode: TimeFormatMode): Intl.DateTimeFormat {
  const cached = timeFormatterCache.get(mode)
  if (cached) return cached
  const opts: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" }
  if (mode === "12h") opts.hour12 = true
  else if (mode === "24h") opts.hour12 = false
  // "auto" leaves hour12 unset so the user's locale decides.
  const formatter = new Intl.DateTimeFormat(undefined, opts)
  timeFormatterCache.set(mode, formatter)
  return formatter
}

const RESET_MONTH_DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
})

const RESET_SOON_THRESHOLD_MS = 5 * 60 * 1000

function parseResetTimestamp(resetsAtIso: string): number | null {
  const resetsAtMs = Date.parse(resetsAtIso)
  return Number.isFinite(resetsAtMs) ? resetsAtMs : null
}

function getLocalDayIndex(timestampMs: number): number {
  const date = new Date(timestampMs)
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
}

function formatMonthDay(timestampMs: number): string {
  return RESET_MONTH_DAY_FORMATTER.format(timestampMs)
}

export function formatResetRelativeLabel(
  nowMs: number,
  resetsAtIso: string,
  dramatic = false,
): string | null {
  const verb = dramatic ? "Respawns" : "Resets"
  const resetsAtMs = parseResetTimestamp(resetsAtIso)
  if (resetsAtMs === null) return null
  const deltaMs = resetsAtMs - nowMs
  if (deltaMs < RESET_SOON_THRESHOLD_MS) return dramatic ? "Respawning soon" : "Resets soon"
  const durationText = formatCompactDuration(deltaMs)
  return durationText ? `${verb} in ${durationText}` : null
}

export function formatResetAbsoluteLabel(
  nowMs: number,
  resetsAtIso: string,
  timeFormatMode: TimeFormatMode = "auto",
  dramatic = false,
): string | null {
  const verb = dramatic ? "Respawns" : "Resets"
  const resetsAtMs = parseResetTimestamp(resetsAtIso)
  if (resetsAtMs === null) return null
  if (resetsAtMs - nowMs <= 0) return dramatic ? "Respawning soon" : "Resets soon"
  const dayDiff = getLocalDayIndex(resetsAtMs) - getLocalDayIndex(nowMs)
  const timeText = getTimeFormatter(timeFormatMode).format(resetsAtMs)
  if (dayDiff <= 0) return `${verb} today at ${timeText}`
  if (dayDiff === 1) return `${verb} tomorrow at ${timeText}`
  const dateText = formatMonthDay(resetsAtMs)
  return `${verb} ${dateText} at ${timeText}`
}

export function formatResetTooltipText({
  nowMs,
  resetsAtIso,
  visibleMode,
  timeFormatMode = "auto",
  dramatic = false,
}: {
  nowMs: number
  resetsAtIso: string
  visibleMode: ResetTimerDisplayMode
  timeFormatMode?: TimeFormatMode
  dramatic?: boolean
}): string | null {
  return visibleMode === "absolute"
    ? formatResetRelativeLabel(nowMs, resetsAtIso, dramatic)
    : formatResetAbsoluteLabel(nowMs, resetsAtIso, timeFormatMode, dramatic)
}
