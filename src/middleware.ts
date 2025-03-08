import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // console.log(request);

  return NextResponse.next();
}
