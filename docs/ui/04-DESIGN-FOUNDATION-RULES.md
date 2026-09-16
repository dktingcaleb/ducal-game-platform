# Ducal Game — Approved Design Foundation Rules

Version: 1.0  
Status: APPROVED BASELINE  
Purpose: Freeze the current Ducal Game visual foundation so future AI-generated UI remains consistent with the existing product.

> IMPORTANT:
> This document does not redesign the existing product.
> It codifies the visual system already used by the current Ducal Game prototype.
>
> Future AI design work must follow these rules unless the product owner explicitly approves a design-system change.

---

# 1. Core Rule

The current Ducal Game visual language is the approved baseline.

Future design work must:

- continue using the existing overall visual style
- continue using the existing brand colors
- continue using the existing typography direction
- continue using the existing rounded, soft, lightweight UI language
- reuse existing component patterns before creating new ones
- avoid introducing a new visual system page by page

Page-specific problems may be fixed later.

A page-level problem does **not** automatically justify changing the global design system.

---

# 2. Approved Visual Personality

Ducal Game should remain:

- Playful
- Smart
- Clean
- Friendly
- Modern
- Global
- Lightweight

The UI should feel fun without becoming childish.

Functional areas such as:

- Dashboard
- Settings
- Account
- Analytics
- Creator management

should stay cleaner and more neutral.

Game-facing areas such as:

- Player
- Result
- Challenge
- Game discovery

may use stronger playful expression.

---

# 3. Approved Typography

## Display / Heading Font

```text
Baloo 2
```

Use for:

- major headings
- display numbers
- game titles where appropriate
- playful emphasis
- branded section titles

## UI / Body Font

```text
Inter
```

Use for:

- body text
- navigation
- buttons
- forms
- labels
- metadata
- settings
- dashboard UI
- supporting text

Do not introduce another primary font family without explicit approval.

---

# 4. Approved Core Color Tokens

These values are part of the current Ducal Game design foundation.

```css
:root {
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
}
```

These values must not be changed casually.

Any future change to one of these values is a **Design System Change**, not a normal page edit.

---

# 5. Color Roles

## Primary Brand

```text
--brand: #6C4CF0
--brand-dark: #4E31D6
--brand-tint: #EEE8FF
```

Typical use:

- primary brand identity
- selected states
- active navigation
- progress
- links / key interactions
- branded highlights
- focus states
- primary visual hierarchy where currently used

---

## Accent

```text
--accent: #FF5D8F
--accent-tint: #FFE3EC
```

Typical use:

- secondary emphasis
- playful actions
- selected game/category accents
- social / expressive UI
- result/share emphasis where already established

Do not replace the brand purple globally with accent pink.

---

## Positive / Success

```text
--mint: #17C3A2
--mint-tint: #DEFBF3
```

Typical use:

- success
- correct
- published
- positive state
- positive badges
- confirmation states

---

## Warm Highlight

```text
--sun: #FFC94D
```

Typical use:

- warm highlight
- category differentiation
- special emphasis
- game-specific visual accents

Use selectively.

---

## Primary Text

```text
--ink: #1B1330
```

Use for:

- main text
- strong labels
- titles
- important UI content

---

## Secondary Text

```text
--ink-soft: #6B6280
```

Use for:

- metadata
- supporting descriptions
- helper text
- secondary labels
- inactive navigation

Do not introduce arbitrary gray colors when `--ink-soft` is sufficient.

---

## Main Background

```text
--bg: #F6F3FF
```

Use for:

- application background
- soft secondary sections
- low-emphasis panels

---

## Card / Primary Surface

```text
--card: #FFFFFF
```

Use for:

- cards
- primary panels
- forms
- modal surfaces
- elevated content

---

## Border

```text
--line: #E7E1F7
```

Use as the default subtle border color.

---

# 6. Supporting Existing Colors

The current UI contains additional direct colors such as:

```text
#FBFAFF
#8A6CF7
#0E8F76
#FFF3D9
#5A3D00
```

These are allowed where they are already part of an existing component pattern.

However:

- do not create new arbitrary colors
- do not copy a page-specific color into a global token automatically
- do not expand the palette without explicit approval

Future cleanup may formalize these values into semantic tokens.

---

# 7. Danger / Error Colors

The current prototype uses multiple direct danger/error colors.

Until they are formally consolidated:

- preserve existing danger styling in existing components
- do not invent a new red system
- do not globally replace existing danger colors
- new components should reuse the closest existing danger pattern

A future component-system pass may standardize danger tokens.

---

# 8. Approved Surface Language

The current visual hierarchy should remain:

```text
soft outer background
↓
application background
↓
near-white structural surface
↓
white card / panel
↓
semantic tinted state
↓
floating modal / elevated UI
```

Primary surface character:

- light
- soft
- clean
- low visual noise
- subtle borders
- selective elevation

Do not redesign Ducal Game into:

- dark esports UI
- glassmorphism-heavy UI
- neon UI
- highly skeuomorphic UI
- flat corporate SaaS UI

unless explicitly approved as a future redesign.

---

# 9. Approved Border Style

Default behavior:

```css
border: 1px solid var(--line);
```

or where already used:

```css
border: 1.5px solid var(--line);
```

Use stronger border colors only for:

- focus
- selected state
- success
- warning
- error
- important interaction states

Borders should remain subtle.

---

# 10. Approved Radius Direction

Ducal Game is intentionally rounded.

Existing patterns include:

- small controls: smaller radius
- inputs: medium radius
- cards: medium/large radius
- modals: larger radius
- pills: fully rounded
- avatars/icons: circular where appropriate

The existing global baseline remains:

```css
--radius: 18px;
```

Do not convert the whole product to sharp corners.

Do not introduce a radically different radius language on a new page.

Exact radius standardization will happen during shared-component cleanup.

---

# 11. Approved Button Language

Existing button direction is approved.

Base characteristics:

- rounded / pill-like
- bold readable label
- compact icon + text spacing
- clear filled actions
- bordered secondary actions
- touch-friendly sizing

Existing common variants include:

```text
primary
ghost
accent
danger
small
large
full width
```

Future UI should reuse existing button variants before inventing a new style.

Do not create page-specific button colors or shapes without a clear component reason.

---

# 12. Approved Form Language

Existing form direction is approved.

Typical characteristics:

- white background
- subtle border
- rounded corners
- Inter font
- clear focus state
- muted helper text
- readable input sizing

New forms should visually belong to the same system.

---

# 13. Approved Card Language

Cards should generally use:

- white or approved tinted surface
- subtle border
- rounded corners
- restrained shadow
- clear spacing hierarchy

Do not use heavy shadows on every card.

Different functional card types may exist, but they must still feel like one product family.

---

# 14. Shadow Rule

Current direction is approved:

> Use borders for ordinary surfaces. Use stronger shadows mainly for floating or elevated UI.

Appropriate stronger-shadow cases include:

- modal
- floating panel
- player/result card
- device preview
- important elevated action

Do not introduce dramatic shadows across ordinary cards.

---

# 15. Emoji Rule

Emoji may continue to be used for:

- game categories
- playful game contexts
- temporary/category visual recognition
- light expressive UI

Avoid using emoji as decoration everywhere.

Functional product areas should remain cleaner.

Emoji should not become the only way to communicate important meaning.

---

# 16. Gradient Rule

Existing gradients may continue where already established, especially for:

- brand mark
- selected branded elements
- important playful accents

Do not introduce new gradients merely to make a page look different.

Prefer existing palette combinations.

---

# 17. New UI Rule

When AI creates a new screen or component:

1. Search for an existing similar component first.
2. Reuse existing tokens.
3. Reuse existing typography.
4. Reuse existing button styles.
5. Reuse existing card/surface language.
6. Reuse existing spacing patterns where possible.
7. Do not introduce a new font.
8. Do not introduce a new brand color.
9. Do not introduce a new radius language.
10. Do not redesign unrelated components.
11. Do not change shared tokens to solve one page-specific problem.
12. Escalate genuine design-system gaps instead of inventing a solution silently.

---

# 18. AI Design Constraint

Before proposing UI, an AI design assistant must treat this document as a hard design constraint.

Allowed:

```text
Create a new layout using the existing design language.
Improve hierarchy.
Improve spacing.
Improve responsive behavior.
Reuse existing components.
Propose a new component when necessary.
```

Not allowed without approval:

```text
Change primary brand color.
Change fonts.
Introduce a different visual theme.
Replace the rounded design language.
Change the whole button system.
Create a new palette for one page.
Redesign unrelated screens.
```

---

# 19. Existing UI Problems

The fact that this foundation is approved does not mean every current screen is perfect.

Current pages may still contain:

- inconsistent spacing
- inconsistent typography sizes
- duplicated component styles
- weak Tablet behavior
- layout issues
- incorrect content hierarchy
- old product logic
- page-specific design mistakes

These should be fixed separately.

Rule:

> Fix the page while preserving the approved Ducal Game visual foundation unless a global design-system change is explicitly approved.

---

# 20. Relationship to Product Master

The Product Master defines:

- what Ducal Game is
- product rules
- flows
- game architecture
- platform principles

This Design Foundation defines:

- how Ducal Game should visually feel
- which visual language must remain consistent

Both must be followed.

---

# 21. Next Step

The next design-system document should define:

```text
RESPONSIVE FOUNDATION
```

including:

- Mobile
- Tablet
- Desktop
- approved reference widths
- layout behavior
- navigation behavior
- modal / bottom-sheet behavior
- page gutters
- content widths
- responsive component rules

The responsive document must preserve the current visual identity while fixing the current architecture gap.
