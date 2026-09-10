import { getSession } from "@/lib/session";

export async function requireAdminSession() {
  const session = await getSession();
  if (!session) return null;
  return session;
}
