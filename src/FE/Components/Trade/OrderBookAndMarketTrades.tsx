import React, { useContext, useEffect, useState } from "react";
import TabApp from "../Antd/TabApp";
import { TabsProps } from "antd";
import OrderBook from "./OrderBook";
import { TradingPair } from "@/src/Data/TradingPair";
import axios from "axios";
import { FullTradingPairContextKey } from "./TradingPairContext";

function OrderBookAndMarketTrades() {  

  return (
    <>
      <OrderBook />
    </>
  );
}

export default OrderBookAndMarketTrades;
