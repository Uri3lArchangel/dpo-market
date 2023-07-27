
import React, { Suspense } from 'react'
import MainPage from '@/src/FE/components/primary-market/page/MainPage'
import { cookies } from 'next/headers'
import { returnTotalInvestments } from './db'

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