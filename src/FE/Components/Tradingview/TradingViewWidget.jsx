"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { FullTradingPairContextKey } from "../Trade/TradingPairContext";
import { CoinNameContextHandler } from "../Contexts/CoinNameContext";
import { TradingPair } from "@/src/Data/TradingPair";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();
  const pairname = useContext(CoinNameContextHandler).replace("-", "/");
  const fullPairName = TradingPair[pairname].pair;
  const key = useContext(FullTradingPairContextKey).keyPropVal;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const div = document.getElementById('trade-loading-div')
  
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => {
      onLoadScriptRef.current && onLoadScriptRef.current();
      div.style.display="none"
      setLoading(false);
    });

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_80697") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: fullPairName,
          interval: "60",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: true,
          hide_volume: true,
          container_id: "tradingview_80697",
        });
      }
    }
  }, [key]);

  return (
    <div className={loading?"tradingview-widget-container lg:h-[100%] bg-black":"tradingview-widget-container lg:h-[60%] bg-black "}>
          <div id="tradingview_80697" key={key} className={loading?"opacity-0":'opacity-100 '} />
       
    </div>
  );
}
