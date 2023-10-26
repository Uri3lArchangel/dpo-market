import { jwtverifychecksum } from "@/src/BE/web2/functions/jwt"
import { TradingPair } from "@/src/Data/TradingPair"

export const createBuyOrderCheck = (a:{InitialPrice:number,BidPrice:number,Amount:number,Pair:string,AmountPaid:number})=>{
    if(isNaN(parseFloat(String(a.InitialPrice))) || isNaN(parseFloat(String(a.Amount))) || isNaN(parseFloat(String(a.BidPrice)))){
        return {status:"error",msg:"Input data error"}
    }
    if(!TradingPair[a.Pair].pair){
        return {status:"error",msg:"Invalid coin pair"}

    }
 
    
    return null
}

