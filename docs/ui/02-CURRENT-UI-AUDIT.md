# Ducal Game UI — Current UI Audit

Version: 0.1  
Status: Current-state audit  
Source: `game-platform-ui-responsive (4).html`  
Purpose: Record what exists now before deciding the new Master Design System.

---

## 1. Audit Principle

This document describes the **current implementation**.

It does not mean every current choice is approved.

Use these four labels during future review:

- **OBSERVED** — exists in the current prototype
- **REVIEW** — needs discussion or consistency review
- **APPROVED** — explicitly accepted for the new Master
- **REPLACE** — explicitly approved to be changed or removed

Nothing becomes part of the new Master merely because it exists in the current prototype.

---

## 2. Current Prototype Size

Approximate current source size:

- Total file: 6,009 lines
- CSS: ~978 lines
- JavaScript: ~2,548 lines
- Inline `style=""`: 338 occurrences
- Inline `onclick=""`: 442 occurrences
- Element IDs: 237 occurrences
- Class attributes: 2,058 occurrences

### Audit conclusion

**OBSERVED**

The current prototype combines:

1. design tokens
2. base/global styles
3. shared components
4. page-specific CSS
5. responsive rules
6. all page markup
7. navigation/state handling
8. authentication demo behavior
9. creator/editor behavior
10. Player behavior
11. multiple game engines
12. demo controls

This high coupling is the main reason a broad AI edit can affect unrelated screens.

---

## 3. Current Design Token Situation

### Existing CSS variables

The prototype currently defines:

```css
--ink
--ink-soft
--bg
--card
--brand
--brand-dark
--brand-tint
--accent
--accent-tint
--mint
--mint-tint
--sun
--line
--radius
```

### Additional direct values

Many visual values still appear directly in CSS instead of through tokens.

Examples include:

```text
#8A6CF7
#FBFAFF
#0E8F76
#E14D63
#C43C6B
#FFF1F2
#C43C52
#FFC9CF
#FF6B6B
#EDE7FB
#FFF3D9
#5A3D00
```

### Audit conclusion

**REVIEW**

The current design already has the beginning of a token system, but it is incomplete.

Before creating the new Master we need to decide:

- which direct colors are legitimate semantic colors
- which colors should become tokens
- which colors are duplicated or unnecessary
- which values belong only to demo/browser chrome
- which page-specific colors should remain local

Do not normalize these values yet.

---

## 4. Typography Audit

### Existing font families

**OBSERVED**

- UI/body: `Inter`
- headings/display: `Baloo 2`

### Existing font-size behavior

The prototype uses many individual sizes, roughly from:

```text
9.5px → 40px
```

Common UI sizes include:

```text
11px
11.5px
12px
12.5px
13px
13.5px
14px
14.5px
```

### Audit conclusion

**REVIEW**

The visual character is reasonably consistent, but the typography system is not formally standardized.

Future Master decisions required:

- Display sizes
- H1 / H2 / H3
- Card title
- Body
- Small body
- Label
- Caption / metadata
- Button
- Numeric/result display

Do not simplify the current scale until pages are audited visually.

---

## 5. Spacing Audit

### Current situation

**OBSERVED**

Spacing is currently implemented directly through values such as:

```text
2
3
4
5
6
7
8
9
10
11
12
14
16
18
20
22
24
26
28
30
...
```

There is no formal spacing-token system.

### Audit conclusion

**REVIEW**

This does not necessarily mean the UI looks wrong.

It means future AI-generated screens have no official spacing vocabulary to follow.

The new Master should eventually define a small approved spacing scale, but only after representative screens are reviewed.

---

## 6. Radius Audit

### Current situation

**OBSERVED**

The prototype has:

```css
--radius: 18px;
```

but also uses many direct radius values:

```text
7px
8px
9px
10px
11px
12px
13px
14px
16px
18px
20px
22px
24px
26px
30px
50%
100px
```

### Audit conclusion

**REVIEW**

The overall identity is consistently rounded, but the radius hierarchy is not formally defined.

Future Master should likely distinguish:

- small control
- input
- card
- large card
- modal
- pill
- circle

No values are approved yet.

---

## 7. Shadow Audit

### Current situation

**OBSERVED**

The design generally uses subtle borders for ordinary surfaces and stronger shadows for:

- browser/prototype frame
- modals
- Player cards
- floating panels
- primary/accent/danger actions
- device previews

### Audit conclusion

**REVIEW**

This is a useful visual principle and may be retained, but the exact shadow scale has not yet been approved.

---

## 8. Button Audit

### Current shared pattern

**OBSERVED**

There is already a reusable `.btn` pattern and variants such as:

```text
primary
ghost
accent
danger
sm
full
```

### Audit conclusion

**REVIEW**

This is one of the stronger existing shared-component patterns.

Before approving it as Master we still need to review:

- heights
- padding
- font size
- icon spacing
- disabled states
- hover states
- mobile full-width behavior
- whether all pages actually follow the same button pattern

---

## 9. Form Audit

### Current pattern

**OBSERVED**

Forms commonly use:

- white surface
- pale border
- ~12px radius
- Inter
- ~13.5px text
- brand-colored focus border
- muted helper text

### Audit conclusion

**REVIEW**

The direction is coherent, but form patterns need a dedicated component audit because authentication, creator/editor, settings, report, and contact screens may not all use exactly the same rules.

---

## 10. Shared Component Inventory

The current CSS already contains patterns that appear shared or potentially shared.

### High-confidence shared patterns

**OBSERVED**

- `.btn`
- pills / badges
- form fields
- modal/overlay structures
- confirmation dialog
- How It Works modal
- share modal
- leaderboard rows
- empty states
- notification rows
- bottom navigation
- sidebar/navigation items
- filters/chips
- cards/list rows

### Needs ownership review

**REVIEW**

We must determine which of these are:

1. truly global shared components
2. shared only within one page family
3. visually similar but functionally different
4. page-specific and should not be generalized

Do not convert everything into one universal component merely because it looks similar.

---

## 11. Current Responsive Architecture

### Reference preview widths

The prototype exposes:

```text
Desktop: 1280px
Tablet: 834px
Mobile: 390px
```

### Actual responsive CSS

**OBSERVED**

The current CSS contains one main container-query threshold:

```css
@container (max-width: 700px) {
  ...
}
```

No separate Tablet breakpoint currently exists.

### Current behavior

Therefore:

- 1280px → Desktop-style layout
- 834px → mostly Desktop-style layout
- 390px → compact/mobile layout

### Audit conclusion

**REVIEW — HIGH PRIORITY**

The preview UI suggests a three-device system, but the implementation currently behaves mainly as a two-layout system.

The new Master must explicitly define:

- Mobile range
- Tablet range
- Desktop range
- max content widths
- gutters
- grid behavior
- navigation behavior
- modal behavior
- tables
- forms
- Player widths
- editor behavior

Do not introduce the new breakpoint system during structural extraction.

---

## 12. Mobile-Specific Behavior Already Present

**OBSERVED**

At the current compact threshold, the prototype changes several UI patterns rather than merely shrinking them.

Examples:

- Marketing navigation becomes hamburger navigation
- How It Works modal becomes a bottom sheet
- Share modal becomes a bottom sheet
- Sidebar becomes a top bar
- Sticky bottom navigation appears
- Dashboard KPIs become two columns
- Tables become horizontally scrollable
- Workbench becomes vertically stacked
- Workbench outline becomes horizontal
- Preview can be toggled
- Library cards become one column
- Settings switches to drill-down navigation
- Player cards become more compact
- Result grids collapse
- Button rows stack vertically

### Audit conclusion

**OBSERVED / REVIEW**

This is important: responsive behavior is already component-specific.

The new responsive Master must preserve this concept instead of using only generic breakpoints.

---

## 13. Main Screen Families

### Marketing / Public

**OBSERVED**

- landing
- about
- contact
- report
- legal
- link-expired
- game-offline
- not-found

### Authentication

**OBSERVED**

- login
- forgot-password
- register
- claim-success

### Discovery / Creation Entry

**OBSERVED**

- games
- category-select
- gametype-select
- math-difficulty
- gametype-intro
- creator-name

### Creator Application

**OBSERVED**

- dashboard
- analytics
- library
- detail
- profile
- play-history
- notifications
- history-detail
- settings

### Creation / Editor

**OBSERVED**

- workbench
- workbench locked state
- challenge
- challenge-preview-all
- challenge-share

### Player

**OBSERVED**

The `player` screen contains its own internal state system for:

- Quiz
- IQ
- Connection
- Math

### Audit conclusion

**REVIEW**

Future file architecture should be organized by page family first, not by creating dozens of unrelated CSS files immediately.

---

## 14. Player Subsystem Audit

### Current situation

**OBSERVED**

Player is not a normal page.

It is a shared shell containing many game-specific states such as:

- landing
- question
- result
- IQ states
- Connection states
- Math states

### Audit conclusion

**HIGH PRIORITY**

Player should eventually have:

```text
shared Player shell
+
shared Player components
+
game-specific UI
+
game-specific logic
```

It should not remain tightly coupled to Creator, Marketing, and Settings code.

---

## 15. JavaScript Coupling Audit

### Current situation

**OBSERVED**

Navigation, UI state, authentication demo behavior, game creation, Player states, Math logic, Connection logic, notifications, settings, and other behaviors coexist in the same script.

Global navigation relies on functions such as:

```text
go(...)
pgo(...)
```

and large groups of IDs/classes.

### Audit conclusion

**REVIEW — HIGH PRIORITY**

Future extraction should separate:

- general navigation
- shared UI behavior
- auth
- creator
- editor
- Player shell
- individual game engines

However, behavior extraction must happen after UI structure is documented and must not be mixed with visual redesign.

---

## 16. Inline Style Audit

### Current situation

**OBSERVED**

There are approximately 338 inline `style=""` usages.

These may contain:

- temporary demo positioning
- one-off colors
- dynamic presentation values
- page-specific spacing
- visibility defaults

### Audit conclusion

**REVIEW**

Do not remove all inline styles automatically.

They must first be classified as:

- intentionally dynamic
- component state
- legitimate page-specific style
- legacy duplication
- candidate for token/component extraction

A bulk cleanup would be risky.

---

## 17. Inline Event Audit

### Current situation

**OBSERVED**

There are approximately 442 inline `onclick=""` handlers.

### Audit conclusion

**REVIEW**

These create strong coupling between markup and the single large JavaScript block.

They can be refactored later, but not during the first CSS/UI extraction phase.

---

## 18. Known Design-System Gaps

The following areas are currently incomplete or undocumented.

### REVIEW

1. Complete semantic color system
2. Typography scale
3. Spacing scale
4. Radius hierarchy
5. Shadow hierarchy
6. Formal responsive breakpoints
7. Tablet-specific behavior
8. Content/container widths
9. Shared component ownership
10. Navigation variants
11. Modal vs bottom-sheet rules
12. Form standards
13. Empty-state standards
14. Loading/error/success states
15. Table behavior
16. Page header standards
17. Card taxonomy
18. Game Player component taxonomy
19. Accessibility rules
20. Interaction-state rules

These gaps are exactly why the current prototype must not be treated as the final Master.

---

## 19. What We Should NOT Do Yet

Until the audit and new Master are approved:

- Do not redesign every page.
- Do not normalize every CSS value.
- Do not create a new token for every direct value.
- Do not add a Tablet breakpoint globally.
- Do not replace all inline styles.
- Do not replace all inline event handlers.
- Do not rename classes globally.
- Do not reorganize all JavaScript at once.
- Do not let AI “clean up the whole project.”
- Do not treat current implementation choices as automatically approved.

---

## 20. Recommended Next Review Order

The new Master should be created through explicit review in this order:

### Review 1 — Brand / Color
Decide what colors belong to the permanent system.

### Review 2 — Typography
Approve font families and a formal text hierarchy.

### Review 3 — Layout / Responsive
Define Mobile / Tablet / Desktop ranges, gutters, widths, and major behavior.

### Review 4 — Spacing / Radius / Shadows
Create a controlled visual scale.

### Review 5 — Core Components
Approve Button, Input, Card, Modal, Sheet, Navigation, Tabs, Pills, Empty State.

### Review 6 — Page Families
Audit representative pages from:

- Marketing
- Auth
- Creator
- Editor
- Player

### Review 7 — Master v2
Only approved rules enter the new Master Design System.

---

## 21. Source-of-Truth Status During Audit

Until Master v2 exists:

```text
Current HTML prototype
= reference for what exists today

Current UI Audit
= documentation of what exists / what needs review

Old Master
= historical input, not automatically authoritative

New Master v2
= not created yet
```

When a conflict is found between the old Master and the current prototype:

**Do not silently choose either one.**

Record the conflict and ask for an explicit design decision.

---

## 22. Next Step

The next task is **not coding**.

The next task is:

> Review the existing Master file against the Current UI Audit.

We should extract:

1. rules still valid
2. rules missing from the old Master
3. rules contradicted by the current UI
4. outdated rules
5. decisions that were never documented

After that comparison, we can begin building the approved Master Design System v2.
