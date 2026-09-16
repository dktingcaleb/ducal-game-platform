# Ducal Game — Master Gap Analysis

Version: 0.1  
Status: Review document  
Compared sources:

1. DUCAL GAME V1.7 Master Specification — Chinese
2. DUCAL GAME V1.7 Master Specification — English
3. Current responsive UI prototype
4. Current UI reverse-engineering documents

---

# 1. Purpose

This document compares the V1.7 Master Specification with the current implemented UI prototype.

It does **not** automatically declare either source correct.

The goal is to identify:

- what is already aligned
- what exists in the Master but is missing from the UI
- what exists in the UI but is missing from the Master
- what conflicts
- what is outdated
- what needs an explicit product/design decision

The output of this process will become the basis for a new approved Master Design System.

---

# 2. Source Status

## V1.7 Master Specification

The current V1.7 document describes itself as:

> Single Source of Truth

but its document status is:

> Draft for Review

Therefore, for this UI reverse-engineering process it should be treated as:

**PRODUCT MASTER INPUT — NOT YET FINAL UI DESIGN MASTER**

It remains highly important for product principles, game rules, user flows, and platform direction.

It is not yet detailed enough to serve as a complete UI design system.

---

## Current UI Prototype

The current HTML prototype should be treated as:

**CURRENT IMPLEMENTATION / VISUAL REFERENCE**

It proves what has actually been designed and implemented in the prototype.

However:

> Existing UI does not automatically mean Approved Master Design.

Some current choices may be outdated, inconsistent, incomplete, or contrary to the product Master.

---

# 3. Working Rule

When Master and current UI differ:

```text
Master
   ↘
    REVIEW → EXPLICIT DECISION → APPROVED MASTER V2
   ↗
Current UI
```

Do not silently prefer either one.

---

# 4. Status Labels

Use these labels throughout the review.

### ALIGNED
Master and current UI follow the same principle.

### MASTER GAP
Master defines a requirement that is not sufficiently implemented or documented in the UI.

### UI GAP
Current UI contains a real design decision that is not documented in the Master.

### CONFLICT
Master and current UI currently point in different directions.

### NEEDS REVIEW
The relationship is ambiguous or requires visual/product judgment.

### APPROVED
Explicitly accepted by the product owner for Master V2.

### REPLACE
Explicitly approved to be changed or removed.

---

# 5. Executive Findings

The current project does **not** have one complete UI Master yet.

Instead, it currently has:

```text
V1.7 Product Master
+
Current UI implementation
+
Undocumented visual decisions
+
Incomplete responsive system
```

The main gaps are:

1. Brand system is specified only at a principle level.
2. Current color system is more developed than the Master.
3. Current typography is more developed than the Master.
4. Spacing is not standardized.
5. Radius hierarchy is not standardized.
6. Shadow hierarchy is not standardized.
7. Master says Mobile-first.
8. Current prototype is structurally closer to Desktop-first with a compact/mobile override.
9. Tablet is shown as a device target but does not yet have its own layout layer.
10. Homepage intent needs to be rechecked against the Master.
11. Category naming / Psychology vs Personality requires normalization.
12. Shared component rules are not formally owned.
13. Accessibility principles exist in Master but are not yet systematically enforced.
14. Page-level design decisions are not formally documented.
15. Current prototype mixes design, markup, interactions, and game logic.

---

# 6. Brand System

## Master says

V1.7 should establish a Mini Brand Kit including:

- Logo
- Logo Icon
- Favicon
- Primary Color
- Secondary Color
- Neutral Colors
- Typography
- Button Style
- Card Style
- Result Card Style
- Share Card Style

## Current UI

The prototype has already made concrete choices such as:

```text
Primary purple
Pink accent
Mint success color
Warm yellow
Soft purple backgrounds
Baloo 2
Inter
Pill buttons
Rounded cards
Subtle purple-gray borders
```

## Status

**UI GAP**

The UI has advanced further than the Master documentation.

## Decision required

Do not copy all existing UI values blindly into Master V2.

Audit and explicitly approve:

- brand palette
- semantic colors
- typography
- button language
- card language
- result cards
- share cards

---

# 7. Logo

## Master says

Logo direction should be:

- simple
- recognizable
- small-size friendly
- global
- not childish
- not esports-heavy

Possible ideas include:

- D
- DG
- play symbol
- simple game tile
- subtle crown / Ducal element

Mascot is not required yet.

## Current UI

The prototype currently uses a simple `D` inside a rounded gradient square as a placeholder/working mark.

## Status

**NEEDS REVIEW**

This is directionally compatible with the Master but should not yet be treated as the final approved logo.

## Decision required

Eventually distinguish:

```text
Working UI mark
vs
Approved Ducal Game logo
```

---

# 8. Color System

## Master says

Define:

- Primary Color
- Secondary Color
- Neutral Colors

No exact values are specified.

## Current UI

Current variables include:

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
```

There are also many direct hard-coded colors.

## Status

**UI GAP / NEEDS REVIEW**

## Decision required

Create a permanent semantic system only after review.

Possible future groups:

```text
Brand
Accent
Success
Warning
Danger

Text Primary
Text Secondary
Text Disabled

Surface Base
Surface Raised
Surface Subtle
Surface Selected

Border Default
Border Strong
Border Focus
```

Do not finalize names or values yet.

---

# 9. Typography

## Master says

Typography belongs in the Mini Brand Kit.

No actual font system or size hierarchy is defined.

## Current UI

Current fonts:

```text
Baloo 2
Inter
```

Many individual font sizes are used.

## Status

**UI GAP**

## Decision required

Review whether to approve:

```text
Baloo 2 = display / playful headings
Inter = interface / body
```

Then define an official scale for:

- Display
- H1
- H2
- H3
- Section title
- Card title
- Body
- Small body
- Label
- Caption
- Button
- Numeric / result display

---

# 10. Product Visual Personality

## Master says

Ducal Game should feel:

- Playful
- Smart
- Clean
- Friendly
- Modern
- Global
- Lightweight

Avoid:

- excessively childish styling
- heavy esports styling
- complex social-network feeling
- excessive animation
- unnecessary visual weight

## Current UI

The current UI is generally:

- rounded
- friendly
- purple-led
- colorful
- card-based
- soft
- lightly playful

## Status

**GENERALLY ALIGNED**

## Review concern

Some emoji-heavy areas, strong gradients, and game-specific decoration should be reviewed page by page to ensure the product does not drift too far toward childish styling.

No immediate global redesign is required.

---

# 11. Mobile-First Principle

## Master says

Mobile is the primary design target.

Desktop and Tablet should adapt from the same Information Architecture.

Mobile review explicitly includes:

- Touch Target
- Button Size
- Answer Cards
- Navigation
- Modal
- Keyboard
- Safe Area
- Font Size
- Spacing
- Result Page
- Share Flow

## Current UI

The prototype exposes three preview targets:

```text
Desktop 1280
Tablet 834
Mobile 390
```

but the implementation uses one major compact breakpoint:

```css
@container (max-width: 700px)
```

Therefore:

```text
1280 → desktop layout
834  → mostly desktop layout
390  → compact/mobile layout
```

## Status

**CONFLICT — HIGH PRIORITY**

Master philosophy:

```text
Mobile-first
```

Current implementation architecture:

```text
Desktop/default
+
mobile override
```

## Decision required

Master V2 must formally define the responsive system.

Do not rewrite it yet.

---

# 12. Tablet

## Master says

Tablet should adapt from the same Information Architecture.

No actual Tablet layout rules or breakpoints are provided.

## Current UI

834px exists as a preview width.

However it currently has no dedicated Tablet layer.

## Status

**MASTER GAP + UI GAP — HIGH PRIORITY**

## Decision required

Define:

- Tablet range
- Tablet max content width
- Tablet gutters
- Sidebar behavior
- navigation behavior
- card columns
- tables
- modals
- forms
- editor/workbench
- Player width

This must happen during responsive Master design, not during initial code extraction.

---

# 13. Mobile Navigation

## Master says

Navigation must be checked for Mobile-first UX.

## Current UI

Different areas already use different mobile patterns:

- Marketing: hamburger navigation
- Creator application: slim top bar + bottom navigation
- Settings: drill-down list
- Workbench: horizontal outline/navigation
- Player: compact centered card flow

## Status

**UI GAP / GENERALLY GOOD DIRECTION**

The Master does not document these concrete patterns.

## Decision required

Master V2 should specify navigation by context instead of forcing one navigation pattern everywhere.

---

# 14. Modal Behavior

## Master says

Modal behavior is specifically part of Mobile-first review.

## Current UI

Some desktop modals convert to bottom sheets on compact screens.

Examples:

- How It Works
- Share Result

## Status

**ALIGNED / UI GAP**

This is a valuable implementation decision that should probably become an approved responsive component rule after review.

---

# 15. Accessibility

## Master says

Reusable components should support:

- Semantic HTML
- Keyboard Navigation
- Visible Focus
- Accessible Labels
- Sufficient Contrast
- Large Tap Targets
- Screen Reader Support
- Errors not communicated only through color
- Correct / Incorrect not communicated only through color

## Current UI

The visual prototype demonstrates some focus/interaction states, but accessibility is not yet systematically documented or validated.

Many interactions use:

- clickable `div`
- clickable `span`
- inline `onclick`
- emoji icons without a formal accessibility model

## Status

**MASTER GAP — HIGH PRIORITY FOR PRODUCTION**

## Decision required

Accessibility must become a requirement of shared production components.

Do not attempt to fix every prototype element during visual extraction.

---

# 16. Performance

## Master says

The experience should prioritize:

> Open → Play Quickly

and avoid:

- large JS bundle
- heavy third-party libraries
- unnecessary animation
- blocking requests
- oversized images
- unnecessary API calls
- heavy ad loading before gameplay

## Current UI

The current prototype is a single large HTML file with large CSS and JavaScript blocks.

This is acceptable as a design prototype but not an ideal production architecture.

## Status

**NEEDS STRUCTURAL REFACTOR**

## Decision required

Production implementation should keep the visual behavior while separating functionality and minimizing shipped code.

---

# 17. Homepage Product Intent

## Master says

Do not rebuild the current Homepage from scratch.

Preserve the social Quiz idea:

> See how well your friends really know you

Homepage must clearly support two intents:

```text
Create
→ Create a Quiz

Play
→ Play Games
```

Recommended Hero:

```text
Primary: Create a Quiz
Secondary: Play Games
```

## Current UI

The current Homepage contains:

- top-level Games navigation
- one top CTA labelled “开始游戏”
- dynamic Hero content
- a single dynamic Hero CTA per slide
- category blocks
- creation-focused “steps” content

## Status

**NEEDS REVIEW / POSSIBLE PRODUCT-UI DRIFT**

## Decision required

We need to inspect the actual Hero slide content and decide:

1. Should the Home hero permanently expose both Create and Play?
2. Should one CTA remain contextual per Hero slide?
3. Does the current carousel help or dilute the main positioning?
4. Should the core Quiz positioning remain dominant?

Do not redesign until this decision is made.

---

# 18. Homepage Structure

## Current UI

The current Homepage also includes:

- marketing navigation
- Hero
- mini game visual
- process/steps
- categories
- footer
- cookie banner

## Status

**NOT FULLY DEFINED IN MASTER**

## Decision required

Master V2 should distinguish:

```text
Product requirements
vs
Approved Homepage layout
```

The product Master should not need to describe every pixel.

A page-specific approved design document should own detailed Homepage UI.

---

# 19. Games Discovery Page

## Master says

Games Page should feel like:

> a game discovery experience

Avoid developer/database language.

Recommended copy direction:

> Pick a game. Start playing.  
> No sign-up. No download.

Game Card may show:

- Title
- Short Description
- Estimated Time
- Questions
- Play CTA

## Current UI

The page currently uses:

- game category filters
- game list cards
- title
- category/source description
- play count
- card click behavior

Current intro copy explains:

- Platform Games can be played directly
- creator quizzes require a private link

## Status

**PARTIALLY ALIGNED**

## Gaps

The current Game cards do not visibly include all suggested discovery information such as:

- estimated time
- question count
- explicit Play CTA

The current page also exposes “平台题库” language, which may feel somewhat implementation-oriented.

## Decision required

Review Games Page UX separately before production.

---

# 20. Play Count

## Master says

Do not show:

```text
0 plays
1 play
2 plays
```

Only show meaningful counts.

Do not fabricate social proof.

Demo numbers must be clearly demo/mock or removed.

## Current UI

Public game gallery uses numbers such as:

```text
890
1,780
2,340
3,400
5,120
6,920
```

Creator/private management can also contain zero values for internal analytics.

## Status

**MOSTLY ALIGNED CONCEPTUALLY**

Important distinction:

```text
Public social proof
≠
Creator private analytics
```

A Creator dashboard may legitimately show `0 plays`.

The public discovery page should follow the Master social-proof rule.

## Decision required

Ensure mock public counts never enter production as real data.

---

# 21. Category Architecture

## Master says

Current planned Categories include:

- Quiz
- Math
- Psychology
- IQ
- Idioms

It explicitly says:

> Personality Test belongs under Psychology and should not become a duplicate top-level Category.

## Current UI

Current UI concepts include:

```text
Quiz
Math
IQ
Idioms
Personality / 心理测试
```

The public gallery filter uses a `personality` category identifier.

## Status

**CONFLICT — HIGH PRIORITY**

## Decision required

Normalize the architecture before production.

Recommended review question:

```text
Top-level category:
Psychology

Game type:
Personality Test
Connection Test
etc.
```

Do not let frontend naming silently create a second product taxonomy.

---

# 22. Creator Flow

## Master says

Creator should experience:

```text
Choose Game Type
↓
System Loads Template
↓
Create / Customize
↓
Preview
↓
Publish
↓
Share
```

Creation should feel extremely simple.

## Current UI

The prototype includes:

- Category Select
- Game Type Select
- Game Type Intro
- Creator Name
- Workbench
- Preview
- Publish/manage behaviors

## Status

**GENERALLY ALIGNED**

## Review concern

The number of intermediate screens should be evaluated against the “extremely simple” principle.

Do not automatically remove screens: some may reduce cognitive load.

---

# 23. Player Experience

## Master says

Baseline:

```text
One Question Per Screen
Single Choice
Question X of Y
Fast
Easy to Understand
Touch-friendly
Mobile-first
```

## Current UI

Player architecture follows one-question-per-screen and answer-card patterns across Quiz / IQ / Math / Connection.

## Status

**GENERALLY ALIGNED**

## Gap

Player has evolved into a major subsystem, but the Master does not contain a formal reusable Player component system.

Master V2 / design documentation should define:

- Player shell
- progress
- question card
- answer card
- timer
- result structure
- share/challenge actions
- game-specific extensions

---

# 24. Result Page

## Master says

Result Page must not be a dead end.

Primary actions may include:

- Challenge a Friend
- Share Result

Secondary may include:

- Play Again
- Try Another Game
- Beat Your Best
- Back to Games

## Current UI

Multiple result variants already exist for:

- Quiz
- IQ
- Math
- Connection
- Connection Match

## Status

**ALIGNED IN DIRECTION / NEEDS COMPONENT AUDIT**

The UI is more advanced than the Master documentation here.

Result design should become a reusable system with game-specific variants.

---

# 25. Share Card

## Master says

Share Card Style belongs in the Mini Brand Kit.

## Current UI

The prototype already contains a reusable share-card visual pattern and modal.

## Status

**UI GAP**

This should be audited and, if approved, documented as an official brand component.

---

# 26. Buttons

## Master says

Button Style should belong to the Mini Brand Kit.

## Current UI

Current variants include:

- primary
- ghost
- accent
- danger
- small
- large
- full width

## Status

**UI GAP / STRONG CANDIDATE FOR APPROVAL**

Before approval review:

- size scale
- semantic meaning
- primary vs accent hierarchy
- hover
- focus
- disabled
- loading
- mobile behavior

---

# 27. Cards

## Master says

Card Style, Result Card Style, and Share Card Style should be defined.

## Current UI

Many card types exist:

- KPI
- category
- game
- gallery
- history
- notification
- info
- leaderboard
- modal
- player
- result
- share preview

## Status

**UI GAP / NEEDS TAXONOMY**

Do not create one universal `.card` that forces all cards into the same structure.

First classify card families.

---

# 28. Spacing

## Master

No formal spacing scale.

## Current UI

Many one-off spacing values.

## Status

**BOTH SOURCES INCOMPLETE**

Master V2 needs an approved spacing system after visual audit.

---

# 29. Radius

## Master

No formal radius hierarchy.

## Current UI

Strong rounded identity, but many radius values.

## Status

**BOTH SOURCES INCOMPLETE**

Master V2 should define a small intentional hierarchy.

---

# 30. Shadow

## Master

No formal shadow system.

## Current UI

Shadows are used selectively.

## Status

**BOTH SOURCES INCOMPLETE**

Potential principle worth preserving:

> Borders for normal surfaces; shadows for elevation and floating UI.

Requires approval.

---

# 31. Forms

## Master

No detailed visual form specification.

## Current UI

Several patterns exist across:

- Auth
- Settings
- Creator
- Contact
- Report

## Status

**UI GAP / NEEDS COMPONENT AUDIT**

A formal field system should eventually define:

- label
- input
- textarea
- select
- helper
- error
- disabled
- focus
- OTP
- checkbox
- toggle

---

# 32. Responsive Component Behavior

## Master

Only provides Mobile-first principles.

## Current UI

Already contains component-specific changes such as:

- modal → bottom sheet
- sidebar → top bar + bottom nav
- settings → drill-down
- Workbench → stacked mode
- table → horizontal scroll
- cards → fewer columns

## Status

**UI GAP / VALUABLE IMPLEMENTATION KNOWLEDGE**

This should be documented rather than lost during refactor.

---

# 33. Inline Styling

## Current UI

Many elements use inline `style=""`.

## Master

No implementation rule.

## Status

**STRUCTURAL DEBT, NOT A DESIGN DECISION**

Do not bulk-remove during initial extraction.

Later classify into:

- dynamic
- state-driven
- page-specific
- reusable
- obsolete

---

# 34. Inline JavaScript Events

## Current UI

Many inline `onclick` handlers.

## Master

No implementation rule.

## Status

**STRUCTURAL DEBT**

This belongs to production architecture refactoring, not Master visual design.

---

# 35. Current Highest-Priority Decisions

Before creating Master Design System V2, review in this order:

## Decision 1 — Design Authority

Confirm:

```text
Product Master
= product rules and product principles

Master Design System
= approved visual/system rules

Page Specs
= approved page-level behavior/layout
```

These should work together rather than forcing one giant document to own every detail.

---

## Decision 2 — Brand

Approve or revise:

- Purple primary
- Pink accent
- Mint success
- Yellow highlight
- Baloo 2
- Inter
- soft rounded visual language

---

## Decision 3 — Responsive Philosophy

Confirm:

```text
Mobile-first
+
Tablet
+
Desktop
```

and define actual responsive ranges.

---

## Decision 4 — Product Taxonomy

Resolve:

```text
Psychology
vs
Personality
```

before UI component names and routes become permanent.

---

## Decision 5 — Homepage

Decide:

- core message
- Create vs Play hierarchy
- whether carousel remains
- CTA structure
- discovery sections

---

## Decision 6 — Core Components

Approve:

- Buttons
- Fields
- Cards
- Navigation
- Modal
- Bottom Sheet
- Tabs
- Pills
- Empty States

---

# 36. Recommended Documentation Architecture

Instead of one enormous Master containing every UI pixel:

```text
docs/
│
├── product/
│   └── MASTER-SPEC-V1.7.md
│
├── audit/
│   ├── CURRENT-UI-AUDIT.md
│   └── MASTER-GAP-ANALYSIS.md
│
├── design-system/
│   ├── MASTER-DESIGN-SYSTEM.md
│   ├── COLORS.md
│   ├── TYPOGRAPHY.md
│   ├── SPACING.md
│   ├── RESPONSIVE.md
│   └── COMPONENTS.md
│
└── pages/
    ├── marketing/
    ├── auth/
    ├── creator/
    ├── editor/
    └── player/
```

This structure lets AI read only the level needed for the task.

---

# 37. Product Master vs Design Master

Recommended long-term rule:

## Product Master owns

- product direction
- game architecture
- categories
- game types
- player rules
- creator rules
- monetization
- sharing
- account behavior
- SEO principles
- accessibility requirements
- performance requirements

## Design Master owns

- colors
- typography
- spacing
- radius
- shadows
- breakpoints
- grids
- buttons
- forms
- cards
- navigation
- modal/sheet behavior
- interaction states
- responsive rules

## Page Spec owns

- page content hierarchy
- page layout
- page-specific components
- CTA hierarchy
- page states
- Desktop / Tablet / Mobile approved behavior

This prevents the Master Specification from becoming impossible to maintain.

---

# 38. Immediate Next Step

Do not refactor code yet.

The next step is:

> **Review and approve the foundation of the new Design Master.**

Start with:

```text
04-BRAND-AND-VISUAL-DECISIONS.md
```

Review only:

1. visual personality
2. primary brand color
3. secondary/accent color
4. semantic colors
5. typography
6. general surface style
7. border/radius/shadow direction

Once these are approved, they can become the first real section of the new Master Design System.

After that:

```text
05-RESPONSIVE-DECISIONS.md
```

Then:

```text
06-CORE-COMPONENT-DECISIONS.md
```

Only after those are approved should structural CSS extraction begin.
