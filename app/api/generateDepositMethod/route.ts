import { NextRequest, NextResponse } from "next/server";
import {krakenRequest} from '@/src/FE/Functions/Helpers/BE/KrakenApiReq'
export async function POST(req:NextRequest) {
    const {asset}=await req.json()
    const res = await krakenRequest("/0/private/DepositMethods",{asset,nonce:(Date.now() * 100)})
    if(res.error.length > 0){
        return NextResponse.json({result:res.error},{status:400})
    }
    return NextResponse.json({result:res.result})
}