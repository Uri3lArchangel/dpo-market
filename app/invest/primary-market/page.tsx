
import React, { Suspense } from 'react'
import MainPage from '@/src/FE/components/primary-market/page/MainPage'
import { cookies } from 'next/headers'
import { Metadata } from 'next'


export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Primary Market ',
      description:"Explore investment opportunities in the primary market of DPO Markets. Discover debt financing through convertible notes and equity offers for startups and companies seeking capital.",
      keywords: [
        "Debt using convertible notes",
        "Equity offers",
        "DPO Markets primary market",
        "Debt financing",
        "Convertible notes",
        "Equity fundraising",
        "Primary market investments",
        "Startup financing",
        "Investment opportunities",
        "Financial securities",
        "Capital raising",
        "Investor relations",
      ]
    }
  }

const fetchMarketProgress = async()=>{
const res = await fetch(process.env.BASEURL+'/api/marketdata/primary-market',{mode:'no-cors',next:{revalidate:false,tags:[process.env.CACHETAG!]}})
const data = await res.json()
return data
}


const page = async() => {
 const cookieData = cookies().get('dpo-session-base')
 const progress=await fetchMarketProgress()
  return (
    <main>
        <MainPage  total={progress} cookie={cookieData}  secretverifier={process.env.VERIFIERSECRET!} clientID={process.env.CLIENTID!} />
    </main>
  )
}

export default page