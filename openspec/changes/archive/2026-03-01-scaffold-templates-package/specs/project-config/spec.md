## ADDED Requirements

### Requirement: Package identity
The package SHALL be named `@iwg/templates` at version `0.1.0`, marked `private: true`, with `type: "module"` and `sideEffects: false`.

#### Scenario: Package name and version
- **WHEN** inspecting `package.json`
- **THEN** `name` is `@iwg/templates`, `version` is `0.1.0`, `private` is `true`, `type` is `"module"`, `sideEffects` is `false`

### Requirement: Workspace dependencies
The package SHALL declare dependencies on all three upstream layers using the pnpm workspace protocol:
- `@iwg/atoms: workspace:*`
- `@iwg/molecules: workspace:*`
- `@iwg/organisms: workspace:*`

#### Scenario: Dependencies resolve to workspace packages
- **WHEN** running `pnpm install` in the monorepo
- **THEN** `@iwg/atoms`, `@iwg/molecules`, and `@iwg/organisms` resolve to sibling workspace packages

### Requirement: Peer dependencies
The package SHALL declare React 19 as peer dependencies: `react: ">=19.0.0"` and `react-dom: ">=19.0.0"`.

#### Scenario: React peer dependency declared
- **WHEN** inspecting `peerDependencies` in `package.json`
- **THEN** `react` and `react-dom` are listed with `>=19.0.0`

### Requirement: Dev dependencies
The package SHALL include dev dependencies matching the organisms package: `@playwright/test`, `@storybook/addon-docs`, `@storybook/addon-essentials`, `@storybook/react`, `@storybook/react-vite`, `@tailwindcss/vite`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `react`, `react-dom`, `storybook`, `tailwindcss`, `tsup`, `typescript`, `vite`.

#### Scenario: Dev dependencies present
- **WHEN** inspecting `devDependencies` in `package.json`
- **THEN** all listed packages are present with version ranges matching organisms

### Requirement: Export map
The package SHALL define an export map with three entries:
- `"."` with `import` (types + default) and `require` (types + default) conditions
- `"./styles.css"` pointing to `./src/styles.css`
- `"./package.json"` pointing to `./package.json`

#### Scenario: ESM import resolves correctly
- **WHEN** importing `@iwg/templates`
- **THEN** it resolves to `./dist/index.js` with types at `./dist/index.d.ts`

#### Scenario: CJS require resolves correctly
- **WHEN** requiring `@iwg/templates`
- **THEN** it resolves to `./dist/index.cjs` with types at `./dist/index.d.cts`

### Requirement: Build configuration
The package SHALL use tsup with the following configuration:
- Entry: `src/index.ts`
- Formats: ESM and CJS
- DTS generation enabled
- Clean, sourcemap, treeshake, and splitting enabled
- External packages: `react`, `react-dom`, `@iwg/atoms`, `@iwg/molecules`, `@iwg/organisms`

#### Scenario: Build produces correct outputs
- **WHEN** running `pnpm build`
- **THEN** `dist/` contains `index.js` (ESM), `index.cjs` (CJS), `index.d.ts`, and `index.d.cts`

### Requirement: TypeScript configuration
The package SHALL use TypeScript with: target ES2022, lib ES2022 + DOM + DOM.Iterable, jsx react-jsx, module ESNext, moduleResolution bundler, strict mode enabled, isolatedModules true, and path alias `@/*` mapping to `./src/*`.

#### Scenario: TypeScript compiles without errors
- **WHEN** running `pnpm typecheck`
- **THEN** TypeScript reports no errors

### Requirement: Package scripts
The package SHALL define these scripts:
| Script | Command |
|--------|---------|
| `dev` | `storybook dev -p 6009` |
| `build` | `tsup` |
| `build:storybook` | `storybook build` |
| `test` | `playwright test` |
| `test:update` | `playwright test --update-snapshots` |
| `test:ui` | `playwright test --ui` |
| `typecheck` | `tsc --noEmit` |

#### Scenario: Dev starts Storybook on port 6009
- **WHEN** running `pnpm dev`
- **THEN** Storybook starts on `http://localhost:6009`

### Requirement: Files field
The package SHALL declare `files: ["dist", "src/styles.css"]` so only build outputs and the CSS entry point are published.

#### Scenario: Published files are minimal
- **WHEN** inspecting the `files` field in `package.json`
- **THEN** only `dist` and `src/styles.css` are included
