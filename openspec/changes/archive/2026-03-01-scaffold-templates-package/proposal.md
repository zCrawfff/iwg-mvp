## Why

The @iwg/templates package is the missing layer between organisms and pages. Without it, pages would need to handle section-level layout composition directly — mixing layout concerns with page-level routing and data. Templates provide reusable horizontal page sections (hero, content grid, footer, etc.) that compose organisms, molecules, and atoms into complete, self-contained sections. The atoms, molecules, and organisms layers are already established and operational — templates is the next layer needed before pages can be built.

## What Changes

- Create new `@iwg/templates` package within the pnpm workspace monorepo
- Add `package.json` with workspace dependencies on `@iwg/atoms`, `@iwg/molecules`, and `@iwg/organisms`
- Set up tsup build configuration (ESM + CJS output, identical to other layers)
- Set up TypeScript configuration (strict, React 19, bundler resolution)
- Create `src/` directory structure with barrel exports (`src/index.ts`, `src/components/index.ts`)
- Add `src/styles.css` importing Tailwind with upstream token layers
- Configure Storybook on port 6009 with Tailwind vite plugin
- Configure Playwright visual regression testing against Storybook on port 6009
- Write `CLAUDE.md` with templates-layer rules including:
  - Mandatory check of all three upstream layers' exports before every template
  - Hard stop on missing dependencies — never create lower-layer components, ask the user
  - Figma MCP workflow for template design sourcing
  - "use client" on all template components
  - Tailwind-only styling with atoms' design tokens
  - Flat component structure and co-located stories/tests
- Create OpenSpec foundation specs documenting all conventions

## Capabilities

### New Capabilities
- `project-config`: Package.json, tsup, tsconfig, workspace dependencies, and build configuration for @iwg/templates
- `source-structure`: Directory layout, barrel exports, component folder conventions, and the flat `src/components/<name>/` pattern
- `storybook-config`: Storybook setup on port 6009, Tailwind vite plugin, preview config, and story conventions
- `testing-config`: Playwright visual regression against Storybook, viewport definitions, snapshot storage
- `claude-instructions`: CLAUDE.md rules — dependency checking mandate, hard stop on missing deps, Figma workflow, "use client" default, Tailwind-only, export conventions
- `figma-workflow`: How Figma MCP links drive template creation — mapping designs to existing components, dependency gap identification, the create-or-stop decision flow

### Modified Capabilities
None — this is a greenfield package with no existing specs.

## Impact

- **New package**: `@iwg/templates` added to pnpm workspace (already listed in `pnpm-workspace.yaml`)
- **Workspace dependencies**: Templates depends on `@iwg/atoms`, `@iwg/molecules`, `@iwg/organisms` via `workspace:*`
- **Storybook port allocation**: Port 6009 reserved for templates (atoms=6006, molecules=6007, organisms=6008)
- **Root scripts**: `pnpm -r build`, `pnpm -r dev`, `pnpm -r test` will automatically include templates
- **Downstream**: `@iwg/pages` will consume templates once this package is operational
