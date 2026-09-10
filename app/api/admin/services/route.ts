import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const services = await Service.find().sort({ sortOrder: 1 }).lean();
  return NextResponse.json({ success: true, services });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.shortDescription || !body.description) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    const count = await Service.countDocuments();
    const service = await Service.create({
      title: body.title,
      slug: body.slug ? slugify(body.slug) : slugify(body.title),
      shortDescription: body.shortDescription,
      description: body.description,
      image: body.image || undefined,
      icon: body.icon || "Home",
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : count,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      seoTitle: body.seoTitle || undefined,
      seoDescription: body.seoDescription || undefined,
    });

    return NextResponse.json({ success: true, service });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}
