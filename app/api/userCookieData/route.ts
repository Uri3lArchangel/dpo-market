import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {cookie}=await req.json()
    const data= jwtdecodebase(cookie.value)
    if(!data){
        return NextResponse.json({data:null})
    }
    return NextResponse.json({data})
}