'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsArrowDown, BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
import debt from '../../../../styles/primary/debt.module.css'
import { change } from './functions/currencychange'
import { Tooltip } from 'antd'
import { BiPaste } from 'react-icons/bi'
import { FcDebt } from 'react-icons/fc'
import Aos from 'aos'

function Debt() {
    useEffect(()=>{
        if(window.innerWidth <1024){
          Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
        }else{
          Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
        
        
        }
      },[])
    const [currency,changeCurrency] = useState<string>('')

    const CurrencyChange=(e:React.MouseEvent<HTMLLIElement>)=>{
        changeCurrency(change(e))
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
                    <p>DPO provides investors with debt offers by issueing DPO converible notes tokens<br /> tokens are sold at lower value than the note face value </p>
                    <p> <Link className=' underline text-blue-500' href="">Read our debt agreement</Link></p>
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
                                    <li onClick={CurrencyChange} id='currency'>USD</li>
                                    <li onClick={CurrencyChange} id='currency'>CAD</li>
                                    <li onClick={CurrencyChange} id='currency'>EUP</li>
                                    <li onClick={CurrencyChange} id='currency'>GBP</li>
                                </ul>
                            </div>
                            <div className={debt.inputs}>
                                <section>
                                <input type="text" name="" id=""  placeholder='Enter Recieving Wallet Address' />
                                <button><BiPaste /></button>
                                </section>
                                <div>
                                <input type="number" name="" id=""  placeholder='Amount Of Notes To Be Purchased' />
                                <BsArrowDown size={30} className={debt.downArrow} />
                                <input type="text"readOnly disabled  name="" id=""  placeholder='Total To Be Paid' />
                                </div>
                            </div>
                    </section>
                </div>
            </section>
            <section className={debt.progressContainer}> 
                <div>
                    <div className={debt.labelsContainer}>

                     <div className="0" style={{width: "fit-content", height: 20.86, left: -10, top: 1.16, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$0</div>
                     <div className="500000" style={{width: "fit-content", height: 23.18, left: "95%", top: 0, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$500,000</div>
                     <div className="250000" style={{width:"fit-content", height: 17.39, left: "45%", top: 3.48, position: 'absolute', textAlign: 'center',color: 'rgba(255, 255, 255, 0.60)', fontSize: 18, fontFamily: 'PT Sans', fontWeight: '400', wordWrap: 'break-word'}}>$250,000</div>
                     <div className="Line2" style={{width: 16.23, height: 0, left: "50%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line3" style={{width: 19.70, height: 0, left: "100%", bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>
                     <div className="Line4" style={{width: 17.39, height: 0, left: 0, bottom: 0, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: '0 0', border: '0.50px black solid'}}></div>

                    </div>
                    <Tooltip title="$250,000" >
                    <progress value={50} max={100}>

                    </progress>
                    </Tooltip>
                </div>
            </section>
    </section>
  )
}

export default Debt