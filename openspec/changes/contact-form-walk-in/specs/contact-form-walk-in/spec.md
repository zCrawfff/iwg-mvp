## ADDED Requirements

### Requirement: Responsive fluid layout
The template SHALL fill the full viewport width on any phone and SHALL NOT use a fixed pixel width. It MUST use a fluid layout with a `max-w-sm` cap centred on wider screens.

#### Scenario: Renders on a narrow phone (320px)
- **WHEN** the template is rendered on a 320px wide viewport
- **THEN** the form fills the full width with consistent horizontal padding

#### Scenario: Renders on a standard phone (390px)
- **WHEN** the template is rendered on a 390px wide viewport
- **THEN** the form fills the full width without horizontal overflow

#### Scenario: Renders on tablet or desktop
- **WHEN** the template is rendered on a viewport wider than `sm` breakpoint
- **THEN** the form column is centred and capped at `max-w-sm`

---

### Requirement: Dynamic location context
The template SHALL accept `locationName`, `locationAddress`, and `locationLogoSrc` as required string props and render them in the location context section. These values MUST NOT be hardcoded.

#### Scenario: Location name and address displayed
- **WHEN** `locationName="Exeter Business Park"` and `locationAddress="Exeter, United Kingdom"` are passed
- **THEN** both strings are rendered in the location context section, centred, with the address in overline/caption style (uppercase, smaller)

#### Scenario: Location logo displayed
- **WHEN** `locationLogoSrc` is passed as a URL string
- **THEN** an `<img>` is rendered centred above the location name with the `alt` attribute set to the `locationName`

---

### Requirement: Email input
The template SHALL include an email input field using `InputBase` from `@iwg/molecules` with `type="email"`, a leading mail icon, and a placeholder of "Email".

#### Scenario: Email field renders
- **WHEN** the template renders
- **THEN** an email input is visible with a mail icon and "Email" placeholder

#### Scenario: Email value controlled via prop
- **WHEN** `email` and `onEmailChange` props are provided
- **THEN** the input reflects the `email` value and calls `onEmailChange` on change

---

### Requirement: Phone input
The template SHALL include a mobile phone input using `InputPhone` from `@iwg/molecules` with a `dialCode` prop defaulting to `"+44"`.

#### Scenario: Phone field renders
- **WHEN** the template renders
- **THEN** a phone input is visible with a flag indicator and dial code

#### Scenario: Phone value controlled via prop
- **WHEN** `phone` and `onPhoneChange` props are provided
- **THEN** the input reflects the `phone` value and calls `onPhoneChange` on change

---

### Requirement: Privacy policy consent copy
The template SHALL render consent copy ("By submitting this form you agree to our Privacy Policy") with the "Privacy Policy" text as a clickable `<a>` link. The `privacyPolicyUrl` prop MUST be accepted and applied to the link's `href`.

#### Scenario: Privacy policy link renders
- **WHEN** `privacyPolicyUrl="/privacy"` is passed
- **THEN** an anchor with `href="/privacy"` and text "Privacy Policy" is visible below the inputs

---

### Requirement: CTA button
The template SHALL render a full-width "Get Started" button using `Button` from `@iwg/molecules`. Clicking it SHALL call the `onSubmit` prop callback.

#### Scenario: Button renders full width
- **WHEN** the template renders
- **THEN** the "Get Started" button spans the full content column width

#### Scenario: onSubmit called on click
- **WHEN** the user taps/clicks the "Get Started" button
- **THEN** the `onSubmit` callback is invoked

---

### Requirement: Progress stepper slot
The template SHALL accept `currentStep` and `totalSteps` props. When `currentStep > 1`, it MUST render a `ProgressStepper` (bar variant) above the heading. When `currentStep === 1` (page 1), the stepper SHALL be hidden.

#### Scenario: Stepper hidden on step 1
- **WHEN** `currentStep={1}` is passed
- **THEN** no progress bar is rendered

#### Scenario: Stepper visible on step 2+
- **WHEN** `currentStep={2}` and `totalSteps={3}` are passed
- **THEN** a progress bar is rendered showing step 2 of 3

---

### Requirement: Static IWG wordmark
The template SHALL render the IWG wordmark logo as a locally bundled SVG asset at the top of the page. It MUST NOT reference a localhost or external URL.

#### Scenario: IWG logo renders from local asset
- **WHEN** the template renders
- **THEN** the IWG wordmark is visible, sourced from a local import (not a remote URL)
