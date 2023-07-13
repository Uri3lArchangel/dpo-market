import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import secondary from '../../../../../styles/invest/secondary.module.css'
import { data } from './core/TradiingPairData'
import { Tooltip } from 'antd'

const TradingPairs = () => {
  return (
    <section className={secondary.pairInnerContainer}>
        <ul>
           {data.map((item,i)=> <li key={i}  data-aos={(i+1)%2==0?"slide-left":"slide-right"}  data-aos-easing="ease-out-back">
                <div>
                   {item.key} 
                </div>
                <div>
                    <Image src={item.name.img} alt='btc' />
                    <p> <span className={secondary.innerNameSpan}> {item.name.text} | </span>{item.name.symbol}</p>
                </div>
                <div>
                    {item.last_price}
                </div>
                <div>
                    <Tooltip title='Secondary Market is not yet open'>
                    <Link className='diabled-links' href={item.trade} >Trade</Link>
                    </Tooltip>
                </div>
            </li>)}
        </ul>
    </section>
  )
}

export default TradingPairs