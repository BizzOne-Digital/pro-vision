import type { Metadata } from "next";
import { Mail, Phone, MapPin, BadgeCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Pro-Vision Team Funding Inc.",
  description:
    "Contact Pro-Vision Team Funding Inc. to discuss home purchase, refinance, or investment property financing options across Florida. NMLS #1190997.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#031D33] py-24 sm:py-28">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#16C8D7]">
            Get In Touch
          </p>
          <h1 className="mt-5 max-w-2xl font-heading text-4xl font-bold text-white sm:text-5xl">
            Let&rsquo;s Discuss Your Financing Goals
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#DCE8F0]">
            Reach out to Pro-Vision Team Funding Inc. and take the next step toward your
            financing goals.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold text-[#102A43]">Contact Information</h2>
            <div className="mt-6 space-y-5">
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 rounded-lg border border-[#DCE8F0] p-4 text-sm font-medium text-[#102A43] hover:border-[#078BE7] hover:text-[#078BE7]"
              >
                <Mail className="h-5 w-5 text-[#078BE7]" aria-hidden="true" />
                {COMPANY.email}
              </a>
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-3 rounded-lg border border-[#DCE8F0] p-4 text-sm font-medium text-[#102A43] hover:border-[#078BE7] hover:text-[#078BE7]"
              >
                <Phone className="h-5 w-5 text-[#078BE7]" aria-hidden="true" />
                {COMPANY.phoneFormatted}
              </a>
              <div className="flex items-center gap-3 rounded-lg border border-[#DCE8F0] p-4 text-sm font-medium text-[#102A43]">
                <MapPin className="h-5 w-5 text-[#078BE7]" aria-hidden="true" />
                Serving {COMPANY.serviceArea}
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-[#DCE8F0] p-4 text-sm font-semibold text-[#102A43]">
                <BadgeCheck className="h-5 w-5 text-[#078BE7]" aria-hidden="true" />
                NMLS #{COMPANY.nmls}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#EFF7FC] p-8 lg:col-span-3">
            <h2 className="font-heading text-2xl font-bold text-[#102A43]">Send a Message</h2>
            <p className="mt-2 text-sm text-[#627D98]">
              Fill out the form below and a member of our team will be in touch shortly.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
