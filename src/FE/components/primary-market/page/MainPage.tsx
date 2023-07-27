'use client'
import React, { Suspense } from 'react'
import Equity from '../Equity'
import { useSearchParams } from 'next/navigation'
import Debt from '../Debt'
import Loading from '@/app/loading'
import App from '@/app/not-found'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

function MainPage({clientID,secretverifier,cookie,total}:{clientID:string,secretverifier:string,cookie:RequestCookie | undefined,total:{Progress:number}}) {
   const Params = useSearchParams()
   const offer = Params.get('offer')

   if(offer=="equity"){
     return (
    <>
  <Suspense fallback={<Loading />}>  
          <Equity totalInvestmentMade={total} clientID={clientID} clientCookie={cookie} secretverifier={secretverifier}  />
</Suspense>

    </>
  )
   }else if(offer == "debt"){
    return(
      <Suspense fallback={<Loading />}>  
        <Debt clientCookie={cookie} totalInvestmentMade={total} clientID={clientID} secretverifier={secretverifier} />
        </Suspense>
    )
   }else{
    return(<App />)
   }
 
}

export default MainPage