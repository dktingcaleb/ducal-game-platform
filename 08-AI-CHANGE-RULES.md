# Ducal Game — AI Change Rules

Version: 1.0  
Status: APPROVED OPERATING RULES  
Purpose: Define the mandatory workflow for AI-assisted design and implementation on the Ducal Game project.

> IMPORTANT:
> These rules apply to Claude, ChatGPT, Gemini, and any other AI coding/design assistant working on this repository.
>
> The repository is the source of project context.
> AI must not rely on chat memory alone.

---

# 1. Source of Truth Hierarchy

AI must use this order of authority:

```text
1. Approved Product Master
2. Approved Design Foundation
3. Approved Responsive Foundation
4. Approved Shared Component Foundation
5. Approved Page Map & Ownership
6. Approved page-specific specification
7. Current implementation
8. Prototype-only/demo behavior
```

If two sources conflict:

> Do not silently choose one.

Report the conflict and identify which rule would be affected.

---

# 2. Required Reading Before UI Work

Before changing UI, AI should read the relevant project documents.

Minimum:

```text
04-DESIGN-FOUNDATION-RULES.md
05-RESPONSIVE-FOUNDATION.md
06-SHARED-COMPONENT-FOUNDATION.md
07-PAGE-MAP-AND-OWNERSHIP.md
```

Then read:

```text
the relevant page-family rules
+
the relevant page spec
```

when those files exist.

Do not read the entire repository blindly when the task is local.

---

# 3. Product Master vs Design Master

AI must distinguish:

```text
Product Master
= what the product should do

Design Foundation
= how the product should look and behave visually

Page Spec
= how a specific page should be composed
```

Do not change product behavior merely to make a design easier.

Do not change the visual foundation merely to solve one page-specific layout issue.

---

# 4. Scope Declaration

Before implementation, AI must state:

```text
Target page family:
Target page / component:
Files expected to change:
Shared components involved:
Responsive viewports affected:
Potentially affected screens:
```

Example:

```text
Target family: Creator
Target page: Dashboard
Files: creator.css, Dashboard component
Shared components: Button only
Viewports: 390 / 834 / 1280
Potential impact: Dashboard only
```

This declaration should remain concise.

---

# 5. Smallest-Change Rule

Always prefer the smallest safe change.

Do not:

```text
rewrite the whole stylesheet
rename unrelated classes
move unrelated files
change global tokens
refactor multiple systems
```

when the task can be solved locally.

---

# 6. One Task Type at a Time

Do not combine these unless explicitly approved:

```text
Visual redesign
Structural refactor
Responsive redesign
JavaScript behavior change
Route change
Product-rule change
Component extraction
Design-token change
```

Example:

```text
Extract CSS
```

must not silently become:

```text
Extract CSS
+
change spacing
+
change colors
+
change breakpoints
```

---

# 7. Refactor ≠ Redesign

Structural refactoring must preserve:

- visual output
- behavior
- flow
- responsive behavior

unless a separately approved design change exists.

Refactor success means:

```text
same product
same UI
cleaner structure
```

---

# 8. Design Approval Gate

AI may propose a design.

AI must not treat the proposal as approved until the user explicitly approves it.

Workflow:

```text
Requirement
↓
AI proposes design
↓
User reviews
↓
User approves
↓
Design becomes approved spec
↓
Implementation begins
```

Do not skip the approval step for significant UI changes.

---

# 9. Implementation Approval Gate

After implementation:

```text
AI implements
↓
390 review
834 review
1280 review
↓
User approves
↓
Merge
```

Do not merge design assumptions into production without review.

---

# 10. Shared Component Protection

Before modifying a shared component, AI must identify:

```text
Component:
Ownership level:
Known users:
Why this change belongs globally:
Pages/viewports affected:
```

If the request is local:

> Keep the solution local.

Do not change a Global Shared component to solve one page-specific issue unless the user explicitly approves a system-level change.

---

# 11. Global Token Protection

Do not change:

- brand colors
- fonts
- global radius language
- global border language
- major shared spacing rules

during ordinary page work.

A global token change is a Design System change.

It requires explicit approval.

---

# 12. Responsive Protection

Every meaningful UI change must consider:

```text
390px Mobile
834px Tablet
1280px Desktop
```

Do not verify only Desktop.

Do not assume Tablet is automatically correct because Desktop works.

---

# 13. Tablet Rule

Tablet is a real layout target.

AI must explicitly check:

- navigation density
- sidebars
- grid columns
- tables
- forms
- editor panels
- modal width
- Player width

Do not treat 834px as “Desktop but narrower.”

---

# 14. Navigation Protection

Do not globally replace one navigation system with another.

Current navigation ownership differs by context:

```text
Marketing
Creator/Application
Settings
Player
Editor
```

A navigation change must respect page-family ownership.

---

# 15. Player Protection

Player is a subsystem.

Do not modify Player globally to solve a single game-specific issue.

Use:

```text
Player shared foundation
+
game-specific extension
```

Game-specific logic should remain inside the relevant game module.

---

# 16. Editor Protection

Workbench and Challenge reuse editor-family patterns.

Do not create duplicate editor systems unless a real product difference requires it.

Locked Workbench should be treated as a state/mode before duplicating the entire page.

---

# 17. Route Protection

Prototype routes are not automatically production contracts.

Do not silently change or finalize routes while doing UI refactoring.

Known route issues should be recorded and resolved separately.

---

# 18. Prototype Harness Protection

The large prototype contains design-review/demo tooling such as:

- device toggle
- screen navigator
- browser chrome
- demo state controls

Do not mistake these for production UI.

When splitting code, separate:

```text
Prototype Harness
```

from:

```text
Product UI
```

---

# 19. Class / ID Protection

During initial extraction:

- do not rename IDs casually
- do not rename classes casually
- do not rename functions casually
- do not rename screen IDs casually

These may be referenced by JavaScript or demo state logic.

Renaming should happen only in a dedicated cleanup/refactor task.

---

# 20. Inline Style Rule

The current prototype contains many inline styles.

Do not bulk-remove them just for cleanliness.

First classify them as:

```text
dynamic
state-driven
page-specific
shared
legacy
```

Then migrate safely.

---

# 21. Inline Event Rule

The prototype contains many inline event handlers.

Do not remove or rewrite all of them during CSS or layout extraction.

Event refactoring belongs to a separate JavaScript cleanup phase.

---

# 22. CSS Safety Rule

Do not solve a page-specific issue by changing a broad global selector unless necessary.

Prefer:

```text
page-family selector
component modifier
page-specific class
```

over broad global overrides.

---

# 23. JavaScript Safety Rule

Do not combine:

```text
UI extraction
+
game-engine rewrite
+
navigation rewrite
```

in one task.

Separate concerns.

---

# 24. Behavior Preservation Rule

When refactoring existing behavior, preserve:

- navigation targets
- state transitions
- validation
- game flow
- lock behavior
- challenge flow
- result behavior

unless the Product Master explicitly says otherwise.

---

# 25. Accessibility Rule

New production components must consider:

- semantic HTML
- keyboard access
- visible focus
- accessible names
- sufficient contrast
- touch target size
- non-color-only state communication

Do not regress accessibility to match prototype shortcuts.

---

# 26. Error Handling Rule

When something is unclear:

Do not invent.

Use one of these outcomes:

```text
Confirmed
Needs review
Conflict found
Route decision required
Product decision required
Design decision required
```

Then continue only within the confirmed scope.

---

# 27. Missing Rule Procedure

If a requested task requires a rule that does not exist yet:

1. identify the missing rule
2. propose the smallest reasonable decision
3. keep it separate from implementation
4. obtain approval if it changes product/design system behavior
5. update documentation
6. implement afterward

Do not silently create permanent conventions in code.

---

# 28. Design Consistency Rule

Future UI must continue using the approved visual foundation:

- existing color palette
- existing typography
- rounded soft UI
- approved button language
- approved card language
- approved surface language

Do not invent a new theme for one page.

---

# 29. Page-Family Ownership Rule

Changes should stay inside their family whenever possible.

Example:

```text
Settings issue
→ Account/Settings family

Marketing issue
→ Marketing family

Math Player issue
→ Player / Math
```

Do not touch unrelated families without a real shared-system reason.

---

# 30. Cross-Family Change Warning

If a task requires modifying:

```text
Global Button
Global token
Global breakpoint
App Shell
Player shared shell
Shared Modal foundation
```

AI must flag:

```text
Cross-family impact
```

before implementing.

---

# 31. File Creation Rule

Do not create many tiny files prematurely.

Prefer coherent ownership.

Bad:

```text
27 CSS files for 27 screens
```

Better:

```text
Global
+
Page Family
+
Page-local only when justified
```

---

# 32. File Split Rule

When splitting the large prototype:

```text
copy/extract first
verify parity
then remove old duplicate code
```

Avoid deleting the original section before the extracted version is verified.

---

# 33. Safe Extraction Sequence

Preferred sequence:

```text
1. Prototype harness
2. Tokens/base/shared UI
3. Marketing + System
4. Auth
5. Creator + Account shell
6. Discovery
7. Editor
8. Player shared shell
9. Player game modules
10. Tablet improvements
11. JS cleanup
```

Each stage gets its own commit.

---

# 34. Commit Scope Rule

Commits should describe one coherent change.

Good:

```text
Extract shared design tokens
Split marketing styles
Extract auth screens
Add player shared styles
```

Avoid:

```text
Update everything
Fix UI
Big refactor
Various changes
```

---

# 35. Branch Rule

For meaningful changes, use focused branches.

Examples:

```text
refactor/shared-css
refactor/marketing
ui/dashboard-kpi
ui/settings-mobile
ui/player-result
```

Do not mix unrelated changes in one branch.

---

# 36. Review Rule

Before considering a UI task complete, report:

```text
Changed:
Not changed:
Shared components touched:
Screens potentially affected:
390 result:
834 result:
1280 result:
Known follow-up:
```

This can be concise.

---

# 37. No Silent Cleanup Rule

Do not perform “while I am here” cleanup unless requested.

Examples of forbidden silent cleanup:

```text
renaming
formatting unrelated files
changing copy
changing tokens
removing comments
reordering unrelated code
updating routes
changing data models
```

Keep the diff focused.

---

# 38. Product Copy Rule

Do not rewrite product copy during a visual task unless copy is part of the approved scope.

Copy can affect:

- CTA hierarchy
- product meaning
- SEO
- legal meaning

Treat copy as intentional content.

---

# 39. Demo Data Rule

Do not convert prototype/demo values into production truth.

Examples:

- play counts
- names
- result values
- fake activity
- placeholder links

Demo data must remain clearly demo or be replaced by real data later.

---

# 40. Design Proposal Format

When proposing a significant UI change, use:

```text
Goal
Current issue
Proposed change
Desktop
Tablet
Mobile
Shared components affected
What stays unchanged
```

Do not redesign unrelated areas.

---

# 41. Implementation Format

When implementing an approved design, use:

```text
Scope
Files
Changes
Shared impact
Responsive checks
Known limitations
```

Keep explanations short and concrete.

---

# 42. Conflict Priority Rule

If implementation conflicts with approved documentation:

> Documentation wins until the user approves an update.

Do not silently make code the new standard.

If the current implementation contains a better or newer behavior:

> report the gap and update the documentation only after approval.

---

# 43. Repository Memory Rule

Important decisions must be written into repository documentation.

Do not depend on:

- one Claude chat
- one ChatGPT conversation
- one developer's memory

The repository must remain sufficient for another capable AI to continue the project.

---

# 44. AI-Agnostic Rule

Documentation should not depend on one AI provider.

Use language such as:

```text
AI coding assistant
AI design assistant
```

where possible.

`CLAUDE.md` may contain Claude-specific loading instructions, but the actual product/design rules should remain tool-agnostic.

---

# 45. User Role

The user is the Product Owner and final design approver.

AI may:

- analyze
- propose
- compare
- design
- implement approved work
- identify risks

AI must not silently decide permanent product/design changes when approval is required.

---

# 46. Definition of Done — Design Task

A design task is done when:

```text
scope is clear
design follows foundation
Desktop considered
Tablet considered
Mobile considered
shared impact identified
user approves
documentation updated
```

Implementation is a separate step.

---

# 47. Definition of Done — Refactor Task

A refactor task is done when:

```text
visual output preserved
behavior preserved
responsive output preserved
ownership improved
diff remains scoped
representative screens checked
commit is focused
```

---

# 48. Definition of Done — Implementation Task

An implementation task is done when:

```text
approved design implemented
390 checked
834 checked
1280 checked
shared impact checked
no unrelated redesign
known issues reported
user can review
```

---

# 49. Hard Prohibitions

Without explicit approval, AI must not:

1. change brand colors
2. change fonts
3. replace the visual theme
4. change Product Master rules
5. finalize new routes
6. redesign unrelated screens
7. rewrite the entire app for one local request
8. change global breakpoints casually
9. merge page families casually
10. duplicate shared systems unnecessarily
11. remove major behavior during refactor
12. treat prototype demo UI as production requirement
13. invent missing product rules silently
14. combine refactor and redesign by default

---

# 50. Recommended Prompt Header for AI Work

For future implementation tasks, the user or repository instructions can prepend:

```text
Follow the Ducal Game repository rules.

Before editing:
1. identify the target page family
2. read the relevant design/responsive/component/page docs
3. declare scope
4. do not modify unrelated files
5. preserve 390 / 834 / 1280
6. do not change shared tokens or components unless explicitly required
7. keep refactor separate from redesign
```

This can be reused across AI tools.

---

# 51. Next Step

After this file is committed, create the repository-level:

```text
CLAUDE.md
```

Its job is not to duplicate all design rules.

Its job is to tell Claude Code:

- where the project rules live
- which files to read first
- how to obey scope
- how to handle conflicts
- which docs are authoritative

After `CLAUDE.md`, begin the first safe structural extraction.
