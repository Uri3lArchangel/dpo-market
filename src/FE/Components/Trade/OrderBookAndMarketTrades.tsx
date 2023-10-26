import React, { useContext, useEffect, useState } from "react";
import TabApp from "../Antd/TabApp";
import { TabsProps } from "antd";
import OrderBook from "./OrderBook";
import { TradingPair } from "@/src/Data/TradingPair";
import axios from "axios";
import { FullTradingPairContextKey } from "./TradingPairContext";

function OrderBookAndMarketTrades() {  
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <button id="tabBtn" className=" text-white px-3 py-1">
          Order Book
        </button>
      ),
      children: <OrderBook />,
    },
    // {
    //   key: "2",
    //   label: (
    //     <button id="tabBtn" className=" text-white px-3 py-1">
    //       Market Trades
    //     </button>
    //   ),
    //   children: "Content of Tab Pane 2",
    // },
  ];
  return (
    <section id="OrderBookAndTrades" className="bg-[#222]">
      <TabApp tabItems={items} />
    </section>
  );
}

export default OrderBookAndMarketTrades;
