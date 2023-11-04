
import { Metadata } from 'next';
import React from 'react'
import ResetPassowrdPage from './ResetPassowrdPage';


export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Password reset ',
      description:"Ensure a secure and hassle-free password reset process on the DPO Markets password reset page. Recover your account access quickly with our reliable password recovery service. Don't worry if you've forgotten your password – we've got you covered!",
      keywords:[
        "DPO Markets",
        "Password Reset",
        "Account Recovery",
        "Forgot Password",
        "Reset Password",
        "Secure Password Reset",
        "DPO Markets Login",
        "Password Recovery",
        "User Account Access",
        "Password Assistance"
      ]
    }
  }
function page() {
 
  return (
    <>
  <ResetPassowrdPage />
    </>
  )
}

export default page