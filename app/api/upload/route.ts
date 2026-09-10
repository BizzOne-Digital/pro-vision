import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { getSession } from "@/lib/session";
import { ALLOWED_UPLOAD_FOLDERS, ALLOWED_MIME_TYPES, MAX_UPLOAD_SIZE_BYTES } from "@/lib/constants";

export const runtime = "nodejs";

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (typeof folder !== "string" || !ALLOWED_UPLOAD_FOLDERS.includes(folder as (typeof ALLOWED_UPLOAD_FOLDERS)[number])) {
      return NextResponse.json({ success: false, error: "Invalid folder" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Unsupported file type" }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      return NextResponse.json({ success: false, error: "File too large (max 8MB)" }, { status: 400 });
    }

    const ext = EXT_BY_MIME[file.type] || "bin";
    const randomHex = crypto.randomBytes(8).toString("hex");
    const filename = `${Date.now()}-${randomHex}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await connectToDatabase();
    await StoredUpload.create({
      folder,
      filename,
      mimeType: file.type,
      size: file.size,
      data: buffer,
    });

    return NextResponse.json({
      success: true,
      url: `/api/uploads/${folder}/${filename}`,
      filename,
      size: file.size,
      folder,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
