'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import PaypalCustomProvider from '@/src/BE/web2/paypal/PaypalCustomProvider'
import PayPalBtns from '@/src/BE/web2/paypal/PayPalBtns'
import debt from '../../../../styles/primary/debt.module.css'
import { change } from './functions/currencychange'
import { Tooltip, message } from 'antd'
import { BiPaste } from 'react-icons/bi'
import { FcDebt } from 'react-icons/fc'
import Aos from 'aos'
import { OnClickActions } from '@paypal/paypal-js/types/components/buttons'
import utils from '../../../../styles/utils/paypal.module.css'
import { NotificationContext, NotificationDataObject } from '../utils/antd/notification/Note'
import { isAddress } from 'web3-validator'
import { CreateOrderActions,CreateOrderData  } from "@paypal/paypal-js";
import {  hashData2 } from './functions/crypto'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

function Debt({totalInvestmentMade,clientID,secretverifier,clientCookie}:{totalInvestmentMade:{Progress:number},clientID:string,secretverifier:string,clientCookie:RequestCookie | undefined}) {
    const [scriptProviderKey, setScriptProviderKey] = useState(0);
    const [currency,changeCurrency] = useState<string>('')
    const notesRef = useRef<HTMLInputElement>(null)
    const [faceValue,setFaceValue] = useState('')
    const [offerPrice,setOfferPrice] = useState('')
    const noteContext =  useContext(NotificationContext)
    const walletRef = useRef<HTMLInputElement>(null)
    const offerRef=useRef<HTMLInputElement>(null)
    const faceRef=useRef<HTMLInputElement>(null)

    let order = {purchase_units:[{
        description:"DPO EQUITY DEBT INVESTMENT",
        amount:{
            value:'0' as string
        }
    }]}


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
        NotesInputChange()

      },[scriptProviderKey])

      const setupCreateOrder = (data:CreateOrderData,action:CreateOrderActions)=>{
        
       const v =  offerRef.current!.value
        const a = v.split(" ")
        const value = (a[0]).replaceAll(",","")
        order.purchase_units[0].amount.value=value 
        return action.order.create(order)
    }


      const CurrencyChange=(e:React.MouseEvent<HTMLLIElement>)=>{
        changeCurrency(change(e))
        setScriptProviderKey(prev=>prev+1)
     }




     const setupBeforeOrder=(_: Record<string, unknown>,action:OnClickActions)=>{
        // const vc =  offerRef.current!.value
        // const ac = vc.split(" ")
        // const vx = (ac[0]).replaceAll(",","")
        // order.purchase_units[0].amount.value=vx 

        // console.log(offerRef.current!.value)
        // console.log(order)
        // return action.reject()
        if(!notesRef.current){
            const notification:NotificationDataObject={
                message:"Provide Notes To Purchase",
                description:"Enter a valid amount of converible notes to purchase",
                type:'error'
            }
            noteContext!(notification)
            return action.reject()

        }
        if(notesRef.current.value == '' || isNaN(parseInt(notesRef.current.value))){
            const notification:NotificationDataObject={
                message:"Provide Notes To Purchase",
                description:"Enter a valid amount of converible notes to purchase",
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
         if(!faceRef.current || faceRef.current.value == ''){
            return action.reject()

         }
         if(!offerRef.current || offerRef.current.value == ''){
            return action.reject()

         }
         const v =  offerRef.current!.value
         const a = v.split(" ")
         const value = a[0]
     }




     const NotesInputChange=()=>{
        if(!notesRef.current){
            setFaceValue('')
            return
        }
        if(notesRef.current.value == ''){
            setFaceValue('')
            return
        }
        if(isNaN(parseInt(notesRef.current.value))){
            setFaceValue('')
            return
        }
        const notesAmount = Number(notesRef.current.value)
        console.log(notesAmount)
        if(currency == 'CAD'){
            const face = notesAmount*1288.56
            const offer = notesAmount*1121.04
            setFaceValue(String(face))
            setOfferPrice(String(offer))
        }if(currency == 'EUR'){
            const face = notesAmount*862.76
            const offer = notesAmount*750.60
            setFaceValue(String(face))
            setOfferPrice(String(offer))
        }if(currency == 'GBP'){
            const face = notesAmount*757.05
            const offer = notesAmount*658.63
            setFaceValue(String(face))
            setOfferPrice(String(offer))

        }if(currency == 'USD'){
            const face = notesAmount*1000
            const offer = notesAmount*870
            setFaceValue(String(face))
            setOfferPrice(String(offer))
        }

    }


const Approve=async()=>{
    message.loading("processing...",1000)
    
    let usdOfferValue = String(parseFloat(notesRef.current!.value)*870)
    let usdFaceValue =  String(parseFloat(notesRef.current!.value)*1000)
    const hashInput={
        NotesPurchased:notesRef.current!.value,
        AmountInvested:usdOfferValue,
        WalletAddress:walletRef.current!.value,
        faceValue:usdFaceValue
    }
    const token = hashData2(hashInput,secretverifier)
    const body={
        NotesPurchased:notesRef.current!.value,
        AmountInvested:usdOfferValue,
        WalletAddress:walletRef.current!.value,
        faceValue:usdFaceValue,
        Token:token,
        sessionCookie:clientCookie
    }
const res = await fetch(process.env.NODE_ENV=="production"?window.location.origin+'/api/approve-pay-debt':'/api/approve-pay-debt',{method:'POST',mode:'no-cors',body:JSON.stringify(body)})
if(res.status== 500){
    message.destroy()

    noteContext!({message:"Server / Network Error",description:'',type:'error'})
    await Approve()

}
const response = await res.json()
message.destroy()
noteContext!(response)
window.location.reload()
}


const clipboardpaste=async()=>{
    let data=await navigator.clipboard.readText();
 (document.getElementById('wallet') as HTMLInputElement).value = data
 }

  return (
    <section className={debt.mainContainer + ' selectedScroll'} id='debt'>
        <div>
        </div>

            <section className={debt.innerContainer}>
                <div data-aos="fade-right" className={debt.leftContainer}>
                    <div>
                    <figure>
                        <FcDebt size={35} className={debt.icon} />
                        <figcaption>
                            <h1>DIRECT <text>PRIVATE</text> OFFERS, <br /> DEBT OFFER</h1>
                        </figcaption>
                    </figure>
                    <article>
                    <p>DPO provides investors with debt offers by issueing DPO converible notes tokens<br /> tokens are sold at lower value than the note face value, Please ensure you read our debt agreement before proceeding </p>
                    <p> <Link className=' underline text-blue-500' href="/primary-debt-agreement">Read our debt agreement</Link></p>
                    </article>
                    <div className={debt.leftGoToDebtCntainer}>
                    <em>Interested in our equity offer?</em>
                    <button><Link href={
                        {
                            pathname:'/invest/primary-market',
                            query:{offer:'equity'}
                        }
                    }>
                    <BsArrowLeft size={25} />    
                    <p>GO TO EQUITY OFFER</p>
                    </Link></button>
                    </div>
                    </div>
                </div>
                <div data-aos="flip-up" className={debt.rightContainer}> 
                    <p className=' text-center text-red-500 text-2xl font-bold'>$870 per notes with face value of $1000</p>
                    <section>
                            <div className={debt.curencyContainer}>
                            <p>select your currency</p>
                           
                                <ul>
                                    <li className='currency' id='USD' onClick={CurrencyChange} >USD</li>
                                    <li onClick={CurrencyChange} className='currency' id='CAD'>CAD</li>
                                    <li onClick={CurrencyChange} className='currency' id='EUR'>EUR</li>
                                    <li onClick={CurrencyChange} className='currency' id='GBP'>GBP</li>
                                </ul>
                            </div>
                            <div className={debt.inputs}>
                                <section>
                                <input type="text" ref={walletRef} id='wallet' placeholder='Enter Recieving Wallet Address' />
                                <button onClick={clipboardpaste}><BiPaste /></button>
                                </section>
                                <div>
                                <input onKeyDown={(e)=>{if(e.key==='.'){e.preventDefault();}}} type="number" ref={notesRef} onChange={NotesInputChange} placeholder='Amount Of Notes To Be Purchased' />
                                <input type="text"readOnly disabled  value={faceValue==''?'':(Number(offerPrice)).toLocaleString()+' '+currency} id="offerPrice" ref={offerRef} placeholder='Offer Price To Be Paid' />
                                <input type="text"readOnly disabled  value={faceValue==''?'':(Number(faceValue)).toLocaleString()+' '+currency} id="noteFaceValue" ref={faceRef}  placeholder='Face Value Worth' />
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
            <section className={debt.progressContainer}> 
                <div>
                    <div className={debt.labelsContainer}>

                     <div className="0" id='start' style={{width: "fit-content", height: 20.86, left: -10, top: 1.16, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$0</div>
                     <div className="500000" id='end' style={{width: "fit-content", height: 23.18, left: "95%", top: 0, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$500,000</div>
                     <div className="250000" id='mid' style={{width:"fit-content", height: 17.39, left: "45%", top: 3.48, position: 'absolute', textAlign: 'center',color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$250,000</div>
                     <div className="Line2" style={{width: 16.23, height: 0, left: "50%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line3" style={{width: 19.70, height: 0, left: "100%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line4" style={{width: 17.39, height: 0, left: 0, bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>

                    </div>
                    <Tooltip title={'$'+totalInvestmentMade.Progress} >
                    <progress value={totalInvestmentMade.Progress} max={500000}> 

                    </progress>
                    </Tooltip>
                </div>
            </section>
    </section>
  )
}

export default Debt