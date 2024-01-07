import { PairArrayData } from "@/src/Data/TradingPairData";
import CoinNameContext from "@/src/FE/Components/Contexts/CoinNameContext";
import TradeChart from "@/src/FE/Components/Trade/TradeChart";
import React from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return PairArrayData().map((_coin,i) => ({
    coin: String(_coin.pair.replace("/", "-"))
  }));
}

const page = ({ params }: { params: { coin: string } }) => {
  return (
    <section id="sec-trade" className="pt-16 md:pt-0">
      <CoinNameContext value={params.coin}>
        <TradeChart />
      </CoinNameContext>
    </section>
  );
};

export default page;
