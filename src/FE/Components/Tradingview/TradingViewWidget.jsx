"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { FullTradingPairContextKey } from "../Trade/TradingPairContext";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();
  const [FullPairName, setFullPairName] = useState("")
 const key = useContext(FullTradingPairContextKey).keyPropVal

  useEffect(() => {
    const fullPairName = window.localStorage.getItem("fullPairName");
    if (!fullPairName) {
      setFullPairName("KRAKEN:BTCCAD");
      window.localStorage.setItem("fullPairName", "KRAKEN:BTCCAD");
    }else{
          setFullPairName(fullPairName);

    }
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

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_80697") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: FullPairName,
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
  }, [key,FullPairName]);

  return (
    <div className="tradingview-widget-container h-[60%]" >
      <div id="tradingview_80697" key={key} />
    </div>
  );
}
