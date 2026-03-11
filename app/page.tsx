"use client";

import { useState } from "react";
import { ContactFormWalkIn } from "@iwg/templates";

export default function Page() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <ContactFormWalkIn
      locationName="London Paddington"
      locationAddress="London, United Kingdom"
      locationLogoSrc="https://placehold.co/80x80?text=Logo"
      email={email}
      onEmailChange={setEmail}
      phone={phone}
      onPhoneChange={setPhone}
      privacyPolicyUrl="/privacy"
      onSubmit={() => console.log({ email, phone })}
    />
  );
}
