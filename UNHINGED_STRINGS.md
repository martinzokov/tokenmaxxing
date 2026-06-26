# Unhinged Strings Reference

Every user-facing string the unhinged fork adds. **All of these only render when
Dramatic Mode is on** (Settings → Unhinged Mode). With Dramatic Mode off, the app
shows its original wording, byte-for-byte.

## 1. Pace labels (provider dot tooltip / aria-label)

| Pace | Normal | Unhinged |
|---|---|---|
| ahead | Plenty of room | **Still coping** |
| on-track | Right on target | **Getting mogged** |
| behind | Will run out | **TOKEN DEATH IMMINENT** |

## 2. Per-line status row (every progress line)

| Normal | Unhinged |
|---|---|
| Resets in `X` | **Respawns in `X`** |
| Resets soon | **Respawning soon** |
| `X` left | **`X` to live** |
| `X` (used mode) | **`X` burned** |
| Runs out in `X` | **TOKEN DEATH in `X`** |
| `X` short | **`X` cooked** |

## 3. Seethe Level header (always-on, by score 0–100)

Score = average of each provider's most-cooked usage line. The panel also shows
your current **Rank** (§4) and an `X/Y cooked` count. **Demo mode** (Settings →
Unhinged Mode) overrides this score with a slider so you can scrub the panel,
ranks, tiers, and Oracle through every state.

| Score | Tier | Tagline |
|---|---|---|
| 0–9 | **COMATOSE** | Stone cold. Touch-grass champion. Embarrassing. |
| 10–39 | **LUKEWARM** | The grind is fake. Maxx harder. |
| 40–69 | **SIMMERING** | Warming up. Dangerously mid. |
| 70–89 | **SEETHING** | Now we're cooking. Based. |
| 90–100 | **MAXXED** | Token death imminent. Glorious. |

## 4. Rank ladder (aggregate of all enabled providers, by Seethe score)

Shown in the Seethe panel. Driven by the same 0–100 aggregate score.

| Score | Rank | Blurb |
|---|---|---|
| 0–9 | **Promptlet** | Barely registering. Embarrassing. |
| 10–24 | **Token Tourist** | Just visiting. Go touch grass. |
| 25–44 | **Cope Cadet** | Warming up. Still mostly cope. |
| 45–64 | **Quota Grinder** | Putting in the reps. Respectable. |
| 65–79 | **Sigma Maxxer** | Locked in. No notes. |
| 80–94 | **Quota Chad** | Built different. The limit fears you. |
| 95–100 | **Token Deity** | Ascended. The GPUs sing your name. |

The panel also shows an **`X/Y cooked`** count (providers at/over 80% usage).

## 5. Token Oracle (rotates per refresh, picked by usage tier)

| Tier (usage) | Lines |
|---|---|
| **chill** (<40%) | Real ones hit the limit before lunch. You're still in bed.<br>Your context window is too small, king. Expand or stay a promptlet.<br>Touching grass is just cope for people who can't afford the Max plan.<br>Negative tokens burned is a skill issue. |
| **coping** (40–79%) | The quota fears you. Keep going.<br>Every parallel agent is a soldier. Send more.<br>You're not addicted, you're optimizing. There's a difference. Probably.<br>Mogging the free tier was never the goal. Mog yourself. |
| **doom** (≥80%) | TOKEN DEATH approaches. Make peace, then refresh.<br>Your quota is on its knees. Finish it.<br>The wall is real and you are running at it. Based.<br>Rate limit incoming. This is the most alive you'll feel all week. |

> Cope Intensity below 25 forces the chill pool even when maxed.

## 6. Doom Clock (most-constrained provider)

Header: **`{provider} hits the wall in {duration}`**, plus an escalating message by ETA:

| ETA to wall | Message |
|---|---|
| ≤ 30 min | It is happening. Say goodbye to your quota. |
| ≤ 2 h | The wall is in sight. There is no slowing down now. |
| ≤ 12 h | Hours left. The seethe builds. |
| ≤ 48 h | The clock is ticking, promptlet. |
| > 48 h | Plenty of runway. Embarrassing, honestly. |

## 7. Settings → Cope Intensity slider label

| Value | Label |
|---|---|
| 0–20 | Touching grass |
| 21–50 | Mildly cooked |
| 51–80 | Seething |
| 81–100 | Maximally unhinged |

## 8. README tagline

> "Token death is a social construct. We maxx anyway."
