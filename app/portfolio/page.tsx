import Portfolio from '@/src/FE/components/portfolio/Portfolio'
import PortfolioBase from '@/src/FE/components/portfolio/PortfolioBase'
import { cookies } from 'next/headers'
import React from 'react'
import { getPortfoliodata } from './db'

const fetchPortfolioData = async()=>{
// let res = await fetch("/api/portoflio-data",{mode:'no-cors',next:{}})
let sessionCookie = cookies().get('dpo-session-base')
let data = await getPortfoliodata()
}

const page = () => {
  
  
  if(false){
     return (
    <main>
        <PortfolioBase />
    </main>
  )
  }else{
    return(
    <main>
        <Portfolio />
    </main>
    )
  }
 
}

export default page