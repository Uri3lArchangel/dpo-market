

import Login from '@/src/FE/components/auth/Login'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Sign In ',
      description:'Resume Your jorney keep building up your portfolio',
      keywords:"DPO,SIGN IN, RESUME, LOGIN"
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