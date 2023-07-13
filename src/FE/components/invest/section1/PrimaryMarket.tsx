'use client'
import React, { useEffect } from 'react'
import primary from '../../../../../styles/invest/primary.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { BiArrowToRight } from 'react-icons/bi'
import equity from '../../../../../public/images_/equity.png'
import debt from '../../../../../public/images_/debt.png'
import { HiArrowRightCircle } from 'react-icons/hi2'
import { MdArrowRight } from 'react-icons/md'
import { Intersect3, Intersect4, Intersect5 } from '../../utils/Intersects'
import Aos from 'aos'

const PrimaryMarket = () => {

    useEffect(()=>{
        Aos.init({duration:500})
    },[])
  return (
    <section className={primary.mainContainer} id='primary-market'>
        <Intersect3 />
        <Intersect4 />
        <Intersect5 />
        <div>
            <section className={primary.innerContainer}>
            <div className={primary.topTitle} data-aos="fade-down" data-aos-easing="ease-in">
            <h1>Primary Market</h1>
            <p>Participate in Primary Investment to fund start-ups, private companies, projects, and more.</p>
            </div>
           <section className={primary.offers}>
            <div data-aos="fade-right" className={primary.offers_equity}>
                <div className={primary.offersImage}>
                    <Image src={equity} alt='equity offer' />
                </div>
                <article>
                <text>Equity Offer</text>    
                <h2>DPO Market Offers Equitable Equity Opportunities</h2>     
                <p>DPO Equity offer provides investors the chance to make early investment in the DPO shares and token directly by purchasing DPO security tokens.</p>     
                <div className={primary.offers_buttonContainer}>

                    <button>
                        <Link href="">Invest</Link>
                    </button>
              </div>
                </article>
            </div>
            <div data-aos="fade-left" className={primary.offers_debt} >
            <div className={primary.offersImage}>
                    <Image src={debt} alt='debt offer' />
                </div>
                <article>
                <text>Debit Offer</text> 
                <h2>DPO Market Offers New Issued Debt Securities Opportunities.</h2>
                <p>DPO provides debt offers oppurtunities where investors can purchase convertible notes for a lower face value and later redeem them either as common shares or at their face value.</p>
                <div className={primary.offers_buttonContainer}>
                    <button>
                        <Link href="">
                            Invest
                        </Link>
                    </button>
                    <Link href=""><p>Read Debt Agreement</p><MdArrowRight size={25} /></Link>
                </div>
                </article>
            </div>
           </section>
           </section>

        </div>
    </section>
  )
}

export default PrimaryMarket