## Context

The @iwg monorepo has three established layers — atoms, molecules, organisms — each following identical conventions: pnpm workspace package, tsup build (ESM + CJS), Storybook (react-vite + Tailwind), Playwright visual regression, barrel exports, and co-located component files. The templates package is a new fourth layer that must replicate this pattern exactly while adding one layer of workspace dependency (all three upstream packages).

The CSS chain is: atoms imports Tailwind + defines `@theme` tokens → molecules imports atoms' styles → organisms imports molecules' styles + adds `@source` directives for upstream class scanning. Templates must extend this chain.

## Goals / Non-Goals

**Goals:**
- Scaffold a fully functional `@iwg/templates` package that matches existing layer conventions exactly
- Storybook running on port 6009 with Tailwind support from first launch
- Playwright visual regression configured and ready for first template
- CLAUDE.md that enforces the hard-stop dependency rule and mandatory export checking
- OpenSpec foundation specs that document every convention for future template creation
- Zero-friction workflow: `opsx:new` with a Figma link → template created with tests + stories

**Non-Goals:**
- Creating any actual template components (that's future changes via `opsx:new`)
- NextJS routing, layouts, or server components (client-side only for now)
- Shared layout utilities or abstractions (premature — let patterns emerge from real templates)
- Modifying any upstream packages (atoms, molecules, organisms)

## Decisions

### 1. Package configuration — mirror organisms exactly, add @iwg/organisms dependency

The organisms package.json is the closest reference. Templates will use an identical structure with one addition: `@iwg/organisms: workspace:*` in dependencies alongside atoms and molecules.

**tsup externals** must include all three upstream packages: `@iwg/atoms`, `@iwg/molecules`, `@iwg/organisms`. This prevents bundling upstream code into template builds — consumers resolve workspace dependencies at their own level.

**Alternative considered:** Only depending on `@iwg/organisms` (which re-exports from molecules/atoms). Rejected because templates need direct access to atoms' tokens and molecules' interactive components — relying on transitive exports would be fragile and unclear.

### 2. CSS chain — import organisms' styles.css, add @source for organisms

Following the established pattern:

```css
@import "@iwg/organisms/styles.css";

@source "../../atoms/src/**/*.{ts,tsx}";
@source "../../molecules/src/**/*.{ts,tsx}";
@source "../../organisms/src/**/*.{ts,tsx}";
```

This ensures Tailwind generates utility classes for all upstream component sources. The `@import` chain (organisms → molecules → atoms → tailwindcss) brings in all `@theme` tokens.

**Alternative considered:** Only importing organisms and relying on its `@source` directives. Rejected because templates need to scan all three source directories for Tailwind class generation — each layer must explicitly declare its full dependency tree for `@source`.

### 3. Storybook — identical config, port 6009

`.storybook/main.ts` and `.storybook/preview.ts` are identical to organisms except the port number. The `viteFinal` hook merges the Tailwind vite plugin. Preview imports `../src/styles.css` to load the full token chain.

Port allocation: atoms=6006, molecules=6007, organisms=6008, templates=6009.

### 4. Playwright — identical config, port 6009

`playwright.config.ts` mirrors organisms exactly, with `baseURL` and `webServer.url` set to `http://localhost:6009`.

### 5. Source structure — flat components with barrel exports

```
src/
├── components/
│   └── <name>/
│       ├── <name>.tsx            # "use client" template component
│       ├── <name>.stories.tsx    # Storybook story
│       ├── <name>.test.ts        # Playwright visual regression
│       └── index.ts              # Re-export component + types
├── styles.css                    # CSS chain entry point
└── index.ts                      # Barrel: export * from "./components"
```

Initially `src/components/index.ts` will be empty (no components yet) and `src/index.ts` will re-export from it. This gives a valid build target from day one.

### 6. CLAUDE.md — strictest dependency rules in the stack

Templates sit highest in the component hierarchy, so the dependency rules are the most critical:

- **MANDATORY: Check all three layers before every template.** Read atoms, molecules, and organisms exports. Map every Figma element to existing components. Non-negotiable.
- **Hard stop on missing dependencies.** If a template needs a component that doesn't exist in atoms/molecules/organisms, STOP and ask the user. No stubs, no placeholders, no inventing.
- **"use client" on all templates.** Templates compose interactive organisms.
- **Figma MCP is source of truth.** Template designs come from Figma links.
- **Tailwind only.** Use grid/spacing/elevation tokens from atoms for section layout.

### 7. OpenSpec foundation specs — mirror organisms' spec structure

Six specs matching the proposal's capabilities, modeled on the organisms' OpenSpec layout:

| Spec | Documents |
|------|-----------|
| `project-config` | package.json fields, dependencies, tsup config, tsconfig, build outputs |
| `source-structure` | Directory layout, barrel exports, component folder pattern, naming |
| `storybook-config` | Port 6009, vite plugin, preview, story conventions |
| `testing-config` | Playwright config, viewports, snapshot storage, test pattern |
| `claude-instructions` | All CLAUDE.md rules verbatim — the enforcement layer |
| `figma-workflow` | Figma MCP → component mapping → gap analysis → create-or-stop flow |

## Risks / Trade-offs

**Empty package builds** → The package will build successfully with empty barrel exports. tsup handles this gracefully — it produces valid but empty ESM/CJS modules. No risk here.

**Storybook port conflict** → Port 6009 could conflict if another service uses it. Mitigation: the port is only used during `pnpm dev` and follows the established sequential allocation. All layers use the same pattern.

**CSS @source paths are relative** → `../../atoms/src/**/*.{ts,tsx}` assumes the monorepo directory structure. Mitigation: this is identical to how organisms handles it, and the pnpm workspace structure is stable.

**Thin component inventory upstream** → Only Text (atom), Button/IconButton (molecules), and Navigation (organism) exist. Most real templates will hit the hard-stop rule immediately. This is by design — it forces bottom-up component creation rather than top-down stub accumulation. But it means the first few template attempts will be discovery exercises that reveal what's needed at lower layers.
