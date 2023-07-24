'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BsArrowDown, BsArrowDownCircle, BsArrowRight } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
import equity from '../../../../styles/primary/equity.module.css'
import { change } from './functions/currencychange'
import { Tooltip } from 'antd'
import { BiPaste } from 'react-icons/bi'
import Aos from 'aos'
import PaypalCustomProvider from '@/src/BE/web2/paypal/PaypalCustomProvider'
import PayPalBtns from '@/src/BE/web2/paypal/PayPalBtns'
import utils from '../../../../styles/utils/paypal.module.css'
import { CreateOrderRequestBody,CreateOrderActions,CreateOrderData  } from "@paypal/paypal-js";
import { OnClickActions,OnApproveData,OnApproveActions } from '@paypal/paypal-js/types/components/buttons'
import { jwtVerificationSign } from '@/src/BE/web2/functions/jwt'



function Equity({clientID,jwtsecretverifier}:{clientID:string,jwtsecretverifier:string}) {
// STATES 
const [currency,changeCurrency] = useState<string>('')
const [scriptProviderKey, setScriptProviderKey] = useState(0);
const amountToInvestRef = useRef<HTMLInputElement>(null)
const [dpoEquiv,setDPOEquiv] = useState<string>('')
const walletRef = useRef<HTMLInputElement>(null)
let order = {purchase_units:[{
    description:"DPO EQUITY OFFER INVESTMENT",
    amount:{
        value:'0' as string
    }
}]}

// USEEFFECT

    useEffect(()=>{
        if(!currency){
            
        let selected = document.getElementById('USD')
        selected!.classList.add('selectedCurrency')
            changeCurrency('USD')
            console.log(currency)
        }
       
        if(window.innerWidth <1024){
          Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
        }else{
          Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
        
        
        }
        changeInput()
      },[scriptProviderKey])
  

      // CUSTOM FUNCTIONS
    const CurrencyChange=(e:React.MouseEvent<HTMLLIElement>)=>{
       changeCurrency(change(e))
       setScriptProviderKey(prev=>prev+1)
    }

    const setupBeforeOrder = (_: Record<string, unknown>,action:OnClickActions)=>{
        if(!amountToInvestRef.current){
         console.log("wrong inpuut")

            return action.reject()
        }
        const inputAmountValue=amountToInvestRef.current.value

        if(isNaN(parseFloat(inputAmountValue))){
        console.log("wrong input")
        return action.reject()
        }
     if(!walletRef.current){
        console.log("wrong wallet address")

        return action.reject()
     }
     if(walletRef.current.value == ''){
        console.log("wrong wallet address")

        return action.reject()
     }
        
    }
    const setupCreateOrder = (data:CreateOrderData,action:CreateOrderActions)=>{
        order.purchase_units[0].amount.value=amountToInvestRef.current!.value   
        return action.order.create(order)
    }

const changeInput=()=>{
if(amountToInvestRef.current!.value == ''){
    setDPOEquiv('')
    return

}
if(!isNaN(parseFloat(amountToInvestRef.current!.value)) && currency == 'USD') {
    let amount = `${parseInt(`${((parseFloat(amountToInvestRef.current!.value))/0.01)}`)}`
    setDPOEquiv(amount)
}if(!isNaN(parseFloat(amountToInvestRef.current!.value)) && currency == 'EUR') {
    let amount = `${parseInt(`${((parseFloat(amountToInvestRef.current!.value))/0.009)}`)}`
    setDPOEquiv(amount)
}if(!isNaN(parseFloat(amountToInvestRef.current!.value)) && currency == 'GBP') {
    let amount = `${parseInt(`${((parseFloat(amountToInvestRef.current!.value))/0.0078)}`)}`
    setDPOEquiv(amount)
}if(!isNaN(parseFloat(amountToInvestRef.current!.value)) && currency == 'CAD') {
    let amount = `${parseInt(`${((parseFloat(amountToInvestRef.current!.value))/0.013)}`)}`
    setDPOEquiv(amount)
}

}
const Approved=async(data:OnApproveData,action:OnApproveActions)=>{
console.log(action)
const temp={
    dpoamount:dpoEquiv,
    investmentamount:amountToInvestRef.current!.value,
    walletaddress:walletRef.current!.value,
    key:jwtsecretverifier
}
let sig = jwtVerificationSign(temp)
const fetchData={
    WalletAddress:walletRef.current!.value,
    DpoAmount:dpoEquiv,
    InvestmentInUsd:amountToInvestRef.current!.value,
    Hash:sig
}

await fetch('/api/approved-payment',{method:'POST',mode:'no-cors',body:JSON.stringify(fetchData)})
return  
}

// JSX
  return (
    <section className={equity.mainContainer + ' selectedScroll'} id='equity'>
        <div>
        </div>

            <section className={equity.innerContainer}>
                <div data-aos="fade-right" className={equity.leftContainer}>
                    <div>
                    <figure>
                        <GiMoneyStack size={35} className={equity.icon} />
                        <figcaption>
                            <h1>DIRECT <text>PRIVATE</text> OFFERS, <br /> EQUITY OFFER</h1>
                        </figcaption>
                    </figure>
                    <article>
                    <p>Invest in DPO by buying shares in form of DPO <br /> equity tokens at a fixed price and join the DPO <br /> ecosystem</p>
                    </article>
                    <div className={equity.leftGoToDebtCntainer}>
                    <em>Interested in our debt offer?</em>
                    <button><Link href={
                        {
                            pathname:'/invest/primary-market',
                            query:{offer:'debt'}
                        }
                    }>
                    <p>GO TO DEBT OFFER</p>
                    <BsArrowRight size={25} />    
                    </Link></button>
                    </div>
                    </div>
                </div>
                <div data-aos="flip-up" className={equity.rightContainer}> 
                    <section>
                            <div className={equity.curencyContainer}>
                            <p>select your currency</p>
                           
                                <ul>
                                    <li onClick={CurrencyChange} className='currency' id='USD'>USD</li>
                                    <li onClick={CurrencyChange} className='currency' id='CAD'>CAD</li>
                                    <li onClick={CurrencyChange} className='currency' id='EUR'>EUR</li>
                                    <li onClick={CurrencyChange} className='currency' id='GBP'>GBP</li>
                                </ul>
                            </div>
                            <div className={equity.inputs+' mb-10'}>
                                <section>
                                <input type="text" name="" id=""  placeholder='Enter Recieving Wallet Address' />
                                <button>
                                    <BiPaste />
                                </button>
                                </section>
                                <div>
                                <input type="text" ref={amountToInvestRef} onChange={changeInput} placeholder={`Enter Amount You Want To Invest (${currency})`} />
                                <BsArrowDown size={30} className={equity.downArrow} />
                                <input type="number"readOnly disabled  name="" id="" value={dpoEquiv!} placeholder='DPO Tokens You Will Receive' />
                                </div>
                            </div>
                            <div className={utils.paypalButtonContainer}>
                            <PaypalCustomProvider key={scriptProviderKey} clientID={clientID} currency={currency} >
                                <PayPalBtns createOrder={setupCreateOrder} onClick={setupBeforeOrder} onApprove={Approved}/>
                            </PaypalCustomProvider>
                            </div>
                    </section>
                </div>
            </section>
            <section className={equity.progressContainer}> 
                <div>
                    <div className={equity.labelsContainer}>

                     <div className="0" style={{width: "fit-content", height: 20.86, left: -10, top: 1.16, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$0</div>
                     <div className="500000" style={{width: "fit-content", height: 23.18, left: "95%", top: 0, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$500,000</div>
                     <div className="250000" style={{width:"fit-content", height: 17.39, left: "45%", top: 3.48, position: 'absolute', textAlign: 'center',color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$250,000</div>
                     <div className="Line2" style={{width: 16.23, height: 0, left: "50%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line3" style={{width: 19.70, height: 0, left: "100%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line4" style={{width: 17.39, height: 0, left: 0, bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>

                    </div>
                    <Tooltip title="$250,000" >
                    <progress value={0} max={100}>

                    </progress>
                    </Tooltip>
                </div>
            </section>
    </section>
  )
}

export default Equity