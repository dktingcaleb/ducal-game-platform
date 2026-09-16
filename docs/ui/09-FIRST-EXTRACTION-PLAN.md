# Ducal Game — First Extraction Plan

Version: 1.0  
Status: APPROVED REFACTOR PLAN  
Purpose: Define the first safe structural extraction from the current all-in-one Ducal Game prototype.

> Core rule:
>
> **Refactor ≠ Redesign**
>
> The first extraction must preserve the current UI, behavior, responsive output, and product flow.

---

# 1. Starting Point

Current prototype reference:

```text
/game-platform-ui-responsive (4).html
```

This file is the frozen baseline for the current Ducal Game UI prototype.

It currently contains, in one file:

```text
Prototype review harness
+
Ducal Game page markup
+
Global/shared CSS
+
Page-family CSS
+
Responsive CSS
+
Navigation/state JavaScript
+
Creator/editor logic
+
Player logic
+
Game-specific logic
+
Demo data/state controls
```

The file is approximately 6,000 lines.

---

# 2. Baseline Protection

Do **not** begin by rewriting the original baseline file directly.

Keep:

```text
/game-platform-ui-responsive (4).html
```

unchanged as the comparison reference during the first extraction.

Create a working refactor copy:

```text
/prototype/index.html
```

The first extraction work should happen on:

```text
/prototype/index.html
```

not on the frozen root baseline.

This gives us:

```text
Original baseline
vs
Refactored prototype
```

for direct comparison.

---

# 3. First Refactor Branch

Recommended branch:

```text
refactor/prototype-harness
```

Purpose:

> Separate prototype-review infrastructure from product UI ownership without changing the visible prototype.

Do not mix unrelated UI work into this branch.

---

# 4. First Extraction Goal

The first extraction is **not**:

```text
split every page
```

and it is **not**:

```text
turn the prototype into production
```

The first goal is:

> Clearly separate Prototype Harness code from Ducal Game Product UI code.

Prototype Harness means the UI used to review the prototype itself.

Examples:

```text
studio shell
studio heading
screen selector
sub-navigation selector
device preview buttons
browser mockup/chrome
preview width switching
demo-only screen navigation
```

These are development/design-review tools.

They are not Ducal Game product screens.

---

# 5. First Target Structure

After the first extraction, target this small structure:

```text
ducal-game-platform/
├── CLAUDE.md
├── game-platform-ui-responsive (4).html
│
├── prototype/
│   ├── index.html
│   ├── prototype-harness.css
│   └── prototype-harness.js
│
└── docs/
    └── ui/
        ├── 00-...
        ├── 01-...
        ├── 02-...
        ├── 03-...
        ├── 04-...
        ├── 05-...
        ├── 06-...
        ├── 07-...
        ├── 08-...
        └── 09-FIRST-EXTRACTION-PLAN.md
```

Important:

The Ducal Game product CSS and product JavaScript may still remain inline in `prototype/index.html` after this first extraction.

That is intentional.

Do not try to solve everything at once.

---

# 6. Files Allowed in First Extraction

Create:

```text
prototype/index.html
prototype/prototype-harness.css
prototype/prototype-harness.js
```

Modify only these new files during the first extraction.

Do not modify:

```text
game-platform-ui-responsive (4).html
docs/ui/*
CLAUDE.md
```

except for a separately approved documentation update.

---

# 7. Prototype Harness — CSS Ownership

Move only CSS that clearly belongs to the design-review shell.

Likely candidates include styling for concepts such as:

```text
studio
studio-head
nav-strip
subnav
device-toggle
browser
chrome-bar
browser address bar
preview frame
prototype-only navigation controls
```

Do not move product CSS merely because it is near Harness CSS in the stylesheet.

---

# 8. Prototype Harness — JavaScript Ownership

Move only JavaScript whose purpose is to control the prototype review environment.

Examples may include:

```text
Desktop / Tablet / Mobile preview width switching
prototype screen-selector rendering
prototype screen-selector highlighting
prototype address-bar display
Player-state review selector
prototype-only navigation controls
```

Be careful:

Some current navigation functions may also control real product-screen states.

If a function mixes:

```text
Prototype Harness responsibility
+
Product UI responsibility
```

do **not** aggressively split it in this first pass.

Leave mixed functions in `prototype/index.html` and record them as follow-up debt.

---

# 9. Product UI Must Remain In Place

During this first extraction, leave Ducal Game product UI intact.

Examples:

```text
Marketing screens
Auth
Games / Discovery
Creator Dashboard
Library
Analytics
Settings
Workbench
Challenge
Player
Results
Share
Legal/System pages
```

Do not move their CSS or JavaScript yet unless the code is unquestionably Harness-only.

---

# 10. No Visual Changes

The refactored prototype must look the same as the baseline.

Do not change:

```text
colors
fonts
spacing
radius
shadow
button styling
card styling
form styling
copy
icons
emoji
layout
navigation design
```

Any visual difference should be treated as a bug in this refactor.

---

# 11. No Responsive Redesign

Do not change:

```text
@container (max-width: 700px)
```

or replace the current responsive architecture during this first extraction.

Do not introduce the future:

```text
768px Tablet
1024px Desktop
```

breakpoints yet.

Those are approved future architecture rules, but this extraction is about parity first.

Tablet improvements happen later.

---

# 12. No Product Logic Changes

Do not change:

```text
game rules
question logic
result logic
challenge logic
lock behavior
timer behavior
creator behavior
auth behavior
navigation flow
```

This is structural extraction only.

---

# 13. No Route Changes

Do not resolve current route questions during this task.

For example:

```text
Public Games
vs
Creator My Games
```

route ownership remains a separate decision.

Keep current prototype address strings unchanged.

---

# 14. No Naming Cleanup

Do not rename:

```text
screen IDs
DOM IDs
CSS classes
JavaScript functions
data attributes
state names
```

during the first extraction.

Even awkward names remain temporarily.

This prevents accidental breakage.

---

# 15. No Inline-Style Cleanup

Do not bulk-migrate:

```html
style="..."
```

attributes.

Some may be:

```text
state-driven
demo-driven
dynamic
page-specific
```

They will be classified later.

---

# 16. No Inline-Event Cleanup

Do not bulk-remove:

```html
onclick="..."
```

during this extraction.

Event handling cleanup belongs to a later JavaScript refactor.

---

# 17. Keep Product CSS Inline For Now

After extracting Harness CSS, the remaining product CSS may still be one large `<style>` block.

That is acceptable.

Do **not** immediately create:

```text
marketing.css
auth.css
creator.css
player.css
...
```

in the same commit.

That will be the next structural phase.

---

# 18. Keep Product JavaScript Inline For Now

After extracting Harness JavaScript, the remaining product JS may still be one large `<script>` block.

That is also acceptable.

Do not simultaneously split:

```text
auth
creator
editor
player
math
connection
```

during this branch.

---

# 19. HTML Reference Rule

The working file:

```text
prototype/index.html
```

should continue to contain all prototype screens.

Do not remove screens from the working prototype just because they will later become separate pages.

The current prototype remains a useful visual review environment.

---

# 20. Harness Dependency Rule

After extracting Harness files:

```html
<link rel="stylesheet" href="./prototype-harness.css">
```

and:

```html
<script src="./prototype-harness.js"></script>
```

may be added to the working prototype as appropriate.

The exact script placement must preserve current execution order.

Do not move a script earlier/later if that changes DOM availability or state initialization.

---

# 21. Mixed-Code Rule

If code cannot clearly be classified as:

```text
Harness-only
```

leave it where it is.

Mark it:

```text
FOLLOW-UP: mixed prototype/product responsibility
```

Do not force a risky split.

---

# 22. Required Visual Verification

Compare the frozen baseline and the refactored working prototype at:

```text
Desktop — 1280px
Tablet — 834px
Mobile — 390px
```

Verify representative screens from every major family.

---

# 23. Minimum Representative Screen Set

At minimum review:

```text
Marketing
- landing

Auth
- login

Discovery
- games
- category-select

Creator
- dashboard
- library

Account
- settings

Editor
- workbench

Player
- Quiz landing
- Quiz question
- Quiz result
- Math question
- Connection result

System
- not-found
```

The goal is not to redesign them.

The goal is to confirm no accidental change.

---

# 24. Harness Verification

Verify that the refactored review tools still work:

```text
screen selector
Player state selector
Desktop preview
Tablet preview
Mobile preview
browser address display
screen switching
```

If any prototype-review control stops working, the extraction is incomplete.

---

# 25. Behavior Verification

Also confirm representative interactions still work:

```text
Marketing navigation
mobile menu
login/register navigation
category/game-type flow
Creator sidebar
Settings drill-down
Workbench navigation
Player question flow
Result actions
Share modal
Challenge entry
Math timer/navigation safety
Connection flow
```

Do not attempt to improve behavior while testing it.

---

# 26. Diff Review

Before committing, review the Git diff.

Expected:

```text
+ prototype/index.html
+ prototype/prototype-harness.css
+ prototype/prototype-harness.js
```

The frozen baseline should show:

```text
no changes
```

Unexpected changes outside this scope must be removed before commit.

---

# 27. Success Criteria

The first extraction is successful only if:

```text
Original baseline remains untouched
Prototype working copy exists
Harness CSS is externally owned
Harness JS is externally owned where safe
All product screens still exist
Visual output is unchanged
Responsive output is unchanged
Prototype controls still work
Product behavior still works
No unrelated cleanup occurred
```

---

# 28. Failure Conditions

Stop and fix before continuing if:

```text
a screen disappears
a Player state changes behavior
a modal no longer opens
a mobile layout changes unexpectedly
Tablet changes unexpectedly
a shared color/font changes
screen navigation breaks
device preview breaks
JavaScript errors appear
```

Do not continue to the next extraction stage with known parity failures.

---

# 29. Commit Strategy

Recommended commits:

## Commit 1

Create the working copy:

```text
Create refactor working prototype
```

## Commit 2

Extract Prototype Harness CSS:

```text
Extract prototype harness styles
```

## Commit 3

Extract Prototype Harness JavaScript:

```text
Extract prototype harness behavior
```

Keeping these separate makes rollback easier.

If the JavaScript extraction is too coupled to product behavior, stop after Commit 2 and document the dependency instead of forcing Commit 3.

---

# 30. What Comes Next

Only after this first extraction passes parity review should we move to:

```text
Phase 2 — Shared CSS foundation
```

Likely order:

```text
tokens
base
global shared components
responsive foundation
```

Then:

```text
Marketing / System
Auth
Creator / Account
Discovery
Editor
Player
```

according to the approved page ownership map.

---

# 31. Instruction to AI Coding Assistant

Use the following task instruction for the first implementation:

```text
Follow CLAUDE.md and docs/ui/09-FIRST-EXTRACTION-PLAN.md.

This is a structural refactor only.

Keep /game-platform-ui-responsive (4).html unchanged as the frozen baseline.

Create /prototype/index.html as the working copy.

First separate only Prototype Harness responsibilities from Ducal Game Product UI.

Do not redesign anything.
Do not change colors, typography, spacing, radius, copy, product behavior, routes, IDs, classes, functions, or responsive breakpoints.
Do not clean up inline styles or inline event handlers.

Create only:
- prototype/index.html
- prototype/prototype-harness.css
- prototype/prototype-harness.js

If JavaScript cannot be safely classified as Harness-only, leave the mixed logic inline and report it instead of forcing the extraction.

After each extraction, verify visual and behavioral parity at:
- 390px
- 834px
- 1280px

Report:
- files changed
- Harness code extracted
- mixed code left in place
- screens tested
- any parity differences
```

---

# 32. Final Rule

The objective of the first refactor is not cleaner code at any cost.

The objective is:

> **Create the first safe boundary without changing the product.**
