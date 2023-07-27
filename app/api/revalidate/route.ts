import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const tag = req.nextUrl.searchParams.get('tag')
    if(!tag){
        return NextResponse.json({message:'invalid revalidation tag'})
    }
    revalidateTag(tag)
    return NextResponse.json({revalidated:true})
}