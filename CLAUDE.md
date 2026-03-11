# @iwg/templates

Design system template library — horizontal page sections composed from @iwg/atoms, @iwg/molecules, and @iwg/organisms.

## Tech Stack

- **Runtime**: React 19, Next.js-targeted (templates use `"use client"`)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS (tokens imported from @iwg/atoms via the CSS chain)
- **Primitives**: Radix UI (unstyled)
- **Build**: tsup (ESM + CJS)
- **Package manager**: pnpm (workspace protocol, `@iwg` scope)
- **Docs**: Storybook (`@storybook/react-vite`, port 6009)
- **Testing**: Playwright visual regression against Storybook
- **Design source**: Figma MCP (desktop/local)

## Architecture

```
iwg/                    pnpm workspace root
├── atoms/              @iwg/atoms (foundation)
├── molecules/          @iwg/molecules (composed atoms)
├── organisms/          @iwg/organisms (complex components)
├── templates/          @iwg/templates (this project)
└── pages/              @iwg/pages → consumes templates
```

## Project Structure

```
src/
├── components/
│   └── <name>/
│       ├── <name>.tsx           # Component ("use client")
│       ├── <name>.stories.tsx   # Storybook story
│       ├── <name>.test.ts       # Playwright visual test
│       └── index.ts             # Re-export component, props type, sub-types
├── styles.css                   # CSS chain entry point
└── index.ts                     # Barrel export
```

## Key Rules

- **Interactive by default** — templates compose interactive organisms and molecules. Add `"use client"` at the top of component files.
- **Import from all three upstream layers, never duplicate** — always `import { Text } from "@iwg/atoms"`, `import { Button } from "@iwg/molecules"`, and `import { Navigation } from "@iwg/organisms"`. Never copy component code.
- **MANDATORY: Check all three layers' exports before every template** — before implementing any template, you MUST inspect what's available:
  1. Read `@iwg/atoms/src/index.ts` and `@iwg/atoms/src/components/index.ts` for available atom components
  2. Read `@iwg/atoms/src/tokens/index.ts` for available design tokens
  3. Read `@iwg/molecules/src/index.ts` and `@iwg/molecules/src/components/index.ts` for available molecule components
  4. Read `@iwg/organisms/src/index.ts` and `@iwg/organisms/src/components/index.ts` for available organism components
  5. Map every element in the Figma design to existing atoms/molecules/organisms
  6. This is NON-NEGOTIABLE — do it every time, no exceptions
- **Hard stop on missing dependencies** — if a template needs an atom, molecule, or organism that doesn't exist, you MUST stop and ask the user how to proceed. Do NOT silently invent components. No stubs. No placeholders. Ask and wait.
- **Figma is the source of truth** — template designs come from Figma via MCP links.
- **Tailwind only** — no inline styles, no CSS modules, no hardcoded values. Use design tokens from @iwg/atoms.
- **Radix primitives** when available — wrap and style, don't reinvent.
- **Co-locate** stories and tests with components.
- **Flat structure** — all templates are direct children of `src/components/`.
- **Export types and utilities** — each template exports its props type and any relevant sub-types (variant enums, layout types, etc.) from its `index.ts` so pages can consume them with flexibility.

## Commands

```bash
pnpm dev          # Storybook dev server (port 6009)
pnpm build        # tsup build
pnpm build:storybook  # Build static Storybook site
pnpm test         # Playwright visual regression
pnpm test:update  # Update screenshot baselines
pnpm test:ui      # Open Playwright test UI
pnpm typecheck    # Type check only (no emit)
```

## OpenSpec

This project uses OpenSpec for change management. Foundation specs live in `openspec/specs/`:
- `project-config/` — package, build, and TypeScript configuration
- `source-structure/` — barrel exports, component folder layout
- `storybook-config/` — Storybook setup and conventions
- `testing-config/` — Playwright visual regression approach
- `claude-instructions/` — CLAUDE.md rules and workflow
- `figma-workflow/` — how Figma MCP links drive template creation
