"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PairArrayData } from "@/src/Data/TradingPairData";
import { TradingPair } from "../../../Data/TradingPair";
import { FullTradingPairContextKey } from "./TradingPairContext";
import { CoinPairImageNode } from "@/src/Data/CoinPairImageNode";

function TradingPairModal({
  setModalState,
}: {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const setKey = useContext(FullTradingPairContextKey).setKeyPropVal;
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const selectPair = (e: React.MouseEvent<HTMLDivElement>,i:any) => {
    const id = e.currentTarget.id;
    const element = document.querySelector(`#${id} #coin${i}`) as HTMLLIElement;
    const pairName = element.innerText;
    console.log(pairName, element);
    const fullPairName = TradingPair[pairName].pair;
    window.localStorage.setItem("pairName", pairName);
    window.localStorage.setItem("fullPairName", fullPairName);
    setModalState(false);
    setKey!((prev) => prev + 1);
  };
  const searchList = () => {
    if (!inputRef.current) return;
    setSearchText(inputRef.current.value.toUpperCase());
  };

  return (
    <section className="">
      <label htmlFor="pairSearch"></label>
      <input
        onChange={searchList}
        type="text"
        ref={inputRef}
        name=""
        className=" w-[95%] mx-auto block border border-[#759500] outline-none h-16 text-lg bg-black/20 px-4 text-white rounded-lg"
        id="pairSearch"
        placeholder="Search..."
      />
      <ul className="max-h-[500px] text-white overflow-scroll w-full">
        {PairArrayData().map((pair, i) => {
          if (searchText != "") {
            if (pair.pair.search(searchText) < 0) {
              return <></>;
            } else {
              return (
                <div
                  key={i}
                  id="coinpairholder"
                  className="flex pl-6 items-center my-4 rounded-lg hover:bg-slate-100/5 py-4 cursor-pointer text-lg "
                  onClick={(e)=>{selectPair(e,i)}}
                >
                  <CoinPairImageNode
                    coin1={{
                      img: pair.pairimg.main,
                      alt: pair.pair.split("/")[0],
                    }}
                    coin2={{
                      img: pair.pairimg.sub,
                      alt: pair.pair.split("/")[1],
                    }}
                  />
                  <li id={"coin"+i} className="" key={i}>
                    {pair.pair}
                  </li>
                </div>
              );
            }
          } else {
            return (
              <div
                key={i}
                id="coinpairholder"
                className="flex pl-6 items-center my-4  rounded-lg hover:bg-slate-100/5 py-4 w-full cursor-pointer text-lg"
                onClick={(e)=>{selectPair(e,i)}}
              >
                <CoinPairImageNode
                  coin1={{
                    img: pair.pairimg.main,
                    alt: pair.pair.split("/")[0],
                  }}
                  coin2={{
                    img: pair.pairimg.sub,
                    alt: pair.pair.split("/")[1],
                  }}
                />

                <li id={"coin"+i} className="" key={i}>
                  {pair.pair}
                </li>
              </div>
            );
          }
        })}
      </ul>
    </section>
  );
}

export default TradingPairModal;
