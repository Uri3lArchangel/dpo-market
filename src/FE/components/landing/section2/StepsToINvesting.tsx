'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import createIconProfile from '../../../../../public/images_/template-get-started-icon 1.png'
import steps from '../../../../../styles/landing/steps.module.css'
import verifyIcon from '../../../../../public/images_/verifyIcon.png'
import marketIcon from '../../../../../public/images_/marketIcon.png'
import tradeIcon from '../../../../../public/images_/tradeIcon.png'
import Link from 'next/link'
import { Intersect1, Intersect2 } from '../../utils/Intersects'
import Aos from 'aos'

const StepsToINvesting = () => {

  useEffect(()=>{
    // if(window.innerWidth <1024){
    //   Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
    // }else{
    //   Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
    
    
    // }
  },[])
    
  return (
    <section id='steps-to-invest' className={steps.section_mainContainer + ' selectedScroll'}>
      <Intersect1 />
      <Intersect2 />
    <div>
      <h1 data-aos="slide-left" >Follow these steps to start investing</h1>
      <p data-aos="slide-right">Investing in DPO Tokens is a straightforward
process, one that provides you with the opportunity to
become a shareholder in private companies.
Here&apos;s a step-by-step guide</p>
      <ul className={steps.ul_stepsContainer}>
        <li data-aos="fade-up">
          <div> 
            <Image src={createIconProfile} alt='Create your account icon' />
          </div>
          <h2 className='underline'>1. Create An Account</h2>
          <p>Sign up as an accredited investor or connect with <br />  your wallet for foreign investors.</p>
        </li>
         <li data-aos="fade-up" data-aos-delay="50">
          <div>
            <Image src={verifyIcon} alt='Create your account icon' />
          </div>
          <h2 className='underline'>2. Complete verification process</h2>
          <p>Complete our verification process for a secure platform. <br /> Your data is safeguarded.</p>
        </li>
        <li data-aos="fade-up" data-aos-delay="100">
          <div>
            <Image src={marketIcon} alt='Create your account icon' />
          </div>
          <h2 className='underline'>3. Invest in our primary market, <br /> equity or debit offer</h2>
          <p>Invest in our primary market. Equity or debt offer</p>
        </li>
        <button data-aos="slide-up" data-aos-delay="100">
            <Link href=" ">
            Primary Market
            </Link>
            </button>
        <li data-aos="fade-up" data-aos-delay="150">
          <div>
            <Image src={tradeIcon} alt='Create your account icon' />
          </div>
          <h2 className='underline'>4. Trade With DPO and other Coins</h2>
          <p>Once the secondary market is open, trade dpo with other coin pairs.</p>
        </li>
        <button data-aos="slide-up" data-aos-delay="150">
        <Link href=" ">
            Secondary Market
            </Link>
        </button>
      </ul>
    </div>
    
  </section>
  )
}

export default StepsToINvesting