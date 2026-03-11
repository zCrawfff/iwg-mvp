"use client";

import { Text } from "@iwg/atoms";
import { Button, InputBase, InputPhone, ProgressStepper } from "@iwg/molecules";
import iwgLogo from "../../assets/iwg-logo.svg";

// Inline mail icon — avoids adding lucide-react as a direct dependency
function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export type ContactFormWalkInProps = {
  /** Workspace location name, e.g. "Exeter Business Park" */
  locationName: string;
  /** Workspace location address, e.g. "Exeter, United Kingdom" */
  locationAddress: string;
  /** URL for the workspace brand logo image */
  locationLogoSrc: string;
  /** Controlled email value */
  email: string;
  onEmailChange: (value: string) => void;
  /** Controlled phone value */
  phone: string;
  onPhoneChange: (value: string) => void;
  /** Dial code for phone input, e.g. "+44" */
  dialCode?: string;
  /** URL for privacy policy page */
  privacyPolicyUrl: string;
  /** Called when the CTA button is tapped */
  onSubmit: () => void;
  /** Current step number (1-based). Stepper hidden when currentStep === 1. */
  currentStep?: number;
  /** Total number of steps in the form flow */
  totalSteps?: number;
};

export function ContactFormWalkIn({
  locationName,
  locationAddress,
  locationLogoSrc,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  dialCode = "+44",
  privacyPolicyUrl,
  onSubmit,
  currentStep = 1,
  totalSteps = 3,
}: ContactFormWalkInProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* Inner content column — fluid width, capped at sm on wider screens */}
      <div className="w-full max-w-sm mx-auto flex flex-col flex-1 gap-6 px-4 py-6">

        {/* IWG wordmark */}
        <div className="flex justify-center">
          <img
            src={iwgLogo}
            alt="IWG"
            height={31}
            className="w-auto"
          />
        </div>

        {/* Location context — dynamic, centred */}
        <div className="flex flex-col items-center gap-2 text-center">
          <img
            src={locationLogoSrc}
            alt={locationName}
            width={40}
            className="h-auto"
          />
          <Text as="p" variant="bo1">{locationName}</Text>
          <span className="text-text-secondary">
            <Text as="span" variant="o">{locationAddress}</Text>
          </span>
        </div>

        {/* Progress stepper — hidden on step 1 */}
        {currentStep > 1 && (
          <ProgressStepper
            variant="bar"
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        )}

        {/* Heading */}
        <div className="text-center text-text-primary">
          <Text as="h1" variant="s1">
            Please enter your contact details to get started
          </Text>
        </div>

        {/* Privacy notice */}
        <div className="text-center text-text-secondary">
          <Text as="p" variant="bo2">
            We will solely use this information to contact you about our
            products and services.
          </Text>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <InputBase
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            inputSize="lg"
            leading={<MailIcon />}
          />
          <InputPhone
            placeholder="000 000 000"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            inputSize="lg"
            dialCode={dialCode}
          />
        </div>

        {/* Privacy policy consent */}
        <p className="font-arbeit text-sm leading-[1.2] tracking-[-0.0025em] text-text-secondary">
          By submitting this form you agree to our{" "}
          <a
            href={privacyPolicyUrl}
            className="underline font-semibold text-text-primary"
          >
            Privacy Policy
          </a>
        </p>

        {/* CTA — mt-auto pins to bottom of the flex column */}
        <div className="mt-auto pt-3 w-full [&>button]:w-full">
          <Button
            label="Get Started"
            color="os-foundation"
            variant="primary"
            shape="rounded"
            size="lg"
            onClick={onSubmit}
          />
        </div>

      </div>
    </div>
  );
}
