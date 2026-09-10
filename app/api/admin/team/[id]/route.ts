import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { getSession } from "@/lib/session";
import { deleteStoredUpload } from "@/lib/deleteStoredUpload";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await context.params;
    const body = await req.json();

    await connectToDatabase();
    const existing = await TeamMember.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Team member not found" }, { status: 404 });
    }

    if (body.image !== undefined && existing.image && body.image !== existing.image) {
      await deleteStoredUpload(existing.image);
    }

    existing.name = body.name ?? existing.name;
    existing.slug = body.slug ?? existing.slug;
    existing.title = body.title ?? existing.title;
    existing.bio = body.bio ?? existing.bio;
    existing.image = body.image !== undefined ? body.image || undefined : existing.image;
    existing.email = body.email !== undefined ? body.email || undefined : existing.email;
    existing.phone = body.phone !== undefined ? body.phone || undefined : existing.phone;
    existing.nmlsNumber = body.nmlsNumber !== undefined ? body.nmlsNumber || undefined : existing.nmlsNumber;
    existing.linkedinUrl = body.linkedinUrl !== undefined ? body.linkedinUrl || undefined : existing.linkedinUrl;
    existing.sortOrder = typeof body.sortOrder === "number" ? body.sortOrder : existing.sortOrder;
    existing.isActive = body.isActive !== undefined ? Boolean(body.isActive) : existing.isActive;
    await existing.save();

    return NextResponse.json({ success: true, member: existing });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await context.params;
    await connectToDatabase();
    const existing = await TeamMember.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Team member not found" }, { status: 404 });
    }
    if (existing.image) {
      await deleteStoredUpload(existing.image);
    }
    await TeamMember.deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete team member" }, { status: 500 });
  }
}
