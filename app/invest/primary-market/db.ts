import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB"
import Market from "@/src/BE/DB/schema/Market"
import User from "@/src/BE/DB/schema/User"


export const EquityInvestmentPostApprovedPayment = async (
  username: string,
  dpopurchased: string,
  amountInvestedInUSD: string,
  walletAddress: string
) => {
  await connectMongo()
  let userData = await User.findOne({username:username})
  if(userData.equityOffer.isActive == false){
    await User.updateOne({username:username},{
      equityOffer:{
        isActive:true,
        totalTokensToReceive:dpopurchased,
        amountInvested:(Number(amountInvestedInUSD)).toFixed(2),
        walletAddress:walletAddress
      }
    })
        await updateMarket(amountInvestedInUSD)

    await disconnectMongo()
  
  
    return {'message':`You have successfully invested ${amountInvestedInUSD} and will receive ${dpopurchased}DPO tokens during distribution`,'description':'','type':'success'}
  }  
   await User.updateOne({username:username},{
    equityOffer:{
      isActive:true,
      totalTokensToReceive:Number(dpopurchased)+Number(userData.equityOffer.totalTokensToReceive),
      amountInvested:(Number(amountInvestedInUSD)+Number(userData.equityOffer.amountInvested)).toFixed(2),
      walletAddress:walletAddress
    }
  })
    await updateMarket(amountInvestedInUSD)

  await disconnectMongo()



  return {'message':`You have successfully invested ${amountInvestedInUSD} and will receive ${dpopurchased}DPO tokens during distribution`,'description':'','type':'success'}
}


export const DebtInvestmentPostApprovedPayment = async (
  username: string,
  NotesPurchased: string,
  amountInvestedInUSD: string, 
  walletAddress: string,
  faceValue:string
  )=>{
    await connectMongo()
    let userData = await User.findOne({username:username})
    if(userData.debtOffer.isActive == false){
      await User.updateOne({username:username},{
        debtOffer:{
          isActive:true,
          totalNotesOwned:NotesPurchased,
          totalFaceValue:faceValue,
          amountInvested:(Number(amountInvestedInUSD)).toFixed(2),
          walletAddress:walletAddress,
          maturityDate:new Date(Date.now()+(365*24*3600000)),
          maturityPeriodInDays:356
        }
      })
    await updateMarket(amountInvestedInUSD)

  await disconnectMongo()

  return {'message':`You have successfully invested ${amountInvestedInUSD} Purchasing ${NotesPurchased} convertible notes with a total face value of ${faceValue}`,'description':'','type':'success'}

  }
  await User.updateOne({username:username},{
    debtOffer:{
      isActive:true,
      totalNotesOwned:Number(NotesPurchased)+Number(userData.debtOffer.totalNotesOwned),
      totalFaceValue:(Number(faceValue)+Number(userData.debtOffer.totalFaceValue)).toFixed(2),
      amountInvested:(Number(faceValue)+Number(userData.debtOffer.totalFaceValue)).toFixed(2),
      walletAddress:walletAddress,
      maturityDate:new Date(Date.now()+(365*24*3600000)),
      maturityPeriodInDays:356

    }
  })
    await updateMarket(amountInvestedInUSD)

  await disconnectMongo()



  return {'message':`You have successfully invested ${amountInvestedInUSD} Purchasing ${NotesPurchased} convertible notes with a total face value of ${faceValue}`,'description':'','type':'success'}



}



 const updateMarket = async(amount:string)=>{
  const marketData = await Market.findOne({})
  await Market.updateOne({},{primaryMarket:{status:true,progress:Number(marketData.primaryMarket.progress)+Number(amount)}})

}



export const returnTotalInvestments=async()=>{
  await connectMongo()

  const market = await Market.findOne({})
  await disconnectMongo()

  return market.primaryMarket.progress

}