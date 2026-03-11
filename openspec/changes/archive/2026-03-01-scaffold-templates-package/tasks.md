## 1. Package Configuration

- [x] 1.1 Create `package.json` with name `@iwg/templates`, version `0.1.0`, `private: true`, `type: "module"`, `sideEffects: false`, workspace dependencies on `@iwg/atoms`, `@iwg/molecules`, `@iwg/organisms`, peer dependencies on React 19, dev dependencies matching organisms, export map (`.`, `./styles.css`, `./package.json`), files field (`dist`, `src/styles.css`), and all seven scripts (dev on port 6009, build, build:storybook, test, test:update, test:ui, typecheck)
- [x] 1.2 Create `tsup.config.ts` with entry `src/index.ts`, formats ESM + CJS, dts, clean, sourcemap, treeshake, splitting, external `react`, `react-dom`, `@iwg/atoms`, `@iwg/molecules`, `@iwg/organisms`
- [x] 1.3 Create `tsconfig.json` with target ES2022, lib ES2022 + DOM + DOM.Iterable, jsx react-jsx, module ESNext, moduleResolution bundler, strict, isolatedModules, path alias `@/*` → `./src/*`

## 2. Source Structure

- [x] 2.1 Create `src/styles.css` with `@import "@iwg/organisms/styles.css"` and `@source` directives for atoms, molecules, and organisms source directories
- [x] 2.2 Create `src/index.ts` with `export * from "./components"`
- [x] 2.3 Create `src/components/index.ts` as an empty barrel export file (no components yet)

## 3. Storybook Configuration

- [x] 3.1 Create `.storybook/main.ts` with `@storybook/react-vite` framework, stories glob, essentials addon, and `viteFinal` hook with `@tailwindcss/vite` plugin
- [x] 3.2 Create `.storybook/preview.ts` importing `../src/styles.css` with color and date control matchers

## 4. Testing Configuration

- [x] 4.1 Create `playwright.config.ts` with testDir `./src`, testMatch `**/*.test.ts`, baseURL and webServer on port 6009, fullyParallel, CI retries

## 5. CLAUDE.md

- [x] 5.1 Create `CLAUDE.md` with all required sections: package description, tech stack, architecture diagram, project structure, key rules (mandatory dependency checking with specific file paths, hard stop on missing dependencies, import-never-duplicate, "use client" default, Tailwind only, Figma source of truth, flat structure, export types), commands reference, and OpenSpec section

## 6. Install and Verify

- [x] 6.1 Run `pnpm install` from the monorepo root to resolve workspace dependencies
- [x] 6.2 Run `pnpm build` to verify tsup produces valid ESM + CJS output from empty barrel exports
- [x] 6.3 Run `pnpm typecheck` to verify TypeScript compiles without errors
- [x] 6.4 Verify Storybook starts on port 6009 with `pnpm dev`

## 7. OpenSpec Foundation Specs

- [x] 7.1 Sync the six delta specs (project-config, source-structure, storybook-config, testing-config, claude-instructions, figma-workflow) to `openspec/specs/` as the foundation spec library for future template changes
