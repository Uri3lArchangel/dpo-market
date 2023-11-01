'use client'
import React, { useContext, useEffect, useRef, useState } from "react";
import { Bid } from "../../Functions/Helpers/OpenLimitOrder";
import { URLresolve } from "../../Functions/Helpers/FE/FetchUrlResolve";
import { FullTradingPairContextKey } from "./TradingPairContext";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface Wallet{
      coinName: string;
    amount: number;
    pending:number

}

const BuyMarketSection = ({
  from,
  to,
  currentPrice,
  walletData,
}: {
  from: { name: string; price: number };
  to: { name: string; price: number };
  currentPrice: number | string;
  walletData:{
    coinName:string;
    amount:number;
    pending:number;
  }[]

}) => {
  const router =useRouter()
  const amountRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [totalPay, setTotalPay] = useState(0);
  const [totalRecieve, setTotalRecieve] = useState(0);
  const [availableBuyBalance,setAvailableBuyBalance]=useState(0)
  const keyVal = useContext(FullTradingPairContextKey).keyPropVal




// useEffect(()=>{
//   async function init(){
//   const walletData:Wallet[] =  (await fetchWallet()).wallet
//   if(walletData && walletData.length >0 ){
//     for(let i=0;i<walletData.length;i++){
//       if(String(walletData[i].coinName) == from.name){
        
//         setAvailableBuyBalance(Number(walletData[i].amount))
            
//       }
//     }
//   }
// }
// init()

// },[])


useEffect(()=>{
  async function init(){
      if(walletData && walletData.length >0 ){
        for(let i=0;i<walletData.length;i++){

          if(String(walletData[i].coinName) == from.name){    
            setAvailableBuyBalance(Number(walletData[i].amount))
                
          }
        }
      }
    }
    init()
},[walletData,from.name])


  const onInputChange = () => {
    if (!amountRef.current || !priceRef.current) {
      return; 
    }
    if(isNaN(parseFloat(amountRef.current.value)) || isNaN(parseFloat(amountRef.current.value))){
      return
    }
    let price = priceRef.current.value;
    let amount = amountRef.current.value;
    if (price == "" || amount == "") {
      price = "0";
      amount = "0";
    }

    setTotalPay(
      parseFloat((parseFloat(price) * parseFloat(amount)).toFixed(2))
    );
    setTotalRecieve(parseFloat(amount));
  };
  const onBuy = async() => {
    if(!priceRef || !priceRef.current) return
    if(!amountRef || !amountRef.current) return
    if(Number(amountRef.current.value) == 0)  return
    const Pair = to.name+'/'+from.name
    const InitialPrice=Number(currentPrice)
    const BidPrice =Number(priceRef.current.value) 
    const Amount = Number(amountRef.current.value)
    const AmountPaid = totalPay
    const res = await Bid(InitialPrice,BidPrice,Amount,Pair,AmountPaid);
    router.refresh()
   
  };

  return (
    <section className="space-y-8 lg:px-12 py-8" key={currentPrice}>
      <p className="text-white">
        Balance: {availableBuyBalance.toLocaleString()} {from.name}{" "}
      </p>
      <div className=" h-16 rounded-lg px-6 w-full md:w-[70%] buysellIn mx-auto border border-gray-400 bg-gray-900 flex items-center">
        <label
          className="text-gray-500 text-lg border-r pr-6 border-white/20"
          htmlFor="price"
        >
          Price
        </label>
        <input
          min={0}
          ref={priceRef}
          onChange={onInputChange}
          type="number"
          name=""
          id="b_priceInput"
          className="w-full bg-transparent px-4 text-white/95 text-lg outline-none"
          defaultValue={currentPrice}
        />
        <p className="text-gray-500 text-lg border-l pl-6 border-white/20">
          {from.name}
        </p>
      </div>
      <div className=" h-16 rounded-lg px-6 w-full md:w-[70%] buysellIn mx-auto border border-gray-400 bg-gray-900 flex items-center">
        <label
          className="text-gray-500 text-lg border-r pr-6 border-white/20"
          htmlFor="amount"
        >
          Amount
        </label>

        <input
          min={0}
          pattern="[0-9]"
          ref={amountRef}
          onChange={onInputChange}
          type="number"
          name=""
          id="amount"
          className="w-full bg-transparent h-full outline-none px-4 text-white/95 text-lg"
        />
      </div>
      <div className="text-white">
        <p>
          Total: {totalPay} {from.name}
        </p>
        <p>
          You will recieve: {totalRecieve} {to.name}
        </p>
      </div>
      <button onClick={onBuy} className="w-full md:w-[70%]  mx-auto block bg-green-500 rounded-lg text-lg text-white py-6">
        BUY
      </button>
    </section>
  );
};

export default BuyMarketSection;
