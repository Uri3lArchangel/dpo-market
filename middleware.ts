import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtdecodebase } from "./src/BE/web2/functions/jwt";
import { fetchUserByUnmame } from "./app/auth/sign-up/db";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage.external";

// Middleware handles rounting

export async function middleware(request: NextRequest) {

// Getting the user session cookie
  const sessionCookieData = request.cookies.get("dpo-session-base");

  // Checking if the cookie is defined if not redirect to signin page

  if ((!sessionCookieData || !sessionCookieData.value)) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
  }

  // handles verifying and decoding JWT cookie gotten above
  
  const res=await fetch(new URL('/api/userCookieData',request.nextUrl),{
    method:'POST',
    body:JSON.stringify({cookie:sessionCookieData})
})
const data = await res.json()

// Checks for all possible routing to verifyemail page
if(data.data == null){
  return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));

}
if(request.nextUrl.pathname.includes("verifyemail") && data.data.status){
  return NextResponse.redirect(new URL("/portfolio",request.nextUrl))
}

if(request.nextUrl.pathname.includes("verifyemail") && data.data.status){
  return NextResponse.redirect(new URL("/portfolio",request.nextUrl))
}
if(request.nextUrl.pathname.includes("verifyemail") && !data.data.status){
  return NextResponse.next()
}

  // if(!data.data.status && !request.nextUrl.pathname.includes("verifyemail")){
  //   return NextResponse.redirect(new URL("/verifyemail", request.nextUrl));
  // }
  
  // Checks for all possible routing to signin page

  // if(request.nextUrl.pathname.includes("sign-in") && data.data.Email){
  //   return NextResponse.redirect(new URL("/portfolio",request.nextUrl))
  // }

  // if(request.nextUrl.pathname.includes("sign-up") && data.data.Email){
  //   return NextResponse.redirect(new URL("/portfolio",request.nextUrl))
  // }


  return NextResponse.next();
}


// ,"/auth/sign-in","/auth/sign-up"

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/portfolio", "/invest/:path+","/verifyemail"],
};
