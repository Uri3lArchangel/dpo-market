import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtdecodebase } from "./src/BE/web2/functions/jwt";
import { fetchUserByUnmame } from "./app/auth/sign-up/db";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage.external";

export async function middleware(request: NextRequest) {
  const sessionCookieData = request.cookies.get("dpo-session-base");

  if (!sessionCookieData || !sessionCookieData.value) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
  }

  const res=await fetch(new URL('/api/userdata',request.nextUrl),{
    method:'POST',
    body:JSON.stringify({cookie:sessionCookieData.value})
})

const data = await res.json()
if(request.nextUrl.pathname.includes("verifyemail") && data.data.Verified){
  return NextResponse.redirect(new URL("/portfolio",request.nextUrl))
}
if(request.nextUrl.pathname.includes("verifyemail") && !data.data.Verified){
  return NextResponse.next()
}
  if (!data.status) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
  }
  if(!data.data.Verified && !request.nextUrl.pathname.includes("verifyemail")){
    return NextResponse.redirect(new URL("/verifyemail", request.nextUrl));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/portfolio", "/invest/:path+","/verifyemail"],
};
