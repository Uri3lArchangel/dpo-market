import Portfolio from '@/src/FE/components/portfolio/Portfolio'
import { cookies } from 'next/headers'
import React from 'react'


const fetchPortfolioData = async()=>{
    const cookie = cookies().get('dpo-session-base')
    if(!cookie){
        return null
    }
let res = await fetch(process.env.BASEURL!+"/api/portoflio-data",{method:'POST',mode:'no-cors',next:{tags:[process.env.CACHETAG!],revalidate:false},body:JSON.stringify({sessionCookieData:cookie})})
let data = await res.json()

return data
}



const page = async() => {
 const data = (await fetchPortfolioData())!
    return(
    <main>
        <Portfolio equityOffers={data.equityOffer} debtOffers={data.debtOffer} wallet={data.wallet}/>
    </main>
    )
  
 
}

export default page