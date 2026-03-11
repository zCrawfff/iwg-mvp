## ADDED Requirements

### Requirement: Playwright configuration
The `playwright.config.ts` SHALL define:
- `testDir: "./src"`
- `testMatch: "**/*.test.ts"`
- `fullyParallel: true`
- `forbidOnly: !!process.env.CI`
- `retries: process.env.CI ? 2 : 0`
- `baseURL: "http://localhost:6009"`
- `webServer` with command `pnpm dev` and url `http://localhost:6009`, `reuseExistingServer: !process.env.CI`

#### Scenario: Playwright runs against Storybook
- **WHEN** running `pnpm test`
- **THEN** Playwright starts Storybook on port 6009 (or reuses existing) and runs visual tests

### Requirement: Test file co-location
Each template's Playwright test file SHALL be co-located at `src/components/<name>/<name>.test.ts`.

#### Scenario: Test file location
- **WHEN** a template `hero-section` exists
- **THEN** its test is at `src/components/hero-section/hero-section.test.ts`

### Requirement: Test structure
Each test file SHALL use a `test.describe` block named after the component, with individual tests per Storybook story. Each test SHALL:
1. Set viewport size
2. Navigate to the Storybook iframe URL
3. Wait for `networkidle` load state
4. Assert `toHaveScreenshot` with a descriptive filename

#### Scenario: Desktop and mobile snapshots
- **WHEN** a template test runs
- **THEN** it captures screenshots at desktop (1280×800) and mobile (375×812) viewports

### Requirement: Storybook URL convention
Tests SHALL navigate to stories using the URL pattern: `/iframe.html?id=templates-<component>--<story>&viewMode=story`

#### Scenario: URL for default story
- **WHEN** testing `HeroSection` default story
- **THEN** the URL is `/iframe.html?id=templates-herosection--default&viewMode=story`

### Requirement: Snapshot storage
Screenshot baselines SHALL be stored in `src/components/<name>/<name>.test.ts-snapshots/` alongside the test file.

#### Scenario: Snapshot directory
- **WHEN** a test generates baselines for `hero-section`
- **THEN** PNGs are stored in `src/components/hero-section/hero-section.test.ts-snapshots/`

### Requirement: Test scripts
The package SHALL provide three test scripts:
- `pnpm test` — run all visual regression tests
- `pnpm test:update` — update screenshot baselines
- `pnpm test:ui` — open Playwright test UI for interactive debugging

#### Scenario: Baseline update workflow
- **WHEN** a template's visual appearance changes intentionally
- **THEN** running `pnpm test:update` regenerates the baseline screenshots
