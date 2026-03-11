## ADDED Requirements

### Requirement: Storybook port
Storybook SHALL run on port 6009 following the layer allocation: atoms=6006, molecules=6007, organisms=6008, templates=6009.

#### Scenario: Dev server starts on correct port
- **WHEN** running `pnpm dev`
- **THEN** Storybook is accessible at `http://localhost:6009`

### Requirement: Framework configuration
The `.storybook/main.ts` SHALL use `@storybook/react-vite` as the framework with stories glob `["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"]` and `@storybook/addon-essentials` addon.

#### Scenario: Stories are discovered
- **WHEN** Storybook loads
- **THEN** it discovers `.stories.tsx` and `.mdx` files from `src/`

### Requirement: Tailwind vite plugin
The `.storybook/main.ts` SHALL configure the `@tailwindcss/vite` plugin via the `viteFinal` hook, identical to the organisms configuration.

#### Scenario: Tailwind utilities available in stories
- **WHEN** a story renders a template using Tailwind classes
- **THEN** all utility classes from atoms' `@theme` tokens resolve correctly

### Requirement: Preview configuration
The `.storybook/preview.ts` SHALL import `../src/styles.css` to load the full CSS chain (templates → organisms → molecules → atoms → tailwindcss). It SHALL configure control matchers for color and date.

#### Scenario: Design tokens loaded in preview
- **WHEN** Storybook renders any story
- **THEN** all design tokens (colors, spacing, typography, elevation) are available

### Requirement: Story conventions
Each template story SHALL:
- Use title prefix `Templates/<ComponentName>` (e.g., `Templates/HeroSection`)
- Include `tags: ["autodocs"]` for automatic documentation
- Use `satisfies Meta<typeof ComponentName>` for type safety
- Export a `Default` story as the primary variant
- Export additional named stories for significant layout/content variations

#### Scenario: Story structure
- **WHEN** creating a story for `HeroSection`
- **THEN** the meta object has `title: "Templates/HeroSection"`, `component: HeroSection`, `tags: ["autodocs"]`

### Requirement: Story data patterns
Stories for templates SHALL provide realistic mock data that demonstrates the template's layout at different content densities and viewport sizes. Templates compose multiple organisms, so stories MUST supply all required organism props.

#### Scenario: Story with full mock data
- **WHEN** a template story renders
- **THEN** all composed organisms receive valid props and render correctly
