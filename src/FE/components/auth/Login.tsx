'use client'
import React from 'react'
import Passowrd from '../utils/antd/inputs/Passowrd'
 import login from '../../../../styles/auth/login.module.css'
import Link from 'next/link'


function Login() {
  return (
    <section className={login.mainContainer}>
         <div className={login.innerContainer}>
          <section  className={login.leftContainer}>
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
                  <input type="text" id='email' placeholder='johndoe@gmail.com' />
                </div>
                <div>
                  <label htmlFor="pass">PASSWORD</label>
                  <Passowrd  />
                </div>
                <div>
                <input type='checkbox' />
                <label htmlFor="checkbox">By Checking this box, you agree to our <Link href="">Privacy Policy</Link>  and <Link href="">Terms of Service</Link></label>
                </div>
                <button>
                    Sign In
                </button>
              </form>
              <p> <Link href="">Sign Up</Link> if you dont have an account</p>
            </div>
          </section>
          <section className={login.rightContainer}>
n
          </section>

         </div>
        </section>
  )
}

export default Login