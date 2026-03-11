## ADDED Requirements

### Requirement: Directory layout
The source code SHALL follow this structure:
```
src/
├── components/
│   └── <name>/
│       ├── <name>.tsx
│       ├── <name>.stories.tsx
│       ├── <name>.test.ts
│       └── index.ts
├── styles.css
└── index.ts
```

#### Scenario: Initial empty structure
- **WHEN** the package is first scaffolded
- **THEN** `src/index.ts`, `src/components/index.ts`, and `src/styles.css` exist

### Requirement: Flat component structure
All template components SHALL be direct children of `src/components/`. No nested subdirectories within a component folder.

#### Scenario: New template added
- **WHEN** a new template `hero-section` is created
- **THEN** it lives at `src/components/hero-section/` with no further nesting

### Requirement: Naming conventions
The following naming conventions SHALL be used:
- Folders: kebab-case (e.g., `hero-section`, `content-grid`)
- Files: kebab-case matching folder name (e.g., `hero-section.tsx`)
- Components: PascalCase (e.g., `HeroSection`, `ContentGrid`)
- Props types: PascalCase + `Props` suffix (e.g., `HeroSectionProps`)
- Sub-types: PascalCase descriptive names (e.g., `HeroVariant`, `GridColumns`)

#### Scenario: Component naming
- **WHEN** creating a template called "content grid"
- **THEN** folder is `content-grid/`, file is `content-grid.tsx`, component is `ContentGrid`, props type is `ContentGridProps`

### Requirement: Barrel exports at root
`src/index.ts` SHALL contain `export * from "./components"` as its sole export.

#### Scenario: Root barrel export
- **WHEN** reading `src/index.ts`
- **THEN** it contains only `export * from "./components"`

### Requirement: Barrel exports at components level
`src/components/index.ts` SHALL re-export all template components and their types. Each new template adds an `export * from "./<name>"` line.

#### Scenario: Components barrel export with templates
- **WHEN** templates `hero-section` and `content-grid` exist
- **THEN** `src/components/index.ts` contains `export * from "./hero-section"` and `export * from "./content-grid"`

### Requirement: Component index re-exports
Each component's `index.ts` SHALL export the component and its props type (and any sub-types) using named exports.

#### Scenario: Component index file
- **WHEN** reading `src/components/hero-section/index.ts`
- **THEN** it exports `HeroSection` and `HeroSectionProps` (and any sub-types)

### Requirement: CSS chain
`src/styles.css` SHALL import the organisms styles and declare `@source` directives for all three upstream layers:
```css
@import "@iwg/organisms/styles.css";

@source "../../atoms/src/**/*.{ts,tsx}";
@source "../../molecules/src/**/*.{ts,tsx}";
@source "../../organisms/src/**/*.{ts,tsx}";
```

#### Scenario: Tailwind generates upstream utility classes
- **WHEN** Storybook or the build processes `styles.css`
- **THEN** Tailwind generates utility classes for classes used in atoms, molecules, and organisms source files

### Requirement: "use client" directive
All template component files SHALL include `"use client"` as the first line, since templates compose interactive organisms and molecules.

#### Scenario: Template component has client directive
- **WHEN** reading any template `.tsx` file
- **THEN** the first line is `"use client"`
