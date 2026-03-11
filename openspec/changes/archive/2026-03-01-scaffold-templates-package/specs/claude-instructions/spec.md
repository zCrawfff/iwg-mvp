## ADDED Requirements

### Requirement: CLAUDE.md exists at package root
A `CLAUDE.md` file SHALL exist at the root of the templates package, providing all rules for AI-assisted template development.

#### Scenario: CLAUDE.md present
- **WHEN** opening the templates package
- **THEN** `CLAUDE.md` exists with all required sections

### Requirement: CLAUDE.md required sections
The `CLAUDE.md` SHALL include these sections:
1. Package description and purpose
2. Tech stack listing
3. Architecture diagram showing the monorepo layer hierarchy
4. Project structure showing the `src/` layout
5. Key rules section with all behavioral rules
6. Commands reference table
7. OpenSpec section listing foundation specs

#### Scenario: All sections present
- **WHEN** reading `CLAUDE.md`
- **THEN** all seven sections are present with accurate content

### Requirement: Mandatory dependency checking
The CLAUDE.md SHALL include a non-negotiable rule requiring inspection of all three upstream layers' exports before implementing any template:
1. Read `@iwg/atoms/src/index.ts` and `@iwg/atoms/src/components/index.ts` for available atom components
2. Read `@iwg/atoms/src/tokens/index.ts` for available design tokens
3. Read `@iwg/molecules/src/index.ts` and `@iwg/molecules/src/components/index.ts` for available molecule components
4. Read `@iwg/organisms/src/index.ts` and `@iwg/organisms/src/components/index.ts` for available organism components
5. Map every element in the Figma design to existing atoms/molecules/organisms

#### Scenario: AI checks exports before implementation
- **WHEN** AI begins implementing a template
- **THEN** it reads all upstream export files before writing any component code

### Requirement: Hard stop on missing dependencies
The CLAUDE.md SHALL instruct that if a template needs an atom, molecule, or organism that does not exist, the AI MUST stop and ask the user how to proceed. No stubs, no placeholders, no inventing components.

#### Scenario: Missing organism needed
- **WHEN** a Figma design requires a Card organism that doesn't exist in `@iwg/organisms`
- **THEN** AI stops implementation and asks the user: "This template needs a Card organism that doesn't exist in @iwg/organisms. Please create it first."

#### Scenario: Missing molecule needed
- **WHEN** a Figma design requires a Link molecule that doesn't exist in `@iwg/molecules`
- **THEN** AI stops implementation and asks the user to create the molecule first

### Requirement: Import from upstream, never duplicate
The CLAUDE.md SHALL require that templates always import from `@iwg/atoms`, `@iwg/molecules`, and `@iwg/organisms`. Component code SHALL never be copied or duplicated.

#### Scenario: Template imports upstream components
- **WHEN** reading a template component file
- **THEN** all component imports reference `@iwg/atoms`, `@iwg/molecules`, or `@iwg/organisms`

### Requirement: Interactive by default
The CLAUDE.md SHALL state that all templates use `"use client"` since they compose interactive organisms and molecules.

#### Scenario: Client directive present
- **WHEN** reading any template `.tsx` file
- **THEN** the first line is `"use client"`

### Requirement: Tailwind only
The CLAUDE.md SHALL mandate Tailwind utility classes only — no inline styles, no CSS modules, no hardcoded color/spacing values. Design tokens from `@iwg/atoms` SHALL be used via Tailwind utilities.

#### Scenario: No inline styles
- **WHEN** reviewing template component code
- **THEN** styling uses only Tailwind classes referencing design token utilities

### Requirement: Figma is source of truth
The CLAUDE.md SHALL state that template designs come from Figma via MCP links. The Figma design determines layout, spacing, and component composition.

#### Scenario: Template matches Figma
- **WHEN** a template is created from a Figma link
- **THEN** its layout and composition match the Figma design

### Requirement: Flat structure enforcement
The CLAUDE.md SHALL require that all templates are direct children of `src/components/` with no nested grouping directories.

#### Scenario: No subdirectory grouping
- **WHEN** multiple templates exist
- **THEN** each is a direct child of `src/components/` (e.g., `src/components/hero-section/`, `src/components/content-grid/`)

### Requirement: Export types and utilities
The CLAUDE.md SHALL require each template to export its props type and any relevant sub-types from its `index.ts` so pages can consume them with flexibility.

#### Scenario: Types exported
- **WHEN** reading a template's `index.ts`
- **THEN** the component, props type, and any sub-types (variant enums, etc.) are all exported
