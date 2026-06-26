// Minimal unhinged audio using Web Audio. No files. Occasional use only.
let audioCtx: AudioContext | null = null

function getCtx() {
  if (!audioCtx) {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext)
    if (Ctx) audioCtx = new Ctx()
  }
  return audioCtx
}

export function playTone(freq = 220, durationMs = 120, type: OscillatorType = "sawtooth", vol = 0.2) {
  const ctx = getCtx()
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    osc.type = type
    osc.frequency.value = freq
    filter.type = "lowpass"
    filter.frequency.value = 800
    gain.gain.value = vol
    const now = ctx.currentTime
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    // quick decay
    gain.gain.setValueAtTime(vol, now)
    gain.gain.linearRampToValueAtTime(0.0001, now + durationMs / 1000)
    osc.stop(now + (durationMs + 30) / 1000)
  } catch {}
}

export function playDoomSting() {
  playTone(120, 180, "sawtooth", 0.25)
  setTimeout(() => playTone(80, 220, "square", 0.15), 90)
}

export function playMaxSeethe() {
  playTone(300, 80, "sawtooth", 0.18)
  setTimeout(() => playTone(450, 60, "triangle", 0.12), 70)
}

export function playRefreshSeethe() {
  playTone(180, 70, "sawtooth", 0.2)
}
