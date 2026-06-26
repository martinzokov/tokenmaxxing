/** Cope Intensity slider label. Unhinged top tier only when Dramatic Mode is on. */
export function copeLabelForIntensity(intensity: number, dramatic = true): string {
  if (intensity <= 20) return "Touching grass"
  if (intensity <= 50) return "Mildly cooked"
  if (intensity <= 80) return "Seething"
  return dramatic ? "BEYOND REASON" : "Maximally unhinged"
}