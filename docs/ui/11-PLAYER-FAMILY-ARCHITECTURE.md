# Ducal Game — Player Family Architecture

Version: 1.0
Status: REFERENCE — describes the current implementation, verified against the code
Purpose: Explain how the Player subsystem is actually built, so a developer or future AI
can extend or fix a game without re-deriving the architecture from scratch.

---

## 1. Core Model

```text
Shared Player Shell
    +
Game Configuration
    +
Game-specific Content / Logic
    +
Player State
```

There is **one** Player screen (`<div class="screen" data-screen="player">`), containing 19
`.player-card[data-p="..."]` blocks — never a separate top-level screen per game. Which one is
visible is controlled by the existing `pgo(id)` dispatcher (toggles `.player-card` display, then
runs a per-id hook if one exists). This is already the "shared shell + many states" model; there
are not, and should not become, 30 independent Player implementations.

Basic Math and Missing Number each already serve **15 playable configurations** (5 operations ×
3 difficulties) through **one** shared trio of states (`landing-math`/`question-math`/`result-math`
and `landing-missing`/`question-missing`/`result-missing` respectively) — the configuration
(operation + difficulty) selects the question pool and copy; the markup is not duplicated per
configuration.

---

## 2. Shared Player Shell

Reused, verbatim, by every game family below (do not fork these for a new game):

| Element | Class(es) | Notes |
|---|---|---|
| Stage wrapper | `.player-stage` | Centers a single `.player-card`/`.center-card`; also used by non-Player focused screens (Auth, Legal, Game Type Intro, History Detail) |
| Card surface | `.player-card` | One per state, toggled via `data-p` + `pgo()` |
| Landing layout | `.p-landing` | Icon, title, description, stat row, primary CTA |
| Progress header | `.qp-top` / `.progress-track` / `.progress-fill` / `.qp-step` / `.qp-exit` | Question counter + exit button |
| Question card | `.play-q` | Gradient background (game-specific color) + question text |
| Answer buttons | `.ans-btn`, `.correct`, `.wrong`, `.letter` | 4-choice buttons, feedback classes applied on answer |
| Result | `.result-wrap`, `.ring` | Score ring + result content |
| Leaderboard | `.collapse`, `.lb-podium`, `.lb-row` | Collapsible full-leaderboard pattern |
| Per-question timer | `.qmath-timer` | Math/Missing Number only — Quiz/IQ/Connection have no per-question countdown |

Name entry (shared by Quiz and IQ): `pGoToNameEntry(target)` → `player-name` state →
`pConfirmName()` → `pgo(pNameTarget)`. Math, Missing Number, and Connection skip this step
entirely (their own landing state doubles as the name-free "intro"), which is an intentional
per-game difference, not an inconsistency — "do not force every game to use every state."

---

## 3. Player States (conceptual)

```text
playerState =
  landing | landing-iq | landing-connection | landing-math | landing-missing
  name                                   (Quiz/IQ only)
  question | question-iq | question-connection | question-math | question-missing
  result | result-iq | result-connection | result-math | result-missing
  connection-invite | result-connection-match | connection-shared-view   (Connection only)
```

Every state id above is a literal `data-p` value already in the markup — this list is not a new
abstraction, just the existing ids grouped by role.

---

## 4. Game Configuration

Basic Math and Missing Number already carry an explicit configuration, held as plain global
state (not a single object, but conceptually equivalent):

```js
// Basic Math
currentMathOpId     // 'add' | 'sub' | 'mul' | 'div' | 'mixed'
currentMathDiffId   // 'd2' | 'd3' | 'd4'
currentMathGameId   // e.g. 'math-add-d2'

// Missing Number
currentMissingOpId    // 'add' | 'sub' | 'mul' | 'div' | 'mixed'
currentMissingDiffId  // '2_digit' | '3_digit' | '4_digit'
currentMissingGameId  // e.g. 'missing_mixed_4_digit'
```

Conceptually, opening a game is:

```js
{ category: 'math', series: 'basic-arithmetic', mode: 'addition', difficulty: '2-digit', game_id: 'math-add-d2' }
{ category: 'math', series: 'missing-number',   mode: 'mixed',    difficulty: '4-digit',  game_id: 'missing_mixed_4_digit' }
```

`openMathGame(opId, diffId)` / `openMissingGame(opId, diffId)` set this state, build the question
pool (`generateMathQuestions` / `generateMissingNumberQuestions`), and hand off to the shared
`landing-math` / `landing-missing` state. Quiz/IQ/Connection don't need this because each has
exactly one fixed configuration in this prototype (no operation/difficulty axis) — their "config"
is just which `data-p` state to open.

The **Prototype Review Navigation** (Harness only — see `prototype/index.html`,
`PLAYER_REVIEW_SERIES` / `PLAYER_REVIEW_STATES` / `prSelectSeries` / `prSelectOp` /
`prSelectDiff` / `prSelectState`) already presents this same configuration explicitly for
review/dev/QA use, down to the live label:

```text
Series: Missing Number | Mode: Mixed | Difficulty: 4-Digit | State: Result | Game ID: missing_mixed_4_digit
```

This tool calls the real `openMathGameSilent` / `openMissingGameSilent` + `go()`/`pgo()` — it does
not duplicate or bypass gameplay logic, and it must never leak into the real Player UI (it only
renders inside the Harness's own `#subNav`, hidden outside the review tool).

---

## 5. Game-Specific Extensions

### Quiz
States: `landing`, `player-name`, `question`, `result`.
Own data: `playerQuestions[]` (demo content), `playerIndex`, `playerAnswers`.
Own behavior: reverse-challenge CTA on the result screen (`cIndex=0; go('challenge')`),
"save this result" register prompt.

### IQ
States: `landing-iq`, `question-iq`, `result-iq`.
Own data/functions: `playerIqIndex`, `playerIqAnswers`, `pRenderIqQuestion`, `pSelectIqAnswer`.
Reuses the Quiz-style shell exactly (same classes); no reverse-challenge (platform content has
no "creator" to challenge back — invites friends to compare scores instead, per Product Master).

### Connection
States: `landing-connection`, `question-connection`, `result-connection` (Personal Result),
`connection-invite`, `result-connection-match` (Match Result), `connection-shared-view`.
Own data/functions: `playerConnIndex`, `playerConnAnswers` (per-question dimension scores),
`pRenderConnectionQuestion`, `openConnectionInvite`, `simulateConnectionPartner`,
`renderConnectionMatch`, `renderConnectionSharedView`.
These four extra states are legitimate Connection-specific extensions (invite flow, two-person
match result, and a privacy-limited shared-link view — see the shared-view screen's own comment
for the privacy rule) — they are not forced into the generic Math/Quiz shape, and they should stay
that way; do not try to collapse them into a smaller generic set.

### Basic Math
States: `landing-math`, `question-math`, `result-math` (shared by all 15 configurations).
Config: `MATH_OPS` (5 operations) × `MATH_DIFFICULTIES` (3 digit tiers).
Own functions: `generateMathQuestions`, `openMathGame`/`openMathGameSilent`,
`pRenderMathQuestion`, `pSelectMathAnswer`, `finishMathGame`, `renderMathResult`.
Mechanic: compute the result (`47 + 26 = ?`). Unchanged by this task.

### Missing Number
States: `landing-missing`, `question-missing`, `result-missing` (shared by all 15 configurations).
Config: same `MATH_OPS` × a parallel `MISSING_DIFFICULTIES` (own id scheme: `2_digit`/`3_digit`/`4_digit`,
matching the `missing_*` game-id convention).
Own functions: `generateMissingNumberQuestions`, `openMissingGame`/`openMissingGameSilent`,
`pRenderMissingQuestion`, `pSelectMissingAnswer`, `finishMissingGame`, `renderMissingResult`.
Mechanic: recover a missing operand (`47 + ? = 73`), result stays visible. Entirely separate
state/functions from Basic Math (see `prototype/index.html`'s own state-block comments) — this
was an intentional choice so this series could be built and modified without ever touching Basic
Math's code path. Unchanged by this task.

---

## 6. What Should Be Shared vs. What Must Stay Game-Specific

**Share (reuse the existing classes/functions, do not fork):**
- `.player-stage` / `.player-card` shell
- Progress header, question card, answer-button markup and feedback classes
- Result ring / leaderboard / collapse components
- `pGoToNameEntry` / `pConfirmName` name-entry step, for any future game that needs it
- `go()` / `pgo()` as the only state dispatcher

**Keep game-specific (do not generalize into one shared implementation):**
- Question generation and scoring (`buildQuestion`, `buildMissingNumberQuestion`,
  `finishMathGame`, `finishMissingGame`, and Quiz/IQ/Connection's own answer logic)
- Per-game timer behavior (only Math/Missing Number have one)
- Connection's invite/match/shared-view states
- Quiz's reverse-challenge entry point

---

## 7. What This Document Is Not

This is a description of the current prototype, not a new production architecture. No question
generation, scoring, timer, or matching logic was changed to produce this document, and none of
the state/variable names above were renamed. Introducing a formal shared "game engine" class or
config-loader is a future decision, not something this document authorizes.
