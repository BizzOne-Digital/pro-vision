import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import connectToDatabase from "@/lib/mongodb";
import SiteSettings, { type ISiteSettings } from "@/models/SiteSettings";
import { COMPANY } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Pro-Vision Team Funding Inc. | Florida Mortgage Financing",
    template: "%s | Pro-Vision Team Funding Inc.",
  },
  description:
    "Pro-Vision Team Funding Inc. helps homebuyers and homeowners across Florida explore conventional, FHA, reverse mortgage, Non-QM, and private financing options. NMLS #1190997.",
  openGraph: {
    siteName: "Pro-Vision Team Funding Inc.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

async function getSettings(): Promise<Partial<ISiteSettings> | null> {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();
    return settings;
  } catch {
    return null;
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header logoUrl={settings?.logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer
          companyName={settings?.companyName || COMPANY.name}
          email={settings?.email || COMPANY.email}
          phone={settings?.phone || COMPANY.phone}
          serviceArea={settings?.serviceArea || COMPANY.serviceArea}
          nmlsNumber={settings?.nmlsNumber || COMPANY.nmls}
          footerDescription={settings?.footerDescription}
          facebookUrl={settings?.facebookUrl}
          instagramUrl={settings?.instagramUrl}
          linkedinUrl={settings?.linkedinUrl}
          youtubeUrl={settings?.youtubeUrl}
        />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
