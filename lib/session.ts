import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export const AUTH_COOKIE_NAME = "spine_token";

/**
 * Reads the JWT from the httpOnly cookie and returns the userId,
 * or null if there's no valid session. Use this at the top of any
 * protected API route.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) return null;

  const payload = verifyToken(token);
  return payload?.userId ?? null;
}   