'use client'
import React, { Suspense } from 'react'
import Equity from '../Equity'
import { useSearchParams } from 'next/navigation'
import Debt from '../Debt'
import Loading from '@/app/loading'

function MainPage() {
   const Params = useSearchParams()
   const offer = Params.get('offer')

   if(offer=="equity"){
     return (
    <>
  <Suspense fallback={<Loading />}>  
          <Equity />
</Suspense>

    </>
  )
   }else if(offer == "debt"){
    return(
        <>
        <Debt />
        </>
    )
   }else{
    return(<></>)
   }
 
}

export default MainPage