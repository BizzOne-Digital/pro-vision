"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ logoUrl }: { logoUrl?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-[#031D33] text-white text-xs">
        <div className="container-page flex items-center justify-between gap-4 py-2">
          <span className="whitespace-nowrap font-medium">NMLS #{COMPANY.nmls}</span>
          <span className="hidden flex-1 text-center text-[#87EDF0] md:block">
            Proudly Serving Homebuyers &amp; Homeowners Across Florida
          </span>
          <span className="hidden whitespace-nowrap lg:block">
            Your Goals. Our Experience. A Brighter Tomorrow.
          </span>
        </div>
      </div>

      <div
        className={`bg-white transition-shadow ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/" className="flex flex-col leading-tight">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={COMPANY.name} className="h-10 w-auto" />
            ) : (
              <>
                <span className="font-heading text-xl font-bold tracking-wide text-[#062B4A]">
                  PRO-VISION
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#627D98]">
                  Team Funding Inc.
                </span>
              </>
            )}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#078BE7] ${
                  pathname === link.href ? "text-[#078BE7]" : "text-[#102A43]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03]"
            >
              Free Consultation
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#062B4A] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-[#DCE8F0] bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-3 text-base font-medium ${
                  pathname === link.href
                    ? "bg-[#EFF7FC] text-[#078BE7]"
                    : "text-[#102A43] hover:bg-[#EFF7FC]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${COMPANY.phone}`}
              className="mt-2 flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-[#102A43]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {COMPANY.phoneFormatted}
            </a>
            <Link
              href="/contact"
              className="mt-2 rounded-md bg-gradient-primary px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Free Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
