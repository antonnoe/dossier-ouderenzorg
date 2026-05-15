import crypto from "node:crypto";
import { cookies, headers } from "next/headers";

export type Role = "free" | "premium";
export interface SessionUser {
  userId: string;
  role: Role;
  exp: number;
}

const TOKEN_COOKIE = "if_sso";
const TOKEN_QUERY = "sso";

function b64urlDecode(input: string): string {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64").toString("utf-8");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

/**
 * Token-formaat: base64url(payloadJSON).hex(hmacSha256(secret, payloadJSON))
 * Payload: { userId, role, exp } — exp is unix-seconds.
 */
export function verifyToken(token: string | null | undefined, secret: string | undefined): SessionUser | null {
  if (!token || !secret) return null;
  const dot = token.indexOf(".");
  if (dot < 0) return null;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let payloadJson: string;
  try {
    payloadJson = b64urlDecode(payloadB64);
  } catch {
    return null;
  }
  const expected = crypto.createHmac("sha256", secret).update(payloadJson).digest("hex");
  if (!timingSafeEqualHex(sig, expected)) return null;
  let payload: SessionUser;
  try {
    payload = JSON.parse(payloadJson) as SessionUser;
  } catch {
    return null;
  }
  if (!payload || typeof payload !== "object") return null;
  if (payload.role !== "free" && payload.role !== "premium") return null;
  if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;
  if (typeof payload.userId !== "string") return null;
  return payload;
}

export function getSessionFromRequest(searchParams?: Record<string, string | string[] | undefined>): SessionUser | null {
  const secret = process.env.INFOFRANKRIJK_SSO_SECRET;
  const queryToken = (() => {
    const v = searchParams?.[TOKEN_QUERY];
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v[0];
    return undefined;
  })();
  const cookieToken = cookies().get(TOKEN_COOKIE)?.value;
  const headerToken = headers().get("x-if-sso") ?? undefined;
  return verifyToken(queryToken ?? cookieToken ?? headerToken, secret);
}

export function isPremium(user: SessionUser | null): boolean {
  return user?.role === "premium";
}

export const TOKEN_NAMES = { cookie: TOKEN_COOKIE, query: TOKEN_QUERY };
