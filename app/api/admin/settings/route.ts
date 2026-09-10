import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { getSession } from "@/lib/session";
import { COMPANY } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({
      companyName: COMPANY.name,
      email: COMPANY.email,
      phone: COMPANY.phone,
      serviceArea: COMPANY.serviceArea,
      nmlsNumber: COMPANY.nmls,
    });
  }

  return NextResponse.json({ success: true, settings });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    await connectToDatabase();

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
    }

    const fields = [
      "companyName",
      "logoUrl",
      "email",
      "phone",
      "address",
      "serviceArea",
      "nmlsNumber",
      "facebookUrl",
      "instagramUrl",
      "linkedinUrl",
      "youtubeUrl",
      "heroCtaText",
      "heroCtaUrl",
      "footerDescription",
    ] as const;

    for (const field of fields) {
      if (body[field] !== undefined) {
        settings.set(field, body[field] || undefined);
      }
    }

    await settings.save();
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}
