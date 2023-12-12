import { NextRequest, NextResponse } from "next/server";
import {krakenRequest} from '../../../src/FE/Functions/Helpers/BE/KrakenApiReq'
import { UpdateMarketDeposit } from "@/app/auth/sign-up/db";
import { cookies } from "next/headers";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB";


export async function POST(req:NextRequest) {

    try{
    const {asset,method,amount}=await req.json()
    const cookie = cookies().get("dpo-session-base")
    if(!cookie || !cookie.value) return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl))
    const user = jwtdecodebase(cookie.value)
    if(!user) return NextResponse.redirect(new URL("/auth/sign-in",req.nextUrl))
    let body
    if(amount != ""){
        body={
            asset,method,amount,nonce:Date.now() * 100,new:true
        }
    }else{
        body={
            asset,method,nonce:Date.now() * 100,new:true
        }
    }
    await connectMongo()
    const firstTest = await krakenRequest("/0/private/DepositAddresses",body)
    if(firstTest.error.length > 0){
        if(firstTest.error[0] == "EFunding:Too many addresses"){
            body={
                asset,method,nonce:Date.now() * 100
            }
            
            const res = await krakenRequest("/0/private/DepositAddresses",body)
            console.log(res)
            let r
            for(let i =0;i<res.result.length;i++){
              r=  await UpdateMarketDeposit(res.result[i].address,user.Email,method,asset)
             if(r == false){
                continue
             }else{
                break
             }
            }
            await disconnectMongo()

            return NextResponse.json({address:r},{status:201})


        }
    }}catch(err:any){
        console.error(err)
    }
}