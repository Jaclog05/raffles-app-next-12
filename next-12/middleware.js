import { NextResponse } from "next/server";

export function middleware() {
  
  console.log('middleWare')
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};