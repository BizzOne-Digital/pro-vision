import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import TeamMember from "@/models/TeamMember";
import ContactSubmission from "@/models/ContactSubmission";
import StoredUpload from "@/models/StoredUpload";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  const [totalServices, totalTeamMembers, totalMessages, totalUploads, recentMessages] =
    await Promise.all([
      Service.countDocuments(),
      TeamMember.countDocuments(),
      ContactSubmission.countDocuments(),
      StoredUpload.countDocuments(),
      ContactSubmission.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

  return NextResponse.json({
    success: true,
    stats: { totalServices, totalTeamMembers, totalMessages, totalUploads },
    recentMessages,
  });
}
