

import Login from '@/src/FE/components/auth/Login'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Sign In ',
      description:"Log in to your DPO Markets account securely. Access your member dashboard and manage your investments with ease. Sign in now to stay updated with your financial portfolio.",
      keywords: [
        "DPO Markets sign in",
        "DPO Markets login",
        "Sign in to DPO Markets",
        "Secure DPO Markets account access",
        "DPO Markets member login",
        "Access your DPO Markets account",
        "DPO Markets sign-in page",
        "DPO Markets login portal",
        "User authentication on DPO Markets",
        "DPO Markets credentials",
        "DPO Markets account access",
        "DPO Markets online trading login",
        "DPO Markets client portal",
        "Log in securely to DPO Markets",
        "DPO Markets trading platform",
        "DPO Markets account management",
        "DPO Markets member dashboard",
      ]
    }
  }

const page = () => {

 
      return (
    <section>
      <Login />
    </section>
  )
  

}

export default page