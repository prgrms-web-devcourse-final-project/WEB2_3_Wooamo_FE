import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export async function middleware(request: NextRequest) {
  const accessToken = await getCookie("accessToken", { req: request });
  if (accessToken) {
    request.headers.set("Access", accessToken);
  }

  const response = NextResponse.next();

  return response;
}
