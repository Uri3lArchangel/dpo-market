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
import { StaticImageData } from "next/image";


interface P{
    img:StaticImageData;
    full:string
}
interface A{
    [key: string]:P
}

export const CoinMap:A={
"BTC":{
    img:btc,
    full:"Bitcoin"
}
,
"CAD":{
    img:cad,
    full:"Canadian Dollar"
}
,
"ETH":{
    img:eth,
    full:"Ethereum"
},
"USDC":{
    img:usdc,
    full:"United Stated Dollar Coin"
}
,
"MATIC":{
    img:matic,
    full:"Polygon Matic"
}
,
"LINK":{
    img:link,
    full:"Chainlink"
}
,
"TRX":{
    img:trx,
    full:"Tron"
},
"UNI":{
    img:uni,
    full:"Uniswap"
},
"OKB":{
    img:okb,
    full:"OKB"
},
"MANA":{
    img:mana,
    full:"Decentraland"
},
"BNB":{
    img:bnb,
    full:"Binance Coin"
},
"MKR":{
    img:mkr,
    full:"Maker"
}
,
"CRO":{
    img:cro,
    full:"Cronos"
},
"AAVE":{
    img:aave,
    full:"AAVE"
}
,
"SAND":{
    img:sand,
    full:"The Sandbox"
}
,
"APE":{
    img:ape,
    full:"Ape Coin"
}
,
"USDT":{
    img:usdt,
    full:"United Stated Dollar Tether"
}
,
"NEAR":{
    img:near,
    full:"Near"
},
"FTM":{
    img:ftm,
    full:"Fantom"
}
,"DPO":{
    img:dpo,
    full:"Direct Private Offers"
},
"THETA":{
    img:theta,
    full:"THETA"
}
}