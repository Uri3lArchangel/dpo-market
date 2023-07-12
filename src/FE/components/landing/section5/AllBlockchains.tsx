import Image from 'next/image'
import React from 'react'
import arb from '../../../../../public/images_/arbLogo.png'
import chains from '../../../../../styles/landing/chains.module.css'
function AllBlockchains() {
  return (
    <section id='blockchains' className={chains.sect_mainContainer}>
        <div>
            <h4>All blockchains that support DPO</h4>
            <section className={chains.sect_chainsContainer}>
                <figure>
                    <div className={chains.imageContainer}>
                       <Image src={arb} alt='arbitrium one' />
                    </div>
                    <figcaption>Arbitrium one</figcaption>
                </figure>
            </section>
        </div>
    </section>
  )
}

export default AllBlockchains