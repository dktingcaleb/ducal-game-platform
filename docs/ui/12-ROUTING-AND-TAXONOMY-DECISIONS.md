# Ducal Game — Routing & Taxonomy Decisions

Version: 1.0
Status: DECISION RECORD — production contracts for items the prototype left ambiguous
Purpose: Define route meaning/ownership, the canonical game taxonomy, and the conceptual game
configuration schema, so production work does not have to infer them from prototype behavior.

> IMPORTANT:
> The prototype (`prototype/index.html`) is frozen as the approved **UI / interaction reference**.
> It is not a production architecture reference. Where this document and the prototype's
> address-bar strings differ, **this document wins** for production (see `08-AI-CHANGE-RULES.md`
> §42). This document does not redesign any screen, change any token, or define a router
> implementation.

---

# 1. Scope

This document defines:

1. the production route contract (route meaning and ownership)
2. the canonical game taxonomy
3. the Math structure
4. the Psychology / Personality resolution
5. the conceptual game configuration schema
6. platform vs creator game origin
7. what is prototype-only

It does **not** define: router technology, data storage, API shape, page-by-page specs,
authentication/authorization mechanics, or any visual change.

---

# 2. Routing Contract

## 2.1 Resolved collision

The prototype used `ducalgame.com/games` for two different screens (`games` and `library`).
This is resolved:

```text
Public Game Discovery      /games
Creator My Games / Library /my-games
```

`/games` is public discovery only. `/my-games` is the signed-in creator's library only.

## 2.2 Route table

Route parameters are written `:name`. "Prototype screen" is the screen id in `prototype/index.html`
whose UI is the visual reference.

### Public — family: Marketing / Public

| Route | Meaning | Prototype screen |
|---|---|---|
| `/` | Homepage | `landing` |
| `/games` | Public Game Discovery (platform games) | `games` |
| `/about` | About | `about` |
| `/contact` | Contact | `contact` |
| `/report` | Report (Legal/System family) | `report` |

### Auth — family: Authentication / Claim

| Route | Meaning | Prototype screen |
|---|---|---|
| `/login` | Log in | `login` |
| `/register` | Create account | `register` |
| `/forgot-password` | Recover access | `forgot-password` |

Claim Success (`claim-success`) is a completion state of the Guest→Account claim flow. Whether it
is its own route or a state of `/register` / `/login` is left open (see §10).

### Creator App — families: Creator Application + Account / Settings

| Route | Meaning | Prototype screen |
|---|---|---|
| `/dashboard` | Creator dashboard | `dashboard` |
| `/my-games` | Creator's own games (Library) | `library` |
| `/analytics` | Analytics overview | `analytics` |
| `/games/:gameId/manage` | Manage one creator game (Overview / Results / Questions / Links) | `detail` |
| `/profile` | Profile | `profile` |
| `/history` | Play history | `play-history` |
| `/history/:historyId` | One play-history entry | `history-detail` |
| `/notifications` | Notification center | `notifications` |
| `/settings` | Settings | `settings` |

Note: `/games/:gameId/manage` shares the `/games` prefix with public discovery. This is
intentional (the manage route is a sub-resource of a game) but ownership stays separate:
`/games` (exact) is Marketing/Discovery; `/games/:gameId/manage` is Creator Application and
requires ownership of that game. There is **no** public `/games/:gameId` page defined by this
document (see §10).

### Creation — family: Discovery / Creation Entry, then Editor / Challenge

```text
/new
/new/:category
/new/:category/:series
/new/:category/:series/:mode
/new/:category/:series/:mode/:difficulty
```

| Route | Meaning | Prototype screen |
|---|---|---|
| `/new` | Choose a Category | `category-select` |
| `/new/:category` | Choose within a Category | `gametype-select` |
| `/new/:category/:series` | Series-level step (where the category has multiple series) | — |
| `/new/:category/:series/:mode` | Mode-level step, e.g. choose a Math difficulty | `math-difficulty`, `missing-difficulty` |
| `/new/:category/:series/:mode/:difficulty` | Fully configured game — intro before starting/creating | `gametype-intro` |

Each level is optional where the taxonomy has no such level (see §3.4). A route contains only
the segments that apply to that category — a Quiz path does not carry a difficulty.

The creator-name step and the Workbench (editor) are part of the creation flow but their exact
route segments are not defined here (see §10).

### Player — family: Player

```text
/play/:gameId
```

Opens the Player for one game. `:gameId` is a **Game ID** (§3.3) for platform games, or the
creator game's opaque identifier for creator games (§6.3). Player states (landing, question,
result, etc.) are **state within the Player**, not separate routes, unless a later page spec
requires shareable result URLs.

### Challenge — family: Editor / Challenge

| Route | Meaning | Prototype screen |
|---|---|---|
| `/challenge/:gameId` | Reverse-challenge editor | `challenge` |
| `/challenge/:gameId/preview` | Preview all questions | `challenge-preview-all` |
| `/challenge/:gameId/share` | Send / share | `challenge-share` |

### Legal — family: Legal / System

```text
/legal/privacy
/legal/terms
/legal/cookies
/legal/community-guidelines
/legal/copyright
```

All five map to the single prototype `legal` template screen; content differs per document.

### System / error states

`link-expired`, `game-offline`, and `not-found` may be **route-driven or state-driven as
appropriate**:

- `not-found` — the fallback for any unmatched route.
- `game-offline` — a state of `/play/:gameId` when that game is unavailable (it is a state of
  accessing a game, not a separate URL; see `07-PAGE-MAP-AND-OWNERSHIP.md` §49).
- `link-expired` — a state of a private/manage link that is no longer valid.

## 2.3 Route ownership rules

- A route belongs to exactly one page family (`07-PAGE-MAP-AND-OWNERSHIP.md`). Shared
  components (e.g. Marketing Nav on `/games`) do not transfer route ownership.
- Bottom Tab / sidebar visibility follows `05-RESPONSIVE-FOUNDATION.md` §37 per screen, not
  per route prefix. This document does not change which screens show it.
- Route decisions are recorded here. They are not to be changed as a side effect of UI work
  (`CLAUDE.md` §16).

---

# 3. Game Taxonomy

## 3.1 Canonical hierarchy

```text
Category
→ Series
→ Mode
→ Difficulty
→ Game ID
```

| Level | Meaning |
|---|---|
| Category | Top-level product grouping (Quiz, Math, IQ, Idioms, Psychology) |
| Series | A family of related games inside a Category with a shared mechanic |
| Mode | A variant of a Series (e.g. the arithmetic operation) |
| Difficulty | A tier of a Mode (e.g. digit count) |
| Game ID | The unique identifier of one playable configuration |

Every level except Category and Game ID is **optional**: a category that has no meaningful
Mode or Difficulty simply omits it (§3.4, §5).

## 3.2 Mapping from prototype terminology

The prototype calls the step after Category "Game Type". In production terms:

```text
Prototype "Game Type"  ≈  Series (and, for Math, Series → Mode)
Prototype "难度 / 位数"  =  Difficulty
```

The prototype's UI wording is preserved as the visual reference; the taxonomy terms above are the
production data vocabulary.

## 3.3 Game ID

A Game ID is the stable, unique identifier of one playable configuration.

- Format for platform games: lowercase `snake_case`, built from the applicable levels.
- Examples (from the requirements):

```text
Category:   Math
Series:     Basic Arithmetic
Mode:       Addition
Difficulty: 2-Digit
Game ID:    basic_addition_2_digit
```

```text
Category:   Math
Series:     Missing Number
Mode:       Mixed
Difficulty: 4-Digit
Game ID:    missing_mixed_4_digit
```

Route segments use kebab-case slugs (`basic-arithmetic`, `missing-number`, `2-digit`); Game IDs
use snake_case (`basic_addition_2_digit`). The mapping between slug segments and Game ID is
deterministic and defined by the configuration (§5), not by string parsing at runtime.

**Difference from the prototype (record only — do not rename prototype code):**

| | Prototype | Production contract |
|---|---|---|
| Basic Arithmetic Game ID | `math-add-d2` | `basic_addition_2_digit` |
| Basic Arithmetic operation id | `add` / `sub` / `mul` / `div` / `mixed` | `addition` / `subtraction` / `multiplication` / `division` / `mixed` |
| Basic Arithmetic difficulty id | `d2` / `d3` / `d4` | `2-digit` / `3-digit` / `4-digit` (`2_digit` inside a Game ID) |
| Missing Number Game ID | `missing_mixed_4_digit` | `missing_mixed_4_digit` (unchanged) |

Missing Number already matches. Basic Arithmetic differs and must be mapped at the
prototype→production boundary. Per `CLAUDE.md` §11 the prototype identifiers are not renamed.

## 3.4 Which levels apply to which category

Levels apply only where they carry meaning. Do not force empty levels onto a game.

| Category | Series | Mode | Difficulty |
|---|---|---|---|
| Math | yes | yes | yes |
| Quiz | yes (Game Type, e.g. How Well Do You Know Me?) | no | no |
| IQ | yes | no | no |
| Idioms | yes | no | no |
| Psychology | yes | no | no |

(The Quiz, IQ, Idioms and Psychology rows describe what the prototype currently needs; a future
series may add a Mode or Difficulty without changing the hierarchy.)

---

# 4. Math Structure

```text
Math
├── Basic Arithmetic
│   ├── Addition
│   ├── Subtraction
│   ├── Multiplication
│   ├── Division
│   └── Mixed
│
└── Missing Number
    ├── Addition
    ├── Subtraction
    ├── Multiplication
    ├── Division
    └── Mixed
```

Each Mode supports three Difficulties:

```text
2-Digit
3-Digit
4-Digit
```

Counts:

```text
Basic Arithmetic:  5 modes × 3 difficulties = 15 game configurations
Missing Number:    5 modes × 3 difficulties = 15 game configurations
```

These are **30 configurations of the shared Player architecture, not 30 Player
implementations.** A configuration selects the question pool, copy and timing; it does not
introduce new Player markup or a new visual system (`11-PLAYER-FAMILY-ARCHITECTURE.md` §1, §4;
`CLAUDE.md` §13).

Prototype reference values (unchanged by this document): the timer is 10s / 20s / 30s for
2/3/4-Digit, and Mixed uses 20 questions (5 per operation). Those are prototype behavior, not
newly ratified product rules here.

Whether Basic Arithmetic and Missing Number share one configuration-driven engine or remain two
engines is an implementation decision (see §10). Either way they remain configurations of one
shared Player shell.

---

# 5. Psychology / Personality

Resolved: **Personality Test belongs under Psychology.** There is no top-level Personality
Category.

```text
Category: Psychology
└── Personality Test
```

- Canonical Category id: `psychology`.
- Future psychology-related series may be added under the same Category.
- This resolves the conflict recorded in `03-MASTER-GAP-ANALYSIS.md` §21.

**Prototype divergence (record only):** the prototype uses the category key `personality`
(label 心理测试) as a top-level category, e.g. `filterGallery('personality')` and
`categoryGameTypes.personality`. Production uses `psychology`. The prototype is not renamed
(`CLAUDE.md` §11); the mapping happens at the boundary.

How the existing prototype game "How Strong Is Your Connection?" sits under Psychology
(as a Series or as a Mode of a Personality Test Series) is not fixed here (see §10). The
requirement is only that it lives under `psychology`.

---

# 6. Platform vs Creator Games

## 6.1 Origin

```text
game_origin:
- platform
- creator
```

`origin` is an **explicit field on the game**. It must **not** be inferred from `creator_id`
(or from the presence/absence of any creator field), from the route, or from the shape of the
Game ID.

## 6.2 Meaning

| | Platform game | Creator game |
|---|---|---|
| Authored by | Ducal Game | A user (Guest or account) |
| Discovery | Public — listed on `/games` | Private link — not listed on `/games` |
| Management | Not in any user's `/my-games` | Appears in the owner's `/my-games`; managed at `/games/:gameId/manage` |
| Game ID | Deterministic taxonomy Game ID (§3.3) | Opaque, non-guessable identifier |
| Taxonomy fields | Category / Series / Mode / Difficulty as applicable | Category / Series (e.g. Quiz → How Well Do You Know Me?); Mode/Difficulty normally absent |
| Play route | `/play/:gameId` | `/play/:gameId` |

This matches the prototype's own copy: platform games (IQ, Math, psychology) are the platform's
own question banks, not games the user created.

## 6.3 Interaction with routing

- Both origins play at `/play/:gameId`. The Player resolves the game by `:gameId` and reads
  `origin` from the game record — it does not branch on the URL shape.
- `/games` (discovery) lists **only** `origin = platform`.
- `/my-games` lists **only** the signed-in user's `origin = creator` games.
- `/games/:gameId/manage` and `/challenge/:gameId/...` apply to creator games. A request for a
  platform game there is `not-found` / not permitted, not a different UI.
- Because both origins share `/play/:gameId`, Game ID formats **must not collide**. Platform Game
  IDs are deterministic readable snake_case; creator identifiers are opaque. The namespace
  guarantee (reserved format or prefix) is an implementation decision (see §10).

## 6.4 Interaction with configuration

- Platform games use the full taxonomy configuration (§7).
- Creator games carry `origin: "creator"`, their Category/Series, and their own content
  reference; they do not carry Mode/Difficulty unless the Series defines them.
- Ownership, sharing permissions and lock state of a creator game are creator-game concerns and
  are not part of the taxonomy configuration.

---

# 7. Game Configuration Schema (conceptual)

A production-oriented conceptual shape. It is **not** a database schema or API contract.

## 7.1 Core fields

```text
game_id      string   required   unique identifier (§3.3, §6.3)
category     string   required   e.g. "math", "quiz", "iq", "idioms", "psychology"
series       string   required   e.g. "basic-arithmetic", "missing-number"
origin       enum     required   "platform" | "creator"
mode         string   optional   only where the Series defines Modes
difficulty   string   optional   only where the Mode defines Difficulties
```

Fields that do not apply to a game are **omitted**, not filled with placeholders.

## 7.2 Examples

Missing Number:

```json
{
  "game_id": "missing_mixed_4_digit",
  "category": "math",
  "series": "missing-number",
  "mode": "mixed",
  "difficulty": "4-digit",
  "origin": "platform"
}
```

Basic Arithmetic:

```json
{
  "game_id": "basic_addition_2_digit",
  "category": "math",
  "series": "basic-arithmetic",
  "mode": "addition",
  "difficulty": "2-digit",
  "origin": "platform"
}
```

Illustrative — a platform IQ game (no mode/difficulty):

```json
{
  "game_id": "iq_logic_reasoning",
  "category": "iq",
  "series": "logic-reasoning",
  "origin": "platform"
}
```

Illustrative — a creator Quiz (opaque id, no mode/difficulty):

```json
{
  "game_id": "<opaque>",
  "category": "quiz",
  "series": "how-well-do-you-know-me",
  "origin": "creator"
}
```

The IQ and Quiz examples show shape only; their exact ids and series slugs are not ratified by
this document.

## 7.3 Extensibility

- New categories, series, modes or difficulties are **additions to data**, not new Player
  implementations.
- Family-specific settings live in a separate, game-family-specific extension (e.g. Math timing
  per difficulty; Connection's invite/match states), not as fields forced onto every game.
- The generic schema must not accumulate Math-only or Connection-only fields at the top level.
  Family extensions attach to `game_id`.

## 7.4 Relationship to the Player

```text
Route (/play/:gameId)
→ resolve game configuration
→ Shared Player Shell
→ family/game-specific logic selected by configuration
→ Player state → Result
```

This restates the model in `11-PLAYER-FAMILY-ARCHITECTURE.md` §1: shared Player shell + game
configuration + game-specific logic + Player state.

---

# 8. Prototype vs Production

The following are **prototype-only** and must not be reproduced literally in production:

```text
Prototype Harness (prototype-harness.css / prototype-harness.js)
device width buttons (Desktop / Tablet / Mobile toggle)
browser chrome (address-bar strip, window dots)
review navigation (screen nav strip)
#subNav (Player review navigation)
go() / pgo() state dispatch
global current* state variables (currentMathOpId, currentMissingGameId, etc.)
inline onclick handlers
demo data (play counts, names, activity, ad-retry demo)
Silent open functions (openMathGameSilent, openMissingGameSilent)
single-file architecture (one HTML file holding CSS, markup and JS)
```

Additionally, the prototype's address-bar strings (`addr:` values) are illustrative. They are
superseded by the route contract in §2 for production.

The prototype remains the **visual and interaction reference**: what screens look like and how
flows behave. It is not the production architecture. Production code should implement the same
appearance and behavior on a real router, real state management and real data, following
`04`–`08` and `11`.

---

# 9. Explicitly Out of Scope

Not addressed by this document, and not blockers for it:

- the 303 inline `style=""` attributes
- Danger / Warning token consolidation
- superseded docs `00`–`03`
- the frozen `game-platform-ui-responsive (4).html`
- the temporary zip
- page-by-page production specs
- router / state-management technology choices
- i18n / language strategy

---

# 10. Unresolved Decisions

These remain open and must be settled during implementation planning or in page specs. They do
not undo any decision above.

1. **Series / Mode placement for non-Math games.** Where the prototype's existing Quiz, IQ and
   Connection games sit exactly (Series slug, and whether Connection is a Series or a Mode of
   Personality Test) under `psychology`.
2. **`/new` overloading.** The prototype used the Category → Game Type picker for both
   *creating* a Quiz and *playing* platform games (Math, IQ). The route contract keeps
   `/new/...` as specified. Whether platform-game discovery/start continues to be reached via
   `/new/...` or moves fully under `/games` is undecided. This affects only navigation entry
   points, not the taxonomy or `/play/:gameId`.
3. **Creation flow segments after intro.** The route segments for the creator-name step and the
   Workbench (including locked vs editable state) are not defined.
4. **Claim Success.** Whether it has its own route or is a state of the Auth routes.
5. **Public game page.** No public `/games/:gameId` page is defined. Whether one is needed
   (e.g. for SEO/share) is undecided.
6. **Shareable results.** Player result/share states are Player state, not routes. Whether
   results need shareable URLs (the prototype has an external shared Connection view) is
   undecided.
7. **Game ID namespace guarantee** between platform IDs and creator opaque IDs sharing
   `/play/:gameId` (§6.3).
8. **One engine vs two** for Basic Arithmetic and Missing Number (§4).
9. **Idioms** is a Category in the prototype but currently has no available game. Its Series
   is undefined.
10. **Exact slug/ID tables** for every current prototype game (only the Math examples above are
    fixed).

---

# 11. Status of Conflicts With Existing Docs

- `07-PAGE-MAP-AND-OWNERSHIP.md` §22 and §57 record the `/games` route collision as
  "ROUTE DECISION REQUIRED". This document resolves it; §22/§57 should be updated to point here
  in a separate documentation task.
- `03-MASTER-GAP-ANALYSIS.md` §21 records the Psychology vs Personality conflict. Resolved in §5
  above.
- `07-PAGE-MAP-AND-OWNERSHIP.md`'s screen and Player-state inventory predates `missing-difficulty`
  and the Missing Number states; it is not corrected here.
- `CLAUDE.md` §16 says not to finalize routes during unrelated UI work. This document is a
  dedicated route decision task, not unrelated UI work.
