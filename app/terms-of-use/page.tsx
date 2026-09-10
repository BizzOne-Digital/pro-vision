import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use | Pro-Vision Team Funding Inc.",
  description: "Terms of use for the Pro-Vision Team Funding Inc. website.",
};

export default function TermsOfUsePage() {
  return (
    <section className="bg-white py-20">
      <div className="container-page max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-[#102A43]">Terms of Use</h1>
        <p className="mt-6 text-sm leading-relaxed text-[#627D98]">
          By using this website, you agree to use it for lawful purposes only. The content on
          this site is provided for general informational purposes and does not constitute a
          loan commitment, financing offer, or guarantee of approval.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#627D98]">
          Loan programs, terms, conditions, and eligibility are subject to change and applicable
          lender guidelines. Contact {COMPANY.name} for current program information.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#627D98]">
          All content on this website, including text, graphics, and images, is the property of{" "}
          {COMPANY.name} unless otherwise noted and may not be reproduced without permission.
        </p>
        <p className="mt-8 text-xs text-[#627D98]">NMLS #{COMPANY.nmls}</p>
      </div>
    </section>
  );
}
