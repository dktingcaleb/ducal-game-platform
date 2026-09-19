# Ducal Game — Production Responsive & Navigation Contract

Version: 1.0
Status: PRODUCTION IMPLEMENTATION CONTRACT
Purpose: Define, for production implementation, the responsive breakpoints, the navigation
model, Bottom Tab inclusion/exclusion, and the responsive contracts for Player, Editor and
Public screens.

> IMPORTANT:
> This document is the **production responsive / navigation contract**. It does not change the
> prototype. The prototype (`prototype/index.html`) remains the approved visual and interaction
> reference: it defines *visual intent, navigation behavior and layout relationships*. It does
> **not** define the final CSS architecture (see §11).
>
> This document does not redesign any screen, change any design token, or change any route
> (routes are in `12-ROUTING-AND-TAXONOMY-DECISIONS.md`).

---

# 1. Reference Widths vs Production Breakpoints

## 1.1 Reference (review / QA) widths

```text
Mobile   390px
Tablet   834px
Desktop  1280px
```

These are **review and QA reference widths** — the sizes at which a design is approved and
regression-checked. They are **not** the only supported viewport widths. Production layouts must
be **fluid between breakpoints** and must work at every width (see `05-RESPONSIVE-FOUNDATION.md`
§29).

## 1.2 Production breakpoints

Two independent breakpoints, with two independent jobs:

```text
1023 / 1024   NAVIGATION behavior
              <= 1023px   Mobile + Tablet  → Bottom Tab is the primary app navigation
              >= 1024px   Desktop          → desktop navigation / sidebar

700 / 701     CONTENT-LAYOUT behavior
              <= 700px    may trigger narrower / single-column content reflow where applicable
              >= 701px    content layout is not forced into the narrow reflow
```

**Do not merge these concepts.**

- The **1023px** breakpoint decides *which navigation is shown*. It says nothing about columns,
  grids, table treatment or spacing.
- The **700px** breakpoint decides *whether content reflows to a narrower layout*. It says nothing
  about which navigation is shown.

A Tablet-width screen (e.g. 834px) therefore has **Mobile navigation (Bottom Tab)** with
**non-narrow content layout** (multi-column/grid may remain). A 720px window is likewise
Bottom Tab + non-narrow content.

The 700px content threshold is a *may trigger where applicable* rule: individual components
reflow at 700px only if their own spec calls for it. It is not a universal collapse switch.

---

# 2. Navigation Model

Navigation is owned by page-family context (`07-PAGE-MAP-AND-OWNERSHIP.md` §51,
`08-AI-CHANGE-RULES.md` §14). Nothing in this contract replaces one family's navigation with
another's.

## 2.1 Desktop (>= 1024px)

| Screen kind | Navigation |
|---|---|
| Normal authenticated app screens | Desktop sidebar / desktop navigation |
| Public screens | Public header / navigation |
| Focused flows | Focused layout as specified by the page family (no app navigation) |

## 2.2 Mobile + Tablet (<= 1023px)

| Screen kind | Navigation |
|---|---|
| Normal authenticated app screens | **Bottom Tab** is the primary navigation |
| Public screens | Public header, collapsed as appropriate (§10); no Bottom Tab |
| Focused flows | No app navigation (see §4) |

Rules:

- Mobile and Tablet belong to **one navigation family**: they share the Bottom Tab model.
- On screens that use the Bottom Tab there must be **no competing duplicate primary navigation**
  at <= 1023px — no desktop sidebar, and no marketing-nav link set / hamburger / login CTA
  duplicating the tab's destinations.
- Tablet **content** may remain wider or multi-column. Sharing the navigation model does not mean
  sharing the Mobile content layout.
- A lightweight brand mark/header may remain on a screen that uses the Bottom Tab (the prototype
  keeps the brand mark visible on Games at these widths); it is not competing primary navigation.

---

# 3. Bottom Tab — Included Screens

Normal app / discovery screens that use the Bottom Tab at **<= 1023px**:

```text
Games / Discovery
Category Select
Game Type Select
Math Difficulty
Missing Number Difficulty
Game Type Intro
Dashboard
My Games / Library
Analytics
Game Detail
Profile
Play History
History Detail
Notifications
Settings
```

Requirements:

- The Bottom Tab shows the primary app destinations of the Creator/Application shell (the
  prototype's four: Home/Dashboard, Create, My Games, Profile).
- The **active destination** must reflect where the user is. Screens that belong to the create
  flow (Category Select, Game Type Select, Math/Missing Number Difficulty, Game Type Intro)
  highlight *Create*; My Games / Game Detail highlight *My Games*; Dashboard highlights *Home*;
  Profile, Play History, History Detail, Notifications and Settings highlight *Profile* (the
  account destination) unless a page spec assigns a different active item. Where the prototype
  differs (e.g. some screens highlight nothing or a different item) the page spec decides.
- Games / Discovery follows `/games` (public discovery) but is listed here because the
  approved model shows the Bottom Tab there at <= 1023px. Ownership of the screen stays
  Discovery; ownership of the Bottom Tab stays the Creator/Application shell.

---

# 4. Bottom Tab — Excluded Screens

The Bottom Tab does **not** appear on focused or public flows. Exclusion is a **navigation
ownership rule**, not a list of route special-cases: a screen shows the Bottom Tab only if it is
a normal app/discovery screen owned by the Creator/Application navigation (§3). Screens owned by
another family's navigation, or by a focused flow, never inherit it.

| Family / kind | Screens | Why (ownership rule) |
|---|---|---|
| Marketing / Public | Landing, About, Contact, Report | Owned by the public header/navigation |
| Authentication | Login, Register, Forgot Password, Claim Success | Focused flow; no app navigation |
| Legal | Privacy, Terms, Cookies, Community Guidelines, Copyright | Public document pages; public navigation |
| Gameplay | Active Player Question / gameplay screens | Focused Player experience |
| Workbench / Editor | Workbench, Workbench Locked, focused Editor flows | Focused editor experience |
| Challenge | Challenge, Challenge Preview, Challenge Share | Focused editor-family flow |
| External / shared Player | Shared/public Player states where app navigation is inappropriate | Not an authenticated-app context |
| System | Link Expired, Game Offline, 404 | Focused system states |

Implementation note: production should implement this by giving each screen/layout a declared
*navigation kind* (e.g. app-shell vs public vs focused) and letting the layout render the correct
navigation — not by hard-coding a list of routes in the Bottom Tab component. This document does
not define that mechanism.

---

# 5. Game Intro vs Gameplay

This boundary is explicit:

```text
Game Type Intro     → normal app / discovery screen
                      Bottom Tab on Mobile + Tablet (<= 1023px)

Active gameplay     → focused Player experience
                      NO Bottom Tab
```

- The Game Type Intro (a screen shown before creating or playing) belongs to Discovery /
  Creation Entry and uses the app navigation, even though it visually reuses the focused
  card surface.
- Once the user starts a game, the screen becomes the Player. **The moment gameplay begins, app
  navigation is gone.** This includes the Player's Landing, Question and Result states: they are
  part of the focused Player subsystem (`CLAUDE.md` §13) and do not show the Bottom Tab.
- Sharing a visual surface (Center Card, Player card) does not transfer navigation ownership.
  Navigation follows §4's ownership rule, not the component's appearance.

> Note: whether the Player's *Landing* state (before Question 1) is treated as "gameplay" is
> decided here as **yes — focused, no Bottom Tab**, matching the prototype (Player landing
> states have no Bottom Tab).

---

# 6. Safe Area & Fixed Navigation

Production Bottom Tab implementation must satisfy all of the following.

## 6.1 Requirements

1. **Safe area.** Respect device safe-area insets — at minimum the bottom inset (home indicator)
   and, in landscape, left/right insets. Tab padding must include the inset so labels/icons are
   not clipped or sit under system UI.
2. **Content is never obscured.** Enough bottom space is reserved that the last content and any
   CTA is fully visible and tappable above the tab, at every scroll position.
3. **Scrollable content stays fully reachable.** The user can always scroll the final content
   (including the primary CTA and secondary links such as "How does this work?") completely clear
   of the tab.
4. **Reserved space tracks the tab.** The bottom space reserved for content must equal the tab's
   real height (including safe-area inset), not an independent hard-coded number that can drift.
5. **CTA clearance.** A primary CTA must never sit under the tab, and should have comfortable
   spacing above it (touch-friendly; no accidental taps on the tab).
6. **Keyboard interaction.** When the on-screen keyboard is open (forms in Settings, Contact, etc.),
   the tab must not cover the focused input or its submit action; hiding the tab while the
   keyboard is open is acceptable if the layout stays usable.
7. **No layout shift trap.** The tab must not overlap the page's scroll container in a way that
   creates nested or trapped scrolling (`05-RESPONSIVE-FOUNDATION.md` §28).
8. **Touch targets.** Each tab item is a touch-friendly target with visible focus, an accessible
   name, and a non-color-only active indicator (`06-SHARED-COMPONENT-FOUNDATION.md` §42).

## 6.2 Why this is a requirement

The prototype's Game Type Intro and History Detail screens were recently fixed because the tab
overlapped their lower content/CTA (the tab was pulled up over the card). Those fixes prove the
requirement: the tab and the content's reserved space must be designed together.

## 6.3 What not to copy

Do **not** copy the prototype's implementation literally. In particular:

- negative bottom margins on the tab paired with fixed `padding-bottom` on the container;
- a per-screen hard-coded `90px` reserve;
- the prototype's split behavior (sticky on some screens, in-flow on screens whose container is
  `overflow:hidden`);
- the prototype has **no** safe-area handling; production must add it.

Define the production Bottom Tab once, as a single shared layout-level component with one
placement/spacing mechanism used consistently by every screen in §3.

---

# 7. Responsive Content Principles

## 7.1 Mobile (<= 700px content reflow; Bottom Tab <= 1023px)

- Single-column by default.
- Touch-first, with large tap targets.
- Avoid horizontal page scrolling. Tables may scroll horizontally *inside* their own container;
  the page must not (`05-RESPONSIVE-FOUNDATION.md` §16).
- Focused Player / card layouts.
- Button groups may stack; primary action hierarchy is preserved (`05` §19).

## 7.2 Tablet (701–1023px content; Bottom Tab <= 1023px)

- Same **navigation** model as Mobile (Bottom Tab).
- May retain two-column / grid structures where space allows.
- Do **not** automatically collapse everything to the Mobile layout.
- Tablet is a real design target, not a stretched phone or a squeezed desktop
  (`05` §10).

## 7.3 Desktop (>= 1024px)

- Makes use of the larger horizontal space (multi-column, split editor/preview, data density).
- Preserves **readable content widths** — full viewport width does not mean full content width
  (`05` §13).
- Uses the sidebar where applicable (Creator/Application shell).

## 7.4 Across all widths

- Layouts stay functional at every intermediate width, not only the three reference widths
  (`05` §29).
- Hierarchy is preserved: H1 stays H1, primary CTA stays primary. Fix layout before shrinking
  text (`05` §21).
- Decorative elements may be reduced or hidden; required actions, legal information and critical
  errors may not.

---

# 8. Player Responsive Contract

The Player is one shared subsystem (`11-PLAYER-FAMILY-ARCHITECTURE.md`). All games —
**Quiz, IQ, Connection, Basic Math, Missing Number** — reuse the same responsive Player
principles; no game defines its own responsive system.

| Viewport | Contract |
|---|---|
| Mobile | Near-full-width card with safe side margins; reduced padding/radius; focused single-question layout |
| Tablet | **Centered, readable** Player card — does **not** stretch to full tablet width unnecessarily |
| Desktop | **Centered, narrow** Player experience (the prototype's focused card is ~520px max) |

Rules:

- Active gameplay is **focused** and **does not inherit normal app navigation** (no Bottom Tab,
  no sidebar) — see §5.
- Preserve at every viewport: game title/context, progress, question, answer options, feedback,
  next action, result hierarchy, and share/challenge actions where relevant (`05` §22).
- Answer options meet touch-target requirements on Mobile and Tablet.
- Game-specific elements (Math timer, Connection dimension bars/invite/match views, Quiz
  reverse-challenge entry) are extensions **inside** this contract; they must not introduce a
  different card width, radius language or navigation.
- Mobile safe areas apply to bottom actions inside the Player (sticky CTAs, result actions).

---

# 9. Workbench / Editor Responsive Contract

Family: Editor / Challenge (`07-PAGE-MAP-AND-OWNERSHIP.md` §31–§36). **No Bottom Tab at any
width** (§4).

| Viewport | Contract |
|---|---|
| Desktop | Multi-panel editor layout may be used (e.g. Outline + Editor + Preview) |
| Tablet | Adapt/reduce panels (fewer simultaneous panels) **without** introducing a Bottom Tab; preserve editing usability |
| Mobile | Simplify into a stacked / single-column editing flow; maintain touch targets; explicit preview toggle; horizontally scrollable question navigation; no Bottom Tab |

Rules:

- The underlying editing flow and data stay the same across viewports (`05` §23).
- **Workbench Locked is a state/mode of the same responsive editor family**, not a separate
  responsive implementation.
- Challenge, Challenge Preview and Challenge Share reuse the same editor-family responsive
  behavior; they must not fork it.
- The editor's own navigation (question navigation, step controls, footer actions) is
  editor-family navigation. It does not become the app Bottom Tab.
- Internal scrolling (outline, preview) is acceptable when intentional; it must not create
  trapped or nested accidental scroll (`05` §28).

---

# 10. Public / Marketing Responsive Contract

Family: Marketing / Public, plus the public Legal/System pages that share public navigation.

- Uses the **public header/navigation** and a responsive marketing layout.
- **No Bottom Tab** at any width.
- On smaller widths the public navigation may collapse (e.g. compact header with a hamburger /
  menu) — the destinations and the CTA hierarchy (e.g. Create vs Play) must remain clear and
  reachable.
- **Do not reuse authenticated app navigation** on these pages.
- Content width: marketing sections may use a wider container; text-heavy sections and
  Forms/Auth remain constrained for readability (`05` §13).
- Public discovery (Games) is a special case: it uses the Bottom Tab at <= 1023px (§3), with its
  public-navigation link set / hamburger / CTA removed at those widths so navigation is not
  duplicated (§2.2). At >= 1024px it keeps the public header navigation.

---

# 11. Production Implementation Rule

The prototype's responsive *mechanics* are simulation devices and must **not** be copied into
production:

- the `.browser` container-based responsive simulation (the prototype's `@container` queries
  are relative to the preview frame, not the real viewport);
- the prototype device toggle (Desktop / Tablet / Mobile buttons);
- negative-margin Bottom Tab tricks (§6.3);
- review-harness layout wrappers (studio header, navigation strips, browser chrome).

Production should use a **real viewport-responsive implementation** (media queries and/or
container queries against real components — choice left to implementation). Where component-level
container queries are used, they must express the same 1023 / 700 relationships defined here.

The prototype defines:

```text
visual intent
navigation behavior
layout relationships
```

It does **not** define the final CSS architecture, file layout, class names or breakpoint
plumbing. (See also `12-ROUTING-AND-TAXONOMY-DECISIONS.md` §8 for the full prototype-only list.)

---

# 12. QA Matrix

## 12.1 Required reference checks

Every meaningful UI change is verified at:

```text
390px    Mobile reference
834px    Tablet reference
1280px   Desktop reference
```

## 12.2 Required breakpoint-edge checks

Also test around the breakpoint edges:

```text
700 / 701     content-layout edge
1023 / 1024   navigation edge
```

At each edge confirm:

- **700 / 701:** content reflow changes only at this edge; navigation does not change here.
- **1023 / 1024:** navigation changes only at this edge (Bottom Tab ↔ desktop navigation/sidebar);
  content layout does not jump to a different structure solely because of this edge.
- exactly one primary navigation is visible on app screens at every width.

## 12.3 Intermediate widths

Also spot-check common intermediate widths, for example:

```text
360, 414, 600, 768, 900, 1100
```

(`05` §29 requires the layout to stay functional between reference widths.)

## 12.4 What to check

Per screen at each width: layout, spacing, typography, borders/radius, navigation (single,
correct, active state), CTA visibility and reachability above the Bottom Tab, safe-area
behavior on devices that have insets, forms with the keyboard open, modals/bottom sheets,
scrolling (no accidental horizontal scroll or nested scroll), and hidden/decorative elements.

## 12.5 Bottom Tab matrix

For each screen in §3 at 390 / 834 / 1023 / 1024: Bottom Tab presence, active item, content not
obscured. For each screen in §4 at the same widths: Bottom Tab absent.

---

# 13. Relationship to Existing Docs

| Document | Relationship |
|---|---|
| `05-RESPONSIVE-FOUNDATION.md` | Foundation this contract builds on; **this document is the production responsive/navigation contract** where they differ |
| `06-SHARED-COMPONENT-FOUNDATION.md` | Defines Bottom Navigation / Sidebar / Player Card components; this contract governs their responsive and navigation behavior |
| `07-PAGE-MAP-AND-OWNERSHIP.md` | Source of family/navigation ownership (§51) |
| `11-PLAYER-FAMILY-ARCHITECTURE.md` | Shared Player model that §8 applies to |
| `12-ROUTING-AND-TAXONOMY-DECISIONS.md` | Routes and taxonomy; this contract does not alter them |

Older docs are **not rewritten** by this document. Where they conflict, this document governs
production and the conflict is recorded here for a later, approved documentation update:

1. **Tablet start.** `05` §3 defines Tablet as 768–1023 and Mobile as 0–767 (primary layout
   ranges). This contract keeps the **1023/1024 navigation** breakpoint (which agrees with `05`
   §37) but defines the **content** threshold as **700/701** — matching the prototype's
   `@container (max-width: 700px)` and `05` §5/§37's own statement that content rules follow the
   700px threshold. So content-layout Mobile ends at 700, not 767, and 701–767 is
   Bottom Tab + non-narrow content.
2. **Mobile-first vs prototype.** `05` §4 directs production CSS toward Mobile baseline with
   `min-width: 768` / `min-width: 1024` queries. This contract uses the 700 (content) and 1023
   (navigation) thresholds instead; the mobile-first *direction* (baseline = Mobile) is
   compatible, but the specific `768` value is superseded by this document for content layout.
3. **Bottom Tab mechanics.** `06` §24 describes "sticky bottom placement". This contract
   requires the production placement mechanism to satisfy §6 (safe area, content never
   obscured); "sticky" is not mandated and the prototype's mixed sticky/in-flow behavior is not
   to be replicated.
4. **Player width.** `06` §27 gives ~520px as the desktop focused-card reference. This contract
   states the principle (centered, narrow) and treats 520px as the prototype reference, not a
   fixed production value.
5. **Games / Discovery navigation.** `05` §37 and `06` §24 describe hiding competing marketing-nav
   parts on Games at <= 1023 via a screen-scoped selector. This contract states the *outcome*
   (no duplicated primary navigation; brand mark may remain) and does not require that selector
   approach.

No conflict was found with `12-ROUTING-AND-TAXONOMY-DECISIONS.md`.

---

# 14. Explicitly Out of Scope

- Changing any prototype file, CSS or token.
- The router / framework / CSS-architecture choice.
- Page-by-page production specs (these will each restate Desktop / Tablet / Mobile behavior).
- The 303 inline styles, Danger/Warning token cleanup, superseded docs `00`–`03`.
- Redesigning the Bottom Tab's items, icons or labels.
