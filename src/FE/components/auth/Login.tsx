'use client'
import React, { useEffect } from 'react'
import Passowrd from '../utils/antd/inputs/Passowrd'
 import login from '../../../../styles/auth/login.module.css'
import Link from 'next/link'
import Aos from 'aos'

function Login() {
  useEffect(()=>{
    if(window.innerWidth <1024){
      Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
    }else{
      Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
    
    
    }
  },[])
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
                  <label htmlFor="email">EMAIL</label>
                  <input type="email" id='email' placeholder='johndoe@gmail.com' />
                </div>
                <div>
                  <label htmlFor="pass">PASSWORD</label>
                  <Passowrd  />
                </div>
              
                <button>
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