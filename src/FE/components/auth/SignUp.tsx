'use client'
import React, { useEffect } from 'react'
import Passowrd from '../utils/antd/inputs/Passowrd'
 import signup from '../../../../styles/auth/signup.module.css'
import Link from 'next/link'
import Aos from 'aos'

function SignUp() {
  useEffect(()=>{
    if(window.innerWidth <1024){
      Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
    }else{
      Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
    
    
    }
  },[])
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
              <form action="">
                <div>
                  <label htmlFor="email">EMAIL</label>
                  <input type="email" id='email' placeholder='johndoe@gmail.com' />
                </div>
                <div>
                  <label htmlFor="email">USERNAME</label>
                  <input type="text" id='text' placeholder='johndoe' />
                </div>
                <div>
                  <label htmlFor="pass">PASSWORD</label>
                  <Passowrd  />
                </div>
                <div>
                  <label htmlFor="pass">CONFIRM PASSWORD</label>
                  <Passowrd  />
                </div>
                <div>
                <input type='checkbox' />
                <label htmlFor="checkbox">By Checking this box, you agree to our <Link href="">Privacy Policy</Link>  and <Link href="">Terms of Service</Link></label>
                </div>
                <button>
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