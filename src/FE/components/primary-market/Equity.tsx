'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsArrowDown, BsArrowDownCircle, BsArrowRight } from 'react-icons/bs'
import { GiMoneyStack } from 'react-icons/gi'
import equity from '../../../../styles/primary/equity.module.css'
import { change } from './functions/currencychange'
import { Tooltip } from 'antd'
import { BiPaste } from 'react-icons/bi'


function Equity() {
    const [currency,changeCurrency] = useState<string>('')

    const CurrencyChange=(e:React.MouseEvent<HTMLLIElement>)=>{
        changeCurrency(change(e))
    }
  return (
    <section className={equity.mainContainer + ' selectedScroll'} id='equity'>
        <div>
        </div>

            <section className={equity.innerContainer}>
                <div className={equity.leftContainer}>
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
                    <button><Link href="">
                    <p>GO TO DEBT OFFER</p>
                    <BsArrowRight size={25} />    
                    </Link></button>
                    </div>
                    </div>
                </div>
                <div className={equity.rightContainer}> 
                    <section>
                            <div className={equity.curencyContainer}>
                            <p>select your currency</p>
                           
                                <ul>
                                    <li onClick={CurrencyChange} id='currency'>USD</li>
                                    <li onClick={CurrencyChange} id='currency'>CAD</li>
                                    <li onClick={CurrencyChange} id='currency'>EUP</li>
                                    <li onClick={CurrencyChange} id='currency'>GBP</li>
                                </ul>
                            </div>
                            <div className={equity.inputs}>
                                <section>
                                <input type="text" name="" id=""  placeholder='Enter Recieving Wallet Address' />
                                <button><BiPaste /></button>
                                </section>
                                <div>
                                <input type="number" name="" id=""  placeholder='Enter Amount You Want To Invest' />
                                <BsArrowDown size={30} className={equity.downArrow} />
                                <input type="number"readOnly disabled  name="" id=""  placeholder='DPO Tokens You Will Receive' />
                                </div>
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
                    <progress value={50} max={100}>

                    </progress>
                    </Tooltip>
                </div>
            </section>
    </section>
  )
}

export default Equity