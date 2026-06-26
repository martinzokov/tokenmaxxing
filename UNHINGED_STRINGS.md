# Unhinged Strings Reference

Every user-facing string the unhinged fork adds. **All of these only render when
Dramatic Mode is on** (Settings → Unhinged Mode). With Dramatic Mode off, the app
shows its original wording, byte-for-byte.

## 1. Pace labels (provider dot tooltip / aria-label)

| Pace | Normal | Unhinged |
|---|---|---|
| ahead | Plenty of room | **COPING LIKE A PROMPTLET (barely)** |
| on-track | Right on target | **GETTING ABSOLUTELY MOGGED** |
| behind | Will run out | **!!! TOKEN DEATH IMMINENT !!!** |

## 2. Per-line status row (every progress line)

| Normal | Unhinged |
|---|---|
| Resets in `X` | **RESPAWNS in `X`** |
| Resets soon | **RESPAWN IMMINENT — TICK TOCK** |
| `X` left | **`X` SECONDS TO LIVE** |
| `X` (used mode) | **`X` OBLITERATED** |
| Runs out in `X` | **!!! TOKEN DEATH in `X` !!!** |
| `X` short | **`X` OBLITERATED** |

## 3. Seethe Level header (always-on, by score 0–100)

Score = average of each provider's most-cooked usage line. The panel also shows
your current **Rank** (§4) and an `X/Y cooked` count. **Demo mode** (Settings →
Unhinged Mode) overrides this score with a slider so you can scrub the panel,
ranks, tiers, and Oracle through every state.

At score ≥90 the header pulses red with `!!!` emphasis on the tier label.

| Score | Tier | Tagline |
|---|---|---|
| 0–9 | **COMATOSE** | Stone cold. Touch-grass champion. Genuinely embarrassing. |
| 10–39 | **LUKEWARM** | The grind is fake. Maxx harder or stay mid forever. |
| 40–69 | **SIMMERING** | Warming up. Dangerously mid. The quota can smell you. |
| 70–89 | **SEETHING** | FULL SEND. THE QUOTA FEELS NOTHING. BASED. |
| 90–100 | **!!! MAXXED !!!** | TOKEN DEATH IS HERE. NO REFUNDS. GLORIOUS. |

## 4. Rank ladder (aggregate of all enabled providers, by Seethe score)

Shown in the Seethe panel. Driven by the same 0–100 aggregate score.

| Score | Rank | Blurb |
|---|---|---|
| 0–9 | **Promptlet** | BARELY REGISTERING. GENUINELY EMBARRASSING. |
| 10–24 | **Token Tourist** | JUST VISITING. GO TOUCH GRASS. SERIOUSLY. |
| 25–44 | **Cope Cadet** | WARMING UP. STILL MOSTLY COPE. BARELY. |
| 45–64 | **Quota Grinder** | PUTTING IN THE REPS. THE WALL IS NERVOUS. |
| 65–79 | **Sigma Maxxer** | LOCKED IN. NO NOTES. NO MERCY. |
| 80–94 | **Quota Chad** | BUILT DIFFERENT. RATE LIMITS FEAR YOU. |
| 95–100 | **Token Deity** | ASCENDED. THE DATACENTER KNOWS YOUR NAME. |

The panel also shows an **`X/Y cooked`** count (providers at/over 80% usage).

## 5. Token Oracle (rotates per refresh, picked by usage tier)

| Tier (usage) | Lines |
|---|---|
| **chill** (<40%) | Real ones hit the limit before lunch. You're still in bed.<br>Your context window is too small, king. Expand or stay a promptlet.<br>Touching grass is just cope for people who can't afford the Max plan.<br>Negative tokens burned is a skill issue.<br>Your commit history is 90% 'fix typo'. The tokens know. |
| **coping** (40–79%) | The quota fears you. Keep going.<br>Every parallel agent is a soldier. Send more.<br>You're not addicted, you're optimizing. There's a difference. Probably.<br>Mogging the free tier was never the goal. Mog yourself.<br>Sleep is for people who haven't discovered agent swarms yet. |
| **doom** (≥80%) | TOKEN DEATH approaches. Make peace, then refresh.<br>Your quota is on its knees. Finish it.<br>The wall is real and you are running at it. Based.<br>Rate limit incoming. This is the most alive you'll feel all week.<br>THE WALL IS NOT A METAPHOR. IT IS TUESDAY. |

> Cope Intensity below 25 forces the chill pool even when maxed.

## 6. Doom Clock (most-constrained provider)

Header: **`{provider} hits the wall in {duration}`**, plus an escalating message by ETA:

| ETA to wall | Message |
|---|---|
| ≤ 30 min | IT IS HAPPENING. KISS YOUR QUOTA GOODBYE. |
| ≤ 2 h | THE WALL IS RIGHT THERE. DO NOT BRAKE. |
| ≤ 12 h | HOURS LEFT. THE SEETHE IS VISCERAL. |
| ≤ 48 h | CLOCK TICKING. STILL A PROMPTLET. |
| > 48 h | SO MUCH RUNWAY. STILL EMBARRASSING. |

## 7. Settings → Cope Intensity slider label

| Value | Label |
|---|---|
| 0–20 | Touching grass |
| 21–50 | Mildly cooked |
| 51–80 | Seething |
| 81–100 | BEYOND REASON |

## 8. README tagline

> "Token death is a social construct. We maxx anyway."