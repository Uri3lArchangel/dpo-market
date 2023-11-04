import Portfolio from '@/src/FE/components/portfolio/Portfolio'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'

export async function generateMetadata(
  
    ): Promise<Metadata> {
      
    
      return {
        title:'DPO Markets | Investor Portfolio ',
        description: "Explore our impressive portfolio showcasing DPO Markets' successful projects and client case studies in the financial services industry. Discover how we excel in providing investment solutions and serving our clients in the finance sector.",
        keywords: [
            "DPO Markets portfolio",
            "DPO Markets projects",
            "DPO Markets work",
            "Financial services portfolio",
            "Investment solutions",
            "Client success stories",
            "DPO Markets case studies",
            "Finance industry projects",
            "DPO Markets showcase",
            "DPO Markets achievements",
          ]
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