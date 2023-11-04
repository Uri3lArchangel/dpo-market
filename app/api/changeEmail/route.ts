import { ChangeEmail, ResetToken, fetchUserByUnmame } from "@/app/auth/sign-up/db";
import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { SENDSIGNUPVERIFICATION } from "@/src/BE/web2/functions/send";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {newEmail} = await req.json()
   try {
   const cookie= cookies().get("dpo-session-base")
   if(!cookie){
    return NextResponse.redirect(new URL("/auth/signin",req.nextUrl))
   }

    const userobj = jwtdecodebase(cookie.value)
    await disconnectMongo()
    await connectMongo()
   let user =  await fetchUserByUnmame(userobj.Username)
   console.log(1)
   if(user.Verified){
    await disconnectMongo()
    return NextResponse.redirect(new URL("/",req.url))
   } 
   console.log(2)

   await ChangeEmail(user.email,`${newEmail}`)
   const stat=await ResetToken(newEmail,user.username)
   user =  await fetchUserByUnmame(userobj.Username)

   console.log(3)

   if(!stat){
    await disconnectMongo()

    return NextResponse.json({msg:"Max request exceeded please wiat for 1hour before making another request" },{status:429})

  }
  console.log(4)


   const res = await SENDSIGNUPVERIFICATION(newEmail,user.username,user.token.emailVerifier.token)

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