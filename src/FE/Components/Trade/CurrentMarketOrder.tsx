"use client";
import React, { useContext, useEffect, useState } from "react";
import { FullTradingPairContextKey } from "./TradingPairContext";
import { fetchPairName } from "../../Functions/Helpers/FE/FetchPairName";
import { initWSKraken, initWSOKX } from "../../Functions/Helpers/FE/Websocket";

function CurrentMarketOrder() {
  const keyVal = useContext(FullTradingPairContextKey).keyPropVal;
  const [price, setPrice] = useState<{
    direction: "neutral" | "up" | "down";
    value: number;
  }>({ direction: "neutral", value: 0 });
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let pairName = fetchPairName();
    let SocketTicker: WebSocket | null = null;
    let prevPrice = 0;
    let isTickerSocketOpened = false;
    let channelID: number | null = null;
    if (["BTC/CAD", "ETH/CAD", "USDC/CAD", "USDT/CAD"].includes(pairName)) {
      const dataTicker = {
        event: "subscribe",
        pair: [pairName == "BTC/CAD" ? "XBT/CAD" : pairName],
        subscription: {
          name: "ticker",
        },
      };
      const res = initWSKraken(dataTicker);
      SocketTicker = res.Sock;
      isTickerSocketOpened = res.Opened;

      SocketTicker.onmessage = (e) => {
        const messageData = JSON.parse(e.data);
        if (messageData.channelID) {
          channelID = messageData.channelID;
        }
        if (messageData[0] == channelID) {
          if (!messageData[1]) return;
          const Price = parseFloat(messageData[1].c[0]);
          const amount = messageData[1].c[1];
          if (Price && amount) {
            let direction = "neutral" as "neutral" | "up" | "down";
            if (prevPrice != Price) {
              if (Price > price.value) direction = "up";
              if (Price < price.value) direction = "down";
              if (Price == price.value) direction = "neutral";
              setPrice({ value: Price, direction });
            }
            setQuantity(Number(amount));
          }
        }
      };
    } else {
      if(pairName == "DPO/CAD") pairName="SHIB/USDC"
      const dataTicker = {
        op: "subscribe",
        args: [
          {
            channel: "tickers",
            instId: pairName.replace("/", "-"),
          },
        ],
      };

      const res = initWSOKX(dataTicker);
      SocketTicker = res.Sock;
      isTickerSocketOpened = res.Opened;

      SocketTicker.onmessage = (e) => {
        const messageData = JSON.parse(e.data);

        if (messageData.data) {
          if (!messageData.data[0]) return;
          const Price = parseFloat(messageData.data[0].last);
          const amount = messageData.data[0].lastSz;
          if (Price && amount) {
            let direction = "neutral" as "neutral" | "up" | "down";
            if (prevPrice != Price) {
              if (Price > price.value) direction = "up";
              if (Price < price.value) direction = "down";
              setPrice({ value: Price, direction });
              prevPrice = Price;
            }
            setQuantity(Number(amount));
          }
        }
      };
    }

    return () => {
      SocketTicker?.close();
    };
  }, [keyVal, price.direction]);
  return (
    <div className="bg-black flex items-center justify-between cursor-pointer py-4 px-2 ">
      <p
        id="pricedata"
        className={
          price.direction === "up"
            ? "text-2xl text-green-500 underline"
            : price.direction === "down"
            ? "text-2xl text-red-500 underline"
            : "text-2xl text-white underline"
        }
      >
        {price.value}
      </p>
      <p id="amountdata" className="text-white/95">
        {quantity}
      </p>
    </div>
  );
}

export default CurrentMarketOrder;
