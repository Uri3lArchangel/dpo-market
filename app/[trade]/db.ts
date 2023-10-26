import User from '@/src/BE/DB/schema/User'
import 'server-only'

export const UpdateOrder=async(email:String,updateData:{InitialPrice:number,BidPrice:number,Amount:number,Pair:string})=>{
    const data= {type:"BUY",pair:updateData.Pair,entryPrice:updateData.InitialPrice,amount:updateData.Amount,targetPrice:updateData.BidPrice,canceled:false}
let updated = await User.updateOne({email:email},{secondary:{$push:{orders:data}}})
return updated
}