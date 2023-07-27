import { DebtInvestmentPostApprovedPayment, EquityInvestmentPostApprovedPayment } from "@/app/invest/primary-market/db"
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt"
import { hashData, hashData2 } from "@/src/FE/components/primary-market/functions/crypto"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest){
    const {NotesPurchased,AmountInvested,WalletAddress,faceValue,Token,sessionCookie}:{NotesPurchased:string,AmountInvested:string,WalletAddress:string,faceValue:string,Token:string,sessionCookie:any} = await req.json()
    const data ={NotesPurchased,AmountInvested,WalletAddress,faceValue}
    const token = hashData2(data,process.env.VERIFIERSECRET!)


    if(Token != token){
        return NextResponse.json({'message':'malformed payment request','description':'the payment request data has been incorrectly malformed as a result of tampering and would not be recorded',"type":'error'},{status:400})
    }
  
    if(!sessionCookie){
        return NextResponse.redirect(new URL('/auth/sign-in',req.nextUrl))
    }

    const uname= jwtdecodebase(sessionCookie.value).Username

   const response= await DebtInvestmentPostApprovedPayment(uname,NotesPurchased,AmountInvested,WalletAddress,faceValue)
    await fetch(process.env.BASEURL!+`/api/revalidate?tag=${process.env.CACHETAG!}`)

   return NextResponse.json(response,{status:201})
}