# Ducal Game UI — Design Tokens

Version: 0.1  
Status: Reverse-engineered baseline  
Source of truth: current reference prototype

## 1. Purpose

This document records the visual language already present in the current Ducal Game prototype.

During the reverse-engineering phase:

- Do not redesign these values.
- Do not rename existing CSS variables merely for cleanup.
- Do not replace existing values with a new design system.
- Do not normalize one-off values until their usage has been audited.
- The current rendered prototype remains the visual reference.

The purpose of this document is to make the existing design language explicit so that future AI-assisted design and implementation stays consistent.

---

## 2. Typography

### Font Families

Current fonts:

| Role | Font |
|---|---|
| UI / body / controls | `Inter`, sans-serif |
| Display / headings | `Baloo 2`, sans-serif |

Current global rule:

```css
body {
  font-family: 'Inter', sans-serif;
}

h1,
h2,
h3,
.display {
  font-family: 'Baloo 2', sans-serif;
}
```

### Loaded Font Weights

`Inter`:

- 400
- 500
- 600
- 700
- 800

`Baloo 2`:

- 500
- 600
- 700
- 800

### Observed Font-Size Scale

The current prototype repeatedly uses the following sizes:

```text
9.5px
10px
10.5px
11px
11.5px
12px
12.5px
13px
13.5px
14px
14.5px
15px
16px
17px
18px
19px
20px
21px
22px
24px
26px
28px
32px
36px
38px
40px
```

The most frequently used UI sizes are approximately:

```text
11px
11.5px
12px
12.5px
13px
13.5px
14px
```

Do not collapse these into a new type scale yet.

First audit which sizes belong to:

- metadata
- helper text
- labels
- body text
- controls
- card titles
- section titles
- page titles
- large display/result values

### General Typography Character

The existing system uses:

- `Baloo 2` to create a playful game-platform personality.
- `Inter` for readability and functional UI.
- heavier weights for buttons, navigation, labels, scores, and titles.
- smaller muted text for metadata and secondary information.

---

## 3. Existing Global Color Tokens

These variables already exist in `:root` and must be treated as the current canonical token names during the extraction phase.

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

---

## 4. Color Roles

### Primary Text

| Token | Value | Current role |
|---|---|---|
| `--ink` | `#1B1330` | Primary text / strong foreground |
| `--ink-soft` | `#6B6280` | Secondary text / metadata / muted labels |

### Surfaces

| Token / value | Current role |
|---|---|
| `--bg` `#F6F3FF` | Soft application background / muted surfaces |
| `--card` `#FFFFFF` | Main cards / panels |
| `#FBFAFF` | Secondary panel / sidebar / subtle elevated surface |
| `#EDE7FB` | Outer studio / player-stage background |
| `#F1EEFB` | Browser chrome surface |

### Brand

| Token / value | Current role |
|---|---|
| `--brand` `#6C4CF0` | Primary action / active state / progress |
| `--brand-dark` `#4E31D6` | Strong brand text / selected labels |
| `--brand-tint` `#EEE8FF` | Soft brand backgrounds / selected surfaces |
| `#8A6CF7` | Secondary gradient endpoint used with `--brand` |

Typical brand gradient:

```css
linear-gradient(160deg, var(--brand), #8A6CF7)
```

### Accent

| Token | Value | Current role |
|---|---|---|
| `--accent` | `#FF5D8F` | Pink accent / secondary emphasis |
| `--accent-tint` | `#FFE3EC` | Soft accent surface |

### Positive / Success

| Token / value | Current role |
|---|---|
| `--mint` `#17C3A2` | Success / correct / positive state |
| `--mint-tint` `#DEFBF3` | Soft success surface |
| `#0E8F76` | Dark success text |

### Warm / Highlight

| Token / value | Current role |
|---|---|
| `--sun` `#FFC94D` | Highlight / game action |
| `#FFF3D9` | Soft warm category surface |
| `#FFA53D` | Warm gradient endpoint |
| `#5A3D00` | Dark warm foreground |

### Danger / Error

The current prototype uses several direct danger values that are not yet global tokens:

```text
#E14D63
#C43C52
#FFC9CF
#FFF1F2
#8A2F42
#FF6B6B
#FFECEC
```

These are currently used for combinations of:

- destructive actions
- danger text
- danger borders
- error result states
- warning/destructive surfaces

Do not consolidate them yet. They should be audited before becoming semantic tokens.

### Warning

Observed warning-related values include:

```text
#FFF8E5
#FFE1A8
#8A5A00
#A47A2A
```

They are currently associated with warning/claim-style UI.

### System / Browser Demo Colors

The prototype also contains browser-window demo colors:

```text
#FF6259
#FFBD2E
#28C93F
```

These are presentation/demo chrome colors and should not automatically become product UI tokens.

---

## 5. Border System

Primary border token:

```css
--line: #E7E1F7;
```

Typical usage:

```css
border: 1px solid var(--line);
border: 1.5px solid var(--line);
border-bottom: 1px solid var(--line);
```

The design relies heavily on subtle borders instead of heavy shadows.

Current visual character:

- pale purple-gray borders
- white or near-white surfaces
- rounded containers
- stronger border color only for selected, success, error, or focused states

---

## 6. Radius System

A global token already exists:

```css
--radius: 18px;
```

However, the actual prototype uses a broader radius family.

Frequently observed values:

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

Common patterns:

### Small Controls

Approximately:

```text
7–12px
```

Used for:

- small icons
- compact controls
- answer labels
- small inputs

### Cards / Panels

Approximately:

```text
13–20px
```

Used for:

- cards
- list rows
- category cards
- settings rows
- dashboard blocks

### Large Modals / Player Cards

Approximately:

```text
20–30px
```

Used for:

- modals
- centered player cards
- device mockups
- major containers

### Pills

```css
border-radius: 100px;
```

Used extensively for:

- buttons
- pills
- filters
- navigation chips
- badges

### Circular Elements

```css
border-radius: 50%;
```

Used for:

- avatars
- icon circles
- status dots
- switches
- score/result rings

Do not force every component to use `--radius` during the first extraction pass.

---

## 7. Spacing Language

The current prototype does not yet have formal spacing variables.

Observed recurring `gap` values include:

```text
2px
3px
4px
5px
6px
7px
8px
9px
10px
11px
12px
14px
16px
18px
20px
26px
30px
40px
```

The most common are:

```text
6px
8px
10px
12px
14px
16px
```

Typical visual rhythm:

- micro spacing: `2–6px`
- compact component spacing: `8–10px`
- standard component spacing: `12–16px`
- section spacing: `18–30px`
- major layout spacing: `30–50px+`

At this stage, document the pattern but do not rewrite the entire prototype into a new spacing scale.

---

## 8. Shadow Language

The current design uses shadows selectively.

### Strong Floating Modal

```css
box-shadow:
  0 30px 60px -20px rgba(20,10,60,.45);
```

### Major Player / Center Card

```css
box-shadow:
  0 30px 60px -25px rgba(20,10,60,.3);
```

### Browser / Prototype Frame

```css
box-shadow:
  0 40px 80px -30px rgba(20,10,60,.4),
  0 0 0 1px rgba(20,10,60,.06);
```

### Brand Action

```css
box-shadow:
  0 10px 20px -8px rgba(108,76,240,.5);
```

### Accent Action

```css
box-shadow:
  0 10px 20px -8px rgba(255,93,143,.5);
```

### Danger Action

```css
box-shadow:
  0 10px 20px -8px rgba(225,77,99,.5);
```

### Light Elevation

Several smaller shadows are also used for:

- tabs
- selected items
- avatars
- preview cards
- notification panels

Overall rule:

> Borders define most surfaces. Shadows are primarily reserved for floating UI, important actions, overlays, device previews, and major elevated cards.

---

## 9. Surface Hierarchy

The current prototype roughly follows this surface hierarchy:

```text
Outer / studio background
        ↓
Application background
        ↓
Near-white structural surface
        ↓
White card / panel
        ↓
Tinted selected / semantic surface
        ↓
Floating modal / overlay
```

Common surface values:

```text
#EDE7FB
#F6F3FF
#FBFAFF
#FFFFFF
brand/accent/mint tints
```

This hierarchy should remain consistent when new pages are designed.

---

## 10. Button Language

Existing shared base:

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

Existing major variants:

### Primary

```css
.btn.primary {
  background: var(--brand);
  color: #fff;
}
```

### Ghost

```css
.btn.ghost {
  background: #fff;
  color: var(--ink);
  border: 1.5px solid var(--line);
}
```

### Accent

```css
.btn.accent {
  background: var(--accent);
  color: #fff;
}
```

### Danger

```css
.btn.danger {
  background: #E14D63;
  color: #fff;
}
```

### Small

```css
.btn.sm {
  padding: 8px 13px;
  font-size: 12px;
}
```

### Full Width

```css
.btn.full {
  width: 100%;
  padding: 14px;
  font-size: 14.5px;
  justify-content: center;
}
```

Design character:

- rounded pill shape
- strong weight
- compact icon + text gap
- clear filled primary actions
- white bordered secondary actions

New designs should reuse these patterns unless a new component type has been explicitly approved.

---

## 11. Form Language

Common form characteristics:

- white background
- `1.5px solid var(--line)`
- approximately `12px` radius
- `Inter`
- approximately `13.5px` text
- brand-colored focus border
- muted helper text

Typical pattern:

```css
.field input,
.field textarea {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 11px 14px;
  font-size: 13.5px;
  font-family: 'Inter', sans-serif;
  background: #fff;
  color: var(--ink);
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--brand);
}
```

---

## 12. Interaction / State Language

### Selected / Active

Usually uses one or more of:

```text
--brand
--brand-dark
--brand-tint
```

### Correct / Success

Usually uses:

```text
--mint
--mint-tint
#0E8F76
```

### Accent / Secondary Highlight

Usually uses:

```text
--accent
--accent-tint
```

### Disabled

Current pattern often relies on:

```css
opacity: .4;
cursor: not-allowed;
```

Some components use `.5`.

### Hover

Hover treatment is generally subtle:

- background tint
- border-color change
- foreground color change

Avoid introducing aggressive hover movement or animation unless explicitly approved.

---

## 13. Overlay / Modal Language

The current system repeatedly uses dark translucent purple overlays such as:

```css
background: rgba(20,10,60,.5);
```

or:

```css
background: rgba(20,10,60,.55);
```

Desktop modal characteristics:

- centered
- white surface
- large radius
- strong soft shadow
- constrained width

Mobile behavior may convert some modals into bottom sheets.

That responsive behavior belongs in `02-RESPONSIVE-SYSTEM.md`, not in this file.

---

## 14. Current Visual Identity Summary

Ducal Game currently has a visual language that is:

- playful
- soft
- rounded
- friendly
- game-oriented
- purple-led
- supported by pink, mint, and yellow accents
- highly card-based
- low in harsh contrast outside primary text/actions
- heavily reliant on pills and rounded containers
- visually lightweight through pale backgrounds and subtle borders

The combination of `Baloo 2` + `Inter` is a major part of this identity.

Future AI-generated UI should feel like it belongs to the same product rather than introducing a different design style page by page.

---

## 15. Existing vs. Future Tokens

### Existing Canonical Tokens

The following already exist and may be used immediately:

```text
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

### Observed But Not Yet Canonicalized

The prototype also repeatedly contains direct values for:

- secondary surfaces
- danger/error states
- warning states
- gradient endpoints
- multiple radii
- shadows
- spacing
- typography sizes

These should **not** be converted into new global variables during the first extraction pass.

A later design-system cleanup may introduce semantic tokens only after usage across all page families has been audited.

---

## 16. Rules for AI-Generated New UI

When proposing a new Ducal Game UI:

1. Reuse the existing font families.
2. Reuse existing canonical colors before introducing new colors.
3. Reuse existing button patterns before inventing new button styles.
4. Reuse white / near-white / tint surface hierarchy.
5. Keep corners rounded and consistent with nearby components.
6. Prefer subtle borders to unnecessary shadows.
7. Use strong shadows mainly for floating or important elevated UI.
8. Use `--ink-soft` for secondary information instead of introducing arbitrary gray colors.
9. Use brand, accent, mint, and warm colors according to their current semantic character.
10. Do not create a unique visual language for an individual page.
11. Any genuinely new visual token must be proposed first and approved before entering the implementation.
12. Approval of a page design does not automatically approve a new global design token.

---

## 17. Reverse-Engineering Status

This document describes the current visual baseline.

It does **not** yet define:

- formal responsive breakpoints
- Desktop / Tablet / Mobile component behavior
- complete shared-component ownership
- page-family ownership
- AI file-editing boundaries

Those belong to the next documents:

```text
02-RESPONSIVE-SYSTEM.md
03-SHARED-COMPONENTS.md
04-PAGE-MAP.md
05-AI-CHANGE-RULES.md
```
