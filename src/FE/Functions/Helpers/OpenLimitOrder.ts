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
if(res.status === 307){
    const data = await res.json()
    console.log(data.path)

window.location.href = window.location.origin+data.path
return
}

if(!res.ok){
    return undefined
}
const data = await res.json()
console.log(data)


return data
}

export const Ask=async(InitialPrice:number,BidPrice:number,Amount:number,Pair:string,AmountPaid:number)=>{

    console.log(1,InitialPrice,BidPrice,Pair,Amount,AmountPaid)
const body={
InitialPrice,
BidPrice,
Amount,
Pair,
AmountPaid,
}

const res = await fetch(URLresolve('/api/ask'),{
method:"POST",
body:JSON.stringify(body),
mode:"no-cors",
redirect:"follow"
})
if(res.status === 307){
const data = await res.json()

window.location.href = window.location.origin+data.path
return data
}


const data = await res.json()


return data
}
