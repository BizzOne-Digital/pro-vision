import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Award,
  MapPin,
  Home as HomeIcon,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ContactForm from "@/components/ContactForm";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import TeamMember from "@/models/TeamMember";
import PageContent from "@/models/PageContent";
import { getIcon } from "@/lib/icons";
import { COMPANY } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pro-Vision Team Funding Inc. | Florida Mortgage Financing",
  description:
    "Florida home financing experts with nearly 40 years of mortgage industry experience. Conventional, FHA, reverse mortgage, Non-QM, and private financing. NMLS #1190997.",
  openGraph: {
    title: "Pro-Vision Team Funding Inc. | Florida Mortgage Financing",
    description:
      "Florida home financing experts with nearly 40 years of mortgage industry experience.",
  },
};

const DEFAULT_SERVICES = [
  { title: "Conventional Loans", slug: "conventional-loans", shortDescription: "Flexible mortgage options for qualified buyers seeking traditional home financing.", icon: "Landmark" },
  { title: "FHA Loans", slug: "fha-loans", shortDescription: "Government-backed financing options designed to make homeownership more accessible for eligible buyers.", icon: "ShieldCheck" },
  { title: "Reverse Mortgages", slug: "reverse-mortgages", shortDescription: "Explore home-equity-based financing options available to eligible homeowners.", icon: "RefreshCw" },
  { title: "Non-QM Financing", slug: "non-qm-financing", shortDescription: "Alternative financing solutions for borrowers whose financial situation may not fit traditional mortgage qualification models.", icon: "FileText" },
  { title: "Private Lender Financing", slug: "private-lender-financing", shortDescription: "Flexible private financing options for select real-estate and investment scenarios.", icon: "HandCoins" },
  { title: "Free Consultation", slug: "free-consultation", shortDescription: "Discuss your goals with an experienced mortgage professional and explore potential financing paths.", icon: "MessageCircle" },
];

async function getHomeData() {
  try {
    await connectToDatabase();
    const [services, team, content] = await Promise.all([
      Service.find({ isActive: true }).sort({ sortOrder: 1 }).limit(6).lean(),
      TeamMember.find({ isActive: true }).sort({ sortOrder: 1 }).limit(1).lean(),
      PageContent.findOne({ page: "home" }).lean(),
    ]);
    return {
      services: services.length > 0 ? services : null,
      teamMember: team[0] || null,
      content: content || null,
    };
  } catch {
    return { services: null, teamMember: null, content: null };
  }
}

export default async function HomePage() {
  const { services, teamMember, content } = await getHomeData();
  const displayServices = services || DEFAULT_SERVICES;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: COMPANY.name,
    description:
      "Florida mortgage financing services including conventional, FHA, reverse mortgage, Non-QM, and private financing.",
    areaServed: {
      "@type": "State",
      name: "Florida",
    },
    email: COMPANY.email,
    telephone: COMPANY.phone,
    identifier: `NMLS #${COMPANY.nmls}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative min-h-[85vh] overflow-hidden bg-[#031D33] sm:min-h-[92vh]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={content?.heroImage || "/hero.png"}
            alt="Luxury waterfront home in Florida"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031D33] via-[#031D33]/70 to-transparent sm:from-[#031D33] sm:via-[#031D33]/40 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031D33]/70 via-transparent to-transparent" />
        </div>

        <div className="container-page relative flex min-h-[85vh] flex-col justify-center pb-28 pt-24 sm:min-h-[92vh] sm:pt-32">
          <p className="inline-block w-fit rounded-full border border-[#16C8D7]/40 bg-[#031D33]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#16C8D7] backdrop-blur-sm">
            {content?.heroEyebrow || "Florida Home Financing Experts"}
          </p>
          <h1
            className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-tight text-white [text-shadow:0_2px_16px_rgba(3,29,51,0.85)] sm:text-5xl lg:text-6xl"
          >
            {content?.heroTitle || "Your Financing"}{" "}
            <span className="text-[#3DE0EE] [text-shadow:0_2px_14px_rgba(3,29,51,0.95)]">
              {content?.heroHighlightedText || "Done Right."}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#DCE8F0] [text-shadow:0_2px_12px_rgba(3,29,51,0.9)]">
            {content?.heroDescription ||
              "With nearly 40 years of mortgage industry experience, Pro-Vision Team Funding Inc. helps Florida homebuyers and homeowners find financing options aligned with their goals."}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={content?.primaryCtaUrl || "/contact"}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              {content?.primaryCtaText || "Get Started"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {content?.secondaryCtaText || "Talk to an Expert"}
            </a>
          </div>
        </div>

        <div className="container-page relative -mb-16 translate-y-16">
          <div className="grid grid-cols-2 gap-6 rounded-2xl bg-white p-8 shadow-xl sm:grid-cols-4">
            {[
              { icon: Award, label: "Nearly 40 Years Experience" },
              { icon: MapPin, label: "Florida Focused" },
              { icon: HomeIcon, label: "Home Purchase" },
              { icon: RefreshCw, label: "Refinance" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <Icon className="h-7 w-7 text-[#078BE7]" aria-hidden="true" />
                <span className="text-sm font-semibold text-[#102A43]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="bg-white pb-24 pt-40 sm:pt-32">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={content?.aboutImage || "/img1.png"}
                alt="John Lodato, Florida mortgage professional"
                width={640}
                height={480}
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#078BE7]">
              {content?.aboutTitle ? "" : "About Pro-Vision"}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[#102A43] sm:text-4xl">
              {content?.aboutTitle || "Guided by Nearly 40 Years of Mortgage Experience"}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#627D98]">
              {content?.aboutDescription ||
                "John Lodato founded Pro-Vision Team Funding Inc. to bring personalized, experienced guidance to Florida homebuyers and homeowners. From first-time purchases to refinancing and investment property financing, John and the Pro-Vision team work to understand each client's goals and help them explore the financing paths available to them."}
            </p>
            <ul className="mt-6 space-y-3">
              {["Conventional, FHA, and Non-QM programs", "Reverse mortgage and private financing options", "Personalized guidance from consultation to closing"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#102A43]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16C8D7]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#078BE7] hover:text-[#064C7B]"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-[#EFF7FC] py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#078BE7]">
              Financing Solutions
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[#102A43] sm:text-4xl">
              Services Built Around Your Goals
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <Link
                  key={service.slug}
                  href={`/services#${service.slug}`}
                  className="group rounded-xl border border-[#DCE8F0] bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex rounded-lg bg-gradient-primary p-3">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-[#102A43]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#627D98]">
                    {service.shortDescription}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#078BE7] transition-transform group-hover:translate-x-1">
                    Learn More
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-[#062B4A] py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#16C8D7]">
              Why Choose Pro-Vision
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-white">
              {content?.whyChooseTitle || "We Build Brighter Tomorrows"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#DCE8F0]/80">
              A Florida-focused approach backed by nearly four decades of mortgage industry
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
            {[
              { icon: Award, title: "Deep Experience", desc: "Nearly 40 years navigating the mortgage industry across changing markets." },
              { icon: MapPin, title: "Florida Focused", desc: "Dedicated knowledge of the Florida homebuying and refinancing landscape." },
              { icon: CheckCircle2, title: "Personalized Guidance", desc: "Financing paths explored around your unique goals and circumstances." },
              { icon: RefreshCw, title: "Responsive Communication", desc: "Clear, timely updates from your first call through closing." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <Icon className="h-8 w-8 text-[#16C8D7]" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#DCE8F0]/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Florida lifestyle showcase */}
      <section className="bg-white py-24">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#078BE7]">
              Our Commitment
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#102A43] sm:text-4xl">
              Helping Florida Families Build Brighter Futures
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#627D98]">
              From first-time buyers to seasoned investors, Pro-Vision Team Funding Inc. walks
              alongside Florida homeowners at every stage of the journey &mdash; bringing nearly
              40 years of mortgage experience to every conversation, and personalized guidance to
              every closing.
            </p>
            <div className="mt-6 rounded-xl bg-[#EFF7FC] p-6">
              <p className="font-heading italic leading-snug text-[#102A43]">
                &ldquo;Helping people achieve the dream of homeownership is more than a career
                &mdash; it&rsquo;s my life&rsquo;s work.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-[#627D98]">&mdash; John Lodato</p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#078BE7] hover:text-[#064C7B]"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <ImageWithFallback
              src="/img3.png"
              alt="Florida People. Florida Homes. A Brighter Tomorrow."
              width={800}
              height={1000}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Florida lifestyle showcase - part two */}
      <section className="bg-[#EFF7FC] py-24">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl lg:order-1">
            <ImageWithFallback
              src="/img2.png"
              alt="Same Dreams. A Brighter Florida."
              width={800}
              height={1000}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#078BE7]">
              Florida Focused
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#102A43] sm:text-4xl">
              The Same Dreams. A Brighter Florida.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#627D98]">
              Whether you are purchasing your first home, refinancing, or growing a portfolio of
              investment properties, Pro-Vision Team Funding Inc. is focused exclusively on
              helping Florida buyers and homeowners find financing that fits their goals.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#078BE7] hover:text-[#064C7B]"
            >
              Schedule a Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-gradient-primary py-20">
        <div className="container-page flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white">
              {content?.ctaTitle || "Ready to Explore Your Financing Options?"}
            </h2>
            <p className="mt-3 max-w-xl text-white/90">
              {content?.ctaDescription ||
                "Schedule a free consultation with John Lodato and take the next step toward your financing goals."}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-[#064C7B] shadow-lg transition-transform hover:scale-[1.03]"
          >
            Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#EFF7FC] py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#078BE7]">
              Get In Touch
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[#102A43] sm:text-4xl">
              Let&rsquo;s Talk About Your Financing Goals
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#627D98]">
              Reach out to discuss home purchase, refinance, or investment property financing
              options across Florida.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[#102A43]">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-[#078BE7]">
                  {COMPANY.email}
                </a>
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href={`tel:${COMPANY.phone}`} className="text-[#078BE7]">
                  {COMPANY.phoneFormatted}
                </a>
              </p>
              <p>
                <span className="font-semibold">Serving:</span> {COMPANY.serviceArea}
              </p>
              <p className="font-semibold">NMLS #{COMPANY.nmls}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
