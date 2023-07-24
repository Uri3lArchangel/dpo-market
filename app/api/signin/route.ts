import { emailLogin, usernameLogin } from "@/app/auth/sign-in/db"
import {  checkIfEmailExist, checkIfUsernameExist } from "@/app/auth/sign-up/db"
import {  setSessionCookie } from "@/src/BE/web2/functions/Cookie"
import { HashPassword } from "@/src/BE/web2/functions/HashPasswords"
import { jwtsign } from "@/src/BE/web2/functions/jwt"
import { NextResponse } from "next/server"

export async function POST(request:Request){
    const {Email_Username,Password}:{Email_Username:string,Password:string} = await request.json()
    const emailCheck = await checkIfEmailExist(Email_Username)


if(emailCheck){
    const hash = HashPassword(Password)
    const login = await emailLogin(Email_Username,hash)
    
    if(login){
        let token = jwtsign(login.email,login.username)
        setSessionCookie(token)
       return NextResponse.json({'message':'Login Successful','description':'',type:"success"},{status:200})
       
    }
    return  NextResponse.json({'message':'Wrong Credentials','description':'Incorrect Email or Passord',type:"error"},{status:400})


}
const unameCheck =await checkIfUsernameExist(Email_Username)

if(unameCheck){
    const hash = HashPassword(Password)
    const login = await usernameLogin(Email_Username,hash)
    if(login){
        let token = jwtsign(login.email,login.username)
        setSessionCookie(token)
        return NextResponse.json({'message':'Login Successful','description':'',type:"success"},{status:200})
     }
    return  NextResponse.json({'message':'Wrong Credentials','description':'Incorrect Username or Passord',type:"error"},{status:400})

}


return  NextResponse.json({'message':'Wrong Credentials','description':'Incorrect Username, Email or Passord',type:"error"},{status:400})

}