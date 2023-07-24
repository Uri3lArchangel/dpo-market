'use client'
import React, { Suspense } from 'react'
import Equity from '../Equity'
import { useSearchParams } from 'next/navigation'
import Debt from '../Debt'
import Loading from '@/app/loading'
import App from '@/app/not-found'

function MainPage({clientID,jwtsecretverifier}:{clientID:string,jwtsecretverifier:string}) {
   const Params = useSearchParams()
   const offer = Params.get('offer')

   if(offer=="equity"){
     return (
    <>
  <Suspense fallback={<Loading />}>  
          <Equity clientID={clientID} jwtsecretverifier={jwtsecretverifier}  />
</Suspense>

    </>
  )
   }else if(offer == "debt"){
    return(
      <Suspense fallback={<Loading />}>  
        <Debt />
        </Suspense>
    )
   }else{
    return(<App />)
   }
 
}

export default MainPage