import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
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
  const team = await TeamMember.find().sort({ sortOrder: 1 }).lean();
  return NextResponse.json({ success: true, team });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.name || !body.title || !body.bio) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    const count = await TeamMember.countDocuments();
    const member = await TeamMember.create({
      name: body.name,
      slug: body.slug ? slugify(body.slug) : slugify(body.name),
      title: body.title,
      bio: body.bio,
      image: body.image || undefined,
      email: body.email || undefined,
      phone: body.phone || undefined,
      nmlsNumber: body.nmlsNumber || undefined,
      linkedinUrl: body.linkedinUrl || undefined,
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : count,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    });

    return NextResponse.json({ success: true, member });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create team member" }, { status: 500 });
  }
}
