import Portfolio from '@/src/FE/components/portfolio/Portfolio'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'

export async function generateMetadata(
  
    ): Promise<Metadata> {
      
    
      return {
        title:'DPO Markets | Investor Portfolio ',
        description:'Watch Your Investments and offer statuses access your wallet and send and receive tokens',
        keywords:"DPO,PORTFOLIO,DATA INVESTOR,MONITOR,VIEW"
      }
    }

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