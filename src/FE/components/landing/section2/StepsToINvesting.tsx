import Image from 'next/image'
import React from 'react'
import createIconProfile from '../../../../../public/images_/template-get-started-icon 1.png'
import steps from '../../../../../styles/landing/steps.module.css'
import verifyIcon from '../../../../../public/images_/verifyIcon.png'
import marketIcon from '../../../../../public/images_/marketIcon.png'
import tradeIcon from '../../../../../public/images_/tradeIcon.png'
import Link from 'next/link'
import { Intersect1, Intersect2 } from '../../utils/Intersects'

const StepsToINvesting = () => {
  return (
    <section id='steps-to-invest' className={steps.section_mainContainer}>
      <Intersect1 />
      <Intersect2 />
    <div>
      <h1>Start investing in 4 steps</h1>
      <p>Investing in DPO Tokens is a straightforward process that provides you with the opportunity to <br /> become a shareholder in private companies. Here's a step-by-step guide:</p>
      <ul className={steps.ul_stepsContainer}>
        <li>
          <div>
            <Image src={createIconProfile} alt='Create your account icon' />
          </div>
          <h2>1. Create An Account</h2>
          <p>Sign up as an accredited investor or connect with <br />  your wallet for foreign investors.</p>
        </li>
         <li>
          <div>
            <Image src={verifyIcon} alt='Create your account icon' />
          </div>
          <h2>2. Complete verification process</h2>
          <p>Complete our verification process for a secure platform. <br /> Your data is safeguarded.</p>
        </li>
        <li>
          <div>
            <Image src={marketIcon} alt='Create your account icon' />
          </div>
          <h2>3. Invest in our primary market, <br /> equity or debit offer</h2>
          <p>Invest in our primary market. Equity or debt offer</p>
        </li>
        <button>
            <Link href=" ">
            Primary Market
            </Link>
            </button>
        <li>
          <div>
            <Image src={tradeIcon} alt='Create your account icon' />
          </div>
          <h2>4. Trade With DPO and other Coins</h2>
          <p>Once the secondary market is open, trade dpo with other coin pairs.</p>
        </li>
        <button>
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