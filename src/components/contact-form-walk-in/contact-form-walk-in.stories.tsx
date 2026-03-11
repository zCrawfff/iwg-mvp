import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ContactFormWalkIn } from "./contact-form-walk-in";
import regusLogo from "../../assets/regus-logo-placeholder.png";

const meta = {
  title: "Templates/ContactFormWalkIn",
  component: ContactFormWalkIn,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
} satisfies Meta<typeof ContactFormWalkIn>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  locationName: "Exeter Business Park",
  locationAddress: "Exeter, United Kingdom",
  locationLogoSrc: regusLogo as string,
  privacyPolicyUrl: "/privacy",
  onSubmit: () => console.log("submitted"),
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    email: "",
    onEmailChange: () => {},
    phone: "",
    onPhoneChange: () => {},
  },
  render: (args) => {
    const [email, setEmail] = useState(args.email);
    const [phone, setPhone] = useState(args.phone);
    return (
      <ContactFormWalkIn
        {...args}
        email={email}
        onEmailChange={setEmail}
        phone={phone}
        onPhoneChange={setPhone}
      />
    );
  },
};

export const Step2: Story = {
  args: {
    ...defaultArgs,
    email: "user@example.com",
    onEmailChange: () => {},
    phone: "07700 900000",
    onPhoneChange: () => {},
    currentStep: 2,
    totalSteps: 3,
  },
  render: (args) => {
    const [email, setEmail] = useState(args.email);
    const [phone, setPhone] = useState(args.phone);
    return (
      <ContactFormWalkIn
        {...args}
        email={email}
        onEmailChange={setEmail}
        phone={phone}
        onPhoneChange={setPhone}
      />
    );
  },
};
