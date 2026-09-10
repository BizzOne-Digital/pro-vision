import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await context.params;
    const body = await req.json();

    if (!["new", "read", "resolved"].includes(body.status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    await connectToDatabase();
    const message = await ContactSubmission.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await context.params;
    await connectToDatabase();
    await ContactSubmission.deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete message" }, { status: 500 });
  }
}
