import { Checkbox } from "@/components/ui/checkbox";
import { copeLabelForIntensity } from "@/lib/unhinged/cope-label";
import { seetheBandForScore } from "@/lib/unhinged/seethe-level";
import { rankForScore } from "@/lib/unhinged/ranks";
import { useUnhingedStore } from "@/stores/unhinged-store";

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
        Spicy labels and doom flavor. Toggle off for normal tracker.
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
        Master switch. On = unhinged pace labels, Seethe header, Doom Clock, Token Oracle. Off = plain sane text everywhere.
      </p>

      <div className="mt-3 opacity-100" aria-disabled={!dramaticMode}>
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>Cope Intensity</span>
          <span className="text-muted-foreground tabular-nums">
            {copeIntensity} · {copeLabelForIntensity(copeIntensity, dramaticMode)}
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
        <p className="text-[10px] text-muted-foreground mt-1">
          Controls Oracle roast level. &lt;25 forces chill quotes even when maxed. Does not change other labels.
        </p>
      </div>

      <div className="mt-4 border-t border-border/50 pt-3">
        <label className="flex items-center gap-2 text-sm select-none text-foreground">
          <Checkbox
            key={`demo-mode-${demoMode}`}
            checked={demoMode}
            onCheckedChange={(checked) => setDemoMode(checked === true)}
          />
          Demo / Preview
        </label>
        <p className="text-xs text-muted-foreground mt-1.5">
          Preview tool only. Overrides the aggregate Seethe score with the slider below so you can scrub tiers, ranks, header, and Oracle without real usage.
        </p>

        <div className="mt-2" aria-disabled={!dramaticMode || !demoMode}>
          <div className="flex items-center justify-between text-sm text-foreground">
            <span>Demo Seethe</span>
            <span className="text-muted-foreground tabular-nums">
              {dramaticMode
                ? `${demoScore} · ${demoBand.tier} · ${demoRank.name}`
                : demoScore}
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
          <p className="text-[10px] text-muted-foreground mt-1">
            When on, the main panel shows fake seethe from this slider (still respects Cope Intensity for Oracle).
          </p>
        </div>
      </div>
    </section>
  );
}
