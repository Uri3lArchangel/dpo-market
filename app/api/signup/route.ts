import { SignupDB, checkIfEmailExist, checkIfUsernameExist } from "@/app/auth/sign-up/db"
import { HashPassword } from "@/src/BE/web2/functions/HashPasswords"
import { NextResponse } from "next/server"

export async function POST(request:Request){
    try{const {Username,Email,Password}:{Username:string,Email:string,Password:string} = await request.json()
const emailCheck = await checkIfEmailExist(Email)
if(emailCheck){
  return   NextResponse.json({'message':'This Email is already exists in our records','description':'the email you provide is already linked to an accout, you can try logging in',type:"error"},{status:400})
}

const unameCheck =await checkIfUsernameExist(Username)
if(unameCheck){
   return  NextResponse.json({'message':'username already exists','description':'the username you specified is already in use please change it',type:"error"},{status:400})
}

const hash = HashPassword(Password)

await SignupDB(Email,Username,hash)
return NextResponse.json({'message':'Sign Up Successful','description':'',type:"success"},{status:201})
}catch(err:any){
  console.error(err.message)
  return NextResponse.json({'message':err.message,'description':'',type:"error"},{status:500})

}
}