'use client'

import { URLresolve } from '@/src/FE/Functions/Helpers/FE/FetchUrlResolve'
import MainLayout from '@/src/FE/components/utils/MainLayout'
import { NotificationContext } from '@/src/FE/components/utils/antd/notification/Note'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef } from 'react'


const Page=()=> {
  const router = useRouter()
    const newMail = useRef<HTMLInputElement>(null)
    const notification =  useContext(NotificationContext)
  const resend = async()=>{
message.destroy()
message.loading("Resending Verification Mail",10000)
   const res= await fetch(URLresolve("/api/resendEmail"),{cache:"no-cache"})
   let data = await res.json()

   if(res.status == 307){
    router.push(window.location.origin+data.path)
   }
    if(res.status == 200 || res.status == 201){

      message.destroy()
      notification!({message:data.msg,type:"success",description:"Success"})
    }else{
      message.destroy()
      notification!({message:data.msg,type:"error",description:"Error"})
    }
   
  }

  const changeMail= async ()=>{
    if(!newMail || !newMail.current) return
    message.destroy()
message.loading(`Sending Verification Mail to ${newMail.current.value}`,10000)
   const res= await fetch(URLresolve("/api/changeEmail"),{
    method:"POST",
    body:JSON.stringify({newEmail:newMail.current.value})
   })
   let data = await res.json()
    if(res.status == 200 || res.status == 201){
      message.destroy()
      notification!({message:data.msg,type:"success",description:"Success"})
    }else{
      message.destroy()
      notification!({message:data.msg,type:"error",description:"Error"})
    }
   
  }
  return (
    <>   
     <MainLayout>
      <article className='text-center space-y-6 py-10'>
        <h1 className='text-xl font-bold'>Verify Your Email Address</h1>
        <p className='text-lg px-1'>We Have Sent A Verification Email to Your Email Address Open It And Follow The Instructions</p>
        <div className='space-y-6'>
          <button className='bg-transparent border w-fit border-gray-400 py-4 px-6 block mx-auto text-white rounded-xl hover:bg-white hover:text-black' onClick={resend}>
          Resend Email
          </button>
        <small className='block text-lg'>or</small>
        <input className='block text-black w-full h-10 px-2 outline-none sm:w-2/4 mx-auto lg:w-1/4' placeholder='New Email' ref={newMail} type="text"/>
        <button className='bg-green-500 py-4 px-6 block mx-auto text-white rounded-xl hover:bg-green-600' onClick={changeMail}>Change Email Address</button>
        </div>
        </article>
    </MainLayout>
    </>

  )
}

export default Page