import MainLayout from '@/src/FE/components/utils/MainLayout';
import React, { useContext, useRef } from 'react'
import signup from '@/styles/auth/signup.module.css'
import Passreset from './Passreset';
import { Metadata } from 'next';


export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Change Password ',
      description:'',
      keywords:""
    }
  }

function page() {


  return (
    <>
    <MainLayout>
         <section className={signup.leftContainer+ ' mx-auto '}>

          <Passreset  />
      
</section>
    </MainLayout>
    </>
  )
}

export default page