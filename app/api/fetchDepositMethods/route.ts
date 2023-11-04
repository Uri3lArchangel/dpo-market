import { NextRequest, NextResponse } from "next/server";
import { GetMessageSignature } from "../../../src/FE/Functions/Helpers/BE/KrakenApiSign";
import { cookies } from "next/headers";
import qs from 'qs'
export async function POST(req: NextRequest) {
  try{
    const cookie = cookies().get("dpo-session-base")
    // if(!cookie){
    //     return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl))
    // }
const { asset }: { asset: string } = await req.json();
console.log(1)
  const pathname = "/0/private/DepositMethods";
console.log(2)
  const nonce = Date.now();
  const reqest = {nonce,asset:asset == "BTC" ? "XBT" : asset};
console.log(reqest)

  const secret = process.env.KRAKENSECRET!;
  const apiSign = GetMessageSignature(pathname,reqest,secret,nonce);
  console.log(apiSign)
console.log(4)

  const apiKey = process.env.KRAKENAPIKEY!;

  const res = await fetch("https://api.kraken.com/0/private/DepositMethods", {
    method: "POST",
    headers: {
      "API-Key": apiKey,
      "API-Sign": apiSign,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    mode:'no-cors',
    body: qs.stringify({
      nonce,
      asset: asset == "BTC" ? "XBT" : asset,
    }),
  });

  const data: {
    error: string[];
    result: [
      {
        method: string;
        limit: boolean;
        fee: string;
        "gen-address": boolean;
        minimum: string;
      }
    ];
  } = await res.json();
  if(data.error.length > 0){
    return NextResponse.json({status:"error",data:data.error})
  }
return NextResponse.json({status:"success",data:data.result})
}catch(err:any){
    return NextResponse.json({status:"error",data:err.message})

}


}
