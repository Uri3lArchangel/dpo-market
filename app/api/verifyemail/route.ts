import { fetchUserByUnmame, updateVerification } from "@/app/auth/sign-up/db"
import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB"
import { setSessionCookie } from "@/src/BE/web2/functions/Cookie"
import { jwtsign } from "@/src/BE/web2/functions/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest) {
   try{ const {searchParams}= new URL(req.url)
    const token = searchParams.get('verifytoken')
    const uname = searchParams.get('username')
    if(!uname){
        return NextResponse.json({msg:'Bad Request Missing Verification Username'},{status:400}) 

    }
    if(!token){
       return NextResponse.json({msg:'Bad Request Missing Verification Token'},{status:400}) 
    }
    await connectMongo()
const user =await fetchUserByUnmame(uname)
if(!user){
    await disconnectMongo()
return NextResponse.redirect(new URL("/auth/signup",req.nextUrl))
}
if(!user.token.emailVerifier.token){
    await disconnectMongo()

    return NextResponse.redirect(new URL("/auth/signup",req.nextUrl))

}
if(Date.now() >= user.token.emailVerifier.expiration){
    await disconnectMongo()

    return NextResponse.json({msg:"Token has expired"},{status:400})
}
if(user.Verified){
    await disconnectMongo()

    return NextResponse.redirect(new URL("/",req.url))
   } 

if( user.token.emailVerifier.token != token ){
    await disconnectMongo()

    return NextResponse.json({msg:'Invalid token'},{status:400}) 

}
const res = await updateVerification(uname)

if(!res){
    await disconnectMongo()

    return NextResponse.json({msg:'An unexpected error occured'},{status:400}) 

}
const cookie = jwtsign(user.email,user.username,true)
setSessionCookie(cookie)
await disconnectMongo()

return NextResponse.redirect(new URL("/portfolio",req.nextUrl))
}catch(err:any){
    if(err.code == "ETIMEOUT"){
        let type="error"
        let msg = `Network Error Check Your connection`
        await disconnectMongo()

        return NextResponse.json({data:msg,status:type,},{status:400})
    }
    await disconnectMongo()


    return NextResponse.json({data:"Internal Server Error"},{status:500})

}

}