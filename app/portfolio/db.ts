import 'server-only'
import { PrismaClient } from "@prisma/client";


const Prisma = new PrismaClient()


export const getPortfoliodata=async(username:string)=>{
   let userData=  await Prisma.user.findFirst({
        where:{username:username}
        ,include:{
            equityOffers:true,
            debtOffers:true,
            wallet:true
        }
    })
    await Prisma.$disconnect()
    return userData
}