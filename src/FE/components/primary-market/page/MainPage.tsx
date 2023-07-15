'use client'
import React from 'react'
import Equity from '../Equity'
import { useSearchParams } from 'next/navigation'
import Debt from '../Debt'

function MainPage() {
   const Params = useSearchParams()
   const offer = Params.get('offer')

   if(offer=="equity"){
     return (
    <>
    <Equity />
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