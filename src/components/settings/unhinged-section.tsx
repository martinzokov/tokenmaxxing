import { Checkbox } from "@/components/ui/checkbox";
import { seetheBandForScore } from "@/lib/unhinged/seethe-level";
import { rankForScore } from "@/lib/unhinged/ranks";
import { useUnhingedStore } from "@/stores/unhinged-store";

function copeLabel(intensity: number): string {
  if (intensity <= 20) return "Touching grass";
  if (intensity <= 50) return "Mildly cooked";
  if (intensity <= 80) return "Seething";
  return "BEYOND REASON";
}

export function UnhingedSection() {
  const dramaticMode = useUnhingedStore((s) => s.dramaticMode);
  const copeIntensity = useUnhingedStore((s) => s.copeIntensity);
  const demoMode = useUnhingedStore((s) => s.demoMode);
  const demoScore = useUnhingedStore((s) => s.demoScore);
  const setDramaticMode = useUnhingedStore((s) => s.setDramaticMode);
  const setCopeIntensity = useUnhingedStore((s) => s.setCopeIntensity);
  const setDemoMode = useUnhingedStore((s) => s.setDemoMode);
  const setDemoScore = useUnhingedStore((s) => s.setDemoScore);

  const demoBand = seetheBandForScore(demoScore);
  const demoRank = rankForScore(demoScore);

  return (
    <section>
      <h3 className="text-lg font-semibold mb-0">Unhinged Mode</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Turn the cope engine on or off
      </p>
      <label className="flex items-center gap-2 text-sm select-none text-foreground">
        <Checkbox
          key={`dramatic-mode-${dramaticMode}`}
          checked={dramaticMode}
          onCheckedChange={(checked) => setDramaticMode(checked === true)}
        />
        Dramatic Mode
      </label>
      <p className="text-xs text-muted-foreground mt-1.5">
        On: unhinged labels, doom clock, and the Token Oracle. Off: sane mode for people who touch grass.
      </p>

      <div className="mt-3 opacity-100" aria-disabled={!dramaticMode}>
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>Cope Intensity</span>
          <span className="text-muted-foreground tabular-nums">
            {copeIntensity} · {copeLabel(copeIntensity)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={copeIntensity}
          disabled={!dramaticMode}
          aria-label="Cope intensity"
          onChange={(e) => setCopeIntensity(Number(e.target.value))}
          className="w-full mt-1.5 accent-foreground disabled:opacity-40"
        />
      </div>

      <label className="flex items-center gap-2 text-sm select-none text-foreground mt-4">
        <Checkbox
          key={`demo-mode-${demoMode}`}
          checked={demoMode}
          onCheckedChange={(checked) => setDemoMode(checked === true)}
        />
        Demo mode
      </label>
      <p className="text-xs text-muted-foreground mt-1.5">
        Override real usage and scrub the Seethe Level through every state — tiers, ranks, and Oracle roasts.
      </p>

      <div className="mt-3" aria-disabled={!dramaticMode || !demoMode}>
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>Demo Seethe</span>
          <span className="text-muted-foreground tabular-nums">
            {demoScore} · {demoBand.tier} · {demoRank.name}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={demoScore}
          disabled={!dramaticMode || !demoMode}
          aria-label="Demo seethe level"
          onChange={(e) => setDemoScore(Number(e.target.value))}
          className="w-full mt-1.5 accent-foreground disabled:opacity-40"
        />
      </div>
    </section>
  );
}
