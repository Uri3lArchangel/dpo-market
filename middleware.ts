import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const sessionCookieData = request.cookies.get('dpo-session-base')
  if(!sessionCookieData){
return NextResponse.redirect(new URL('/auth/sign-in',request.nextUrl))
  }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/portfolio','/invest/:path+'],
}