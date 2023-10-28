'use client'
import React from 'react'
import btc from "cryptocurrency-icons/32/color/btc.png";
import cad from "../../public/coindata/Flag_of_Canada.svg.png";
import Image, { StaticImageData } from 'next/image'


export function CoinPairImageNode({coin1,coin2}:{coin1:{img:StaticImageData | string,alt:string},coin2:{img:StaticImageData | string,alt:string}}) {
  return (
    <div className=' w-16 relative h-10'>
        <Image src={coin1.img} alt={coin1.alt} width={700} height={700} className='w-8 h-8 rounded-full absolute z-10 ' />
        <Image  src={coin2.img} alt={coin2.alt} width={700} height={700} className='w-8 h-8 rounded-full absolute left-[20px] top-[5px]' />
    </div>
  )
}





