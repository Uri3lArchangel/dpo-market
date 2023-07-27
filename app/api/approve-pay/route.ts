import { EquityInvestmentPostApprovedPayment } from "@/app/invest/primary-market/db"
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt"
import { hashData } from "@/src/FE/components/primary-market/functions/crypto"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest){
    const {DpoPurchased,AmountInvested,WalletAddress,Token,sessionCookie}:{DpoPurchased:string,AmountInvested:string,WalletAddress:string,Token:string,sessionCookie:any} = await req.json()
    const data ={DpoPurchased,AmountInvested,WalletAddress}
    const token = hashData(data,process.env.VERIFIERSECRET!)

    if(Token != token){
        return NextResponse.json({'message':'malformed payment request','description':'the payment request data has been incorrectly malformed as a result of tampering and would not be recorded',"type":'error'},{status:400})
    }
  
    if(!sessionCookie){
        return NextResponse.redirect(new URL('/auth/sign-in',req.nextUrl))
    }

    const uname= jwtdecodebase(sessionCookie.value).Username

   const response= await EquityInvestmentPostApprovedPayment(uname,(DpoPurchased),AmountInvested,WalletAddress)
    await fetch(process.env.BASEURL!+`/api/revalidate?tag=${process.env.CACHETAG!}`)

   return NextResponse.json(response,{status:201})
}