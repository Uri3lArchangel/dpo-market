'use client'
import React, { useEffect } from 'react'
import TradingPairs from './TradingPairs'
import secondary from '../../../../../styles/invest/secondary.module.css'
import Aos from 'aos'

const SecondaryMarket = () => {
  useEffect(()=>{
    if(window.innerWidth <1024){
      Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
    }else{
      Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
    
    
    }
  },[])
    
  return (
   <section className={secondary.mainContainer +' selectedScroll'} id='secondary-market'>
    <div>
      <section className={secondary.innerContainer}>
        <div className={secondary.title}>
          <em>The secondary market is not opened untill the primary martket closes</em>
        <h3>Secondary Market</h3>
        <p>Select Your Trading Currency DPO Pair and Start Trading</p>
        </div>
          <section className={secondary.tradingPairOuterContainer}>
            <div className={secondary.headerContainer}>
              <ul>
                <li>NO</li>
                <li>NAME</li>
                <li>LAST PRICE</li>
                <li>TRADE</li>
              </ul>
            </div>
            <TradingPairs />
          </section>
      </section>
    </div>
   </section>
  )
}

export default SecondaryMarket