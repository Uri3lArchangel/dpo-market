import { NextRequest, NextResponse } from "next/server";
import {krakenRequest} from '../../../src/FE/Functions/Helpers/BE/KrakenApiReq'


export async function POST(req:NextRequest) {
    const {asset,method,amount}=await req.json()
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
    const firstTest = await krakenRequest("/0/private/DepositAddresses",body)
    if(firstTest.error.length > 0){
        if(firstTest.error[0] == "EFunding:Too many addresses"){
            body={
                asset,method,nonce:Date.now() * 100
            }
            const res = await krakenRequest("/0/private/DepositAddresses",body)
                console.log(res)

        }
    }

    return NextResponse.json({})
}