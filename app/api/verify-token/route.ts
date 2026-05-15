import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const user = verifyToken(token, process.env.INFOFRANKRIJK_SSO_SECRET);
  if (!user) return NextResponse.json({ valid: false }, { status: 401 });
  return NextResponse.json({ valid: true, user });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const user = verifyToken(body?.token, process.env.INFOFRANKRIJK_SSO_SECRET);
  if (!user) return NextResponse.json({ valid: false }, { status: 401 });
  return NextResponse.json({ valid: true, user });
}
