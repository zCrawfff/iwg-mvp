## 1. Assets

- [x] 1.1 Download IWG wordmark SVG from Figma MCP localhost asset and save to `src/assets/iwg-logo.svg`
- [x] 1.2 Verify the SVG scales correctly without a fixed width (use `height` only or `className` override)

## 2. Component scaffold

- [x] 2.1 Create folder `src/components/contact-form-walk-in/`
- [x] 2.2 Create `contact-form-walk-in.tsx` with `"use client"` directive and `ContactFormWalkInProps` type
- [x] 2.3 Create `index.ts` re-exporting the component and props type

## 3. Props interface

- [x] 3.1 Define required props: `locationName`, `locationAddress`, `locationLogoSrc` (strings)
- [x] 3.2 Define controlled input props: `email`, `onEmailChange`, `phone`, `onPhoneChange`
- [x] 3.3 Define `privacyPolicyUrl: string` prop
- [x] 3.4 Define `onSubmit: () => void` prop
- [x] 3.5 Define optional `currentStep?: number` and `totalSteps?: number` for progress stepper (default `currentStep=1`)

## 4. Layout

- [x] 4.1 Outer wrapper: `min-h-screen w-full flex flex-col` with background `bg-white`
- [x] 4.2 Inner content column: `w-full max-w-sm mx-auto flex flex-col gap-6 px-4 py-6` — no fixed pixel width
- [x] 4.3 Footer CTA area pinned with `mt-auto pt-3`

## 5. Sections

- [x] 5.1 IWG wordmark header: import local SVG asset, render centred `<img>` with `alt="IWG"`
- [x] 5.2 Location context: centred `<img src={locationLogoSrc} alt={locationName}>` + `Text` for name + `Text` for address (overline/caption, uppercase)
- [x] 5.3 Heading: `Text` atom, centre-aligned, bold — "Please enter your contact details to get started"
- [x] 5.4 Privacy notice paragraph: `Text` atom, centre-aligned, secondary colour
- [x] 5.5 Email input: `InputBase` with `type="email"`, leading mail icon (`Mail` from lucide-react), placeholder "Email", `value={email}`, `onChange`
- [x] 5.6 Phone input: `InputPhone` with `value={phone}`, `onChange`, `dialCode` prop (default `"+44"`)
- [x] 5.7 Privacy policy consent copy: `Text` atom paragraph with inline `<a href={privacyPolicyUrl}>Privacy Policy</a>` styled with `underline font-semibold`
- [x] 5.8 Progress stepper: render `<ProgressStepper variant="bar" currentStep={currentStep} totalSteps={totalSteps} />` only when `currentStep > 1`
- [x] 5.9 CTA button: `Button` with `label="Get Started"`, `color="os-foundation"`, `variant="primary"`, `shape="rounded"`, `size="lg"`, `className="w-full"`, `onClick={onSubmit}`

## 6. Barrel export

- [x] 6.1 Add `export * from "./contact-form-walk-in"` to `src/components/index.ts` (or create it if not present)
- [x] 6.2 Verify `src/index.ts` re-exports `src/components`

## 7. Storybook

- [x] 7.1 Create `contact-form-walk-in.stories.tsx` with a `Default` story supplying all required props
- [x] 7.2 Add a `Step2` story with `currentStep={2}` and `totalSteps={3}` to verify progress stepper visibility
- [x] 7.3 Confirm story renders correctly in Storybook at port 6009

## 8. Visual regression test

- [x] 8.1 Create `contact-form-walk-in.test.ts` with a Playwright snapshot test against the `Default` story
- [ ] 8.2 Run `pnpm test:update` to capture baseline screenshot

## 9. Typecheck

- [x] 9.1 Run `pnpm typecheck` — zero errors
