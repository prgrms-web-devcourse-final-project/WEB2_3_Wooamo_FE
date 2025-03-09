import { NextRequest, NextResponse } from "next/server";
import { userApi } from "./api/user/user";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.next();
  }

  const isLoggedIn = await userApi.checkIsLoggedIn();
  if (!isLoggedIn?.data) {
    return NextResponse.redirect(`${request.nextUrl.origin}/signin`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage",
    "/friends",
    "/boards/create",
    "/(party/(?!all$).*)",
    "/chatting/:path",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|signin|signup|shop|party|boards|users).*)",
  ],
};
