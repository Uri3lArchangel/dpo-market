

import SignUp from '@/src/FE/components/auth/SignUp'
import { Metadata } from 'next'
import React from 'react'


export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Sign Up ',
      description:"Join DPO Markets and unlock exciting investment opportunities. Sign up for a secure trading account on our financial platform. Register today to start investing online in the world of finance with DPO Markets.",
      keywords:[
        "DPO Markets",
        "Sign up",
        "Create Account",
        "Register",
        "Investment Platform",
        "Financial Services",
        "Online Trading",
        "Secure Registration",
        "Join DPO Markets",
        "Sign up for DPO Markets",
        "Trading Account",
        "Investment Opportunities",
        "Start Investing",
        "DPO Markets Sign up",
        "Financial Market Sign up",
      ]
    }
  }
const page = () => {

 
      return (
    <section>
      <SignUp />
    </section>
  )
  

}

export default page