import { jwtchecksum } from "@/src/BE/web2/functions/jwt"
import { createBuyOrderCheck } from "./ChecksAndValidations"
import { URLresolve } from "./FE/FetchUrlResolve"

export const Bid=async(InitialPrice:number,BidPrice:number,Amount:number,Pair:string,AmountPaid:number)=>{

        console.log(1,InitialPrice,BidPrice,Pair,Amount,AmountPaid)
const body={
    InitialPrice,
    BidPrice,
    Amount,
    Pair,
    AmountPaid,
}

const res = await fetch(URLresolve('/api/bid'),{
    method:"POST",
    body:JSON.stringify(body),
    mode:"no-cors",
    redirect:"follow"
})
// if(res.status == 201 || res.status == 200){
//    if(a.initalPrice <= a.bidPrice){
//     return {status:"success",msg:`Buy Order Filled of ${a.amount + ' '+ s}  at ${a.bidPrice}`}
// } 
// }

// if(res.status == 301){
// window.location.href = res.headers.get("location")!
// console.log(res.headers.get("location")!)
// return
// }
const data = await res.json()
console.log(data)


return data
}
