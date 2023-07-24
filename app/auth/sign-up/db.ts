import 'server-only'
import { PrismaClient } from "@prisma/client";
import Mongoose from 'mongoose'
import Investor from '../../../src/BE/DB/Mongo/InvestorsModel'
import {MongoClient} from 'mongodb'

const URL = process.env.MONGOURL!

const queryAccreditation = async(email:string)=>{
   console.log('mongo')
await MongoClient.connect(URL)
console.log('connected')


let res = await Investor.findOne({Email:email})
console.log(res)
if(!res){
return null
}

return res.Status
}

const prisma = new PrismaClient()

export const initializeDB = async()=>{

}
export const addNewUser=async(username:string,email:string,passwordHash:string)=>{
//   let status=  await queryAccreditation(email)
  let isAccredited = false
//   if(status =="approved"){
//    isAccredited=true
//   }
      await prisma.user.create({
       data:{
        email:email,
        username:username,
         password:passwordHash,
         isAccredited:isAccredited,
         isDebtOfferActive:false,
      
       }
    })
   await disconnectDB()
   

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
