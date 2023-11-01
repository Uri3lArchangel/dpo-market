import btc from "cryptocurrency-icons/32/color/btc.png";
import cad from "../../public/coindata/Flag_of_Canada.svg.png";
import eth from "cryptocurrency-icons/32/color/eth.png";
import usdc from "cryptocurrency-icons/32/color/usdc.png";
import matic from "cryptocurrency-icons/32/color/matic.png";
import link from "cryptocurrency-icons/32/color/link.png";
import trx from "cryptocurrency-icons/32/color/trx.png";
import uni from "cryptocurrency-icons/32/color/uni.png";
import okb from "../../public/coindata/okb.png";
import mana from "cryptocurrency-icons/32/color/mana.png";
import bnb from "cryptocurrency-icons/32/color/bnb.png";
import mkr from "cryptocurrency-icons/32/color/mkr.png";
import cro from "../../public/coindata/cronos.svg";
import aave from "cryptocurrency-icons/32/color/aave.png";
import sand from "cryptocurrency-icons/32/color/sand.png";
import ape from "cryptocurrency-icons/32/color/ape.png";
import usdt from "cryptocurrency-icons/32/color/usdt.png";
import ftm from "../../public/coindata/ftm.png";
import near from "../../public/coindata/near.png";
import dpo from "../../public/coindata/dpo.png";
import theta from "cryptocurrency-icons/32/color/theta.png";




export const PairArrayData = () => {
  return [
    {
      pairimg: { main: btc, sub: cad },
      pair: "BTC/CAD",
    },
    {
      pairimg: { main: dpo, sub: cad },
      pair: "DPO/CAD",
    },
    {
      pairimg: { main: eth, sub: cad },
      pair: "ETH/CAD",
    },
    {
      pairimg: { main: usdt, sub: cad },
      pair: "USDT/CAD",
    },
    {
      pairimg: { main: usdc, sub: cad },
      pair: "USDC/CAD",
    },
    {
      pairimg: { main: matic, sub: usdc },
      pair: "MATIC/USDC",
    },
    {
      pairimg: { main: link, sub: usdc },
      pair: "LINK/USDC",
    },
    {
      pairimg: { main: trx, sub: usdc },
      pair: "TRX/USDC",
    },
    {
      pairimg: { main: uni, sub: usdc },
      pair: "UNI/USDC",
    },
    {
      pairimg: { main: theta, sub: usdc },
      pair: "THETA/USDC",
    },
    {
      pairimg: { main: okb, sub: usdc },
      pair: "OKB/USDC",
    },
    {
      pairimg: { main: mana, sub: usdc },
      pair: "MANA/USDC",
    },
    {
      pairimg: { main: bnb, sub: usdc },
      pair: "BNB/USDC",
    },
    {
      pairimg: { main: mkr, sub: usdc },
      pair: "MKR/USDC",
    },
    {
      pairimg: { main: cro, sub: usdc },
      pair: "CRO/USDC",
    },
    {
      pairimg: { main: aave, sub: usdc },
      pair: "AAVE/USDC",
    },
    {
      pairimg: { main: sand, sub: usdc },
      pair: "SAND/USDC",
    },
    {
      pairimg: { main: ape, sub: usdc },
      pair: "APE/USDC",
    },

    {
      pairimg: { main: ftm, sub: usdc },
      pair: "FTM/USDC",
    },
    {
      pairimg: { main: near, sub: usdc },
      pair: "NEAR/USDC",
    },
  ];
};
