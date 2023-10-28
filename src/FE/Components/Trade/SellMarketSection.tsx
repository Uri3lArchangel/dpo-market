"use client";
import React, { useEffect, useRef, useState } from "react";

const SellMarketSection = ({
  from,
  to,
  currentPrice,
}: {
  from: { name: string; price: number };
  to: { name: string; price: number };
  currentPrice: number | string;
}) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [totalPay, setTotalPay] = useState(0);
  const [totalRecieve, setTotalRecieve] = useState(0);
  useEffect(() => {
    setTotalPay(0);
  }, []);

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
    setTotalPay(parseFloat(amount));
    setTotalRecieve(
      parseFloat((parseFloat(amount) * parseFloat(price)).toFixed(2))
    );
  };
  const setToCurrentMarketPrice=()=>{
    const price = document.getElementById("b_priceInput") as HTMLInputElement
    price.value = String(currentPrice)
  }

  return (
    <section className="space-y-8 px-12 py-8">
      <div className=" h-16 rounded-lg px-6 w-full border border-gray-400 bg-gray-900 flex items-center">
        <label
          className="text-gray-500 text-lg border-r pr-6 border-white/20"
          htmlFor="price"
        >
          Price
        </label>
        <input
          ref={priceRef}
          onChange={onInputChange}
          type="number"
          name=""
          id="s_priceInput"
          className="w-full bg-transparent cursor-not-allowed px-4 text-white/95 text-lg outline-none"
          defaultValue={currentPrice}
        />
        <p className="text-gray-500 text-lg border-l pl-6 border-white/20">
          {to.name}
        </p>
      </div>
      <button className='bg-gray-700 py-4 px-6 rounded-lg text-white text-lg' onClick={setToCurrentMarketPrice}>Market Price</button>

      <div className=" h-16 rounded-lg px-6 w-full border border-gray-400 bg-gray-900 flex items-center">
        <label
          className="text-gray-500 text-lg border-r pr-6 border-white/20"
          htmlFor="amount"
        >
          Amount
        </label>

        <input
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
      <button className="w-full bg-red-500 rounded-lg text-lg text-white py-6">
        SELL
      </button>
    </section>
  );
};

export default SellMarketSection;
