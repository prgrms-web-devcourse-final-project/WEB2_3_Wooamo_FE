import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) return new Response("code is required", { status: 400 });
  const url = request.nextUrl.clone();
  url.pathname = "/signin";

  const res = NextResponse.redirect(url);
  return res;
}
