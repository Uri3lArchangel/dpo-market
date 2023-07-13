import btc from 'cryptocurrency-icons/svg/color/btc.svg'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import eth from 'cryptocurrency-icons/svg/color/eth.svg'
import bnb from 'cryptocurrency-icons/svg/color/bnb.svg'
import usdt from 'cryptocurrency-icons/svg/color/usdt.svg'
import sol from 'cryptocurrency-icons/svg/color/sol.svg'
import xrp from 'cryptocurrency-icons/svg/color/xrp.svg'
import usdc from 'cryptocurrency-icons/svg/color/usdc.svg'


interface DataType {
    key: string;
    name: {
      text:string;
      img:StaticImport,
      symbol:string
    };
    last_price: string;
    trade:string;
  }
  
export const data: DataType[] = [
    {
      key: '1',
      name: {
        text:'Bitcoin',
        symbol:'BTC',
        img:btc
      },
      last_price: '$5,000',
      trade: "",
    },
    {
        key: '2',
        name: {
            text:'Ethereum',
            symbol:"ETH",
            img:eth
          },
        last_price: '$1,000',
        trade: "",
      },
      {
        key: '3',
        name: {
            text:'Binance',
            symbol:'BNB',
            img:bnb
          },
        last_price: '$323',
        trade: "",
      },
      {
        key: '4',
        name: {
            text:'Tether',
            symbol:'USDT',
            img:usdt
          },
        last_price: '$1',
        trade: "",
      },
      {
        key: '5',
        name: {
            text:'Solana',
            symbol:"SOL",
            img:sol
          },
        last_price: '$20',
        trade: "",
      },
      {
        key: '6',
        name: {
            text:'Ripple',
            symbol:"XRP",
            img:xrp
          },
        last_price: '$0.001',
        trade: "",
      },{
        key: '7',
        name: {
            text:'USD Coin',
            symbol:"USDC",
            img:usdc
          },
        last_price: '$1',
        trade: "",
      },
  ];
  