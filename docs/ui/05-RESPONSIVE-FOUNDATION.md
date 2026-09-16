# Ducal Game — Responsive Foundation

Version: 1.0  
Status: APPROVED FOUNDATION  
Purpose: Define the required Mobile / Tablet / Desktop design framework for all future Ducal Game UI work.

> IMPORTANT:
> Every new or revised UI must be intentionally designed and reviewed for Mobile, Tablet, and Desktop.
> Responsive design is not treated as “Desktop first, then shrink until it fits.”

---

# 1. Core Responsive Principle

Ducal Game is:

> **Mobile-first, responsive across one shared Information Architecture.**

Mobile, Tablet, and Desktop should represent the same product and the same user flow.

Responsive layouts may:

- rearrange
- stack
- collapse
- scroll
- switch navigation patterns
- convert modal to bottom sheet
- hide low-priority decorative elements
- change grid columns
- adjust spacing and typography

Responsive layouts must not silently:

- remove required actions
- change product rules
- create a different user flow
- rename the same function
- expose different permissions
- create unrelated visual systems

---

# 2. Required Reference Widths

These three widths are the official design-review targets.

```text
Mobile
390px

Tablet
834px

Desktop
1280px
```

These widths come directly from the current Ducal Game prototype preview system and remain the mandatory visual review sizes.

Every significant page or component change must be checked at all three widths.

---

# 3. Responsive Ranges

The production responsive foundation should use three primary layout ranges.

## Mobile

```text
0px – 767px
```

Primary reference:

```text
390px
```

## Tablet

```text
768px – 1023px
```

Primary reference:

```text
834px
```

## Desktop

```text
1024px and above
```

Primary reference:

```text
1280px
```

These are the primary page-layout ranges.

Component-level container queries may still be used when a component needs to respond to its own available width.

---

# 4. Implementation Direction

Future production CSS should progressively move toward:

```css
/* Mobile baseline */
.component {
  ...
}

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}
```

or equivalent framework/container-query logic.

The important principle is:

```text
Mobile = baseline
Tablet = intentional adaptation
Desktop = expanded adaptation
```

Do not create Desktop as the only real design and treat Tablet as an accidental intermediate width.

---

# 5. Current Prototype Migration Rule

The current prototype currently uses a major compact container query around:

```css
@container (max-width: 700px)
```

This means the current 834px Tablet preview behaves largely like Desktop.

Therefore:

> The existing prototype must not be globally rewritten to the new breakpoint architecture in the same step as structural code extraction.

Safe migration order:

```text
1. Preserve current visual output
2. Extract structure safely
3. Verify 1280 / 834 / 390
4. Introduce intentional Tablet rules
5. Re-review all affected screens
6. Approve
```

This prevents responsive refactoring and visual redesign from becoming one uncontrolled change.

---

# 6. Mandatory Three-Viewport Delivery

Whenever AI proposes or implements a meaningful UI change, it must account for:

```text
Desktop — 1280px
Tablet — 834px
Mobile — 390px
```

For page-level work, the AI should explicitly state:

```text
Desktop behavior:
...

Tablet behavior:
...

Mobile behavior:
...
```

A design is incomplete if only one viewport has been considered.

---

# 7. Mobile Foundation

Mobile is the primary design target.

Mobile must prioritize:

- immediate understanding
- touch interaction
- clear primary action
- readable text
- sufficient spacing
- short interaction paths
- minimal horizontal complexity
- safe-area awareness
- keyboard behavior
- Player experience
- result/share flow

---

# 8. Mobile Touch Rules

Interactive elements must be comfortable for touch.

Check:

- buttons
- answer cards
- navigation items
- close controls
- tabs
- checkboxes
- toggles
- menu items
- share actions
- Player answers

Avoid tiny click-only targets inherited from Desktop.

Accessibility requirements still apply.

---

# 9. Mobile Navigation

Different product areas may use different mobile navigation patterns.

This is intentional.

## Marketing / Public

Default direction:

```text
Top brand bar
+
Hamburger / compact navigation
```

The current prototype already follows this pattern.

## Creator / Account Application

Default direction:

```text
Compact top bar
+
Bottom navigation for primary destinations
```

where appropriate.

## Settings

Mobile may use:

```text
Settings list
→
Drill-down detail
```

instead of keeping a Desktop side-navigation layout.

## Workbench / Editor

Mobile may use:

- horizontally scrollable step/question navigation
- stacked editor layout
- explicit preview toggle

## Player

Player should remain focused and lightweight.

Do not add full application navigation inside active gameplay unless required by the game flow.

---

# 10. Tablet Foundation

Tablet is a real layout class.

It must not be treated as:

> “small Desktop.”

At 834px, every page must be checked for:

- cramped sidebars
- oversized desktop gutters
- three-column layouts that no longer fit
- long horizontal button groups
- tables
- editor panels
- modal widths
- cards
- Player width
- navigation density

Tablet should preserve the same Information Architecture but adapt the composition.

---

# 11. Tablet Design Rule

Default Tablet behavior should sit between Mobile and Desktop.

Examples:

```text
4-column Desktop grid
→
2-column Tablet grid
→
1-column or 2-column Mobile grid depending content
```

or:

```text
3-panel Desktop editor
→
2-panel / adaptive Tablet editor
→
stacked Mobile editor
```

Exact behavior belongs to the page or component specification.

Do not invent a different Tablet product flow.

---

# 12. Desktop Foundation

Desktop may use the extra width for:

- persistent side navigation
- multi-column layout
- wider information density
- split editor / preview
- larger tables
- side-by-side controls
- wider card grids

Desktop should not add unnecessary complexity merely because space is available.

The platform must remain:

- simple
- fast
- lightweight
- easy to understand

---

# 13. Content Width Rule

Full viewport width should not automatically mean full content width.

Pages should use intentional content containers.

Typical categories:

## Marketing Content

May use a wider container for:

- Hero
- visual sections
- game discovery

but text-heavy sections should remain readable.

## Forms / Auth

Should remain constrained rather than stretching across Desktop.

## Player

Should remain focused and centered.

Do not make question/result cards excessively wide on Desktop.

## Dashboard / Management

May use a wider application layout because data density is useful.

Exact max-width values can be standardized during page/component cleanup.

---

# 14. Page Gutters

Responsive layouts should maintain safe horizontal breathing room.

General direction:

```text
Mobile
compact but comfortable gutters

Tablet
medium gutters

Desktop
larger gutters / centered content
```

Do not remove horizontal padding simply to make content fit.

If content does not fit, reconsider the component layout.

---

# 15. Grid Rule

Grid column count must respond to available width.

Never preserve a Desktop column count when cards become unreadably narrow.

Review:

- KPI cards
- category cards
- discovery cards
- stats
- result recap cards
- forms
- About stats
- contact methods

---

# 16. Table Rule

Data tables may remain tables on larger screens.

On narrow screens, allowed patterns include:

1. horizontal scroll
2. reduced visible columns
3. card/list transformation

The choice depends on information priority.

The current prototype already uses horizontal scrolling for some compact tables.

Do not allow a table to force the whole page wider than the viewport.

---

# 17. Modal Rule

Desktop / Tablet default:

```text
Centered modal
```

Mobile may convert appropriate modal types into:

```text
Bottom sheet
```

The current prototype already applies this pattern to:

- How It Works
- Share

This responsive behavior is part of the Ducal Game design language.

Do not automatically convert every modal into a bottom sheet.

Use bottom sheets when the interaction is short, focused, and suitable for mobile reachability.

---

# 18. Bottom Sheet Rule

A mobile bottom sheet should:

- use the existing Ducal Game surface language
- have clear close/dismiss behavior
- respect safe areas
- keep important actions visible
- avoid excessive vertical height when possible
- scroll internally when content genuinely requires it

---

# 19. Button Rule

Desktop horizontal button groups may stack on Mobile when needed.

Primary action hierarchy must remain clear.

Example:

```text
Desktop:
[ Secondary ] [ Primary ]

Mobile:
[ Primary full width ]
[ Secondary full width ]
```

The exact order must preserve product priority.

Do not arbitrarily reverse CTA priority between viewports.

---

# 20. Forms

Forms should remain readable at every width.

Mobile:

- inputs generally use available width
- labels remain visible
- helper/error text wraps naturally
- keyboard does not hide critical actions where avoidable

Desktop:

- form width remains reasonable
- do not stretch short fields unnecessarily across the viewport

---

# 21. Typography Responsive Rule

Typography may scale between viewport classes, but the hierarchy must remain consistent.

Example principle:

```text
H1 remains H1
Card title remains Card title
Body remains Body
```

Do not solve responsive problems by randomly shrinking individual text until it fits.

First fix:

- layout
- width
- wrapping
- spacing

Then adjust approved responsive typography if needed.

---

# 22. Player Responsive Rule

Player is a priority responsive subsystem.

At every viewport, preserve:

- game title/context
- progress
- question
- answer options
- feedback
- next action
- result hierarchy
- share/challenge actions where relevant

Mobile should feel natural rather than like a scaled-down desktop game.

Desktop should keep the Player focused instead of spreading gameplay across excessive width.

---

# 23. Workbench Responsive Rule

Workbench / Creator Editor is allowed to transform substantially in composition.

Desktop may support:

```text
Outline
+
Editor
+
Preview
```

Tablet may reduce simultaneous panels.

Mobile may use:

```text
horizontal question navigation
+
editor
+
preview toggle
```

The underlying editing flow and data must remain the same.

---

# 24. Settings Responsive Rule

Desktop / Tablet may use persistent settings navigation when space allows.

Mobile may use:

```text
Settings categories
→
Open category
→
Back to categories
```

This is a layout adaptation, not a separate settings architecture.

---

# 25. Responsive Visibility

Elements may be hidden responsively only when they are:

- decorative
- redundant
- duplicated by another navigation mechanism
- explicitly low-priority

Do not hide:

- required product actions
- required legal information
- critical errors
- required input
- important Player information

without an approved alternative.

---

# 26. Decorative Elements

Current UI sometimes uses:

- floating cards
- decorative visual elements
- device mockups
- gradients
- emoji

These may be simplified or hidden on Mobile if they compete with content or space.

Core product meaning must not depend on decorative elements.

---

# 27. Safe Area

Mobile interfaces with bottom actions or navigation must account for device safe areas where relevant.

Particularly review:

- bottom navigation
- bottom sheets
- sticky CTA
- Player actions

Production implementation should not assume every mobile browser has identical usable viewport geometry.

---

# 28. Scroll Rule

The page must intentionally define scrolling behavior.

Avoid:

- nested accidental scroll areas
- horizontal page overflow
- sticky elements covering content
- fixed-height panels trapping content

Internal scrolling is acceptable for components such as:

- long editor outlines
- tables
- controlled modal/sheet content

when intentional.

---

# 29. Orientation / Intermediate Width Rule

The UI must remain functional between the three reference widths.

Passing only:

```text
390
834
1280
```

is not sufficient if the layout breaks at:

```text
600
760
900
1100
```

Reference widths are approval snapshots.

Responsive CSS must remain fluid across the ranges.

---

# 30. Page-Specific Responsive Specs

The foundation does not need to define every page's exact layout.

Each approved page spec should eventually include:

```text
Desktop
Tablet
Mobile
```

with:

- layout
- navigation
- grid
- CTA placement
- content priority
- modal behavior
- scroll behavior
- hidden/decorative elements

---

# 31. AI Design Rule

When an AI is asked to design or revise a page, it must not return only:

> “Here is the desktop design.”

It must consider all three viewport classes.

Required design reasoning:

```text
What remains the same?
What rearranges?
What stacks?
What changes navigation pattern?
What becomes scrollable?
What becomes a bottom sheet?
What decorative elements are reduced?
```

The AI must preserve the approved visual foundation.

---

# 32. AI Coding Rule

When implementing responsive changes, AI must:

1. identify the target page/component
2. identify shared selectors it plans to modify
3. state which viewports may be affected
4. avoid global breakpoint edits for a page-specific problem
5. preserve unrelated screens
6. verify 390 / 834 / 1280
7. report any intentional visual difference

Do not change shared responsive rules silently.

---

# 33. Visual Regression Requirement

For any meaningful UI implementation change, verify:

```text
390px
834px
1280px
```

Check:

- layout
- spacing
- typography
- colors
- borders
- radius
- navigation
- buttons
- cards
- forms
- modal/sheet
- scrolling
- visibility
- interaction state

The long-term goal is automated screenshots for these reference widths.

---

# 34. Refactor vs Responsive Redesign

Do not combine these tasks by default:

```text
Extract CSS
+
change breakpoints
+
redesign Tablet
+
change component markup
```

Preferred sequence:

```text
Refactor safely
↓
verify visual parity
↓
responsive improvement
↓
verify three viewports
↓
approve
```

This is a core stability rule.

---

# 35. Current Known Responsive Debt

Known issues in the current prototype:

1. Tablet exists as a preview target but not as a true independent layout layer.
2. Most compact behavior begins only at approximately 700px.
3. Current stylesheet is structurally Desktop/default + compact override rather than true Mobile-first.
4. Several responsive rules are embedded in one large stylesheet.
5. Page-family responsive ownership is not yet separated.

These are migration issues.

They do not invalidate the existing visual design.

---

# 36. Approved Responsive Summary

The official Ducal Game responsive foundation is:

```text
MOBILE-FIRST

Mobile:
0–767
Reference 390

Tablet:
768–1023
Reference 834

Desktop:
1024+
Reference 1280
```

All three use:

```text
one product
one Information Architecture
one Design System
```

but are allowed to use different responsive compositions appropriate to the available space.

---

# 37. Next Step

The next foundation document should define:

```text
06-SHARED-COMPONENT-FOUNDATION.md
```

It will inventory and govern shared components such as:

- Button
- Form Field
- Card
- Pill / Badge
- Navigation
- Modal
- Bottom Sheet
- Tabs
- Empty State
- Table
- Player components

The goal is to prevent AI from recreating the same component differently on every page.
