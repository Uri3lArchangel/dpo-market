'use client'
import React, { useContext, useEffect, useRef } from 'react'
import Passowrd from '../utils/antd/inputs/Passowrd'
 import login from '../../../../styles/auth/login.module.css'
import Link from 'next/link'
import Aos from 'aos'
import {message} from 'antd'
import { NotificationContext, NotificationDataObject } from '../utils/antd/notification/Note'
import { useRouter } from 'next/navigation'

function Login() {
  const router = useRouter()
  const noteContext =  useContext(NotificationContext)
  const email_usernameRef=useRef<HTMLInputElement>(null)
  useEffect(()=>{
    if(window.innerWidth <1024){
      Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
    }else{
      Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
    
    
    }
  },[])



  const LoginSubmit=async(e:React.MouseEvent)=>{
   try{ e.preventDefault()
    if(!email_usernameRef.current){
      const notification:NotificationDataObject={
        type:'error',
        message:'Please Provide Email or Username',
        description:''
      }
      noteContext!(notification)
      return
    }
    if(email_usernameRef.current.value == ''){
      const notification:NotificationDataObject={
        type:'error',
        message:'Please Provide Email or Username',
        description:''
      }
      noteContext!(notification)
      return
    }
    const pass =document.getElementById('password_login') as HTMLInputElement
    if(pass.value == ''){
      const notification:NotificationDataObject={
        type:'error',
        message:'Please Provide a Password',
        description:''
      }
      noteContext!(notification)
      return
    }
    const euser = email_usernameRef.current.value
    const body={
      Email_Username:euser,
      Password:pass.value
    }
    message.loading('Logging in',10000)

    const res = await fetch('/api/signin',{
      method:'POST',
      mode:'no-cors',
      cache:'no-cache',
      body:JSON.stringify(body)
    })
    message.destroy()
    if(res.status == 500){
      throw new Error("Internal Server Error Please Reload And Try Again")
    }
    if(res.status == 400){
      noteContext!({message:"Bad Request",type:"error",description:'The request sent is malformed please reload and try again'})


    }
    const data:{message:string,description:string,type:"error"|"warning"|"success"} = await res.json()

    noteContext!({message:data.message,type:data.type,description:data.description})
    if(data.type =="success"){
      window.location.href=window.location.origin+"/portfolio"
    }}catch(err:any){
      noteContext!({message:err.message,type:"error",description:''})

    }
  }
  return (
    <section className={login.mainContainer}>
         <div className={login.innerContainer}>
          <section data-aos="fade-down" data-aos-easing="ease-out-back"className={login.leftContainer}>
          <main>

            <div>
              <div className={login.titleContainer}>
                <h2> <text>SIGN</text> IN</h2>
                <p>Sign In and continue your journey</p>
                <small>
               Continue to build your portfoio
                </small>
              </div>
              <form action="">
                <div>
                  <label htmlFor="text">EMAIL / USERNAME</label>
                  <input ref={email_usernameRef} type="email" id='email' placeholder='johndoe@gmail.com... or johnDoe...' required />
                </div>
                <div>
                  <label htmlFor="pass">PASSWORD</label>
                  <Passowrd id='password_login' />
                </div>
                <p><Link href={{pathname:'/auth/reset-password'}}>Forgotten Password?</Link><span className='text-white'> Click here to reset</span> </p>
              
                <button onClick={LoginSubmit}>
                    Sign In
                </button>
              </form>
              <p> <Link href={{pathname:'/auth/sign-up'}}>Sign Up</Link> if you dont have an account</p>
            </div>
            </main>
          </section>
          <section data-aos="slide-up" data-aos-delay="100" data-aos-easing="ease-out"  className={login.rightContainer}>
n
          </section>

         </div>
        </section>
  )
}

export default Login