## ADDED Requirements

### Requirement: Figma MCP driven workflow
Template creation SHALL follow this workflow:
1. User provides a Figma MCP link for the template design
2. AI reads the Figma design via MCP to understand layout, spacing, and component composition
3. AI maps every visual element in the design to existing atoms, molecules, and organisms
4. AI identifies any gaps (components needed but not available)
5. If gaps exist: AI stops and reports missing dependencies to the user
6. If all dependencies exist: AI proceeds with template implementation

#### Scenario: Complete dependency chain
- **WHEN** a Figma design is provided and all needed components exist in atoms/molecules/organisms
- **THEN** AI proceeds directly to implementation

#### Scenario: Missing dependencies detected
- **WHEN** a Figma design requires components that don't exist in any upstream layer
- **THEN** AI reports each missing component with its expected layer (atom, molecule, or organism) and stops

### Requirement: Design element mapping
Before implementation, the AI SHALL create a mental mapping of every Figma element to its upstream component:

| Figma Element | Component | Layer | Available? |
|---------------|-----------|-------|------------|
| Heading text  | `Text` (variant h1/h2) | atoms | check |
| CTA button    | `Button` | molecules | check |
| Nav bar       | `Navigation` | organisms | check |

#### Scenario: All elements mapped
- **WHEN** AI analyzes a Figma template design
- **THEN** every visual element is mapped to an existing component or flagged as missing

### Requirement: Design token mapping
Layout decisions SHALL use design tokens from `@iwg/atoms`:
- **Colors**: `--color-*` tokens via Tailwind utilities (e.g., `bg-brand-purple`, `text-text-primary`)
- **Typography**: Text component variants (d1, h1-h4, s1-s3, bo1-bo2, etc.)
- **Spacing**: Tailwind spacing scale derived from `--spacing: 0.25rem`
- **Elevation**: `--shadow-elevation-*` tokens via `shadow-elevation-*` utilities
- **Grid/Breakpoints**: `--breakpoint-*` tokens via `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes

#### Scenario: Template uses token-based spacing
- **WHEN** a Figma design shows 32px padding
- **THEN** the template uses `p-8` (8 × 0.25rem = 2rem = 32px) from the spacing scale

### Requirement: OpenSpec change per template
Each template SHALL be created through an `opsx:new` change that includes:
- A proposal referencing the Figma MCP link
- A design document with the element-to-component mapping
- Specs for the template's behavior and layout
- Tasks for implementation, stories, and tests

#### Scenario: Template created via opsx:new
- **WHEN** creating a new template
- **THEN** an `opsx:new` change is started with the Figma link in the proposal

### Requirement: Responsive layout approach
Templates SHALL be designed mobile-first using Tailwind responsive prefixes. The Figma design MAY show desktop layout; the template MUST handle both mobile and desktop viewports using `md:` or `lg:` breakpoint prefixes.

#### Scenario: Mobile-first responsive template
- **WHEN** a template renders at mobile width (375px)
- **THEN** it displays a single-column stacked layout
- **WHEN** the same template renders at desktop width (1280px)
- **THEN** it displays the multi-column layout from the Figma design
