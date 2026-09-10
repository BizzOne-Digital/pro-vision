import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Pro-Vision Team Funding Inc.",
  description: "Privacy policy for Pro-Vision Team Funding Inc.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-20">
      <div className="container-page max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-[#102A43]">Privacy Policy</h1>
        <p className="mt-6 text-sm leading-relaxed text-[#627D98]">
          {COMPANY.name} respects your privacy. Information submitted through our contact forms
          &mdash; including your name, email address, phone number, and message &mdash; is used
          solely to respond to your inquiry and to provide information about our financing
          services. We do not sell your personal information to third parties.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#627D98]">
          Information you provide may be stored securely and used to follow up with you regarding
          your inquiry. You may contact us at any time to request that your information be
          removed from our records.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#627D98]">
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-[#078BE7]">
            {COMPANY.email}
          </a>
          .
        </p>
        <p className="mt-8 text-xs text-[#627D98]">NMLS #{COMPANY.nmls}</p>
      </div>
    </section>
  );
}
