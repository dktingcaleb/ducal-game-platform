# CLAUDE.md — Ducal Game Project Instructions

This repository is the source of truth for Ducal Game.

Do not rely on chat history alone.  
Before making changes, read the relevant repository documentation.

---

## 1. Project Rule Hierarchy

Use this order of authority:

1. Approved Product Master / product rules
2. `docs/ui/04-DESIGN-FOUNDATION-RULES.md`
3. `docs/ui/05-RESPONSIVE-FOUNDATION.md`
4. `docs/ui/06-SHARED-COMPONENT-FOUNDATION.md`
5. `docs/ui/07-PAGE-MAP-AND-OWNERSHIP.md`
6. `docs/ui/08-AI-CHANGE-RULES.md`
7. Approved page-specific specification, when available
8. Current implementation
9. Prototype/demo behavior

If two sources conflict, do not silently choose one. Report the conflict.

---

## 2. Required Core Reading

Before significant UI or structural work, read:

@docs/ui/04-DESIGN-FOUNDATION-RULES.md
@docs/ui/05-RESPONSIVE-FOUNDATION.md
@docs/ui/06-SHARED-COMPONENT-FOUNDATION.md
@docs/ui/07-PAGE-MAP-AND-OWNERSHIP.md
@docs/ui/08-AI-CHANGE-RULES.md

For reverse-engineering context, use when needed:

@docs/ui/00-UI-REVERSE-ENGINEERING-BASELINE.md
@docs/ui/01-DESIGN-TOKENS.md
@docs/ui/02-CURRENT-UI-AUDIT.md
@docs/ui/03-MASTER-GAP-ANALYSIS.md

Do not read every file in the repository unless the task genuinely requires it.

---

## 3. Current Prototype

The current large prototype is the reference for existing UI behavior and visual output.

If present, treat:

`game-platform-ui-responsive (4).html`

as the current implementation/prototype reference.

Important:

- it is not automatically the final Design Master
- it contains prototype/demo tooling
- it contains shared CSS, page CSS, markup, and JavaScript in one file
- structural extraction must preserve current rendering and behavior first

---

## 4. Do Not Redesign During Refactor

Refactor and redesign are separate tasks.

During structural extraction:

- preserve visual output
- preserve behavior
- preserve screen IDs
- preserve function behavior
- preserve responsive behavior
- preserve current interaction flow

Do not also:

- change colors
- change typography
- change spacing
- change breakpoints
- rewrite UX
- rename product concepts
- change routes

unless explicitly approved as part of the task.

---

## 5. Approved Visual Foundation

Continue using the existing Ducal Game design language.

Do not change without explicit approval:

- brand palette
- Baloo 2 / Inter typography direction
- rounded soft visual language
- shared button language
- shared card/surface language
- global border/radius direction

A page-specific issue does not justify a global design-system change.

---

## 6. Responsive Requirements

Every meaningful UI change must consider:

- Mobile: 390px
- Tablet: 834px
- Desktop: 1280px

Tablet is a real design target.

Do not assume that if Desktop and Mobile work, Tablet is automatically correct.

Follow:

@docs/ui/05-RESPONSIVE-FOUNDATION.md

---

## 7. Page-Family Ownership

Current primary families:

- Marketing / Public
- Authentication / Claim
- Discovery / Creation Entry
- Creator Application
- Account / Settings
- Editor / Challenge
- Player
- Legal / System

Keep changes inside the relevant family whenever possible.

Follow:

@docs/ui/07-PAGE-MAP-AND-OWNERSHIP.md

---

## 8. Shared Component Protection

Before changing a shared component, identify:

- component name
- ownership level
- known users
- affected page families
- affected viewports
- why the change must be shared

If the request is local, keep the fix local.

Do not modify a global component to solve one page-specific issue unless the shared design rule itself is being changed.

---

## 9. Scope Declaration Before Editing

Before implementation, state briefly:

```text
Target family:
Target page/component:
Files expected to change:
Shared components involved:
Viewports affected:
Potentially affected screens:
```

Then make the smallest safe change.

---

## 10. No Silent Cleanup

Do not perform unrelated cleanup while completing a task.

Do not silently:

- rename unrelated files
- rename classes
- rename IDs
- rename functions
- reformat unrelated code
- rewrite copy
- change routes
- remove comments
- change tokens
- change data models
- move unrelated files

Keep the diff focused.

---

## 11. Class / ID / Function Safety

The current prototype has strong coupling between HTML and JavaScript.

During early extraction:

- do not rename IDs casually
- do not rename classes casually
- do not rename screen IDs casually
- do not rename JavaScript functions casually

A cleanup/rename pass must be a separate dedicated task.

---

## 12. Inline Style and Inline Event Safety

The prototype contains many inline styles and inline event handlers.

Do not bulk-remove them during the first extraction.

Inline styles must first be classified as:

- dynamic
- state-driven
- page-specific
- shared
- legacy

Inline events must be refactored separately from visual extraction.

---

## 13. Player Rules

Player is a subsystem, not one ordinary page.

Use:

```text
Player shared foundation
+
game-specific extensions
```

Do not create separate visual systems for Quiz, IQ, Math, and Connection.

Do not modify Player globally to solve one game-specific issue.

---

## 14. Editor Rules

Workbench and Challenge share Editor-family patterns.

Do not duplicate the editor system.

Treat locked Workbench as a mode/state before creating a separate implementation.

---

## 15. Prototype Harness

The prototype contains development/demo-only UI such as:

- screen navigator
- Player state navigator
- Desktop / Tablet / Mobile device toggle
- browser chrome
- demo state controls

These are not automatically production UI.

Keep prototype harness concerns separate from product UI.

---

## 16. Route Safety

Prototype address-bar strings are illustrative and not automatically final production routes.

Known issue:

- public Games and Creator My Games currently use overlapping illustrative routing

Do not finalize or change routes during unrelated UI/refactor work.

Flag route decisions separately.

---

## 17. Accessibility

New production components must support relevant accessibility basics:

- semantic HTML
- keyboard operation
- visible focus
- accessible names
- sufficient contrast
- touch-friendly targets
- state not communicated only by color

Do not preserve a prototype accessibility shortcut if it creates a production regression.

---

## 18. Recommended Safe Extraction Order

Use this sequence unless the task explicitly requires another order:

1. Prototype harness vs product UI
2. Global tokens / base / shared UI
3. Marketing + Legal/System
4. Authentication
5. Creator Application + Account shell
6. Discovery / Creation Entry
7. Editor / Challenge
8. Player shared shell
9. Player game-specific logic
10. Tablet responsive improvements
11. JavaScript cleanup

Each stage should be independently reviewable.

---

## 19. Review Format

Before considering a UI/refactor task complete, report:

```text
Changed:
Not changed:
Shared components touched:
Screens potentially affected:
390:
834:
1280:
Known follow-up:
```

Keep this concise and factual.

---

## 20. Hard Prohibitions

Without explicit approval, do not:

1. change brand colors
2. change fonts
3. replace the visual theme
4. change Product Master rules
5. finalize routes
6. redesign unrelated screens
7. rewrite the whole app for a local request
8. change global breakpoints casually
9. merge unrelated page families
10. duplicate shared systems unnecessarily
11. remove major behavior during refactor
12. treat demo data as production truth
13. invent permanent product/design rules silently
14. combine refactor and redesign by default

---

## 21. Repository Memory

Important decisions must be documented in the repository.

The project should remain understandable by another capable AI coding assistant without requiring the original chat history.

Use repository documentation as the persistent project memory.
