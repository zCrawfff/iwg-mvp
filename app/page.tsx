"use client";

import { useState } from "react";
import { ContactFormWalkIn } from "@iwg/templates";
import type { CountryOption } from "@iwg/templates";

const COUNTRIES: CountryOption[] = [
  {
    id: "gb",
    name: "United Kingdom",
    dialCode: "+44",
    flag: <img src="https://flagcdn.com/w40/gb.png" alt="United Kingdom flag" className="size-full object-cover" />,
  },
  {
    id: "us",
    name: "United States",
    dialCode: "+1",
    flag: <img src="https://flagcdn.com/w40/us.png" alt="United States flag" className="size-full object-cover" />,
  },
  {
    id: "de",
    name: "Germany",
    dialCode: "+49",
    flag: <img src="https://flagcdn.com/w40/de.png" alt="Germany flag" className="size-full object-cover" />,
  },
  {
    id: "fr",
    name: "France",
    dialCode: "+33",
    flag: <img src="https://flagcdn.com/w40/fr.png" alt="France flag" className="size-full object-cover" />,
  },
  {
    id: "ch",
    name: "Switzerland",
    dialCode: "+41",
    flag: <img src="https://flagcdn.com/w40/ch.png" alt="Switzerland flag" className="size-full object-cover" />,
  },
  {
    id: "nl",
    name: "Netherlands",
    dialCode: "+31",
    flag: <img src="https://flagcdn.com/w40/nl.png" alt="Netherlands flag" className="size-full object-cover" />,
  },
  {
    id: "au",
    name: "Australia",
    dialCode: "+61",
    flag: <img src="https://flagcdn.com/w40/au.png" alt="Australia flag" className="size-full object-cover" />,
  },
  {
    id: "sg",
    name: "Singapore",
    dialCode: "+65",
    flag: <img src="https://flagcdn.com/w40/sg.png" alt="Singapore flag" className="size-full object-cover" />,
  },
];

export default function Page() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryId, setCountryId] = useState("gb");

  return (
    <ContactFormWalkIn
      heroImageSrc="/hero-office.png"
      locationName="London Paddington"
      locationAddress="London, United Kingdom"
      locationLogoSrc="/regus-logo.png"
      countries={COUNTRIES}
      selectedCountryId={countryId}
      onCountryChange={setCountryId}
      email={email}
      onEmailChange={setEmail}
      phone={phone}
      onPhoneChange={setPhone}
      privacyPolicyUrl="/privacy"
      onSubmit={() => console.log({ email, phone, countryId })}
    />
  );
}
