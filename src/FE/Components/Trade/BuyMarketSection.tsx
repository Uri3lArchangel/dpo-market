import React, { useEffect, useRef, useState } from "react";
import { Bid } from "../../Functions/Helpers/OpenLimitOrder";
import { URLresolve } from "../../Functions/Helpers/FE/FetchUrlResolve";

interface Wallet{
      coinName: string;
    amount: number;
    pending:number

}

const BuyMarketSection = ({
  from,
  to,
  currentPrice,
  secret
}: {
  from: { name: string; price: number };
  to: { name: string; price: number };
  currentPrice: number;
  secret:string;

}) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [totalPay, setTotalPay] = useState(0);
  const [totalRecieve, setTotalRecieve] = useState(0);
  const [availableBuyBalance,setAvailableBuyBalance]=useState(0)
  const controller = new AbortController()
  const signal = controller.signal
  
  




  const fetchWallet=async()=>{
    console.log("fetching wallet",1)
  const res = await fetch(URLresolve("/api/fetchUserWalletData"),{signal,mode:"no-cors",cache:"no-cache"})
  
  const data  = await res.json()
  console.log(data,"data")
  return data
  }






useEffect(()=>{
  async function init(){
  const walletData:Wallet[] =  (await fetchWallet()).wallet
  console.log(walletData,walletData.length,"wallet")
  if(walletData && walletData.length >0 ){
    for(let i=0;i<walletData.length;i++){
      console.log(walletData[i],from.name,"wa")
      if(String(walletData[i].coinName) == from.name){
        
        setAvailableBuyBalance(Number(walletData[i].amount))
            
      }
    }
  }
}
init()

// return ()=>{
//   controller.abort("clean up")
// }
},[availableBuyBalance])

  const onInputChange = () => {
    if (!amountRef.current || !priceRef.current) {
      return; 
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

    const Pair = to.name+'/'+from.name
    const InitialPrice=Number(currentPrice)
    const BidPrice =Number(priceRef.current.value) 
    const Amount = Number(amountRef.current.value)
    const AmountPaid = totalPay
    const res = await Bid(InitialPrice,BidPrice,Amount,Pair,AmountPaid);
    console.log(res)
  };

  return (
    <section className="space-y-8 px-12 py-8" key={currentPrice}>
      <p className="text-white">
        Balance: {availableBuyBalance} {from.name}{" "}
      </p>
      <div className=" h-16 rounded-lg px-6 w-full border border-gray-400 bg-gray-900 flex items-center">
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
      <div className=" h-16 rounded-lg px-6 w-full border border-gray-400 bg-gray-900 flex items-center">
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
      <button onClick={onBuy} className="w-full bg-green-500 rounded-lg text-lg text-white py-6">
        BUY
      </button>
    </section>
  );
};

export default BuyMarketSection;
