import Image from 'next/image'
import React from 'react'
import footer from '../../../../styles/footer.module.css'
import logo from '../../../../public/images_/dpologo.png'
import Link from 'next/link'
import { AiTwotonePhone } from 'react-icons/ai'
import {MdAttachEmail} from 'react-icons/md'
const Footer = () => {
  return (
    <footer className={footer.mainContainer + ' overflow-x-hidden'}>
        <section>
            <div className={footer.leftContainer}>
           <figure> 
            <div>
                <Image src={logo} alt='dpo logo' />
            </div>
            <figcaption>
                <h5>DIRECT <text>PRIVATE</text> OFFERS</h5>
            </figcaption>
           </figure>
           <p><AiTwotonePhone /> 
          <Link target='_blank' href="tel:+16473938417">1-647-393-8417</Link> </p>
           <p>
            <MdAttachEmail />
           <Link target='_blank' href="%20adsco@directprivateoffers.ca">adsco@directprivateoffers.com</Link>
           </p>
            </div>
            <div className={footer.rightContainer}>
                <section className={footer.ListContainer}>
                    <h5>List</h5>
                    <ul>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/listing-process/">Process</Link>
                        </li>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/listing-costs/">Costs</Link>
                        </li>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/listing-support/https:/www.directprivateoffers.net/listing-support/">Support</Link>
                        </li>
                    </ul>
                </section>
                <section className={footer.InformationContainer}>
                    <h5>Information</h5>
                    <ul>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/about-us">About</Link>
                        </li>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/about/privacy">Privacy</Link>
                        </li>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/about/terms">Terms & Conditions</Link>
                        </li>
                    </ul>
                </section>  
                <section className={footer.EcoContainer}>
                    <h5>Ecosystem</h5>
                    <ul>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/blog">DPO - Community</Link>
                        </li>
                        <li>
                            <Link target='_blank' href="https://dpo-swap.vercel.app/">DPO - SWAP</Link>
                        </li>
                        <li>
                            <Link target='_blank' href="https://dpo-central-pannel.vercel.app/">DPO - Dashboard</Link>
                        </li>
                        <li>
                            <Link target='_blank' href="https://www.directprivateoffers.net/dpo">OTC:MNZO</Link>
                        </li>
                    </ul>
                </section>                <section></section>
            </div>
        </section>
        <div className={footer.copyrightContainer}>
       <p> © 2022 Direct Private Offers All Rights Reserved. Terms of Use | Privacy Policy</p>
        </div>   
             </footer>
  )
}

export default Footer