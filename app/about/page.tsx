import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Heart, Clock, MessageCircle, Users } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Pro-Vision Team Funding Inc.",
  description:
    "Learn about Pro-Vision Team Funding Inc. and founder John Lodato, bringing nearly 40 years of mortgage industry experience to Florida homebuyers and homeowners. NMLS #1190997.",
};

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", desc: "Honest guidance rooted in your best interests at every step of the process." },
  { icon: Award, title: "Experience", desc: "Nearly 40 years navigating the mortgage industry through changing markets." },
  { icon: Users, title: "Personalized Guidance", desc: "Financing paths explored around your unique goals and circumstances." },
  { icon: Clock, title: "Responsiveness", desc: "Timely answers and updates whenever you need them." },
  { icon: MessageCircle, title: "Clear Communication", desc: "Straightforward explanations of your financing options, without the jargon." },
  { icon: Heart, title: "Long-Term Relationships", desc: "Support that continues well beyond your closing day." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#031D33] py-24 sm:py-32">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
            alt="Florida coastal skyline"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#16C8D7]">
            About Pro-Vision Team Funding Inc.
          </p>
          <h1 className="mt-5 max-w-2xl font-heading text-4xl font-bold text-white sm:text-5xl">
            Nearly 40 Years of Mortgage Experience, Focused on Florida
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#DCE8F0]">
            A dedicated approach to home financing, built on trust, experience, and clear
            communication.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-page grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#102A43]">Our Story</h2>
            <p className="mt-5 text-base leading-relaxed text-[#627D98]">
              Pro-Vision Team Funding Inc. was founded by John Lodato to bring genuinely
              personalized mortgage guidance to Florida homebuyers and homeowners. After nearly
              four decades in the mortgage industry, John has seen the market shift many times
              over &mdash; and has helped clients navigate each shift with clarity and confidence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#627D98]">
              Rather than treating financing as a one-size-fits-all transaction, Pro-Vision Team
              Funding Inc. takes the time to understand each client&rsquo;s goals, whether that
              means purchasing a first home, refinancing an existing mortgage, or exploring
              financing for an investment property.
            </p>
            <h2 className="mt-10 font-heading text-3xl font-bold text-[#102A43]">
              A Florida Market Focus
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#627D98]">
              Pro-Vision Team Funding Inc. proudly serves homebuyers and homeowners across the
              State of Florida. That focus allows for a deeper understanding of the local market
              conditions and financing landscape our clients are navigating.
            </p>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=900&q=80"
                alt="Florida residential neighborhood"
                width={640}
                height={480}
                className="h-[320px] w-full object-cover"
              />
            </div>
            <div className="rounded-2xl bg-[#EFF7FC] p-8">
              <h3 className="font-heading text-xl font-semibold text-[#102A43]">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#627D98]">
                To help Florida homebuyers and homeowners understand their financing options and
                move forward with confidence, backed by nearly 40 years of mortgage industry
                experience and a commitment to clear, honest communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFF7FC] py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#078BE7]">
              What We Stand For
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[#102A43] sm:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-[#DCE8F0] bg-white p-7">
                <Icon className="h-7 w-7 text-[#078BE7]" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-[#102A43]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#627D98]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#062B4A] py-16">
        <div className="container-page grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            { value: "40", label: "Years of Experience" },
            { value: "FL", label: "Statewide Focus" },
            { value: "8+", label: "Financing Programs" },
            { value: "1", label: "Dedicated Point of Contact" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-4xl font-bold text-[#16C8D7]">{stat.value}</p>
              <p className="mt-2 text-sm text-[#DCE8F0]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-primary p-10 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Ready to Discuss Your Financing Goals?
            </h2>
            <p className="mt-2 text-white/90">
              NMLS #{COMPANY.nmls} &mdash; Serving {COMPANY.serviceArea}.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-[#064C7B] shadow-lg transition-transform hover:scale-[1.03]"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
