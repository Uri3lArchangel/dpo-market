import { ReactNode } from "react";

interface PairInterface {
  [key: string]: {
    pair: string;
  };
}

export const TradingPair: PairInterface = {
  "BTC/CAD": {
    pair: "KRAKEN:BTCCAD",
  },
  "DPO/CAD": {
    pair: "OKX:SHIBUSDC",
  },
  "ETH/CAD": {
    pair: "KRAKEN:ETHCAD",
  },
  "USDC/CAD": {
    pair: "KRAKEN:USDCCAD",
  },
  "USDT/CAD": {
    pair: "KRAKEN:USDTCAD",
  },
  "MATIC/USDC": {
    pair: "OKX:MATICUSDC",
  },
  "LINK/USDC": {
    pair: "OKX:LINKUSDC",
  },
  "TRX/USDC": {
    pair: "OKX:TRXUSDC",
  },
  "UNI/USDC": {
    pair: "OKX:UNIUSDC",
  },
  "THETA/USDC": {
    pair: "OKX:THETAUSDC",
  },
  "OKB/USDC": {
    pair: "OKX:OKBUSDC",
  },
  "MANA/USDC": {
    pair: "OKX:MANAUSDC",
  },
  "BNB/USDC": {
    pair: "OKX:BNBUSDC",
  },
  "MKR/USDC": {
    pair: "OKX:MKRUSDC",
  },
  "CRO/USDC": {
    pair: "OKX:CROUSDC",
  },
  "AAVE/USDC": {
    pair: "OKX:AAVEUSDC",
  },
  "SAND/USDC": {
    pair: "OKX:SANDUSDC",
  },
  "APE/USDC": {
    pair: "OKX:APEUSDC",
  },

  "FTM/USDC": {
    pair: "OKX:FTMUSDC",
  },
  "NEAR/USDC": {
    pair: "OKX:NEARUSDC",
  },
};
