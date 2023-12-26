'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsArrowDown, BsArrowRight } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
import equity from '../../../../styles/primary/equity.module.css'
import { change } from './functions/currencychange'
import { Tooltip } from 'antd'
import { BiPaste } from 'react-icons/bi'
import Aos from 'aos'
import PaypalCustomProvider from '@/src/BE/web2/paypal/PaypalCustomProvider'
import PayPalBtns from '@/src/BE/web2/paypal/PayPalBtns'
import utils from '../../../../styles/utils/paypal.module.css'
import { CreateOrderActions,CreateOrderData  } from "@paypal/paypal-js";
import { OnClickActions,OnApproveData,OnApproveActions } from '@paypal/paypal-js/types/components/buttons'
import { jwtverify } from '@/src/BE/web2/functions/jwt'
import { NotificationContext, NotificationDataObject } from '../utils/antd/notification/Note'
import {isAddress} from 'web3-validator'
import { hashData } from './functions/crypto'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'


function Equity({clientID,secretverifier,clientCookie,totalInvestmentMade}:{clientID:string,secretverifier:string,clientCookie:RequestCookie | undefined,totalInvestmentMade:{Progress:number}}) {
//context
const noteContext =  useContext(NotificationContext)

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

// USE EFFECT

    useEffect(()=>{
        const first = document.getElementById('start') as HTMLParagraphElement
        const second = document.getElementById('mid') as HTMLParagraphElement
        const third = document.getElementById('end') as HTMLParagraphElement

        if(totalInvestmentMade.Progress >= 1){
            first.style.color="#6ec761"
        } if(totalInvestmentMade.Progress >= 250000){
            second.style.color="#6ec761"
        }
        if(totalInvestmentMade.Progress >= 500000){
            third.style.color="#6ec761"
        }

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
            const notification:NotificationDataObject={
                'message':'Invalid investment amount',
                description:'You have entered an invalid investment amount, ensure you only input numbers',
                type:'error'
            }
            noteContext!(notification)

            return action.reject()
        }
        const inputAmountValue=amountToInvestRef.current.value

        if(isNaN(parseFloat(inputAmountValue))){
            const notification:NotificationDataObject={
                'message':'Invalid investment amount',
                description:'You have entered an invalid investment amount, ensure you only input numbers',
                type:'error'
            }
            noteContext!(notification)
        return action.reject()
        }
     if(!walletRef.current){
        
        const notification:NotificationDataObject={
            'message':'Enter a wallet address',
            description:'please specify the wallet address to receive your tokens in',
            type:'error'
        }
        noteContext!(notification)

        return action.reject()
     }
     if(walletRef.current!.value == ''){
        console.log(walletRef.current!.value)
        const notification:NotificationDataObject={
            'message':'Enter a wallet address',
            description:'please specify the wallet address to receive your tokens in',
            type:'error'
        }
        noteContext!(notification)

        return action.reject()
     }

     if(!isAddress(walletRef.current.value)){
        const notification:NotificationDataObject={
            'message':'Enter a valid address',
            description:'the address provided is not a valid address please check it and ensure there is no error',
            type:'error'
        }
        noteContext!(notification)

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
    let amount = `${parseInt(`${((parseFloat(amountToInvestRef.current!.value))/0.0086276)}`)}`
    setDPOEquiv(amount)
}if(!isNaN(parseFloat(amountToInvestRef.current!.value)) && currency == 'GBP') {
    let amount = `${parseInt(`${((parseFloat(amountToInvestRef.current!.value))/0.0075705)}`)}`
    setDPOEquiv(amount)
}if(!isNaN(parseFloat(amountToInvestRef.current!.value)) && currency == 'CAD') {
    let amount = `${parseInt(`${((parseFloat(amountToInvestRef.current!.value))/0.0128856)}`)}`
    setDPOEquiv(amount)
}

}

const Approve=async(data:OnApproveData,actions:OnApproveActions)=>{
    const dpotokens =(document.getElementById('dpotokensinput') as HTMLInputElement).value
    if(!dpotokens || isNaN(parseInt(dpotokens))){
        noteContext!({message:"invalid DPO tokens amount data",description:'',type:'error'})
    }
    const amount = amountToInvestRef.current!.value
    let inUsd = amount
    if(currency == 'CAD'){
     inUsd= String((parseFloat(amount) / 1.28856).toFixed(2))
    }if(currency == 'EUR')
{
    inUsd= String((parseFloat(amount) / 0.86276).toFixed(2))

}
if(currency == 'GBP')
{
    inUsd= String((parseFloat(amount) / 0.75705).toFixed(2))

}
    const hashInput={
        DpoPurchased:dpotokens,
        AmountInvested:inUsd,
        WalletAddress:walletRef.current!.value,
    }
    const token = hashData(hashInput,secretverifier)


    const body={
        DpoPurchased:dpotokens,
        AmountInvested:inUsd,
        WalletAddress:walletRef.current!.value,
        Token:token,
        sessionCookie:clientCookie
    }
const res = await fetch(process.env.NODE_ENV=="production"?window.location.origin+'/api/approve-pay':'/api/approve-pay',{method:'POST',mode:'no-cors',body:JSON.stringify(body)})
const response = await res.json()
noteContext!(response)
window.location.reload()
}

const clipboardpaste=async()=>{
   let data=await navigator.clipboard.readText();
(document.getElementById('wallet') as HTMLInputElement).value = data
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
                        <GiMoneyStack size={35} className={equity.icon+" mx-2"} />
                        <figcaption>
                          
                            <h1> DPO<text className='mx-1'>Global</text> LLC, <br /> EQUITY OFFER</h1>
                        </figcaption>
                    </figure>
                    <article>
                    <p>Invest in DPO by buying shares in form of DPO <br /> equity tokens at a fixed price of <span className='text-green-500'>  Price: $40 USD per token, less 13% discount to market = $34.82 </span> and join the DPO <br /> ecosystem</p>
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
                                <input type="text" name="" id="wallet" ref={walletRef} placeholder='Enter Recieving Wallet Address' />
                                <button onClick={clipboardpaste}>
                                    <BiPaste  />
                                </button>
                                </section>
                                <div>
                                <input type="text" ref={amountToInvestRef} onChange={changeInput} placeholder={`Enter Amount You Want To Invest (${currency})`} />
                                <BsArrowDown size={30} className={equity.downArrow} />
                                <input type="number"readOnly disabled  id="dpotokensinput" value={dpoEquiv!} placeholder='DPO Tokens You Will Receive' />
                                </div>
                            </div>
                            <div className={utils.paypalButtonContainer}>
                            <PaypalCustomProvider key={scriptProviderKey} clientID={clientID} currency={currency} >
                                <PayPalBtns createOrder={setupCreateOrder} onClick={setupBeforeOrder} onApprove={Approve} />
                            </PaypalCustomProvider>
                            </div>
                    </section>
                </div>
            </section>
            <section className={equity.progressContainer}> 
                <div>
                    <div className={equity.labelsContainer}>

                     <div className="0" id='start' style={{width: "fit-content", height: 20.86, left: -10, top: 1.16, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$0</div>
                     <div className="500000" id='end' style={{width: "fit-content", height: 23.18, left: "95%", top: 0, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$500,000</div>
                     <div className="250000" id='mid' style={{width:"fit-content", height: 17.39, left: "45%", top: 3.48, position: 'absolute', textAlign: 'center',color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$250,000</div>
                     <div className="Line2" style={{width: 16.23, height: 0, left: "50%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line3" style={{width: 19.70, height: 0, left: "100%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line4" style={{width: 17.39, height: 0, left: 0, bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>

                    </div>
                    <Tooltip title={'$'+String(totalInvestmentMade.Progress)} >
                    <progress value={String(totalInvestmentMade.Progress)} max={500000}>

                    </progress>
                    </Tooltip>
                </div>
            </section>
    </section>
  )
}

export default Equity