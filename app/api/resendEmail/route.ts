import { ResetToken, fetchUserByUnmame } from "@/app/auth/sign-up/db";
import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { SENDSIGNUPVERIFICATION } from "@/src/BE/web2/functions/send";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
   try {
   const cookie= cookies().get("dpo-session-base")
   
   if(!cookie || !cookie.value){
    return NextResponse.json({path:"/auth/sign-in"},{status:307})
   }
 
   
  
    const userobj = jwtdecodebase(cookie.value)
    if(!userobj){
      return NextResponse.json({path:"/auth/sign-in"},{status:307})
    }
   if(userobj.status){
    return NextResponse.json({path:"/"},{status:307})
   } 
await connectMongo()
  const stat =  await ResetToken(userobj.Email,userobj.Username)
  if(!stat){
    await disconnectMongo()
    return NextResponse.json({msg:"Max request exceeded please wiat for 1hour before making another request" },{status:429})

  }
  const user = await fetchUserByUnmame(userobj.Username)
   const res = await SENDSIGNUPVERIFICATION(user.email,user.username,user.token.emailVerifier.token)

   if(!res.status){
    await disconnectMongo()

    return NextResponse.json({msg:"Unable to send mail" },{status:500})
   }
   await disconnectMongo()

   return NextResponse.json({msg:"Email Has Been Sent To Your Email Address"})
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