import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB"
import { createBuyOrderCheck } from "@/src/FE/Functions/Helpers/ChecksAndValidations"
import { NextRequest, NextResponse } from "next/server"
import {cookies} from 'next/headers'
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt"
import { updateUserWalletDataBid } from "@/src/FE/Functions/Helpers/BE/UserWalletDB"
import { UpdateOrder } from "@/app/trade/db"
import { redirect } from "next/navigation"

export async function POST(req:NextRequest){
        try{

    const {InitialPrice,BidPrice,Amount,Pair,AmountPaid,Checksum}:{InitialPrice:number,BidPrice:number,Amount:number,Pair:string,AmountPaid:number,Checksum:string}=await req.json()
    const body={
        InitialPrice,
        BidPrice,
        Amount,
        Pair,
        AmountPaid,
        Checksum
    }
    const a= createBuyOrderCheck(body)

    if(a){
        return NextResponse.json(a,{status:400})
    }
    const cookie = cookies().get('dpo-session-base')
    if(!cookie || !cookie.value || cookie.value == ''){
        console.log(req.url)
        return redirect(new URL(req.nextUrl).origin+"/auth/sign-in")
        // return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl),{status:301})

    }
    const cookiedata = jwtdecodebase(cookie.value)
    await connectMongo()

    const v = await updateUserWalletDataBid(cookiedata.Email,Pair.split('/')[1],AmountPaid)
    if(v.status == "error"){
        await disconnectMongo()

        return NextResponse.json(v,{status:200})

    }
  const updateData = {InitialPrice,BidPrice,Amount,Pair}
    const updated = await UpdateOrder(cookiedata.Email,updateData)
    await disconnectMongo()
    return NextResponse.json({Data:updated,Status:"success",msg:`BUY order of ${Amount} ${Pair.split('/')[0]} at ${BidPrice} is placed`},{status:201})
}
    catch(err:any){
        console.error(err.message)
        return NextResponse.json({status:"error",msg:err.message})
    
    }
}