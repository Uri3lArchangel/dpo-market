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


  

  
  
const BuyAndSell = ({secret}:{secret:string}) => {
const [modalState,setModalState]=useState(false)
const [PairName,setPairName]=useState("")
const keyVal = useContext(FullTradingPairContextKey).keyPropVal
const [price,setPrice]=useState(0)
const [wallet,setWallet]=useState([])




const items: TabsProps["items"] = [
  {
    key: "1",
    label: <p className='text-green-500 text-lg'>BUY</p>,
    children: <BuyMarketSection secret={secret} currentPrice={price} from={{name:PairName.split("/")[1],price:0}}  to={{name:PairName.split("/")[0],price:0}} />,
  },
  {
    key: "2",
    label: <p className='text-red-500 text-lg'>SELL</p>,
    children: <SellMarketSection currentPrice={price} from={{name:PairName.split("/")[0],price:0}}  to={{name:PairName.split("/")[1],price:0}} />,
  },

];
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

useEffect(()=>{
  const init = async()=>{
    const pairName = window.localStorage.getItem("pairName")
  if(!pairName){
setPairName("BTC/CAD")
window.localStorage.setItem("pairName","BTC/CAD")
  }else{
      setPairName(pairName)
  }
  const Price = await fetchLivePriceFromTickerSymbol(pairName!)
  if(Price){
    setPrice(Price)
  }else{
    setPrice(0)
  }
}
init()
 


},[keyVal,price])

  return (
    <>
    <ModalApp state={modalState} setState={setModalState} component={<TradingPairModal setModalState={setModalState} />} classname='bg-[#2e303579] min-w-[700px] rounded-lg' styles={modalStyles} closeicon={false} />
    <section className='h-[51%] bg-black px-4 overflow-y-scroll' id='buySellContainer'>
        <div onClick={()=>{
          setModalState(true)
        }} className='flex items-center  cursor-pointer rounded-lg select-none text-white text-xl bg-gray-800 w-fit p-4 '>{PairArrayData().map((r,i)=>(r.pair == PairName?<><CoinPairImageNode coin1={{img:r.pairimg.main,alt:"coin pair"}} coin2={{img:r.pairimg.sub,alt:"coin pair"}} /><h1>{PairName}</h1></>:null))}<BiChevronDown size={25} /></div>
        <TabApp tabItems={items} />
    </section>
    </>
  )
}

export default BuyAndSell