# Ducal Game — Page Map & Ownership

Version: 1.0  
Status: APPROVED ARCHITECTURE FOUNDATION  
Purpose: Map the current prototype screens into stable page families so future AI design, CSS, components, and logic can be changed without affecting unrelated parts of the platform.

> IMPORTANT:
> This document maps the current prototype.
> It does not require immediate file splitting.
> Structural extraction should follow this ownership model only after current visual behavior is frozen and verified.

---

# 1. Core Ownership Principle

Every screen belongs to a primary page family.

A page family owns:

- page-specific layout
- page-family components
- page-family responsive behavior
- page-family styles
- page-family interaction logic

Global shared design rules remain outside individual page families.

The goal is:

```text
Global Design System
        ↓
Shared Components
        ↓
Page Family
        ↓
Individual Page
        ↓
Local State / Variant
```

Do not allow an individual page to become the owner of a global rule.

---

# 2. Current Prototype Inventory

The current prototype contains:

```text
32 top-level screen entries
+
16 Player internal states
```

The Player is therefore a subsystem, not one ordinary static page.

---

# 3. Approved Page Families

Use these primary families:

```text
01 Marketing / Public
02 Authentication / Claim
03 Discovery / Creation Entry
04 Creator Application
05 Account / Settings
06 Editor / Challenge
07 Player
08 Legal / System
```

These are ownership groups.

They do not necessarily equal final URL folders one-to-one.

---

# 4. Family 01 — Marketing / Public

Primary purpose:

> Explain Ducal Game, introduce the product, and direct visitors toward creating or playing.

Current screens:

```text
landing
about
contact
```

Related public discovery may visually share Marketing navigation but belongs to Discovery.

## Family-owned UI

Likely shared:

- Marketing Nav
- Mobile Marketing Menu
- Marketing Footer
- Marketing Hero foundations
- Public content sections
- Public CTA treatment

## Styling ownership

Future direction:

```text
styles/marketing.css
```

or equivalent scoped module structure.

## Logic ownership

Examples:

- mobile menu
- Hero/carousel behavior
- Marketing-only CTA interactions

Do not place Creator dashboard logic in this family.

---

# 5. Landing

Current screen ID:

```text
landing
```

Role:

- first-time public homepage
- no required account
- introduces Create / Play paths
- uses Marketing navigation

Primary ownership:

```text
Marketing / Public
```

Page-specific future spec:

```text
pages/marketing/home.md
```

The Homepage can use shared Marketing and Discovery components, but its page composition remains page-local.

---

# 6. About

Current screen ID:

```text
about
```

Primary ownership:

```text
Marketing / Public
```

It currently reuses the same Marketing navigation pattern as the Homepage.

Future changes to About content layout must not automatically redesign the global Marketing navigation.

---

# 7. Contact

Current screen ID:

```text
contact
```

Primary ownership:

```text
Marketing / Public
```

Potential shared dependencies:

- Marketing Nav
- Form Field
- Button
- public content container

Contact form behavior remains page-local unless a global form service/component is later introduced.

---

# 8. Family 02 — Authentication / Claim

Primary purpose:

> Sign in, create an account, recover access, and transition a Guest-created asset into an account.

Current screens:

```text
login
forgot-password
register
claim-success
```

## Family-owned UI

Likely shared:

- Auth Card
- Auth Header
- Auth Form
- Password Field
- Verification / success messaging
- Auth footer/helper links

## Styling ownership

Future direction:

```text
styles/auth.css
```

## Logic ownership

Future direction:

```text
scripts/auth/
```

Authentication behavior must not be mixed with Player game logic.

---

# 9. Login

Current screen ID:

```text
login
```

Ownership:

```text
Authentication / Claim
```

Can reuse:

- Center Card surface
- Form Field
- Button

But Auth-specific validation and login methods remain Auth-family behavior.

---

# 10. Forgot Password

Current screen ID:

```text
forgot-password
```

Ownership:

```text
Authentication / Claim
```

This is a state/flow related to login, but should remain separately addressable.

---

# 11. Register

Current screen ID:

```text
register
```

Ownership:

```text
Authentication / Claim
```

Registration should share Auth foundations rather than creating unique page styling.

---

# 12. Claim Success

Current screen ID:

```text
claim-success
```

Ownership:

```text
Authentication / Claim
```

Product role:

> completion state after Guest → Account / asset claim flow.

It may visually reuse a Center Card or Success pattern.

Do not treat it as a generic Player Result.

---

# 13. Family 03 — Discovery / Creation Entry

Primary purpose:

> Let users discover public games or choose what they want to create/play before entering an editor or Player session.

Current screens:

```text
games
category-select
gametype-select
math-difficulty
gametype-intro
creator-name
```

This family is transitional.

It connects:

```text
Marketing
→ Discovery
→ Creator Editor

or

Marketing
→ Discovery
→ Player
```

---

# 14. Public Games

Current screen ID:

```text
games
```

Purpose:

> public Platform Game discovery.

Ownership:

```text
Discovery / Creation Entry
```

It currently reuses Marketing navigation.

That means:

```text
Navigation ownership = Marketing shared component
Page ownership = Discovery
```

This distinction is intentional.

Future page spec:

```text
pages/discovery/games.md
```

---

# 15. Category Select

Current screen ID:

```text
category-select
```

Purpose:

> choose top-level product Category.

Ownership:

```text
Discovery / Creation Entry
```

Depends on Product Master taxonomy.

Frontend naming must not create categories that conflict with the Product Master.

---

# 16. Game Type Select

Current screen ID:

```text
gametype-select
```

Purpose:

> choose a Game Type inside a Category.

Ownership:

```text
Discovery / Creation Entry
```

Possible reusable components:

- Picker Header
- Game Type Card
- Back action
- availability state

---

# 17. Math Difficulty

Current screen ID:

```text
math-difficulty
```

Purpose:

> Math-specific selection before Player start.

Ownership:

```text
Discovery / Creation Entry
```

Secondary ownership:

```text
Math game family
```

This page should use Discovery foundations but may contain Math-specific options.

Do not make Math-specific logic global.

---

# 18. Game Type Intro

Current screen ID:

```text
gametype-intro
```

Purpose:

> introduce a selected Game Type before create/play.

Ownership:

```text
Discovery / Creation Entry
```

It currently uses focused Player/Center Card visual foundations.

Visual reuse does not mean it belongs to Player logic.

---

# 19. Creator Name

Current screen ID:

```text
creator-name
```

Purpose:

> collect the creator-facing display/name value required by the creation flow.

Ownership:

```text
Discovery / Creation Entry
```

It is the transition point immediately before Editor.

Do not move it into Account solely because it contains a name field.

---

# 20. Family 04 — Creator Application

Primary purpose:

> Registered Creator/application management environment.

Current screens:

```text
dashboard
library
analytics
detail
```

Shared shell:

```text
app-shell
sidebar
main content
notification UI
mobile application navigation
```

## Styling ownership

Future direction:

```text
styles/creator.css
```

## Component ownership

Examples:

- Creator App Shell
- Creator Sidebar
- Creator Mobile Bottom Nav
- Page Header
- KPI Card
- Management Table
- Game Management Card
- Notification Bell / Panel where shell-level

## Logic ownership

Future direction:

```text
scripts/creator/
```

---

# 21. Dashboard

Current screen ID:

```text
dashboard
```

Ownership:

```text
Creator Application
```

Likely page-local:

- dashboard composition
- KPI arrangement
- dashboard category summary
- recent game data

Likely shared:

- app shell
- sidebar
- KPI card foundation
- table foundation
- buttons

---

# 22. Library / My Games

Current screen ID:

```text
library
```

Prototype label:

```text
我的 Game（多类型管理）
```

Ownership:

```text
Creator Application
```

This is not the same product page as public `games`.

Important route issue:

```text
Public games screen:
ducalgame.com/games

Creator library prototype:
ducalgame.com/games
```

Both currently use the same illustrative address in the prototype.

## Status

```text
ROUTE DECISION REQUIRED
```

Before production routing is finalized, choose distinct route ownership.

Examples to evaluate later:

```text
/games
/my-games
```

or another explicitly approved routing model.

Do not silently resolve this during code extraction.

---

# 23. Analytics

Current screen ID:

```text
analytics
```

Ownership:

```text
Creator Application
```

Analytics may introduce future family-specific data visualization components.

Do not make a chart pattern globally shared until multiple contexts genuinely use it.

---

# 24. Game Management Detail

Current screen ID:

```text
detail
```

Ownership:

```text
Creator Application
```

Current internal sections include patterns such as:

- Overview
- Results
- Questions
- Links / permissions

This page is an entity-management page.

Its internal tabs belong to the Game Detail page/family rather than global application navigation.

---

# 25. Family 05 — Account / Settings

Primary purpose:

> Manage the user's identity, history, notifications, settings, and account preferences.

Current screens:

```text
profile
play-history
notifications
history-detail
settings
```

These screens currently live inside or near the Creator application shell.

However, they form a distinct functional family because they concern the user/account rather than Game management.

---

# 26. Profile

Current screen ID:

```text
profile
```

Ownership:

```text
Account / Settings
```

May reuse Creator App Shell navigation when the user is logged in.

Page content remains Account-owned.

---

# 27. Play History

Current screen ID:

```text
play-history
```

Ownership:

```text
Account / Settings
```

Purpose:

> user's previously played games / attempts.

Do not confuse with Creator Game analytics.

---

# 28. Notifications

Current screen ID:

```text
notifications
```

Ownership:

```text
Account / Settings
```

The notification bell/panel may be shell-level Creator/Application shared UI.

The full Notification Center page is Account-owned.

---

# 29. History Detail

Current screen ID:

```text
history-detail
```

Ownership:

```text
Account / Settings
```

Purpose:

> detail for an individual play record / attempt history entry.

It may reuse Player Result visual components where appropriate, but should not become part of active Player state logic.

---

# 30. Settings

Current screen ID:

```text
settings
```

Ownership:

```text
Account / Settings
```

Current responsive pattern:

```text
Desktop:
Settings navigation + content

Mobile:
Settings list → drill-down panel
```

This family should own:

- Settings Nav
- Settings Mobile List
- Settings Panel
- Settings Identity
- Action Rows
- account danger section

---

# 31. Family 06 — Editor / Challenge

Primary purpose:

> Create, edit, preview, publish, or construct user-created game content.

Current top-level screens:

```text
workbench
workbench-locked
challenge
challenge-preview-all
challenge-share
```

Important:

`workbench-locked` is not a completely separate underlying editor architecture.

The current prototype uses the same Workbench screen with different state behavior.

---

# 32. Workbench

Current screen ID:

```text
workbench
```

Ownership:

```text
Editor / Challenge
```

Primary component family:

- Workbench Shell
- Question Outline
- Editor Panel
- Preview Panel
- Editor Footer
- Question/Answer editing components

---

# 33. Workbench Locked

Prototype screen ID:

```text
workbench-locked
```

Ownership:

```text
Editor / Challenge
```

Architecture rule:

> Treat Locked as a Workbench mode/state before assuming it needs a separate page implementation.

The prototype navigation maps both Workbench entries back to the same underlying Workbench screen and changes the state.

Future implementation may use:

```text
Workbench
+
mode/state
```

rather than duplicated UI.

---

# 34. Challenge Editor

Current screen ID:

```text
challenge
```

Purpose:

> reverse challenge / user creates their own questions after a result flow.

Ownership:

```text
Editor / Challenge
```

The current prototype explicitly reuses the Workbench shell/editor pattern.

Therefore:

```text
Challenge
should reuse Editor family components
```

rather than maintaining a second independent editor design.

---

# 35. Challenge Preview All

Current screen ID:

```text
challenge-preview-all
```

Ownership:

```text
Editor / Challenge
```

Purpose:

> preview the reverse-challenge content before sending/publishing.

May reuse:

- Editor Preview components
- Player-style question presentation

but remains Editor flow ownership.

---

# 36. Challenge Share

Current screen ID:

```text
challenge-share
```

Ownership:

```text
Editor / Challenge
```

Purpose:

> completion/send/share stage of challenge creation.

Can reuse Global Share components.

Do not move share mechanics into Editor-only code if the same Share foundation is used by Player.

---

# 37. Family 07 — Player

Primary purpose:

> Active public gameplay and results.

Top-level screen:

```text
player
```

But `player` contains many internal states.

Therefore:

> Player must be treated as a subsystem.

## Styling ownership

Future direction:

```text
styles/player.css
```

## Logic ownership

Future direction:

```text
scripts/player/
```

with game-specific modules beneath it.

---

# 38. Current Player Internal States

Current prototype states:

```text
landing
landing-iq
player-name
question
question-iq
result
result-iq
landing-connection
question-connection
result-connection
connection-invite
result-connection-match
connection-shared-view
landing-math
question-math
result-math
```

These should not become 16 unrelated top-level page systems.

---

# 39. Player Core State Families

The current states can be normalized conceptually into:

```text
Landing
Player Identity
Question
Feedback / progression
Result
Share / Invite / Challenge
Shared Result View
```

with game-specific variants layered on top.

---

# 40. Quiz Player

Current states include:

```text
landing
player-name
question
result
```

Ownership:

```text
Player
└── Quiz
```

---

# 41. IQ Player

Current states include:

```text
landing-iq
question-iq
result-iq
```

Ownership:

```text
Player
└── IQ
```

IQ should reuse Player shell/components.

Only IQ-specific content/result logic should live in the IQ module.

---

# 42. Math Player

Current states:

```text
landing-math
question-math
result-math
```

Ownership:

```text
Player
└── Math
```

Math-specific logic includes:

- generated/selected math questions
- difficulty
- timer where applicable
- Math result logic

These must not be placed in Global UI logic.

---

# 43. Connection Player

Current states:

```text
landing-connection
question-connection
result-connection
connection-invite
result-connection-match
connection-shared-view
```

Ownership:

```text
Player
└── Connection
```

This game type contains more social/result states than the simpler Player flows.

Its special components may include:

- dimension bars
- insight cards
- invite flow
- two-person match result
- shared comparison view

These remain Player-family extensions.

---

# 44. Player Shared vs Game-Specific

Future architecture should follow:

```text
Player Shell
├── shared Progress
├── shared Question
├── shared Answer Option
├── shared Result foundations
├── shared Player Actions
│
├── Quiz extension
├── IQ extension
├── Math extension
└── Connection extension
```

Do not create four fully independent Player design systems.

---

# 45. Family 08 — Legal / System

Primary purpose:

> Public legal documents, reporting, and non-happy-path system states.

Current screens:

```text
report
legal
link-expired
game-offline
not-found
```

Some of these use Marketing/public visual language.

They should still have separate ownership because they represent legal/system states rather than marketing content.

---

# 46. Report

Current screen ID:

```text
report
```

Ownership:

```text
Legal / System
```

Can reuse:

- Form Field
- Button
- public content shell

Report behavior, validation, and submission remain System/Trust logic.

---

# 47. Legal

Current screen ID:

```text
legal
```

Prototype represents a template for:

- Privacy
- Terms
- Cookies
- Community
- Copyright / DMCA
- related documents

Ownership:

```text
Legal / System
```

Legal documents may share one layout/template.

Their content should not be hard-coded as one universal document body.

---

# 48. Link Expired

Current screen ID:

```text
link-expired
```

Ownership:

```text
Legal / System
```

More specifically:

```text
System State
```

Can reuse Center Card and Button foundations.

Do not create a new global design system for error/system states.

---

# 49. Game Offline

Current screen ID:

```text
game-offline
```

Ownership:

```text
Legal / System
```

More specifically:

```text
Public Game System State
```

It may occur at the same public Game URL when availability/status changes.

This is a state of accessing a game, not a new Game Type.

---

# 50. Not Found

Current screen ID:

```text
not-found
```

Ownership:

```text
Legal / System
```

More specifically:

```text
404 System State
```

It should remain lightweight and provide a useful next action.

---

# 51. Cross-Family Shared Navigation

Navigation must be owned by context.

## Marketing navigation

Used by:

- landing
- games
- about
- contact

Ownership:

```text
Marketing shared component
```

Even when `games` belongs to Discovery.

## Creator/App navigation

Used by logged-in application pages such as:

- dashboard
- library
- analytics
- detail
- profile
- history
- notifications
- settings

Ownership:

```text
Creator/Application Shell
```

Account pages may consume this shell without owning it.

## Player navigation

Active Player generally avoids full application navigation.

Ownership:

```text
Player
```

---

# 52. Cross-Family Shared Components

Examples:

```text
Button
Form Field
Pill
Toggle
Overlay foundation
Confirmation
Empty State
Icon Button
```

Ownership:

```text
Global Shared
```

Page families consume them.

Page families must not fork these components casually.

---

# 53. Shared Surface Without Shared Business Logic

Two screens may reuse the same visual component without sharing business logic.

Example:

```text
Auth Center Card
Game Type Intro Center Card
System Error Center Card
Player Card
```

They may share surface styling.

They do not need one giant state machine.

This distinction should be preserved during refactoring.

---

# 54. Proposed Future Style Ownership

Recommended direction:

```text
styles/
├── tokens.css
├── base.css
├── components.css
├── responsive-foundation.css
│
├── marketing.css
├── auth.css
├── discovery.css
├── creator.css
├── account.css
├── editor.css
├── player.css
└── system.css
```

This is a target architecture, not an immediate instruction to create all files.

During the first extraction, fewer grouped files may be safer.

---

# 55. Proposed Future Logic Ownership

Recommended direction:

```text
scripts/
├── core/
│   ├── navigation.js
│   ├── ui-state.js
│   └── responsive-preview.js   # prototype only if retained
│
├── marketing/
├── auth/
├── discovery/
├── creator/
├── account/
├── editor/
└── player/
    ├── core/
    ├── quiz/
    ├── iq/
    ├── math/
    └── connection/
```

Again:

> Do not perform this entire split in one refactor.

---

# 56. Prototype-Only Code

The current giant HTML contains development/demo UI such as:

- screen navigation strip
- sub-navigation for Player states
- device preview toggle
- browser chrome
- demo state controls

These are not automatically production components.

They should eventually be separated conceptually into:

```text
Prototype / Design Review Harness
```

rather than production application UI.

---

# 57. Route Ownership Issues to Resolve Later

Current prototype routes are illustrative and not all production-safe.

Known issue:

```text
games
→ ducalgame.com/games

library / My Games
→ ducalgame.com/games
```

This route collision must be explicitly resolved.

Other routes should also be audited when production routing is designed.

Do not treat prototype address-bar strings as final routing contracts.

---

# 58. Page Spec Rule

Every production-significant page should eventually have a page specification containing:

```text
Purpose
Primary user
Entry points
Exit paths
Primary CTA
Secondary actions
States
Components used
Page-family ownership
Desktop layout
Tablet layout
Mobile layout
Empty state
Error state
Loading state where required
Accessibility notes
```

This allows AI to redesign one page without reading the entire codebase.

---

# 59. AI Design Scope Rule

When the user asks:

> Redesign Dashboard

AI should primarily read:

```text
Design Foundation
Responsive Foundation
Shared Component Foundation
Creator family rules
Dashboard page spec
```

It should not redesign:

```text
Player
Marketing
Auth
Settings
```

unless the requested Dashboard change genuinely requires a shared-system change.

---

# 60. AI Coding Scope Rule

Before implementation, AI must declare scope.

Example:

```text
Target family:
Creator

Target page:
Dashboard

Files/components to modify:
...

Shared components touched:
...

Potentially affected screens:
...

Viewports:
390 / 834 / 1280
```

Then implement only the approved scope.

---

# 61. Cross-Family Change Rule

If a requested page change requires altering:

```text
Button
Global token
Responsive breakpoint
App Shell
Global Player component
```

the AI must flag that the change has cross-family impact before implementation.

Do not silently make the broader change.

---

# 62. Recommended Extraction Order

Do not split by random screen order.

Recommended safe order:

```text
Stage 1
Prototype harness vs product UI

Stage 2
Global tokens/base/shared components

Stage 3
Marketing / Public + Legal/System

Stage 4
Auth

Stage 5
Creator Application + Account shell

Stage 6
Discovery / Creation Entry

Stage 7
Editor / Challenge

Stage 8
Player shell

Stage 9
Player game-specific logic

Stage 10
True Tablet responsive improvements
```

At every stage:

```text
extract
→ verify visual parity
→ verify behavior
→ commit
```

Do not mix stages unnecessarily.

---

# 63. Extraction Success Criteria

A successful structural extraction means:

```text
same page
same visual result
same flow
same responsive result
smaller ownership scope
clearer files
```

It does not mean:

```text
new visual design
new colors
new breakpoints
rewritten UX
renamed product concepts
```

Those are separate approved tasks.

---

# 64. Approved Ownership Summary

```text
Marketing / Public
- landing
- about
- contact

Authentication / Claim
- login
- forgot-password
- register
- claim-success

Discovery / Creation Entry
- games
- category-select
- gametype-select
- math-difficulty
- gametype-intro
- creator-name

Creator Application
- dashboard
- library
- analytics
- detail

Account / Settings
- profile
- play-history
- notifications
- history-detail
- settings

Editor / Challenge
- workbench
- workbench-locked
- challenge
- challenge-preview-all
- challenge-share

Player
- player
  - 16 current internal states

Legal / System
- report
- legal
- link-expired
- game-offline
- not-found
```

---

# 65. Next Step

The next foundation document should be:

```text
08-AI-CHANGE-RULES.md
```

It will convert all of the current architecture decisions into one concise operating contract for Claude / ChatGPT / Gemini.

That document will define:

- what AI must read first
- how scope is declared
- what files it may change
- how shared components are protected
- how design approval works
- how implementation approval works
- how responsive verification works
- what must never be changed silently

After that, we can create the repository-level:

```text
CLAUDE.md
```

and begin the first safe extraction of the large prototype.
