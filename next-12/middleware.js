import { NextResponse } from "next/server";
import {jwtVerify} from "jose"

export async function middleware(request) {
  const jwt = request.cookies.get('token')
  
  if(!jwt){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const {payload} = await jwtVerify(jwt.value, new TextEncoder().encode('secret'))
      if (payload.role == 'User' && request.nextUrl.pathname.startsWith('/createRaffle')) {
        console.log('User Role')
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

}

export const config = {
  matcher: ["/dashboard/:path*", "/createRaffle/:path*"],
};

