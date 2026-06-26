import { getSettingsStore } from "@/lib/settings-store";

// Self-contained settings for the unhinged fork. Backward compatible:
// missing keys fall back to defaults so existing installs just light up.

export const DEFAULT_DRAMATIC_MODE = true;
export const DEFAULT_COPE_INTENSITY = 50; // 0 = sane, 100 = maximally unhinged

const DRAMATIC_MODE_KEY = "dramaticMode";
const COPE_INTENSITY_KEY = "copeIntensity";
const ACHIEVEMENTS_KEY = "unlockedAchievements";

const store = getSettingsStore();

export function clampCopeIntensity(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_COPE_INTENSITY;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export async function loadDramaticMode(): Promise<boolean> {
  const stored = await store.get<unknown>(DRAMATIC_MODE_KEY);
  return typeof stored === "boolean" ? stored : DEFAULT_DRAMATIC_MODE;
}

export async function saveDramaticMode(value: boolean): Promise<void> {
  await store.set(DRAMATIC_MODE_KEY, value);
  await store.save();
}

export async function loadCopeIntensity(): Promise<number> {
  const stored = await store.get<unknown>(COPE_INTENSITY_KEY);
  return typeof stored === "number" ? clampCopeIntensity(stored) : DEFAULT_COPE_INTENSITY;
}

export async function saveCopeIntensity(value: number): Promise<void> {
  await store.set(COPE_INTENSITY_KEY, clampCopeIntensity(value));
  await store.save();
}

export async function loadUnlockedAchievements(): Promise<string[]> {
  const stored = await store.get<unknown>(ACHIEVEMENTS_KEY);
  return Array.isArray(stored) ? stored.filter((s): s is string => typeof s === "string") : [];
}

export async function saveUnlockedAchievements(ids: string[]): Promise<void> {
  await store.set(ACHIEVEMENTS_KEY, ids);
  await store.save();
}
