import { NextRequest, NextResponse } from "next/server";
import { userApi } from "./api/user/user";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("request.nextUrl: ", request.nextUrl);
  console.log("pathname: ", pathname);
  if (pathname === "/") {
    return NextResponse.next();
  }

  const isLoggedIn = await userApi.checkIsLoggedIn();
  console.log("isLoggedIn: ", isLoggedIn);
  if (!isLoggedIn?.data) {
    return NextResponse.redirect(`${request.nextUrl.origin}`);
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
    "/friends/add",
    "/friends",
    "/admin/:path",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|signin|signup|shop|party|boards|users|friends|chatting).*)",
  ],
};
