import User from '@/src/BE/DB/schema/User'
import 'server-only'

export const UpdateOrder=async(email:String,updateData:{InitialPrice:number,BidPrice:number,Amount:number,Pair:string})=>{
    const data= {marketType:"SELL",pair:String(updateData.Pair),entryPrice:Number(updateData.InitialPrice),amount:Number(updateData.Amount),targetPrice:Number(updateData.BidPrice),canceled:false}
let updated = await User.updateOne({email},{$push:{'secondary.orders':data}})
return updated
} 