

import SignUp from '@/src/FE/components/auth/SignUp'
import { Metadata } from 'next'
import React from 'react'


export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Sign Up ',
      description:'Begin Your jorney here sign up and participate in the DPO Markets',
      keywords:"DPO,,SIGN UP,BEGIN YOUR JOURNEY, START, JOIN,ADD, BECOME AN INVESTOR"
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