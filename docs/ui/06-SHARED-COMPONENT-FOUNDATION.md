# Ducal Game — Shared Component Foundation

Version: 1.0  
Status: APPROVED FOUNDATION  
Purpose: Define how shared UI components are identified, reused, changed, and protected across Ducal Game.

> IMPORTANT:
> The current prototype already contains many repeated UI patterns.
> This document does not require immediate code refactoring.
> It defines the rules AI and developers must follow when those patterns are later extracted into reusable components.

---

# 1. Core Principle

Ducal Game should feel like one product.

A Button on Dashboard should not become a different design system from a Button in Settings.

A Card on Games should not randomly use a different visual language from a Card in Creator.

However:

> Similar appearance does not automatically mean two elements must become one universal component.

The correct goal is:

```text
Consistency
+
Clear ownership
+
Safe reuse
```

not:

```text
Maximum abstraction
```

---

# 2. Component Ownership Levels

Every reusable UI pattern should eventually belong to one of three levels.

## Level 1 — Global Shared

Used across multiple product areas.

Examples:

- Button
- Form Field
- Pill / Badge
- Modal foundation
- Bottom Sheet foundation
- Empty State
- Base Card surface
- Toggle / Switch
- Common icon control

A change here may affect many screens.

---

## Level 2 — Page-Family Shared

Shared only within a related product area.

Examples:

```text
Marketing
Creator
Editor
Player
Auth
Settings
```

Possible components:

- Creator sidebar
- Creator bottom navigation
- Player question card
- Player result action group
- Workbench question navigation
- Marketing navigation

A change here should not automatically affect unrelated page families.

---

## Level 3 — Page-Local

Used only by one page or one unique experience.

Examples may include:

- a special challenge comparison block
- a unique analytics visualization
- a one-off legal-content structure

Do not promote a page-local pattern into a global component merely to reduce code duplication.

---

# 3. Shared Component Change Rule

Before changing a shared component, AI or developer must identify:

1. component name
2. ownership level
3. files/selectors affected
4. screens currently using it
5. Mobile / Tablet / Desktop impact
6. whether the requested change is global or page-specific

If the request is page-specific:

> Do not change the global component unless the design-system rule itself is being changed.

Prefer:

```text
Base shared component
+
page-specific modifier
```

over changing the base for everyone.

---

# 4. Current High-Confidence Shared Components

The current prototype already has strong candidates for shared ownership.

These include:

1. Button
2. Pill / Badge
3. Form Field
4. Toggle / Switch
5. Card Surface
6. Modal / Overlay
7. Bottom Sheet behavior
8. Empty State
9. Tabs
10. Sidebar Navigation
11. Mobile Bottom Navigation
12. Table foundation
13. Confirmation Dialog
14. Player / Center Card
15. Close / Icon Button

These patterns should be preserved during refactoring.

---

# 5. Button Foundation

The current prototype already uses a shared `.btn` pattern.

Current base direction:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 13.5px;
  border: none;
  cursor: pointer;
}
```

Current variants include:

```text
primary
ghost
accent
danger
sm
lg
full
```

This button language is part of the approved Ducal Game design foundation.

---

# 6. Button Semantic Rule

Buttons should be selected by purpose, not by whichever color looks attractive.

## Primary

Use for the main action of the current decision/context.

Current brand direction:

```text
Purple / brand
```

## Accent

Use where the existing product flow intentionally uses stronger playful/social emphasis.

Do not use Accent simply to create visual variety.

## Ghost / Secondary

Use for:

- secondary action
- cancel
- back-up choice
- non-primary control

## Danger

Use only for destructive or dangerous actions.

## Small

Use for compact controls where standard button size is unnecessary.

## Full Width

Use when mobile/form/player context benefits from a strong full-width action.

---

# 7. Button Hierarchy Rule

A section should normally have one obvious highest-priority action.

Avoid:

```text
Primary
Primary
Primary
Primary
```

in one action group.

When multiple actions exist, hierarchy should be clear through:

- filled vs ghost
- position
- size
- spacing
- semantic danger styling

Responsive stacking must preserve the same priority.

---

# 8. Button State Requirements

Production shared Buttons should eventually define:

- default
- hover
- focus-visible
- active/pressed
- disabled
- loading where required

The prototype currently contains only some of these states.

Do not invent unrelated state styling per page.

---

# 9. Pill / Badge Foundation

Current pattern:

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 11px;
  border-radius: 100px;
}
```

Current semantic variants include:

```text
mint
brand
accent
```

Typical uses:

- status
- category/state label
- publication status
- lightweight metadata emphasis

---

# 10. Pill vs Button

A Pill/Badge is not automatically interactive.

Rule:

```text
Pill / Badge
= communicates state or label

Button / Chip
= performs an action
```

Do not make a status badge clickable merely because it visually resembles a pill button.

Interactive chips should have explicit interactive behavior and states.

---

# 11. Form Field Foundation

Current form pattern includes:

- label
- input / textarea
- subtle border
- white surface
- rounded corner
- Inter font
- brand focus border
- helper text

Current approximate structure:

```text
Field
├── Label
├── Input / Textarea
└── Hint / Error
```

This is a strong candidate for Global Shared ownership.

---

# 12. Form Field Future States

Production shared fields should eventually define:

- default
- hover where relevant
- focus
- filled
- disabled
- error
- success only when meaningful
- helper text
- validation message

Error must not be communicated by color alone.

---

# 13. Toggle / Switch Foundation

The prototype already contains a reusable switch pattern.

Typical behavior:

```text
Off
→ neutral line background

On
→ brand background
```

Switch should be used for immediate binary settings.

Do not use Switch when the action requires an explicit Save/Submit confirmation unless the product behavior intentionally supports immediate change.

---

# 14. Base Card Foundation

The shared visual card language is:

- white or approved tinted surface
- subtle border
- rounded corners
- restrained elevation
- clear internal hierarchy

This should be treated as a visual foundation, not necessarily one single universal code component.

---

# 15. Card Families

Current UI contains multiple card families.

Examples:

## Information / Management

- KPI Card
- Info Card
- Settings Row
- Login Method
- Notification Item

## Discovery

- Category Card
- Game Gallery Card
- Game Type Card

## Player

- Player Card
- Center Card
- Result Card
- Recap Cell
- Insight Card

## Social / Sharing

- Share Card Preview
- Challenge Card
- Ranking / leaderboard item

These may share foundation tokens while keeping separate functional components.

---

# 16. Do Not Over-Generalize Cards

Do not create:

```text
<Card type="everything">
```

with dozens of unrelated properties just because several components have:

```text
white background
+
border
+
radius
```

Prefer:

```text
shared surface rules
+
meaningful component families
```

---

# 17. Modal Foundation

Current modal language includes:

- dark translucent overlay
- white surface
- rounded large corners
- focused width
- elevated shadow
- clear title/content/actions

Existing examples include:

- How It Works
- Share
- Confirmation

Modal foundations may be globally shared, while modal content remains specific.

---

# 18. Confirmation Dialog

Confirmation Dialog should be treated as a distinct shared pattern.

Typical structure:

```text
Icon / status
Title
Description
Actions
```

Use for actions requiring explicit confirmation such as:

- logout where appropriate
- destructive action
- important irreversible transition

Do not use confirmation dialogs for ordinary navigation.

---

# 19. Bottom Sheet Foundation

On Mobile, suitable modal experiences may transform into Bottom Sheets.

Current examples:

- How It Works
- Share

Shared Bottom Sheet behavior should include:

- mobile edge alignment
- top handle where used
- top-rounded corners
- safe-area consideration
- clear dismissal
- internally scrollable content only when necessary

Bottom Sheet is a responsive variant of an interaction pattern, not a different product feature.

---

# 20. Empty State Foundation

Current pattern includes:

```text
large visual/icon
title
description
optional CTA
```

and uses a soft background with centered content.

An Empty State should answer:

1. What is empty?
2. Is this normal?
3. What can the user do next?

Avoid empty screens containing only:

```text
No data
```

when a helpful next action exists.

---

# 21. Tabs Foundation

Current detail tabs use:

- horizontal row
- muted inactive labels
- brand active label
- active underline

Tabs are appropriate when:

- content is related
- switching does not represent major navigation
- users benefit from staying in the same page context

On narrow screens, current behavior allows horizontal scrolling.

---

# 22. Tabs vs Navigation

Tabs should not replace primary application navigation.

Rule:

```text
App destination
→ Navigation

Sections of the same entity/page
→ Tabs
```

Example:

```text
Dashboard / My Games / Settings
= navigation

Overview / Results / Questions / Links
inside one Game
= tabs
```

---

# 23. Sidebar Navigation Foundation

Desktop Creator/Application navigation currently uses:

- brand block
- grouped navigation
- icon + label
- muted inactive state
- brand-tinted active state

This is a Page-Family Shared component.

Do not reuse the full Creator sidebar automatically on Marketing or Player pages.

---

# 24. Mobile Bottom Navigation Foundation

Current compact Creator/Application navigation uses:

- sticky bottom placement
- icon + label
- muted inactive state
- brand active state

This is the mobile counterpart of the Creator/Application primary navigation.

It is not a global bottom nav for every Ducal Game experience.

Do not show it during active Player gameplay unless explicitly required.

---

# 25. Settings Navigation

Settings demonstrates an important responsive component principle.

Desktop:

```text
left settings navigation
+
content panel
```

Mobile:

```text
settings list
→
drill-down content
→
back
```

These should be treated as responsive variants of the same Settings information architecture.

---

# 26. Table Foundation

Current tables use:

- white surface
- subtle border
- rounded container
- muted header background
- compact header typography
- row separators

Tables are primarily management/data components.

On narrow screens:

- horizontal scroll
- column reduction
- card/list transformation

may be chosen based on information priority.

Do not globally transform every table using one rule without checking the content.

---

# 27. Player / Center Card Foundation

Current shared Player surface:

```text
focused centered width
white background
large radius
subtle border
strong but soft elevation
generous spacing
```

This is a Page-Family Shared foundation for:

- game intro
- player name
- questions
- results
- challenge states
- related focused flows

Desktop current reference width is approximately:

```text
520px max focused card
```

Mobile reduces padding/radius while preserving the focused experience.

---

# 28. Player Component Family

Player should eventually own reusable components such as:

```text
PlayerShell
GameHeader / GameContext
Progress
Question
AnswerOption
Timer
Feedback
ResultHeader
ResultSummary
Recap
ShareAction
ChallengeAction
PlayAgainAction
```

Game types may extend this system.

They should not recreate the entire Player UI independently.

---

# 29. Player Game-Specific Extensions

Allowed:

```text
Math-specific timer
IQ-specific result metric
Connection dimension bars
Quiz leaderboard
Personality result category
```

Not allowed:

```text
Math uses a completely unrelated button system
IQ changes global fonts
Connection invents a different card radius system
```

Game-specific personality should sit on top of the shared Player foundation.

---

# 30. Icon / Close Controls

Current UI uses small rounded icon controls for:

- close
- row actions
- notifications
- editing

These should eventually share:

- predictable hit area
- focus-visible state
- hover/pressed state
- accessible label
- consistent icon alignment

An icon-only button must have an accessible name in production.

---

# 31. Notification Components

Notification elements currently include:

- bell
- badge
- floating panel
- notification rows

These should belong to the Creator/Application family unless later reused elsewhere.

Do not treat a notification dropdown as a generic Modal simply because both float over content.

---

# 32. Component State Ownership

State styling belongs with its component.

Examples:

```text
Button disabled
→ Button

Field error
→ Field

Tab active
→ Tabs

Navigation active
→ Navigation

Answer correct/incorrect
→ Player Answer Option
```

Do not scatter state styling across random page CSS files.

---

# 33. Global Token vs Component Token

Use global design tokens for product-wide concepts such as:

```text
brand color
text color
surface
border
```

Use component-level variables/styles when a value is specific to:

```text
Button
Player
Modal
Navigation
```

Do not promote every component detail into a global token.

---

# 34. Component Responsive Ownership

Responsive behavior should live as close as practical to the component or page family it belongs to.

Example:

```text
Share Modal → Mobile Bottom Sheet
```

belongs to Share/Overlay behavior.

It should not require a giant global rule that accidentally changes unrelated modals.

---

# 35. Reuse Rule for AI Designers

Before designing a new element, AI must check:

1. Does an existing component already solve this?
2. Can the existing component be reused unchanged?
3. Can a documented variant solve it?
4. Is the need specific to one page family?
5. Is a genuinely new component necessary?

Only after those checks should a new component pattern be proposed.

---

# 36. New Component Proposal

If a genuinely new shared component is required, the proposal should state:

```text
Component name
Purpose
Where it will be used
Why existing components are insufficient
States
Responsive behavior
Accessibility requirements
Whether Global / Family / Local
```

It should not silently enter the design system.

---

# 37. AI Coding Safety Rule

Before editing shared component code, AI must report:

```text
Shared component:
Files/selectors:
Known screens using it:
Requested change:
Expected affected viewports:
Expected affected pages:
```

Then make the smallest change necessary.

A page-specific request must not become an unrequested global redesign.

---

# 38. Shared Component Regression Rule

After changing a Global Shared component, verify representative usage across all affected families.

Example Button change:

```text
Marketing
Auth
Creator
Editor
Player
Settings
```

at:

```text
390
834
1280
```

Not every screen always requires manual review, but representative coverage must be identified before implementation.

---

# 39. Refactoring Rule

Initial component extraction must preserve current rendering and behavior.

Do not combine:

```text
extract component
+
rename all classes
+
change colors
+
change spacing
+
change behavior
```

Preferred:

```text
Extract
↓
Visual/behavior parity
↓
Approve
↓
Improve separately
```

---

# 40. Current Component Candidates by Ownership

## Global Shared Candidates

```text
Button
Form Field
Pill / Badge
Toggle / Switch
Base Overlay
Confirmation Dialog
Empty State
Icon Button foundation
```

## Shared Surface / Style Foundations

```text
Card surface
Modal surface
Bottom Sheet surface
Table surface
```

## Marketing Family

```text
Marketing Nav
Marketing Footer
Hero
Category presentation
Cookie banner
```

## Creator / Application Family

```text
Sidebar
Mobile Bottom Nav
Page Header
KPI Card
Notification panel/item
Management Table
```

## Editor Family

```text
Workbench Outline
Question editor
Preview panel
Workbench footer/actions
```

## Player Family

```text
Player Stage
Player Card
Question
Answer Option
Progress
Result
Recap
Challenge / Share actions
```

## Settings Family

```text
Settings Nav
Settings Mobile List
Settings Panel
Settings Identity
Action Row
```

---

# 41. Component Naming Rule

When code extraction begins, names should describe purpose rather than current page position.

Prefer:

```text
Button
StatusPill
FormField
EmptyState
GameCard
PlayerCard
SettingsNav
```

Avoid vague names such as:

```text
box1
white-box
left-card
purple-thing
section2
```

However, do not rename existing classes merely for style cleanup during the first safe extraction pass.

---

# 42. Accessibility Baseline

Every production shared component must eventually support relevant accessibility behavior.

At minimum:

- semantic element where possible
- keyboard operability
- visible focus
- accessible name
- sufficient contrast
- touch-friendly target
- state not communicated only by color
- correct ARIA only where native semantics are insufficient

Prototype markup may not yet satisfy all of these requirements.

Do not confuse prototype parity with production accessibility completion.

---

# 43. Approved Component Principle Summary

The Ducal Game component system follows:

```text
Reuse before recreate.
Share only when meaningfully shared.
Keep global components stable.
Keep page-specific problems local.
Preserve one visual language.
Allow game-specific expression inside shared foundations.
Do not over-abstract.
```

---

# 44. Next Step

The next document should define:

```text
07-PAGE-MAP-AND-OWNERSHIP.md
```

It will map every current screen into:

- Marketing
- Auth
- Discovery
- Creator
- Editor
- Player
- Settings / Account
- Legal / System

and define which page family owns which UI and CSS.

That page map will let us safely begin splitting the 6,000-line prototype without Claude touching unrelated screens.
