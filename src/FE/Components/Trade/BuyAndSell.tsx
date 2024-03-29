'use client'
import React, { CSSProperties, useContext, useEffect, useState } from 'react'
import TabApp from '../Antd/TabApp'
import { TabsProps } from 'antd';
import BuyMarketSection from './BuyMarketSection';
import SellMarketSection from './SellMarketSection';
import { BiChevronDown} from 'react-icons/bi'
import ModalApp from '../Antd/ModalApp';
import TradingPairModal from './TradingPairModal';
import { FullTradingPairContextKey } from './TradingPairContext';
import { TradingPair } from '@/src/Data/TradingPair';
import axios from 'axios';
import { CoinPairImageNode } from '@/src/Data/CoinPairImageNode';
import { PairArrayData } from '@/src/Data/TradingPairData';
import { URLresolve } from '../../Functions/Helpers/FE/FetchUrlResolve';
import { CoinNameContextHandler } from '../Contexts/CoinNameContext';

interface Styles{
    footer?:CSSProperties,
    header?:CSSProperties,
    body?:CSSProperties,
    content?:CSSProperties,
    mask?:CSSProperties,
    wrapper?:CSSProperties,

  
}

const modalBgColor = "#2e303579"
  const modalStyles:Styles = {
    content:{background:modalBgColor,backdropFilter:"blur(15px)",borderRadius:"20px",padding:"4em 0em 0.5em 0em"},mask:{background:"initial"}
  }

  const fetchLivePriceFromTickerSymbol=async(a:string)=>{
    let b = TradingPair[a].pair
    let pair = b.split(":")[1]
    if(!pair) return
    let latestTickerPriceData
    if(["BTC/CAD", "ETH/CAD", "USDC/CAD", "USDT/CAD"].includes(a)){
    let  endpoint= `https://api.kraken.com/0/public/Ticker?pair=${pair}`
    const res = await axios.get(endpoint)
    const data = res.data
  
    if(data.error.length !=0) return;
    const tickerReform = Object.keys(data.result)[0]
    const tickerPriceData = data.result[tickerReform]
    latestTickerPriceData= tickerPriceData.c[0]
    }else{
      if(a == "DPO/CAD") a="SHIB/USDC"
      let refined = a.replace('/','-')
      let endpoint =`https://www.okx.com/api/v5/market/ticker?instType=SPOT&instId=${refined}`
        const res = await axios.get(endpoint)
        if(res.status != 200 ) return
      const data = res.data
   
    const tickerPriceData = data.data[0] 
    latestTickerPriceData= tickerPriceData.last
    }
   
    return parseFloat(latestTickerPriceData)
   }
  
  

  
  
const BuyAndSell = ({wallet}:{wallet:{coinName:string,amount:number,pending:number}[]}) => {
const [modalState,setModalState]=useState(false)
const keyVal = useContext(FullTradingPairContextKey).keyPropVal
const [Price,setPrice]=useState<number | undefined>()
const PairName = useContext(CoinNameContextHandler).replace("-", "/");










const items: TabsProps["items"] = [
  {
    key: "1",
    label: <p className='text-green-500 text-lg'>BUY</p>,
    children: <BuyMarketSection walletData={wallet} currentPrice={Price || "Fetching..."} from={{name:PairName.split("/")[1],price:0}}  to={{name:PairName.split("/")[0],price:0}} />,
  },
  {
    key: "2",
    label: <p className='text-red-500 text-lg'>SELL</p>,
    children: <SellMarketSection walletData={wallet} currentPrice={Price || "Fetching..."} from={{name:PairName.split("/")[0],price:0}}  to={{name:PairName.split("/")[1],price:0}} />,
  },

];
 
useEffect(()=>{
  const init = async()=>{
    setPrice(await fetchLivePriceFromTickerSymbol(PairName))
}
init()


},[keyVal,wallet])

  return (
    <>
    <ModalApp state={modalState}  setState={setModalState} classname='bg-[#2e303579] lg:min-w-[700px] w-full rounded-lg' styles={modalStyles} closeicon={true}><TradingPairModal setModalState={setModalState} /></ModalApp>
    <section className='h-[420px] bg-black px-4 overflow-y-scroll' id='buySellContainer'>
        <div onClick={()=>{
          setModalState(true)
        }} className='flex items-center  cursor-pointer rounded-lg select-none text-white text-xl bg-gray-800 w-fit p-4 '>{PairArrayData().map((r,i)=>(r.pair == PairName?<div key={i} className='flex items-center'><CoinPairImageNode  coin1={{img:r.pairimg.main,alt:"coin pair"}} coin2={{img:r.pairimg.sub,alt:"coin pair"}} /><h1>{PairName}</h1></div>:null))}<BiChevronDown size={25} /></div>
        <TabApp tabItems={items} />
    </section>
    </>
  )
}

export default BuyAndSell