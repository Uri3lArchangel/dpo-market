'use client'
import React from 'react'
import Equity from '../Equity'
import { useSearchParams } from 'next/navigation'

function MainPage() {
   const Params = useSearchParams()
   const offer = Params.get('offer')
   console.log(offer)

   if(offer=="equity"){
     return (
    <>
    <Equity />
    </>
  )
   }else if(offer == "debt"){
    return(
        <></>
    )
   }else{
    return(<></>)
   }
 
}

export default MainPage