import type { ProgressFormat } from "@/lib/plugin-types"
import { formatCountNumber, formatFixedPrecisionNumber } from "@/lib/utils"

/**
 * Dramatic unhinged version of the main progress value (left side of bar).
 * Produces readable phrases for both display modes without gluing units badly.
 * E.g. "40% TO GO", "3800 requests TO GO", "93% OBLITERATED".
 */
export function formatDramaticPrimaryValue(
  shownAmount: number,
  format: ProgressFormat,
  displayMode: "used" | "left"
): string {
  const isLeft = displayMode === "left"

  let base: string
  if (format.kind === "percent") {
    base = `${Math.round(shownAmount)}%`
  } else if (format.kind === "dollars") {
    base = `$${formatFixedPrecisionNumber(shownAmount)}`
  } else {
    base = `${formatCountNumber(shownAmount)} ${format.suffix}`
  }

  return isLeft ? `${base} TO GO` : `${base} OBLITERATED`
}
