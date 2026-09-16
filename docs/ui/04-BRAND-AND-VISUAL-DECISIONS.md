# Ducal Game — Brand & Visual Decisions

Version: 0.1  
Status: DRAFT — DO NOT IMPLEMENT  
Purpose: Decision log for the future Master Design System.

> IMPORTANT:
> Nothing in this file is implementation-ready unless its status is explicitly marked `APPROVED`.
> `PENDING` means discussion only.
> AI coding assistants must not modify production UI based on a PENDING decision.

---

# 1. Source Inputs

This decision log is based on:

- DUCAL GAME V1.7 Master Specification
- Current responsive UI prototype
- Current UI Audit
- Master Gap Analysis

The Product Master defines the desired product personality as:

- Playful
- Smart
- Clean
- Friendly
- Modern
- Global
- Lightweight

It also says to avoid:

- Excessively childish visual design
- Heavy esports styling
- Social-network complexity
- Unnecessary visual weight
- Heavy animation

The current prototype visually uses:

- Purple as the main brand color
- Pink as an accent
- Mint for success/positive states
- Yellow for highlights
- Soft purple / white surfaces
- Rounded cards
- Pill buttons
- Baloo 2 for headings/display
- Inter for interface/body text

---

# 2. Decision 01 — Overall Visual Personality

Status: `PENDING`

## Current Direction

The current visual style is:

- soft
- rounded
- friendly
- playful
- colorful
- card-based
- purple-led

This generally supports the Product Master.

## Risk

If pushed too far, the combination of:

- emoji-heavy UI
- pink/purple gradients
- very rounded components
- playful typography

could become too childish.

## Proposed Direction

Keep the current friendly and playful foundation, but define the target as:

> **Playful + Smart + Clean**

rather than:

> Cute / Childish / Toy-like

### Proposed practical rules

- Keep rounded UI.
- Keep soft surfaces.
- Keep a strong purple brand identity.
- Use bright accents selectively.
- Use emoji primarily for game/category context, not everywhere.
- Avoid excessive decorative gradients.
- Avoid cartoon-like UI chrome unless the game itself requires it.
- Keep functional areas such as Settings, Account, Dashboard, Analytics, and Forms more neutral and clean.
- Let Player/Game screens carry more personality than administrative screens.

## Decision

- [ ] APPROVED
- [ ] REVISE
- [ ] REPLACE

Owner note:

`PENDING`

---

# 3. Decision 02 — Primary Brand Color

Status: `PENDING`

Current prototype:

```css
--brand: #6C4CF0;
--brand-dark: #4E31D6;
--brand-tint: #EEE8FF;
```

Decision not yet made.

---

# 4. Decision 03 — Accent Color

Status: `PENDING`

Current prototype:

```css
--accent: #FF5D8F;
--accent-tint: #FFE3EC;
```

Decision not yet made.

---

# 5. Decision 04 — Success / Positive Color

Status: `PENDING`

Current prototype:

```css
--mint: #17C3A2;
--mint-tint: #DEFBF3;
```

Decision not yet made.

---

# 6. Decision 05 — Warning / Highlight Color

Status: `PENDING`

Current prototype includes:

```css
--sun: #FFC94D;
```

and other warm values.

Decision not yet made.

---

# 7. Decision 06 — Danger / Error Color

Status: `PENDING`

Current prototype uses multiple direct danger/error values.

A unified semantic danger system has not yet been approved.

---

# 8. Decision 07 — Typography

Status: `PENDING`

Current prototype:

```text
Display / headings: Baloo 2
UI / body: Inter
```

Decision not yet made.

---

# 9. Decision 08 — Surface Style

Status: `PENDING`

Current prototype uses:

- white cards
- soft purple application backgrounds
- subtle borders
- tinted selected states

Decision not yet made.

---

# 10. Decision 09 — Radius Direction

Status: `PENDING`

Current prototype is strongly rounded but uses many different radius values.

Decision not yet made.

---

# 11. Decision 10 — Shadow Direction

Status: `PENDING`

Current prototype generally uses:

- borders for ordinary surfaces
- shadows for floating/elevated UI

Decision not yet made.

---

# 12. Approval Rule

Only decisions explicitly marked:

```text
APPROVED
```

may be copied into the future:

```text
MASTER-DESIGN-SYSTEM.md
```

PENDING decisions must never be treated as production requirements.
