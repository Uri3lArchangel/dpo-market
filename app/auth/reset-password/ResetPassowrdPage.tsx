'use client'
import { URLresolve } from '@/src/FE/Functions/Helpers/FE/FetchUrlResolve';
import MainLayout from '@/src/FE/components/utils/MainLayout';
import { NotificationContext } from '@/src/FE/components/utils/antd/notification/Note';
import { message } from 'antd';
import React, { useContext, useRef } from 'react'


function ResetPassowrdPage() {
    const notification = useContext(NotificationContext)!;
    const emailRef=useRef<HTMLInputElement>(null)
    const reset = async()=>{
      message.destroy()
      message.loading("Sending Reset Email",10000)
        const email = emailRef.current
        if(!email){
          message.destroy()
          notification({message:"Provide The Email Address Of The Account You Want To Reset Its Pasword",type:"info",description:"Provide Email"})
          return
        }
        if(email.value === ''){
          message.destroy()
          notification({message:"Provide The Email Address Of The Account You Want To Reset Its Pasword",type:"info",description:"Provide Email"})
          return
        }
        if(email && email.value){
            const data = await fetch(URLresolve('/api/resetPassword'),{
                method:'POST',
                body:JSON.stringify({Email:email.value})
            })
            const res = await data.json()

            if(data.status == 200 || data.status == 201){

              message.destroy()
              notification({description:res.msg,type:"success",message:"Sent"})
              return
            }
            notification({description:res.msg,type:"error",message:"Error"})
            message.destroy()
            return

           
        }
      }


  return (
    <MainLayout>
    <article className='text-center space-y-6 py-10'>
      <h1 className='text-xl font-bold'>Password Reset</h1>
      <p className='text-lg px-1'>Enter the email address for the account you want to reset</p>
      <div className='space-y-6'>
          <label htmlFor="email"></label>
      <input id='email' ref={emailRef} className='block text-black w-full h-10 px-2 outline-none sm:w-2/4 mx-auto lg:w-1/4' placeholder='Email Address' type="email"/>
      <button onClick={reset} className='bg-green-500 py-4 px-6 block mx-auto text-white rounded-xl hover:bg-green-600'>Reset</button>
      </div>
      </article>
  </MainLayout>  )
}

export default ResetPassowrdPage