'use client'
import portfolio from "../../../../styles/portfolio/portfolio.module.css";
import Image from "next/image";
import { BsBriefcaseFill } from "react-icons/bs";
import logo from '../../../../public/images_/dpologo.png'
import TableApp from "./antd/Table";
import ConnectWallet from "./antd/ConnectDPOWallet";
import { UserWalletmodel, WalletOptions } from "@/declarations";
import {trauncateStringMiddle}from '../../Functions/Helpers/FE/AddressTrauncate';
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import React, { useState } from "react";
import {message} from 'antd'


interface Props{
  equityOffers:{
    walletAddress:String,
    amountInvested:Number,
    totalTokensToReceive:Number,
    isActive:Boolean,
}; debtOffers:{
  walletAddress:String,
  totalNotesOwned:Number,
  totalFaceValue:Number,
  maturityPeriodInDays:Number,
  maturityDate:Date,
  isActive:Boolean,
};
wallet:UserWalletmodel|null
}



function Portfolio({equityOffers,debtOffers,wallet}:Props) {
  const [isCopied,setIsCopied]=useState(false);
  
  const copyAddress = ()=>{
    if(!wallet)return
    let a;
    setIsCopied(true);
  navigator.clipboard.writeText(wallet.address)
  message.destroy()
  message.success("Address copied",4)
   a= setTimeout(()=>{
    setIsCopied(false)
  },2000)

  }
  return (
    <section className={portfolio.mainContainer+ ' selectedScroll'} id="portfolio">
      <div>
        <section data-aos="fade-right" className={portfolio.total}>
          <div className={portfolio.titleContainer}>
            <BsBriefcaseFill className={portfolio.headerIcon} />
            <h3>Portfolio</h3>
          </div>
          <div className={portfolio.stats}>
            {!equityOffers.isActive?<div><h3>Total Investment:</h3>  <p>$0.00</p></div>:<div><h3>Total Investment:</h3>  <p>${(equityOffers.amountInvested).toLocaleString()}</p></div>}
          </div>
          <div className={portfolio.value}>
            <h3>Current Value</h3>
            {!equityOffers.isActive?<p>$0.00</p>:<p>$0.00</p>}
          </div>
        </section>
      {!equityOffers.isActive?  <section data-aos="fade-right" data-aos-delay="500" className={portfolio.dpoHolding}>
          <div className={portfolio.titleContainer}>
            <Image src={logo} alt="dpo token" className={portfolio.headerIcon} />
            <h3>DPO Tokens Purchased</h3>
          </div>
          <div className={portfolio.stats}>
            <div><h3>Total Balance in (USD)</h3> <p>$0.00</p></div>
          </div>
          <div className={portfolio.value}>
            <h3>Token Balance</h3>
            <p>0</p>
          </div>
        </section>:<section data-aos="fade-right" data-aos-delay="500" className={portfolio.dpoHolding}>
          <div className={portfolio.titleContainer}>
            <Image src={logo} alt="dpo token" className={portfolio.headerIcon} />
            <h3>DPO Tokens Purchased</h3>
          </div>
          <div className={portfolio.stats}>
            <div><h3>Total Balance in (USD)</h3> <p>$0.00</p></div>
          </div>
          <div className={portfolio.value}>
            <h3>Token Balance</h3>
            <p>{(equityOffers.totalTokensToReceive).toLocaleString()}</p>
          </div>
        </section>}
        <section data-aos="fade-left" data-aos-delay="800" className={portfolio.debtOverview}>
            <h4>Current Debt Offer Overview</h4>
           {!debtOffers.isActive? <ul>
              <li><h4>Convertible Notes Owned:</h4> <p>0</p></li>
              <li><h4>Total Notes Face Value:</h4> <p>$0.00</p></li>
              <li><h4>Maturity Date:</h4> <p>N/A</p></li>
              <li><h4>Maturity Period:</h4> <p>Nil</p></li>
            </ul>:<ul>
              <li><h4>Convertible Notes Owned:</h4> <p>{(debtOffers.totalNotesOwned).toLocaleString()}</p></li>
              <li><h4>Total Notes Face Value:</h4> <p>${(debtOffers.totalFaceValue).toLocaleString()}</p></li>
              <li><h4>Maturity Date:</h4> <p>{String(debtOffers.maturityDate)}</p></li>
              <li><h4>Maturity Period:</h4> <p>{String(debtOffers.maturityPeriodInDays)}</p></li>
            </ul>}
        </section>
        <section data-aos="fade-up" data-aos-delay="1000" className={portfolio.coinsHoldings}>
        {wallet? <div className="flex items-center cursor-pointer w-fit" onClick={copyAddress}>{isCopied?<CopyCheckIcon />:<CopyIcon  />} <h1 className="text-xl">{trauncateStringMiddle(wallet.address)}</h1></div>:<ConnectWallet />}
        {/* <WithdrawCrypto /> */}
            <h3>Wallet Balance</h3>

            <TableApp wallet={wallet} />
        </section>
      </div>
    </section>
  );
}

export default Portfolio;
