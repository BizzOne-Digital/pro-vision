import connectToDatabase from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { ALLOWED_UPLOAD_FOLDERS } from "@/lib/constants";

function isSafeFilename(filename: string): boolean {
  return !filename.includes("..") && !filename.includes("/") && !filename.includes("\\");
}

export async function deleteStoredUpload(url: string | undefined | null): Promise<void> {
  if (!url || !url.startsWith("/api/uploads/")) return;

  const parts = url.replace("/api/uploads/", "").split("/");
  if (parts.length !== 2) return;

  const [folder, filename] = parts;
  if (!ALLOWED_UPLOAD_FOLDERS.includes(folder as (typeof ALLOWED_UPLOAD_FOLDERS)[number])) return;
  if (!isSafeFilename(filename)) return;

  await connectToDatabase();
  await StoredUpload.deleteOne({ folder, filename });
}

export default deleteStoredUpload;
