# Ducal Game — Marketing Family Extraction Plan

Version: 1.0
Status: PROPOSED PLAN — NOT YET EXECUTED
Purpose: Define the second structural refactor phase — separating Marketing / Public page-family code from the working prototype, following the Prototype Harness separation completed in `docs/ui/09-FIRST-EXTRACTION-PLAN.md`.

> Core rule:
>
> **Refactor, not redesign.**
>
> This plan changes file ownership only. It must not change the current visual appearance, behavior, responsive output, or product flow of Landing, About, or Contact.

This document was produced by reading `CLAUDE.md` and `docs/ui/00` through `09`, and by directly inspecting `prototype/index.html`, `prototype/prototype-harness.css`, and `prototype/prototype-harness.js` on `main` (post-merge state, commit `af8df2d`). All ownership claims below are verified against the current code, not assumed from the docs.

---

# 1. Goal

This is the first **Page-Family** extraction, following the Prototype Harness separation.

`09-FIRST-EXTRACTION-PLAN.md` separated *review tooling* (device toggle, browser chrome) from *product UI*. Everything product-related — Marketing, Auth, Discovery, Creator, Editor, Player, Account, Legal/System — is still one undivided block inside `prototype/index.html`'s inline `<style>` and `<script>` tags.

This plan begins dividing that product block by page family, starting with **Marketing / Public**, per the ownership map in `docs/ui/07-PAGE-MAP-AND-OWNERSHIP.md` and the recommended safe order in `docs/ui/09-FIRST-EXTRACTION-PLAN.md` §30 and `docs/ui/07-PAGE-MAP-AND-OWNERSHIP.md` §62.

The objective is a safe ownership boundary for three screens only — not a redesign, not a full CSS/JS split, and not a resolution of any open design-system gap recorded in `03-MASTER-GAP-ANALYSIS.md`.

---

# 2. Exact Screen Ownership

Verified directly in `prototype/index.html`:

| Screen | `data-screen` ID | Line (container open) | Line (container close) |
|---|---|---:|---:|
| Landing | `landing` | 974 | 1061 |
| About | `about` | 1150 | 1202 |
| Contact | `contact` | 1205 | 1271 |

All three are top-level `.screen` elements directly under the Harness's `.browser` frame, toggled by the existing (still-inline, cross-family) `go()` function via `.screen.active`. This mechanism was left inline during the Harness extraction (`09-FIRST-EXTRACTION-PLAN.md` §21, Commit 2 report) and remains inline here — it is not part of Marketing's ownership.

Note: `about` and `contact` are physically adjacent to `legal` (line 1112) and `report` (line 1274) in the file — all four currently sit under one HTML comment banner (`<!-- MARKETING/... LEGAL/INFO PAGE ... -->` at line 1063) inherited from the original prototype's informal grouping. This comment groups Marketing and Legal/System screens together in the markup, but per `07-PAGE-MAP-AND-OWNERSHIP.md` §4–§13 vs §45–§50, **About and Contact are Marketing-owned; Legal and Report are Legal/System-owned.** This plan does not touch `legal` or `report`.

---

# 3. Marketing Shared Ownership (Verified)

The following markup/CSS/behavior is used by **all three** of Landing, About, and Contact, and appears nowhere else that would contradict Marketing ownership per the page map:

| Item | Selector(s) | Notes |
|---|---|---|
| Hero section | `.mkt-hero`, `.mkt-hero .eyebrow`, `.mkt-hero h1`, `.mkt-hero p.lead`, `.mkt-hero .cta-row` | Landing only (see §4 — not actually shared across all 3, listed here for completeness of the "mkt-" family naming) |
| Marketing footer | `.mkt-footer`, `.mkt-footer .l`, `.mkt-footer .links` | Landing only — About/Contact do not render a footer |

**Correction after verification:** initial expectation was that Marketing nav/footer would be shared identically across Landing, About, and Contact. Verified reality is narrower:

- **`.mkt-nav` + `.mobile-menu` + `.hamburger-btn` + `toggleMobileMenu()`** (top navigation bar and its mobile hamburger menu) — markup is duplicated verbatim inside all three Marketing screens (lines 975, 1151, 1206) **and is also duplicated inside `report` (line 1275) and `games` (line 1605)**, i.e. Discovery and Legal/System families. See §5 — this is a cross-family dependency, not exclusively Marketing-owned, despite `07-PAGE-MAP-AND-OWNERSHIP.md` §51 labeling it "Marketing shared component." Treated conservatively below.
- **`.mkt-footer` and the cookie banner** only render on `landing`. About and Contact have no footer or cookie banner markup at all.
- **No shared "Marketing page shell" wrapper exists.** About and Contact both use the generic `.picker-shell`/`.picker-head` containers (see §5), which are Global Shared, not Marketing-owned.

So the only CSS that is genuinely **Marketing-family-shared** (used by 2+ of the 3 target screens, and only those families) is: none at the CSS-selector level beyond what's already covered as page-local in §4. Landing, About, and Contact do not share a distinct "Marketing body" component with each other — they share the *cross-family* nav (§5), and are otherwise independently composed.

---

# 4. Page-Local Ownership (Verified Safe)

## Landing only

```text
.mkt-hero
.mkt-hero .eyebrow
.mkt-hero h1 / h1 span
.mkt-hero p.lead
.mkt-hero .cta-row / .cta-row .note
.hero-dots
.hero-dot / .hero-dot.on
.mkt-visual
.mkt-visual .float-card
.mkt-visual .fc1 / .fc1 .dot
.mkt-visual .fc2
.mkt-steps
.mkt-steps h3
.steps-row
.step-card / .step-card .n / .step-card .t / .step-card .d / .step-card:not(:last-child):after
.mkt-cats (wrapper heading only — see §5 for `.cat-strip`/`.cat-chip`)
.mkt-cats h3
.mkt-cats .sub
.mkt-footer / .mkt-footer .l / .mkt-footer .links / .mkt-footer .links a
.cookie-banner / .cb-text / .cb-actions / .cookie-banner .btn.ghost
```

Confirmed via grep: none of these selectors appear outside the `landing` screen or its CSS block (lines ~706–754).

### Landing responsive (`@container (max-width: 700px)`) — verified page-local

The shared `@container (max-width: 700px)` block (starting line 841) contains a `/* ---- marketing landing ---- */` sub-section. Each selector inside it was individually re-verified against the rest of the file (not assumed safe merely from the comment label). The following are confirmed to appear **only** under Landing's markup and nowhere else in the file:

```text
.mkt-hero{grid-template-columns:1fr;padding:34px 20px 40px;gap:26px;}
.mkt-hero h1{font-size:28px;}
.mkt-hero p.lead{max-width:100%;}
.mkt-visual .float-card{display:none;}
.mkt-visual .mini-phone{width:100%;max-width:270px;margin:0 auto;}
.mkt-steps{padding:16px 20px 36px;}
.steps-row{grid-template-columns:1fr 1fr;gap:14px;}
.step-card:not(:last-child):after{display:none;}
.mkt-cats{padding:36px 20px;}
.mkt-footer{flex-direction:column;gap:10px;padding:20px;text-align:center;}
.mkt-footer .links{flex-wrap:wrap;justify-content:center;}
.cookie-banner{flex-direction:column;align-items:stretch;padding:16px 18px;}
.cookie-banner .cb-actions{justify-content:stretch;}
.cookie-banner .cb-actions .btn{flex:1;}
```

`.mkt-visual .mini-phone` is a compound selector: the bare `.mini-phone` class is also used elsewhere (Editor family, see §5), but this specific compound selector only matches an element that is *also* inside `.mkt-visual`, which exists only on Landing. CSS selector scoping makes this safe to extract without affecting the other `.mini-phone` usages.

**Explicitly excluded from this responsive block** (immediately adjacent, same comment section, but cross-family — see §5): `.mkt-nav{padding:14px 18px;}`, `.mkt-nav .links{display:none;}`, `.mkt-nav .login-cta-btn{display:none;}`, `.hamburger-btn{display:inline-flex;align-items:center;}`. These stay inline.

JavaScript, confirmed Landing-only (lines ~4750–4813):

```text
heroSlides (data array)
heroIndex, HERO_SLIDE_INTERVAL_MS, heroTimer (state)
renderHero()
nextHeroSlide()
goHeroSlide()
resetHeroTimer()
```

These are invoked only from Landing markup (`#heroDots .hero-dot` onclick, and the initial `renderHero(); resetHeroTimer();` calls). No other screen references `heroSlides`, `renderHero`, or the hero DOM IDs (`heroEyebrow`, `heroTitle`, `heroLead`, `heroCta`, `heroNote`, `heroDots`, `heroFloat1`, `heroFloat2`, `heroMiniQ`, `heroMiniAns`).

## About only

```text
.about-hero / .logo-lg
.about-stats / .about-stats .st
.about-section
.about-values / .about-values .v
```

Confirmed via grep: appear only inside the `about` screen and its CSS block (lines ~772–790). No JavaScript is About-exclusive; the page has no custom script beyond the shared nav/footer calls.

### About responsive — verified page-local

From the same `@container (max-width: 700px)` block, further down (not under the "marketing landing" comment, but individually verified as About-exclusive):

```text
.about-stats{grid-template-columns:1fr 1fr;}
.about-values{grid-template-columns:1fr;}
```

## Contact only

```text
.contact-methods
.contact-method
```

Confirmed via grep: appear only inside the `contact` screen and its CSS block (lines ~793–797).

### Contact responsive — verified page-local

```text
.contact-methods{grid-template-columns:1fr;}
```

Confirmed Contact-exclusive by grep — no other screen uses `.contact-methods`.

JavaScript, confirmed Contact-only (line 3603):

```text
submitContactForm()
```

A two-line function that only toggles `#contactSentNote` visibility. No other screen calls it.

---

# 5. Cross-Family Dependencies (Verified — Do Not Move Blindly)

| Selector / Function | Also used by | Classification |
|---|---|---|
| `.mkt-nav`, `.mkt-nav .brand-mark`, `.mkt-nav .links`, `.mkt-nav .links a`, `.mkt-nav .cta` (base **and** the responsive `.mkt-nav{padding:14px 18px;}` / `.mkt-nav .links{display:none;}` / `.mkt-nav .login-cta-btn{display:none;}` inside `@container`) | `report` (Legal/System, line 1275), `games` (Discovery, line 1605) | **Shared across families — leave in place for now, base and responsive alike.** `07-PAGE-MAP-AND-OWNERSHIP.md` §51 nominally assigns ownership to "Marketing shared component," but this plan defers extraction anyway: `games` and `report` are explicitly out of scope for this phase, and moving CSS that actively renders those two screens would require judgment about non-Marketing pages this plan is not chartered to touch. |
| `.hamburger-btn` (base **and** the responsive `.hamburger-btn{display:inline-flex;align-items:center;}` inside `@container`), `.mobile-menu`, `.mobile-menu.open`, `.mobile-menu a`, `.login-cta-btn` (via `.mkt-nav .login-cta-btn`) | Same as above (`report`, `games`) | **Shared across families — leave in place, base and responsive alike.** Structurally bound to `.mkt-nav`. |
| `toggleMobileMenu(btn)` | Called from `landing`, `about`, `contact`, `report`, `games` onclick handlers | **Mixed responsibility — defer.** Uses `btn.closest('.mkt-nav')`, so it is coupled to the shared nav markup above, not to Marketing specifically. |
| `.cat-strip`, `.cat-chip` (and `.cc1`–`.cc4` modifiers) | `dashboard` (Creator Application, line 1521–1525) | **Shared across families — leave in place.** Only the `.mkt-cats` heading wrapper (§4) is Marketing-exclusive; the chip grid itself is reused verbatim by the Creator dashboard's quick-create widget. |
| `selectCategory(cat)` | Called from Landing's `.cat-chip` onclick, but the function itself lives in and populates the `category-select` screen (Discovery family, function defined at line 5364) | **Mixed responsibility — defer.** This is Discovery-owned logic that Landing happens to call. Do not move it; Landing's `onclick="selectCategory(...)"` stays as-is. |
| `openLegal(title)` | Called from `landing` footer/cookie banner **and** `register` (Auth family, lines 1880, 1896) | **Shared across families — leave in place.** Legal/System-owned per `07-PAGE-MAP-AND-OWNERSHIP.md` §47, consumed by both Marketing and Auth. |
| `.btn.lg` | Used by Landing/About (`.btn.accent.lg`) **and** by the Challenge-share screen (line 1447, Editor/Challenge family) | **Shared across families — leave in place.** This is a Global Shared Button size modifier (`06-SHARED-COMPONENT-FOUNDATION.md` §5), not a Marketing rule. |
| `.mini-phone` (bare class) | Used inside `.mkt-visual .mini-phone` on Landing, but the bare `.mini-phone` class is also used standalone on `challenge` (line 1398) and `workbench` (line 1979), Editor family | **Mixed — partially safe.** The *compound* selector `.mkt-visual .mini-phone{...}` (in the `@container` block, see §4) only applies within Landing's hero and is safe to extract with `.mkt-visual`. The *base* `.mini-phone{...}` rule (line 354, outside the Marketing CSS block) is Global/Editor-shared and must not move. |
| `.picker-shell`, `.picker-head` | Used by About, Contact, `report`, `category-select`, `gametype-select`, `math-difficulty` (7 usages total) | **Shared across families — leave in place.** Global Shared page-shell container (`06-SHARED-COMPONENT-FOUNDATION.md` — candidate Level 1 component), predates and is unrelated to the "mkt-" naming. |
| `.field`, `.field input`, `.field select`, `.field textarea` | Used 21 times across Auth, Contact, Report, Settings, Workbench, etc. | **Shared across families — leave in place.** Global Shared Form Field (`06-SHARED-COMPONENT-FOUNDATION.md` §11). Contact's form is a consumer, not an owner. |
| `.btn` (base) and all other variants (`primary`, `ghost`, `accent`, `sm`, `full`) | Global, used everywhere | **Shared across families — leave in place.** Out of scope; belongs to a future Global Shared Components phase (`09-FIRST-EXTRACTION-PLAN.md` §30, `07-PAGE-MAP-AND-OWNERSHIP.md` §62 Stage 2). |
| `go()`, `pgo()` | Core navigation infrastructure, called from every family including the Marketing-only `heroSlides[].cta` handlers | **Cross-family navigation infrastructure — do not extract.** Per explicit instruction, `go()`/`pgo()` stay inline regardless of who calls them. Marketing-only JS (§6) is allowed to *call* `go()`/`pgo()`; it must not *define* or relocate them. |
| `.legal-page` and its sub-selectors | `legal` screen only (Legal/System) | **Not a Marketing dependency at all** — flagged only because it sits physically adjacent to Marketing CSS in the source (between the cookie banner and the About rules) and could be mistaken for related. Left untouched, not part of this plan's scope. |

---

# 6. JavaScript Ownership

| Behavior | Classification | Disposition |
|---|---|---|
| `heroSlides`, `heroIndex`, `HERO_SLIDE_INTERVAL_MS`, `heroTimer`, `renderHero()`, `nextHeroSlide()`, `goHeroSlide()`, `resetHeroTimer()` | Marketing-only (Landing-exclusive) | Safe to extract, with one noted dependency (see below). |
| `submitContactForm()` | Marketing-only (Contact-exclusive) | Safe to extract. |
| `toggleMobileMenu(btn)` | Shared across Marketing, Discovery, Legal/System | Leave inline (§5). |
| `selectCategory(cat)` | Discovery-owned, called from Landing | Leave inline (§5). |
| `openLegal(title)` | Legal/System-owned, called from Landing and Auth | Leave inline (§5). |
| `go()`, `pgo()` | Cross-family navigation infrastructure | Leave inline — explicitly excluded per task instructions. |

**Dependency note on the safe-to-extract JS:** `heroSlides[0].cta` and `heroSlides[1].cta` call `go('category-select')`, `go('player')`, and `pgo(...)` directly. This is a *call-out* dependency, not a *structural coupling* — identical in kind to how `prototype-harness.js` (Commit 3 of the prior extraction) runs after the main inline script without redefining anything it depends on. As long as a new `marketing.js` is loaded via `<script src>` **after** the main inline `<script>` block closes (same placement pattern used for `prototype-harness.js`), `go`/`pgo` will already be defined in global scope by the time `marketing.js` executes, and the immediate `renderHero(); resetHeroTimer();` calls at the bottom of the extracted block will behave identically to today, since they currently already run after `go('landing')` has fired.

This satisfies the instruction not to force extraction where ownership is mixed: the *behavior* here is 100% Marketing-owned; only the *called functions* are cross-family, which is an acceptable and unavoidable form of dependency (every family's JS will eventually call `go()`).

---

# 7. Proposed File Structure

```text
prototype/
├── index.html
├── prototype-harness.css
├── prototype-harness.js
├── families/
│   └── marketing/
│       ├── marketing.css
│       └── marketing.js
```

- `marketing.css` — the page-local selectors from §4 (Landing, About, Contact), **including both their base declarations and their verified page-local declarations inside the shared `@container (max-width: 700px)` block.** The `@container (max-width: 700px)` threshold itself is not modified — only the ownership of specific, individually-verified selectors within it moves. Selectors in that block that are shared with another family (e.g. `.mkt-nav`, `.hamburger-btn`) or that are not Marketing at all (e.g. `.legal-page`, `.picker-shell`) stay inline — see §5 and §11.
- `marketing.js` — `heroSlides` + hero carousel functions + `submitContactForm()`, verbatim, per §6.

No further sub-files (e.g. separate `landing.css`/`about.css`/`contact.css`) are justified. The three screens' local rules are small (roughly 45 landing declarations, 12 about, 9 contact) and do not warrant the file-proliferation `08-AI-CHANGE-RULES.md` §31 and `07-PAGE-MAP-AND-OWNERSHIP.md` §54 both caution against ("27 CSS files for 27 screens" is the explicit anti-pattern). One `marketing.css` covering all three page-local blocks, clearly commented by screen, is the smallest safe structure.

---

# 8. Extraction Order

### Prerequisite (on `main`, before any branch exists)

0. **Commit this plan** — `docs/ui/10-MARKETING-FAMILY-EXTRACTION-PLAN.md` must be reviewed and committed to `main` before `refactor/marketing-family` is created. This keeps the plan itself out of the implementation branch's diff, so the eventual PR stays scoped to exactly the three files listed in §13, matching how `09-FIRST-EXTRACTION-PLAN.md` was committed to `main` before the Harness extraction branch existed.

### Implementation (on `refactor/marketing-family`)

1. **Create working branch** — `refactor/marketing-family` off current `main` (which now contains both the merged Harness extraction and this plan document). Branch creation is setup only; it does not need its own commit.
2. **Re-verify selector ownership immediately before editing** — re-run the greps in §3–§5 against the branch's current `prototype/index.html` in case anything changed since this plan was written, since this is a live prototype.
3. **Inspect cascade order for every selector to be moved** (base and responsive) — for each selector confirmed page-local in §4, check whether any other rule in the inline `<style>` block, before or after it in source order, shares equal or higher specificity and targets the same element(s). See §8a below for the method. If cascade equivalence cannot be established for a given selector, leave that selector inline and record it as a stop condition (§12) rather than guessing.
4. **Perform the CSS extraction as one atomic change:**
   - create `prototype/families/marketing/marketing.css` containing all selectors confirmed safe in §4 — base declarations **and** their verified page-local `@container (max-width: 700px)` counterparts, using the *exact* same selectors, properties, values, and the exact same `@container (max-width: 700px)` wrapper syntax;
   - remove those same rules from `prototype/index.html`'s inline `<style>` (both the base declarations and their responsive counterparts) in the same change;
   - add `<link rel="stylesheet" href="./families/marketing/marketing.css">` at the cascade-equivalent load position determined in step 3 (not automatically before/after the product `<style>` block — see §8a).
   - `marketing.css` must not, at any point, contain a rule that is also still present inline, and `index.html` must not, at any point, be missing a rule that isn't yet in `marketing.css`. This is one commit — see §9.
5. **Verify visual parity** at 1280 / 834 / 390 for Landing, About, Contact (see §10). Stop and fix before continuing if anything differs.
6. **Create `prototype/families/marketing/marketing.js`** containing the hero carousel block and `submitContactForm()`, verbatim, per §6, and in the same change remove that same code from the inline `<script>` and add `<script src="./families/marketing/marketing.js">` immediately after the main inline `<script>` closes (and before or after `prototype-harness.js` — order between the two extracted scripts does not matter, only that both load after the main inline script). One atomic commit — see §9.
7. **Verify behavioral parity**: hero auto-rotation, hero dot navigation, hero CTA clicks, mobile hamburger menu on all three screens, contact form submit. Stop and fix before continuing if anything differs.
8. **Final branch verification** — full diff review against `main`, confirm no cross-family selector was touched, confirm `game-platform-ui-responsive (4).html` untouched, confirm the `@container (max-width: 700px)` threshold value is unmodified, confirm no naming/inline-handler/inline-style cleanup occurred.
9. **PR / merge**, following the same review process used for the Harness extraction PR (#1).

Each numbered implementation step above (4 and 6) is its own single, atomic commit — CSS is never split across two commits, and no commit leaves the same rule present in two places at once.

### 8a. Cascade Safety Method (required before step 4)

Moving a rule out of the middle of one large inline stylesheet into a separately-loaded external stylesheet can change the cascade result if another rule of equal or higher specificity targets the same element(s) and currently loses only because of source order. Do not assume that placing the new `<link>` immediately before or after the existing product `<style>` block is automatically equivalent to the rule's current position.

For every selector being moved:

1. Search the entire inline `<style>` block for any other rule using the same selector, or a selector of equal/higher specificity that could match the same element (e.g. an ID selector, a more specific compound selector, or a later rule with the same specificity that would win by source order).
2. If no such competing rule exists (the common case for the Marketing selectors identified in §4, which are mostly single-purpose, uniquely-named classes), the selector is safe to move regardless of the new `<link>`'s exact position, and the position should simply follow the precedent set for `prototype-harness.css` (loaded early, before the main product `<style>` block).
3. If a competing rule of equal/higher specificity does exist, determine whether the current visual result depends on source order. If it does, the `<link>` must be placed at the point in `<head>`/`<style>` order that reproduces the same winner — do not place it "wherever is convenient" and re-test until it happens to look right.
4. If cascade equivalence cannot be established with confidence, stop: leave that selector inline and record it under §12.
5. After the move, re-verify at 1280 / 834 / 390 (§10) specifically looking for any rule that lost or gained precedence, not just gross layout differences.

---

# 9. Commit Plan

### Prerequisite commit (on `main`, before the branch exists)

| # | Commit message | Contents |
|---|---|---|
| 0 | `Add Marketing family extraction plan` | `docs/ui/10-MARKETING-FAMILY-EXTRACTION-PLAN.md` only |

### Implementation commits (on `refactor/marketing-family`)

| # | Commit message | Contents |
|---|---|---|
| 1 | `Extract marketing page-local CSS` | Atomic: new `prototype/families/marketing/marketing.css` (base + verified page-local responsive rules) **and** removal of those exact same rules from `prototype/index.html`'s inline `<style>` **and** the `<link>` insertion — all in one commit. No intermediate state where a rule exists in both places, or in neither. |
| 2 | `Extract marketing page-local behavior` | Atomic: new `prototype/families/marketing/marketing.js` and removal of the same code from `prototype/index.html`'s inline `<script>` and the `<script src>` insertion — all in one commit. |

Branch creation itself (`refactor/marketing-family`) is setup only and does not need a commit.

This mirrors the shape of the prior Harness extraction's CSS/behavior split (`Extract ... styles` → `Extract ... behavior`), but each of those two steps is now a single atomic commit rather than split into "create file" / "remove from index.html" pairs — there is no commit in which a rule is temporarily duplicated or temporarily missing. If commit 1's parity check (§8 step 5) fails, stop there and do not attempt commit 2 until resolved — matching `09-FIRST-EXTRACTION-PLAN.md` §29's guidance that a failed CSS step should not be compounded by a JS step in the same pass.

Do not combine commits 1 and 2. Do not add unrelated fixes to either commit even if noticed during verification — log them as follow-ups instead (§12/§13).

---

# 10. Verification Matrix

Required at:

```text
Desktop — 1280px
Tablet  — 834px
Mobile  — 390px
```

| Screen | Desktop 1280 | Tablet 834 | Mobile 390 |
|---|---|---|---|
| Landing | Hero layout, steps grid (4-col), category chips, footer, cookie banner, hero auto-rotation/dots | Hero layout, steps grid (2-col per current `@container` rule), nav still full (per current 700px threshold behavior — not a target of this plan) | Hero stacked, hamburger menu, floating cards hidden, mini-phone full-width, steps 2-col, cookie banner stacked |
| About | Stats row (3-col), values row (3-col), hero centered | Same as desktop (current architecture has no true intermediate tablet layer per `05-RESPONSIVE-FOUNDATION.md` §5 — this is expected, not a defect to fix here) | Stats 2-col, values 1-col (per existing `@container` rules, left untouched) |
| Contact | Contact methods 2-col, form fields | Same as desktop | Contact methods 1-col, form fields full-width |

For each cell: compare the refactored branch against `main` (pre-extraction) at the same viewport, screen by screen. The goal is **pixel/behavior parity**, not improvement. Any visual difference is a bug in this refactor per `09-FIRST-EXTRACTION-PLAN.md` §10.

Because `marketing.css` now carries the Tablet/Mobile-triggering `@container` declarations for these selectors (§4, §8a), the 834px and 390px checks above are also the cascade-safety check required by §8a step 5 — pay particular attention to any Marketing rule that could plausibly have a competing same-specificity rule elsewhere, not just to overall layout correctness.

Also re-verify representative non-Marketing screens that share the deferred cross-family selectors, to confirm the extraction did not regress them even though they weren't the target:

```text
games       (uses .mkt-nav, .mobile-menu, toggleMobileMenu, .cat-strip/.cat-chip)
report      (uses .mkt-nav, .mobile-menu, toggleMobileMenu)
dashboard   (uses .cat-strip/.cat-chip)
register    (uses openLegal)
challenge-share (uses .btn.lg)
workbench   (uses .mini-phone)
```

Since this plan deliberately leaves all of these selectors inline, this check should show **zero difference** — its purpose is to catch an accidental scope slip during implementation, not to validate a real change.

---

# 11. Explicit Non-Goals

- No redesign of Landing, About, or Contact.
- No route changes (`addr:` strings in the screen registry stay exactly as-is).
- No breakpoint changes — the `@container (max-width: 700px)` threshold value, and every selector's properties/values within it, are not modified. Verified page-local responsive declarations (§4) may be *relocated* into `marketing.css`, preserving the exact same `@container (max-width: 700px)` wrapper, selectors, properties, and values — this is a file-ownership move, not a responsive-behavior change. Any responsive declaration that is shared with another family, or whose ownership is unclear, **remains inline in `prototype/index.html`** (§5, §12). A full split of the shared responsive block by family (for the selectors that are *not* Marketing-local) is deferred to a dedicated Responsive Foundation phase, consistent with `07-PAGE-MAP-AND-OWNERSHIP.md` §62 Stage 10 and `05-RESPONSIVE-FOUNDATION.md` §5's migration rule.
- No Design Token changes — `:root` variables stay inline and unmodified; `marketing.css` and `marketing.js` reference existing `var(--...)` tokens exactly as the inline CSS does today.
- No shared-component redesign — `.mkt-nav`, `.picker-shell`, `.field`, `.btn`, `.cat-strip`/`.cat-chip` are not touched, renamed, or restructured (§5).
- No global cleanup of unrelated code.
- No renaming of IDs, classes, functions, or screen IDs.
- No inline-style (`style="..."`) cleanup, anywhere in the file.
- No inline-event (`onclick="..."`) cleanup, anywhere in the file.
- No extraction of any other page family (Auth, Discovery, Creator, Editor, Player, Account, Legal/System) — including `games` and `report`, even though they consume Marketing-adjacent selectors.

---

# 12. Stop Conditions

Stop and do not continue extracting if, during implementation, any of the following is discovered:

- A selector believed to be page-local in §4 (base or responsive) is found to also be used by `games`, `report`, `dashboard`, or any other non-Marketing screen (re-verify with a fresh grep before each move, per §8 step 2).
- Ownership of any selector or function is unclear after inspection — record it as a `FOLLOW-UP: mixed prototype/product responsibility` note (same convention used in the Harness extraction) rather than guessing.
- Cascade equivalence for a moved selector cannot be established with confidence per §8a (a competing equal/higher-specificity rule exists and it's unclear whether the new stylesheet load position reproduces the current winner).
- JavaScript being considered for extraction depends on cross-family **state** (a variable, not just a function call) defined elsewhere in the inline script.
- Moving a rule or function would require any change in behavior, values, selectors, classes, or IDs to work correctly in its new location.
- Extracting a responsive declaration would require editing a selector inside the shared `@container (max-width: 700px)` block that is also used by a non-Marketing family, or would require changing the block's threshold value — only individually-verified Marketing-local declarations move; the block itself and its non-Marketing content are untouched.
- A commit would leave a rule present in both `marketing.css` and the inline `<style>`/`<script>` at the same time, or missing from both — CSS and JS extraction must each land as one atomic commit (§8, §9).
- Visual or behavioral parity cannot be established at all three reference widths for any of the three target screens.
- Any check in §10's "representative non-Marketing screens" row shows a difference.

When a stop condition is hit, leave the code inline, document the reason in the eventual implementation report, and treat it as a known follow-up rather than forcing the extraction.

---

# 13. Success Criteria

The Marketing family extraction (this phase) is complete only when:

```text
This plan document is committed to main before the refactor branch is created
Original baseline (game-platform-ui-responsive (4).html) remains untouched
prototype/families/marketing/marketing.css exists and contains only verified page-local rules,
  including their verified page-local @container (max-width: 700px) declarations
prototype/families/marketing/marketing.js exists and contains only verified page-local behavior
No commit ever left a rule duplicated across marketing.css and index.html, or missing from both
Cascade equivalence was established for every moved selector before it was moved (§8a);
  any selector where this could not be established was left inline and reported
Landing, About, and Contact are visually and behaviorally identical to pre-extraction main at 1280 / 834 / 390
games, report, dashboard, register, challenge-share, and workbench show zero regression
@container (max-width: 700px) threshold value and all non-Marketing content within it are unmodified
No route, breakpoint value, token, ID, class, or function name was changed
No inline style or inline event handler was touched
Diff on the implementation branch is scoped to exactly: prototype/index.html,
  prototype/families/marketing/marketing.css, prototype/families/marketing/marketing.js
Commits follow the sequence in §9, each independently reviewable
```

If any criterion is not met, the phase is not done — partial extraction (e.g., CSS only, with JS deferred per a stop condition) is an acceptable and explicitly allowed outcome, but must be reported as such rather than presented as complete.
