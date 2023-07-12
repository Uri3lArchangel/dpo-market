import React, { useEffect } from 'react'
import header from '../../../../../styles/landing/header.module.css'
import {BiChevronRight, BiSolidRightArrow} from 'react-icons/bi'

const Header = () => {
  
  
  return (
    <header className={header.Header_headerContainer}>
     
      <section className={header.h1_IntroTitle_container}>
        <article>
      <h1 > 
      Invest in Direct Private Offers by <br /> Acquiring Our Shares as Security <br /> Tokens (<text>DPO Tokens</text>)
      </h1>
      <p>Are you looking for a unique investment opportunity that provides direct access to private companies? Look no further than our revolutionary investment offering: DPO Tokens.</p>
      </article>
      <section className={header.investLearnMore_Container}>
        <button>
         <p>Invest</p> 
         <BiChevronRight />
          </button>
        <button>
         <p>Learn More</p>  <BiSolidRightArrow /></button>
      </section>
      <div className={header.div_chart_container}>
      </div>
      </section>
    </header>
  )
}

export default Header