import 'server-only'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const usernameLogin = async(uname:string,hash:string)=>{
const res = await prisma.user.findFirst({
    where:{username:uname,password:hash}
})
await disconnectDB()
return res
}

export const emailLogin = async(email:string,hash:string)=>{
    const res = await prisma.user.findFirst({
        where:{email:email,password:hash}
    })
    await disconnectDB()
    return res
    }
    

export const checkIfUsernameExist=async(uname:string)=>{
const res =await prisma.user.findFirst({
   where:{username:uname}
})
await disconnectDB()
return res
}

export const checkIfEmailExist=async(email:string)=>{
   const res =await prisma.user.findFirst({
      where:{email:email}
   })
   await disconnectDB()
   return res
}

export const disconnectDB=async()=>{
   await prisma.$disconnect()
}
