import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { ALLOWED_UPLOAD_FOLDERS } from "@/lib/constants";

export const runtime = "nodejs";

function isSafeFilename(filename: string): boolean {
  return !filename.includes("..") && !filename.includes("/") && !filename.includes("\\");
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await context.params;

  if (!ALLOWED_UPLOAD_FOLDERS.includes(folder as (typeof ALLOWED_UPLOAD_FOLDERS)[number])) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!isSafeFilename(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await connectToDatabase();
  const upload = await StoredUpload.findOne({ folder, filename }).lean();

  if (!upload) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = Buffer.from(upload.data as unknown as Buffer);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": upload.mimeType,
      "Content-Length": String(upload.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
