import { connectMongo, disconnectMongo } from '@/src/BE/DB/functions/ConnectMongoDB'
import User from '@/src/BE/DB/schema/User'
import 'server-only'


export const usernameLogin = async(uname:string,hash:string)=>{
await connectMongo()
let res = await User.findOne({username:uname,password:hash})
await disconnectMongo()
return res
}

export const emailLogin = async(email:string,hash:string)=>{
   await connectMongo()
    const res = await User.findOne({email:email,password:hash})
    await disconnectMongo()
    return res
    }
    

