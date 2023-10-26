import React, { Suspense} from "react";
import TradingViewWidget from "../Tradingview/TradingViewWidget";
import SideCryptoData from "../Tradingview/SideCryptoData";
import TradingCharts from "../../../../styles/trade/Trading.module.css";
import TickerTape from "../Tradingview/TickerTape";
import BuyAndSell from "./BuyAndSell";
import OrderData from "./OrderData";
import TradingPairContext from "./TradingPairContext";
import OrderBookAndMarketTrades from "./OrderBookAndMarketTrades";



async function TradeChart() {
  

  return (
    <TradingPairContext>
    <section
      className={
        "h-[600px] sm:h-[800px] md:h-[100vh] " +
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
        <Suspense fallback="loading">
      <OrderBookAndMarketTrades />  
      </Suspense>
      </section>    
      <section className={TradingCharts.LeftChartData}>
        <BuyAndSell secret={process.env.JWTSECRET!}  />
        <SideCryptoData />
      </section>
    </section>
    </TradingPairContext>
  );
}

export default TradeChart;
