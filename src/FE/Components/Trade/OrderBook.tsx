"use client";
import React, { useContext, useEffect, useState } from "react";
import ob from "../../../../styles/trade/OrderBook.module.css";
import CurrentMarketOrder from "./CurrentMarketOrder";
import { FullTradingPairContextKey } from "./TradingPairContext";
import { fetchPairName } from "../../Functions/Helpers/FE/FetchPairName";
import {  initWSKraken, initWSOKX } from "../../Functions/Helpers/FE/Websocket";
import { CoinNameContextHandler } from "../Contexts/CoinNameContext";

function OrderBook() {
  const keyVal = useContext(FullTradingPairContextKey).keyPropVal;
  let PairName = useContext(CoinNameContextHandler).replace("-", "/");
  const [askData, setAskData] = useState<[string, string, string][]>([
    ["", "", ""],
  ]);
  const [bidData, setBidData] = useState<[string, string, string][]>([
    ["", "", ""],
  ]);

  useEffect(() => {
   


    let Socket: WebSocket | null;
    let opened: boolean = false;
    let id: number | null = null;
    let update = false;
    if (["BTC/CAD", "ETH/CAD", "USDC/CAD", "USDT/CAD"].includes(PairName)) {
      const data = {
        event: "subscribe",
        pair: [PairName == "BTC/CAD" ? "XBT/CAD" : PairName],
        subscription: {
          name: "book",depth:100
        },
      };

      const { Sock, Opened } = initWSKraken(data);

      Socket = Sock;

      opened = Opened;
      Sock.onmessage = (e) => {
        const messageData = JSON.parse(e.data);
        if (messageData.event == "subscriptionStatus") {
          update = false;
        } else if (messageData.event == "heartbeat") {
          update = true;
        }
        if (messageData.channelID) {
          id = e.data.channelID;
        }
        if (messageData[0] && messageData[0].channelID == id) {
          if (!update) {            setBidData([["","",""]])
            setAskData([["","",""]])
            let askDataScreenshot = messageData[1].as as [
              string,
              string,
              string
            ][];
            let bidDataScreenshot = messageData[1].bs as [
              string,
              string,
              string
            ][];

            setBidData(bidDataScreenshot);
            setAskData(askDataScreenshot);
          } else {
            if (messageData[1] && messageData[1].b) {
              const newBids = messageData[1].b as [string, string, string][];
              setBidData((prevBids) => {
                if(!prevBids){
                  return []
                }
                const updatedBids = [...prevBids];
                newBids.forEach(([price, quantity, time]) => {
                  const Index = updatedBids.findIndex(
                    ([existingPrice]) => existingPrice === price
                  );
                  if (Index == -1) {
                    if(parseFloat(quantity) === 0){
                      return
                    }
                    updatedBids.push([price, quantity, time]);
                  } else {
                    if (parseFloat(quantity) === 0) {
                      updatedBids.splice(Index, 1);
                      return
                    }
                    updatedBids[Index] = [price, quantity, time];
                  }
                });
                updatedBids.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
                return updatedBids;
              });
            }
          }
          if (messageData[1] && messageData[1].a) {
            const newAsks = messageData[1].a as [string, string, string][];
            setAskData((prevAsks) => {
              if(!prevAsks){
                return []
              }
              const updatedAsks = [...prevAsks];
              newAsks.forEach(([price, quantity, time]) => {
                const Index = updatedAsks.findIndex(
                  ([existingPrice]) => existingPrice === price
                );
                if (Index == -1) {
                  if(parseFloat(quantity) === 0){
                    return
                  }
                  updatedAsks.push([price, quantity, time]);
                } else {
                  if (parseFloat(quantity) === 0) {
                    updatedAsks.splice(Index, 1);
                    return
                  }
                  updatedAsks[Index] = [price, quantity, time];
                }
              });
              updatedAsks.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
              return updatedAsks;
            });
          }
        }
      };
    }else{
      if(PairName == "DPO/CAD") PairName="SHIB/USDC"
      const data={
        "op": "subscribe",
        "args": [
          {
            "channel": "books",
            "instId": (PairName.replace('/','-'))
          }
        ]
      }

      const {Sock,Opened} = initWSOKX(data)
      Socket=Sock
      opened=Opened

      Sock.onmessage = (e) => {
        const messageData = JSON.parse(e.data);
        if (messageData.action == "snapshot") {
          update = false;
        } else if (messageData.action == "update") {
          update = true;
        }
      
        if (messageData.data) {
          if (!update) {            
            setBidData([["","",""]])
            setAskData([["","",""]])
            let askDataScreenshot = messageData.data[0].asks as [
              string,
              string,
              string
            ][];
            let bidDataScreenshot = messageData.data[0].bids as [
              string,
              string,
              string
            ][];

            setBidData(bidDataScreenshot);
            setAskData(askDataScreenshot);
          } else {
            if (messageData.data[0] && messageData.data[0].bids) {
              const newBids = messageData.data[0].bids as [string, string, string][];
              setBidData((prevBids1) => {
                if(!prevBids1){
                  return []
                }
                const updatedBids = [...prevBids1];
                newBids.forEach(([price, quantity, time]) => {
                  const Index = updatedBids.findIndex(
                    ([existingPrice]) => existingPrice === price
                  );
                  if (Index == -1) {
                    if(parseFloat(quantity) === 0){
                      return
                    }
                    updatedBids.push([price, quantity, time]);
                  } else {
                    if (parseFloat(quantity) === 0) {
                      updatedBids.splice(Index, 1);
                      return
                    }
                    updatedBids[Index] = [price, quantity, time];
                  }
                });
                updatedBids.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
                return updatedBids;
              });
            }
          }
          if (messageData.data[0] && messageData.data[0].asks) {
            const newAsks = messageData.data[0].asks as [string, string, string][];
            setAskData((prevAsks) => {
              if(!prevAsks){
                return []
              }
              const updatedAsks = [...prevAsks];
              newAsks.forEach(([price, quantity, time]) => {
                const Index = updatedAsks.findIndex(
                  ([existingPrice]) => existingPrice === price
                );
                if (Index == -1) {
                  if(parseFloat(quantity) === 0){
                    return
                  }
                  updatedAsks.push([price, quantity, time]);
                } else {
                  if (parseFloat(quantity) === 0) {
                    updatedAsks.splice(Index, 1);
                    return
                  }
                  updatedAsks[Index] = [price, quantity, time];
                }
              });
              updatedAsks.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
              return updatedAsks;
            });
          }
        }
      };

    }

    return () => {
      if ( Socket) {
        Socket.close();
        
      }
      setBidData([["","",""]])
        setAskData([["","",""]])
    };
  }, [keyVal]);

  return (
    <>
      <ul className={ob.sellListContainer}>
        {askData?askData.map((data, i) => (
            <li key={i} className="flex justify-between px-4">
              <p className="text-red-500">{data[0]}</p>
              <p className="text-[#000]">{data[1]}</p>
            </li>
          )):<p>loading...</p>}
      </ul>
      <CurrentMarketOrder />
      <ul className={ob.buyListContainer}>
        {bidData
          ? bidData.map((data, i) => (
              <li key={i} className="flex justify-between px-4">
                <p className="text-green-500">{data[0]}</p>
                <p className="text-white/95">{data[1]}</p>
              </li>
            ))
          : <p>loading...</p>}
      </ul>
    </>
  );
}

export default OrderBook;
