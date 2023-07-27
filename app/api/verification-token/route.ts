import { jwtverify } from "@/src/BE/web2/functions/jwt"
import { NextResponse } from "next/server"

export async function POST(req:Request){
const {DpoPurchased,AmountInvested,WalletAddress} = await req.json()
const refined = {DpoPurchased,AmountInvested,WalletAddress,Key:process.env.JWTVERIFIERSECRET!}
let token = jwtverify(refined)
return NextResponse.json({token})
}