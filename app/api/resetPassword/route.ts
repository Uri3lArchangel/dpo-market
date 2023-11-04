import { ChangeEmail, ResetToken, ResetTokenPassword, fetchUserByEmail, fetchUserByUnmame, updateUserPasswordByEmail } from "@/app/auth/sign-up/db";
import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { SENDPASSRESET, SENDSIGNUPVERIFICATION } from "@/src/BE/web2/functions/send";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {Email} = await req.json()
   try {
 
    if(Email === ''){
        return NextResponse.json({msg:"Unable to send mail" },{status:500})
    }
    await connectMongo()
let userData = await fetchUserByEmail(Email)
if(!userData){
    await disconnectMongo()
    return NextResponse.json({msg:`We have sent a password reset mail to ${Email}` },{status:200})

}
const stat=await ResetTokenPassword(Email,userData.username)
if(!stat.status){
    await disconnectMongo()

    return NextResponse.json({msg:stat.msg },{status:429})

}

userData = await fetchUserByEmail(Email)
const res = await SENDPASSRESET(userData.email,userData.username,userData.token.passwordreset.token)
if(!res.status){
    await disconnectMongo()

    return NextResponse.json({msg:"Unable to send mail" },{status:500})
}
await disconnectMongo()

   return NextResponse.json({msg:"Email Has Been Sent To Your Email Address"},{status:200})
}catch(err:any){
    console.error(err)
   if(err.code == "ETIMEOUT"){
        let msg = `Network Error Check Your connection`
        await disconnectMongo()

        return NextResponse.json({msg},{status:400})
    }
    await disconnectMongo()

 
    return NextResponse.json({data:"Internal Server Error"},{status:500})

}
}