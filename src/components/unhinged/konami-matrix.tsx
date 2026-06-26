import { useEffect, useState } from "react"
import { useUnhingedStore } from "@/stores/unhinged-store"

const CHARS = "01SEETHEDEATHMAXQUOTADEITYPROMPTLETWALLCOOKED"
const COLS = 18

export function KonamiMatrix({ onClose }: { onClose: () => void }) {
  const dramatic = useUnhingedStore((s) => s.dramaticMode)
  const [lines, setLines] = useState<string[]>(() => Array(COLS).fill(""))

  useEffect(() => {
    if (!dramatic) { onClose(); return }
    const id = setInterval(() => {
      setLines((prev) => prev.map((l) => {
        const add = CHARS[Math.floor(Math.random() * CHARS.length)]
        const next = (l + add).slice(-22)
        return next
      }))
    }, 80)
    const closeId = setTimeout(onClose, 6500)
    return () => { clearInterval(id); clearTimeout(closeId) }
  }, [dramatic, onClose])

  if (!dramatic) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 text-red-500/70 font-mono text-[10px] leading-none overflow-hidden pointer-events-none flex items-center justify-center"
      onClick={onClose}
    >
      <div className="flex gap-px opacity-80">
        {lines.map((l, i) => (
          <div key={i} className="w-3 whitespace-pre-wrap break-all">
            {l.split("").join("\n")}
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 text-[10px] tracking-[3px] text-red-500/50">TOKEN DEATH IS NOT A METAPHOR</div>
    </div>
  )
}
