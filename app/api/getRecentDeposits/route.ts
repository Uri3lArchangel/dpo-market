import { pendingDepositCheck, updateWalletCoinsDeposit } from "@/app/auth/sign-up/db";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { krakenRequest } from "@/src/FE/Functions/Helpers/BE/KrakenApiReq";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {cookie} = await req.json()
    if(!cookie || !cookie.value) return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl))
    const user = jwtdecodebase(cookie.value)
    if(!user) return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl))
    const active = await pendingDepositCheck(user.Email)
    let response=[]
for(let i=0;i<active.length;i++){
    let r = await krakenRequest("/0/private/DepositStatus",{nonce:(Date.now()*100),asset:active[i].asset,method:active[i].method,start:active[i].minTime,end:active[i].maxTime})
    if(r.result >0){
        let sym = active[i].asset
        let state="i"
        if(sym == "XBT")sym = "BTC"
        if(String(r.result[0].status).toUpperCase() == "PENDING") state = "p";
        if(String(r.result[0].status).toUpperCase() == "SUCCESS") state = "s";
        if(String(r.result[0].status).toUpperCase() == "FAILURE") state = "f";

        await updateWalletCoinsDeposit(user.Email,r.result[0].amount,state,sym)
    }
     response.push(r)
}

return NextResponse.json({})
}