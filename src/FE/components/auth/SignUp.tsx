'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Password from '../utils/antd/inputs/Passowrd'
 import signup from '../../../../styles/auth/signup.module.css'
import Link from 'next/link'
import Aos from 'aos'
import { InputRef, message } from 'antd'
import { NotificationContext, NotificationDataObject } from '../utils/antd/notification/Note'
import { onPasswordFieldChange } from './functions/Verifications'
import { useRouter } from 'next/navigation'




function SignUp() {
const usernameRef = useRef<HTMLInputElement>(null)
const emailRef = useRef<HTMLInputElement>(null)
const noteContext =  useContext(NotificationContext)
const router = useRouter()
  useEffect(()=>{
    if(window.innerWidth <1024){
      Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
    }else{
      Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
    
    
    }
  },[])






// SIGNUP PPROCESS

const signUpSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
  let uname = usernameRef.current!.value
let email = emailRef.current!.value
let pass = (document.getElementById('password') as HTMLInputElement).value
let confirmPass = (document.getElementById('confpassword') as HTMLInputElement).value
let checkbox = document.getElementById('checkbox') as HTMLInputElement
// client-side checks

if(email == ''){
  const notification:NotificationDataObject={
    type:'error',
    message:'No Email',
    description:'Please input an email'
  }
  console.log(noteContext)
  noteContext!(notification)
  return
} 

if(uname == ''){
  const notification:NotificationDataObject={
    type:'error',
    message:'No Username',
    description:'Please input a username'
  }
  console.log(noteContext)
  noteContext!(notification)
  return
}
if(uname.match(/\W/) != null){
  const notification:NotificationDataObject={
    type:'error',
    message:'Invalid Character In Username',
    description:'Remove any invalid character, only use lowercase, uppercase and numbers when specifing your username'
  }
  noteContext!(notification)
  return
}
if(pass == ''){
  const notification:NotificationDataObject={
    type:'error',
    message:'No Password',
    description:'Please input a password'
  }
  console.log(noteContext)
  noteContext!(notification)
  return
}


if(pass != confirmPass){
    const notification:NotificationDataObject={
      type:'error',
      message:'Invalid Confirm Password',
      description:'Password and Confirm Password do not match'
    }
    console.log(noteContext)
    noteContext!(notification)
    return
  
}
if(!checkbox.checked){
  const notification:NotificationDataObject={
    type:'error',
    message:'Accept Terms and Conditions Agreement',
    description:'Ensure you check the acceptance of terms and agreements'
  }
  noteContext!(notification)
  return
}


// server side 
const body={
  Username:uname,
  Email:email,
  Password:pass
}
message.loading('Signing Up',10000)

let res = await fetch(process.env.NODE_ENV=="development" ?'/api/signup':window.location.origin+'/api/signup',{
  method:'POST',
  mode:'no-cors',
  cache:'no-cache',
  body:JSON.stringify(body)
})
const data:{message:string,description:string,type:"error"|"warning"|"success"} = await res.json()
message.destroy()
noteContext!({message:data.message,description:data.description,type:data.type})
if(data.type == 'success'){
router.push('/auth/sign-in')
}

}







  return (
    <section className={signup.mainContainer}>
         <div className={signup.innerContainer}>
          <section data-aos="fade-down" data-aos-easing="ease-out-back"className={signup.leftContainer}>
          <main>

            <div>
              <div className={signup.titleContainer}>
                <h2> <text>SIGN</text> UP</h2>
                <p>Begin your journey by signing up</p>
                <small>
               Start to build your portfoio
                </small>
              </div>
              <form>
                <div>
                  <label htmlFor="email" className='flex items-center'>EMAIL <text className='text-red-500 text-xl'>*</text></label>
                  <input type="email" id='email' ref={emailRef} required placeholder='johndoe@gmail.com' />
                </div>
                <div>
                  <label htmlFor="username" className='flex items-center'>USERNAME <text className='text-red-500 text-xl'>*</text></label>
                  <input type="text" id='username' ref={usernameRef} required placeholder='johndoe' />
                </div>
                <div id='passwordField-container'>
                  <label htmlFor="pass" className='flex items-center'>PASSWORD <text className='text-red-500 text-xl'>*</text></label>
                  <Password id="password" onChange={onPasswordFieldChange}/>
                  <div className='password_strength_container' id='password_strength'> 
                  <p>password strength</p>
                  <ul>
                    <li id='level-0'></li>
                    <li id='level-1'></li>
                    <li id='level-2'></li>
                    <li id='level-3'></li>
                    <li id='level-4'></li>
                  </ul>
                  <p id='passwordStrengthText'></p>
                  </div>
                </div>
                <div>
                  <label htmlFor="pass" className='flex items-center'>CONFIRM PASSWORD <text className='text-red-500 text-xl'>*</text></label>
                  <Password id="confpassword" />
                
                </div>
                <div>
                <input id='checkbox' type='checkbox' />
                <label htmlFor="checkbox">By Checking this box, you agree to our <Link href="">Privacy Policy</Link>  and <Link href="">Terms of Service</Link></label>
                </div>
                <button onClick={signUpSubmit}>
                    Sign Up
                </button>
              </form>
              <p> <Link href={{
                pathname:'/auth/sign-in'
              }}>Sign In</Link> if you already have an account</p>
            </div>
            </main>
          </section>
          <section data-aos="slide-up" data-aos-delay="100" data-aos-easing="ease-out"  className={signup.rightContainer}>
n
          </section>

         </div>
        </section>
  )
}

export default SignUp