import type { Metadata } from "next";
import Link from "next/link";
import {
  Landmark,
  ShieldCheck,
  RefreshCw,
  FileText,
  HandCoins,
  Home,
  KeyRound,
  Building2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services | Pro-Vision Team Funding Inc.",
  description:
    "Explore financing solutions from Pro-Vision Team Funding Inc.: conventional, FHA, reverse mortgage, Non-QM, private financing, purchase, refinance, and investment property. NMLS #1190997.",
};

const SERVICES = [
  {
    id: "conventional",
    icon: Landmark,
    title: "Conventional Loans",
    overview:
      "Flexible mortgage options for qualified buyers seeking traditional home financing, available for a range of property types and purchase scenarios.",
    whoFor: "Buyers with steady income and credit history seeking a standard financing path.",
    benefits: [
      "Financing for primary residences, second homes, and more",
      "A range of term lengths to explore",
      "Works alongside conventional down payment structures",
    ],
  },
  {
    id: "fha",
    icon: ShieldCheck,
    title: "FHA Loans",
    overview:
      "Government-backed financing options designed to make homeownership more accessible for eligible buyers.",
    whoFor: "Buyers who may benefit from more flexible qualification guidelines.",
    benefits: [
      "Backed by the Federal Housing Administration",
      "Designed with accessibility in mind",
      "Available for eligible first-time and repeat buyers",
    ],
  },
  {
    id: "reverse-mortgage",
    icon: RefreshCw,
    title: "Reverse Mortgages",
    overview:
      "Explore home-equity-based financing options available to eligible homeowners looking to access the equity they have built.",
    whoFor: "Eligible homeowners exploring ways to utilize home equity.",
    benefits: [
      "Home-equity-based financing options",
      "Guidance through eligibility requirements",
      "Explained clearly, with no pressure",
    ],
  },
  {
    id: "non-qm",
    icon: FileText,
    title: "Non-QM Financing",
    overview:
      "Alternative financing solutions for borrowers whose financial situation may not fit traditional mortgage qualification models.",
    whoFor: "Self-employed borrowers or those with non-traditional income documentation.",
    benefits: [
      "Alternative documentation approaches",
      "Designed for non-traditional financial profiles",
      "Explored case-by-case with an experienced professional",
    ],
  },
  {
    id: "private-lender",
    icon: HandCoins,
    title: "Private Lender Financing",
    overview:
      "Flexible private financing options for select real-estate and investment scenarios that may not fit conventional lending structures.",
    whoFor: "Buyers and investors with unique or time-sensitive financing needs.",
    benefits: [
      "Flexible structures for select scenarios",
      "Considered alongside conventional options",
      "Guidance to determine what may fit your situation",
    ],
  },
  {
    id: "home-purchase",
    icon: Home,
    title: "Home Purchase Financing",
    overview:
      "Guidance through the financing process for buyers purchasing a home in Florida, from initial consultation through closing.",
    whoFor: "First-time and repeat buyers throughout Florida.",
    benefits: [
      "Support from consultation through closing",
      "Clear explanations at every step",
      "A single, experienced point of contact",
    ],
  },
  {
    id: "refinancing",
    icon: KeyRound,
    title: "Refinance Solutions",
    overview:
      "Review your current mortgage and explore refinancing options that may better align with your financial goals.",
    whoFor: "Homeowners looking to reassess their current mortgage terms.",
    benefits: [
      "A review of your current mortgage situation",
      "Exploration of available refinance options",
      "Straightforward guidance on next steps",
    ],
  },
  {
    id: "investment-property",
    icon: Building2,
    title: "Investment & Rental Property Financing",
    overview:
      "Financing options for qualifying buyers purchasing rental and investment real estate across Florida.",
    whoFor: "Investors expanding or starting a rental property portfolio.",
    benefits: [
      "Financing options for qualifying investment purchases",
      "Guidance suited to investment property scenarios",
      "Support for buyers building a rental portfolio",
    ],
  },
  {
    id: "free-consultation",
    icon: MessageCircle,
    title: "Free Consultation",
    overview:
      "Discuss your goals with an experienced mortgage professional and explore potential financing paths, with no obligation.",
    whoFor: "Anyone exploring financing options for the first time or reassessing their path.",
    benefits: [
      "No-obligation conversation about your goals",
      "Nearly 40 years of experience behind every recommendation",
      "A clear next step, whatever you decide",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-[#031D33] py-24 sm:py-28">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#16C8D7]">
            Financing Solutions
          </p>
          <h1 className="mt-5 max-w-2xl font-heading text-4xl font-bold text-white sm:text-5xl">
            Financing Solutions Built Around Your Goals
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#DCE8F0]">
            From first-time purchases to refinancing and investment properties, explore the
            programs available to you with an experienced Florida mortgage professional.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page space-y-16">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-24 grid grid-cols-1 gap-10 rounded-2xl border border-[#DCE8F0] p-8 sm:p-10 lg:grid-cols-3 ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#EFF7FC]"
                }`}
              >
                <div>
                  <div className="inline-flex rounded-lg bg-gradient-primary p-3">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 font-heading text-2xl font-bold text-[#102A43]">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm font-semibold text-[#627D98]">Who it&rsquo;s for</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#627D98]">{service.whoFor}</p>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-base leading-relaxed text-[#627D98]">{service.overview}</p>
                  <ul className="mt-6 space-y-2">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-[#102A43]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16C8D7]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#078BE7] hover:text-[#064C7B]"
                  >
                    Ask About {service.title}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#EFF7FC] py-14">
        <div className="container-page">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-[#627D98]">
            Loan programs, eligibility and terms are subject to applicable lender guidelines and
            approval. NMLS #{COMPANY.nmls}.
          </p>
        </div>
      </section>
    </>
  );
}
