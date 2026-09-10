import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const messages = await ContactSubmission.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, messages });
}
