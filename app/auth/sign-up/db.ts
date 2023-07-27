import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB"
import User from "@/src/BE/DB/schema/User"
import  Mongoose  from "mongoose"

export const SignupDB=async(email:string,uname:string,hash:string)=>{
try{
await connectMongo()
const newUserData={
    id:crypto.randomUUID(),
    email:email,
    username:uname,
    password:hash,
}
await User.create(newUserData)
await disconnectMongo()
}catch(err){
console.error(err)
}

}

export const checkIfEmailExist=async(email:string)=>{
    await connectMongo()
    const user = await User.findOne({email:email})
    await disconnectMongo()
    if(user){
        return true
    }
    return false
}

export const checkIfUsernameExist=async(uname:string)=>{
    await connectMongo()
    const user = await User.findOne({username:uname})
    await disconnectMongo()
    if(user){
        return true
    }
    return false
}