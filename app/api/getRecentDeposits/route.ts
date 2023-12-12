import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {cookie} = await req.json()
    if(!cookie || !cookie.value) return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl))
    const user = jwtdecodebase(cookie.value)
    if(!user) return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl))
    
}