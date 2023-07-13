'use client'
import React, { useEffect } from 'react'
import TradingPairs from './TradingPairs'
import secondary from '../../../../../styles/invest/secondary.module.css'


const SecondaryMarket = () => {

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