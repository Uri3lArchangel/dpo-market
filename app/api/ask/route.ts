import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB"
import { createBuyOrderCheck } from "@/src/FE/Functions/Helpers/ChecksAndValidations"
import { NextRequest, NextResponse } from "next/server"
import {cookies} from 'next/headers'
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt"
import { updateUserWalletDataBid } from "@/src/FE/Functions/Helpers/BE/UserWalletDB"
import { UpdateOrder } from "@/app/trade/db"
import {  revalidateTag } from "next/cache"

export async function POST(req:NextRequest){
        try{

    const {InitialPrice,BidPrice,Amount,Pair,AmountPaid}:{InitialPrice:number,BidPrice:number,Amount:number,Pair:string,AmountPaid:number}=await req.json()
    const body={
        InitialPrice,
        BidPrice,
        Amount,
        Pair,
        AmountPaid,
    }
    const a= createBuyOrderCheck(body)

    if(a){
        return NextResponse.json(a,{status:400})
    }
    const cookie = cookies().get('dpo-session-base')
    if(!cookie || !cookie.value || cookie.value == ''){
        console.log(req.url)
        return NextResponse.json({path:"/auth/sign-in"},{status:307})

    }
    const cookiedata = jwtdecodebase(cookie.value)
    await connectMongo()
    const updateData = {InitialPrice,BidPrice,Amount,Pair}
    const updated = await UpdateOrder(cookiedata.Email,updateData)
    const v = await updateUserWalletDataBid(cookiedata.Email,Pair.split('/')[0],AmountPaid)
    if(v.status == "error"){
        await disconnectMongo()

        return NextResponse.json(v,{status:200})

    }
    await disconnectMongo()
    revalidateTag(process.env.CACHETAG!)
    return NextResponse.json({Data:updated,Status:"success",msg:`BUY order of ${Amount} ${Pair.split('/')[0]} at ${BidPrice} is placed`},{status:201})
}
    catch(err:any){
        console.error(err.message)
        return NextResponse.json({status:"error",msg:err.message})
    
    }
}