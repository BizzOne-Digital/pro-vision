import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
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
    const existing = await Service.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    if (body.image !== undefined && existing.image && body.image !== existing.image) {
      await deleteStoredUpload(existing.image);
    }

    existing.title = body.title ?? existing.title;
    existing.slug = body.slug ?? existing.slug;
    existing.shortDescription = body.shortDescription ?? existing.shortDescription;
    existing.description = body.description ?? existing.description;
    existing.image = body.image !== undefined ? body.image || undefined : existing.image;
    existing.icon = body.icon ?? existing.icon;
    existing.sortOrder = typeof body.sortOrder === "number" ? body.sortOrder : existing.sortOrder;
    existing.isActive = body.isActive !== undefined ? Boolean(body.isActive) : existing.isActive;
    existing.seoTitle = body.seoTitle ?? existing.seoTitle;
    existing.seoDescription = body.seoDescription ?? existing.seoDescription;
    await existing.save();

    return NextResponse.json({ success: true, service: existing });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await context.params;
    await connectToDatabase();
    const existing = await Service.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    if (existing.image) {
      await deleteStoredUpload(existing.image);
    }
    await Service.deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
