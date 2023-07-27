import 'server-only'
import { PrismaClient } from "@prisma/client";
import { connectMongo, disconnectMongo } from '@/src/BE/DB/functions/ConnectMongoDB';
import User from '@/src/BE/DB/schema/User';





export const getPortfoliodata=async(username:string)=>{
    await connectMongo()
  const userData = await User.findOne({username:username})
    await disconnectMongo()
    return userData
}



