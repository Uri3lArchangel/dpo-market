import { getPortfoliodata } from "@/app/portfolio/db";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
try{console.log(111)
const {sessionCookieData} = await req.json() 
let decodedSessionData = jwtdecodebase(sessionCookieData.value)
let userData = await getPortfoliodata(decodedSessionData.Username)
    return NextResponse.json({userData},{status:200})}
    catch(err:any){
        console.error(err,"error")
    }
}