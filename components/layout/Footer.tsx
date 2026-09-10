import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface FooterProps {
  companyName?: string;
  email?: string;
  phone?: string;
  serviceArea?: string;
  nmlsNumber?: string;
  footerDescription?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
}

export default function Footer({
  companyName = COMPANY.name,
  email = COMPANY.email,
  phone = COMPANY.phone,
  serviceArea = COMPANY.serviceArea,
  nmlsNumber = COMPANY.nmls,
  footerDescription,
  facebookUrl,
  instagramUrl,
  linkedinUrl,
  youtubeUrl,
}: FooterProps) {
  const year = new Date().getFullYear();
  const socials = [
    { url: facebookUrl, label: "Facebook" },
    { url: instagramUrl, label: "Instagram" },
    { url: linkedinUrl, label: "LinkedIn" },
    { url: youtubeUrl, label: "YouTube" },
  ].filter((s) => Boolean(s.url));

  return (
    <footer className="bg-[#031D33] text-[#DCE8F0]">
      <div className="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-white">{companyName}</h3>
          <p className="mt-4 text-sm leading-relaxed text-[#87EDF0]/80">
            {footerDescription ||
              "Helping homebuyers and homeowners across Florida explore financing options with nearly 40 years of mortgage industry experience."}
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map(({ url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full bg-white/10 p-2 transition-colors hover:bg-[#078BE7]"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-[#16C8D7]">About Us</Link></li>
            <li><Link href="/team" className="hover:text-[#16C8D7]">Our Team</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Financing</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/services#conventional" className="hover:text-[#16C8D7]">Conventional Loans</Link></li>
            <li><Link href="/services#fha" className="hover:text-[#16C8D7]">FHA Loans</Link></li>
            <li><Link href="/services#reverse-mortgage" className="hover:text-[#16C8D7]">Reverse Mortgage</Link></li>
            <li><Link href="/services#non-qm" className="hover:text-[#16C8D7]">Non-QM Financing</Link></li>
            <li><Link href="/services#private-lender" className="hover:text-[#16C8D7]">Private Financing</Link></li>
            <li><Link href="/services#refinancing" className="hover:text-[#16C8D7]">Refinancing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#16C8D7]" aria-hidden="true" />
              <a href={`mailto:${email}`} className="hover:text-[#16C8D7]">{email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#16C8D7]" aria-hidden="true" />
              <a href={`tel:${phone}`} className="hover:text-[#16C8D7]">
                {phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#16C8D7]" aria-hidden="true" />
              <span>{serviceArea}</span>
            </li>
            <li className="pt-1 font-semibold text-white">NMLS #{nmlsNumber}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-[#87EDF0]/70 sm:flex-row">
          <p>
            &copy; {year} {companyName}. All rights reserved. NMLS #{nmlsNumber}.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>
        <div className="container-page pb-6 text-[11px] leading-relaxed text-[#87EDF0]/50">
          Loan programs, terms, conditions, and eligibility are subject to change and applicable
          lender guidelines. Contact {companyName} for current program information.
        </div>
      </div>
    </footer>
  );
}
