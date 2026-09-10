import type { Metadata } from "next";
import { Mail, Phone, ExternalLink, BadgeCheck } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import connectToDatabase from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { COMPANY } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team | Pro-Vision Team Funding Inc.",
  description:
    "Meet the Pro-Vision Team Funding Inc. team, led by John Lodato with nearly 40 years of mortgage industry experience serving Florida. NMLS #1190997.",
};

const DEFAULT_TEAM = [
  {
    slug: "john-lodato",
    name: "John Lodato",
    title: "Founder | Mortgage Professional",
    bio: "With nearly 40 years of experience in the mortgage industry, John Lodato has helped individuals and families throughout Florida purchase homes, refinance existing properties, and explore financing solutions aligned with their goals. His experience spans conventional financing, FHA programs, reverse mortgages, Non-QM solutions, and private financing.",
    email: COMPANY.email,
    phone: COMPANY.phone,
    nmlsNumber: COMPANY.nmls,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=800&h=1000&q=80",
    linkedinUrl: undefined as string | undefined,
  },
];

async function getTeam() {
  try {
    await connectToDatabase();
    const members = await TeamMember.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    return members.length > 0 ? members : DEFAULT_TEAM;
  } catch {
    return DEFAULT_TEAM;
  }
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <section className="bg-[#031D33] py-24 sm:py-28">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#16C8D7]">
            Our Team
          </p>
          <h1 className="mt-5 max-w-2xl font-heading text-4xl font-bold text-white sm:text-5xl">
            Experienced Guidance You Can Trust
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#DCE8F0]">
            Get to know the team behind Pro-Vision Team Funding Inc.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page space-y-10">
          {team.map((member) => (
            <div
              key={member.slug}
              className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#DCE8F0] bg-white shadow-sm md:grid-cols-5"
            >
              <div className="md:col-span-2">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  width={800}
                  height={1000}
                  className="h-72 w-full object-cover object-top md:h-full"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:col-span-3 lg:p-12">
                <h2 className="font-heading text-3xl font-bold text-[#102A43]">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold text-[#078BE7]">{member.title}</p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#627D98]">
                  {member.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#DCE8F0] pt-6 text-sm text-[#102A43]">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 hover:text-[#078BE7]"
                    >
                      <Mail className="h-4 w-4 text-[#078BE7]" aria-hidden="true" />
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 hover:text-[#078BE7]"
                    >
                      <Phone className="h-4 w-4 text-[#078BE7]" aria-hidden="true" />
                      {member.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                    </a>
                  )}
                  {member.nmlsNumber && (
                    <p className="flex items-center gap-2 font-semibold">
                      <BadgeCheck className="h-4 w-4 text-[#078BE7]" aria-hidden="true" />
                      NMLS #{member.nmlsNumber}
                    </p>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-[#078BE7]"
                    >
                      <ExternalLink className="h-4 w-4 text-[#078BE7]" aria-hidden="true" />
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
