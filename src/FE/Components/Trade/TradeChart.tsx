import React, { Suspense} from "react";
import TradingViewWidget from "../Tradingview/TradingViewWidget";
import SideCryptoData from "../Tradingview/SideCryptoData";
import TradingCharts from "../../../../styles/trade/Trading.module.css";
import TickerTape from "../Tradingview/TickerTape";
import BuyAndSell from "./BuyAndSell";
import OrderData from "./OrderData";
import TradingPairContext from "./TradingPairContext";
import OrderBookAndMarketTrades from "./OrderBookAndMarketTrades";
import Image from "next/image";
import spinner1 from '../../../../public/gif/giphy.gif'
import { cookies } from "next/headers";

// const fetchWallet=async()=>{
//   console.log("fetching")
// const res = await fetch(process.env.BASEURL!+"/api/fetchUserWalletData",{mode:"no-cors",cache:"no-cache"})

// const data  = await res.json()
// return data.wallet
// }

const fetchWallet = async()=>{
  const cookie = cookies().get('dpo-session-base')
  if(!cookie){
      return null
  }
let res = await fetch(process.env.BASEURL!+"/api/portoflio-data",{method:'POST',mode:'no-cors',next:{tags:[process.env.CACHETAG!],revalidate:false},body:JSON.stringify({sessionCookieData:cookie})})
let data = await res.json()

return data.wallet
}


async function TradeChart() {
 const wallet= await fetchWallet()

  return (
    <TradingPairContext>
      <div className="absolute w-full h-full z-[10000] trade-loading" id="trade-loading-div"><Image src={spinner1} className="w-20 h-20 absolute top-[40%] left-[47%]" alt="spinner gif transparent background" /></div>
    <section
      className={
        "h-[600px] sm:h-[800px] md:h-[900px] " +
        TradingCharts.MainSectionContainerForCharts
      }
    >
      
      <section className={TradingCharts.CenterChartData}>
        <TickerTape /> 
        <TradingViewWidget />
        <div>
        <OrderData />
        </div>
      </section>
      <section className={TradingCharts.Order}>
      <OrderBookAndMarketTrades />  
      </section>    
      <section className={TradingCharts.LeftChartData}>
        <BuyAndSell wallet={wallet}  />
        <SideCryptoData />
      </section>
    </section>
    </TradingPairContext>
  );
}

export default TradeChart;
