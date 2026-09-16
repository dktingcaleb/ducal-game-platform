[00-UI-REVERSE-ENGINEERING-BASELINE.md](https://github.com/user-attachments/files/32290010/00-UI-REVERSE-ENGINEERING-BASELINE.md)
# Ducal Game UI Reverse Engineering — Baseline

Version: 0.1  
Source prototype: `game-platform-ui-responsive (4).html`

## 1. Purpose

This file freezes the current prototype before refactoring.

The first goal is **not** to redesign the UI.
The first goal is to separate the existing prototype into manageable design-system, responsive, shared-component, page-group, and behavior layers **without changing the current visual result or interaction behavior**.

The current HTML prototype remains the visual and behavioral source of truth until extraction is verified.

---

## 2. Current Prototype Audit

Approximate current size:

- Total: 6,008 lines / ~333k characters
- CSS: ~978 lines / ~67.7k characters
- HTML: ~2,485 lines / ~136.9k characters
- JavaScript: ~2,548 lines / ~128.2k characters
- Inline `style=""` attributes: 338
- Inline `onclick=""` handlers: 442
- Element IDs: 237
- Class attributes: 2,058

This means the prototype currently combines:

1. Design tokens
2. Global styles
3. Shared components
4. Page-specific styles
5. Responsive behavior
6. Page markup
7. Navigation/state switching
8. Game logic
9. Demo/test controls

These concerns must be separated gradually.

---

## 3. Existing Design Tokens

Current `:root` variables:

```css
--ink: #1B1330;
--ink-soft: #6B6280;
--bg: #F6F3FF;
--card: #FFFFFF;
--brand: #6C4CF0;
--brand-dark: #4E31D6;
--brand-tint: #EEE8FF;
--accent: #FF5D8F;
--accent-tint: #FFE3EC;
--mint: #17C3A2;
--mint-tint: #DEFBF3;
--sun: #FFC94D;
--line: #E7E1F7;
--radius: 18px;
```

Current fonts:

- Display / headings: `Baloo 2`
- UI / body: `Inter`

These must not be renamed or changed during the extraction stage.

---

## 4. Current Responsive Model

Reference preview widths already used by the prototype:

| Mode | Reference width |
|---|---:|
| Desktop | 1280px |
| Tablet | 834px |
| Mobile | 390px |

Important: the current prototype does **not** yet contain a real three-breakpoint responsive system.

The existing responsive CSS is primarily:

```css
@container (max-width: 700px) { ... }
```

Therefore:

- `390px` uses the compact/mobile rules.
- `834px` currently uses mostly the same rules as Desktop.
- `1280px` uses Desktop rules.

Do **not** add new Tablet rules while extracting the current design.

First preserve the existing result at 1280 / 834 / 390.
A dedicated Tablet layer can be designed after the refactor is stable.

---

## 5. Current Screen Architecture

### A. Marketing / Public

- landing
- about
- contact
- report
- legal
- link-expired
- game-offline
- not-found

### B. Authentication

- login
- forgot-password
- register
- claim-success

### C. Game Discovery / Creation Entry

- games
- category-select
- gametype-select
- math-difficulty
- gametype-intro
- creator-name

### D. Creator Application

- dashboard
- analytics
- library
- detail
- profile
- play-history
- notifications
- history-detail
- settings

### E. Creator / Challenge Editors

- workbench
- workbench-locked (same underlying workbench screen, different state)
- challenge
- challenge-preview-all
- challenge-share

### F. Player Shell

`player` is one main screen containing multiple internal states.

Current Player states include:

- landing
- landing-iq
- player-name
- question
- question-iq
- result
- result-iq
- landing-connection
- question-connection
- result-connection
- connection-invite
- result-connection-match
- connection-shared-view
- landing-math
- question-math
- result-math

The Player must be treated as its own subsystem rather than as a normal single page.

---

## 6. Refactoring Principle

Use this order:

### Stage 0 — Freeze
Keep the current HTML file unchanged as the reference implementation.

### Stage 1 — Documentation
Create and approve:

- `01-DESIGN-TOKENS.md`
- `02-RESPONSIVE-SYSTEM.md`
- `03-SHARED-COMPONENTS.md`
- `04-PAGE-MAP.md`
- `05-AI-CHANGE-RULES.md`

### Stage 2 — Safe Shared Extraction
Extract only code proven to be shared:

- design tokens
- reset/base typography
- shared buttons
- shared form fields
- shared modal/overlay patterns
- shared navigation primitives
- responsive shared rules
- shared navigation helpers

The rendered result must remain unchanged.

### Stage 3 — Split by Page Family
Do **not** create one CSS file for every tiny screen immediately.

Recommended first-level groups:

```text
styles/
  tokens.css
  base.css
  components.css
  responsive.css
  marketing.css
  auth.css
  creator.css
  editor.css
  player.css
```

Later, split a group further only when it becomes genuinely large.

### Stage 4 — JavaScript Separation

Recommended first-level groups:

```text
scripts/
  core/
    navigation.js
    responsive-preview.js
    ui-state.js

  auth/
  creator/
  editor/
  player/
  games/
```

Game engines such as Math, IQ, Quiz, and Connection should eventually be isolated from general UI navigation.

### Stage 5 — Introduce a True Tablet Layer
Only after the extracted version matches the original at all three reference widths.

---

## 7. Visual Regression Rule

Every refactoring change must be checked at exactly:

- Desktop: 1280px
- Tablet: 834px
- Mobile: 390px

For every affected screen verify:

- layout
- width
- spacing
- typography
- colors
- borders
- radius
- navigation
- modal/bottom-sheet behavior
- scroll behavior
- visibility/hiding rules
- button states
- interaction flow

Extraction is successful only when the appearance and behavior remain equivalent to the reference prototype.

---

## 8. AI Coding Assistant Safety Contract

Every future task given to Claude, ChatGPT, Gemini, or another AI coding assistant should obey these rules:

1. Modify only the files and components explicitly listed in the task.
2. Do not redesign unrelated pages.
3. Do not rename existing IDs, classes, routes, or JavaScript function names unless explicitly requested.
4. Do not change shared design tokens unless the task explicitly targets the design system.
5. Do not change global selectors to solve a page-specific problem.
6. Prefer a page/group-specific class over changing a shared class.
7. If a shared component must change, first identify every page that uses it.
8. Preserve the reference appearance at 1280px, 834px, and 390px.
9. Do not combine refactoring with visual redesign.
10. Do not combine CSS extraction with JavaScript behavior changes.
11. Do not remove inline styles or inline event handlers merely for cleanup during the first extraction pass.
12. Make the smallest possible change.
13. Before editing, state which files will change.
14. After editing, state which screens may be affected.
15. If a requested change conflicts with the design-system documentation, stop and report the conflict instead of silently overriding the system.

---

## 9. Source-of-Truth Hierarchy

During reverse engineering:

1. Current reference HTML prototype
2. Approved UI documentation
3. Shared design-system files
4. Page-family files
5. Individual page overrides

A lower layer must not silently override the intent of a higher layer.

---

## 10. Next File

The next file to create is:

`01-DESIGN-TOKENS.md`

It should document the current colors, typography, radii, spacing, shadows, button styles, surfaces, borders, and semantic usage before any CSS is extracted.
