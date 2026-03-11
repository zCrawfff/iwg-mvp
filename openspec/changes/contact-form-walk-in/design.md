## Context

This is the first template in `@iwg/templates`. It implements page 1 of a mobile-first, multi-step walk-in contact capture form. The design source is Figma node `14797-28528`. The form runs at full viewport width on any phone, adapting to screen size rather than being pinned to a 375px frame.

The location context (brand logo, centre name, city/country) is fully dynamic — driven by props at runtime from the page layer.

## Goals / Non-Goals

**Goals:**
- Fluid, responsive layout: fills full viewport width on any phone (no fixed `w-[375px]`)
- `max-w-sm` cap for tablet/desktop so the form doesn't stretch unusably wide
- Dynamic location props: `locationName`, `locationAddress`, `locationLogoSrc`
- Email + phone inputs using `InputBase` and `InputPhone` from `@iwg/molecules`
- `Button` CTA (full width, dark `os-foundation` color, `rounded` shape, `lg` size)
- `ProgressStepper` (bar variant) slot — hidden on page 1, exposed as prop for later steps
- Privacy policy link as plain `<a>` wrapped in `Text` atom
- Local image assets stored in `src/assets/` and imported at build time (no localhost URLs)
- IWG wordmark logo sourced from Figma asset, saved locally as `iwg-logo.svg`
- Location logo sourced from prop (`locationLogoSrc`) — consumer provides URL

**Non-Goals:**
- Form validation and submission logic (consumer responsibility via `onSubmit` prop)
- Pages 2–N of the multi-step form (separate changes)
- Country-code picker interactivity in `InputPhone` (existing molecule behaviour)
- Hardcoded 375px or any fixed-width constraint

## Decisions

### 1. Responsive layout: fluid width with `max-w-sm` cap
The Figma frame is 375px but the intent is mobile-first. Using `w-full max-w-sm mx-auto` on the inner content column means it fills the phone naturally and stays centred/capped on larger screens. No `w-[375px]` anywhere.

### 2. Location context composed inline (no new molecule)
The location section (logo + name + address) is now a simple stack of centred elements — not a card. It maps directly to `<img>` + two `Text` atoms with Tailwind spacing. No molecule needed.

### 3. Dynamic location props
`locationName: string`, `locationAddress: string`, `locationLogoSrc: string` — passed from the page layer. The template renders them as-is. The IWG wordmark in the header is a local static asset (always the same).

### 4. Local assets
Figma assets (IWG wordmark `iwg-logo.svg`) are downloaded from the MCP localhost server and committed to `src/assets/`. They are imported as static modules via tsup. The location logo (`locationLogoSrc`) is a runtime URL prop — not bundled.

### 5. `InputPhone` for mobile number field
`InputPhone` from `@iwg/molecules` already implements the flag + dial-code + grouped input pattern that matches the Figma design.

### 6. `Button` for CTA
`Button` with `color="os-foundation"`, `variant="primary"`, `shape="rounded"`, `size="lg"`, plus `className="w-full"` override for full-width layout.

### 7. Privacy policy link
Plain `<a href={privacyPolicyUrl}>` inside a `Text` atom paragraph — no additional component needed.

## Risks / Trade-offs

- **`os-foundation` button color**: The Figma uses `#0a0428` (dark navy). Need to verify this maps to `brand-os-foundation` in the atoms token set. If not, will need to use an inline Tailwind arbitrary value and flag for token addition.
- **IWG logo aspect ratio**: The SVG asset from Figma must be tested at various widths to ensure it scales correctly without distortion.
- **`InputPhone` flag picker**: The existing molecule uses a static flag emoji (`🇬🇧`). The Figma shows a US flag with dropdown — the molecule's current behaviour is acceptable for now; full internationalisation is out of scope.

## Migration Plan

No migration needed — this is a net-new template with no existing consumers.
