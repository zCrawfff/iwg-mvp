## Why

IWG needs a mobile-first, multi-step contact capture form to collect walk-in customer details (email, phone) at the point of visiting a workspace location. This template composes the full multi-step form flow using existing molecules and organisms, ensuring consistent UI with the broader design system.

## What Changes

- Add new template `ContactFormWalkIn` — a full-screen mobile-first multi-step form
- Page 1 (scope of this change): collects email + mobile phone, shows location context, links to privacy policy, CTA to proceed
- Additional pages of the form will follow in subsequent changes once the full Figma flow is reviewed
- The template accepts location data (name, address, logoSrc) and form submission callbacks as props
- Step progress tracked via `ProgressStepper` molecule (bar variant, shown from step 2 onwards)

## Capabilities

### New Capabilities
- `contact-form-walk-in`: Multi-step walk-in contact capture form template. Page 1 displays a centered workspace location context (brand logo + name + city/country), accepts email address and mobile phone number, includes privacy policy consent copy, and a full-width CTA to proceed to next step.

### Modified Capabilities
<!-- None at this time -->

## Impact

- New files: `src/components/contact-form-walk-in/contact-form-walk-in.tsx`, `.stories.tsx`, `.test.ts`, `index.ts`
- Consumes: `@iwg/atoms` → `Text`; `@iwg/molecules` → `Button`, `InputBase`, `InputPhone`, `ProgressStepper`
- Location context (logo + name + address) composed inline with `Text` atoms + `<img>` + Tailwind — no separate molecule required (redesigned as text-only presentation, no card background)
- No upstream changes required
