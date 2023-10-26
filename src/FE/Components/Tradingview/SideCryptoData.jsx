'use client'
import React, { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.text = JSON.stringify({
      width: "100%",
      height: "70%",
      symbolsGroups: [
        {
          name: 'crypto',
          symbols: [
            { name: 'KRAKEN:BTCCAD' },
            { name: 'KRAKEN:ETHCAD' },
            { name: 'KRAKEN:USDCCAD' }, 
            { name: 'OKX:SHIBUSDC' },
            { name: 'BYBIT:MATICUSDC' },
            { name: 'OKX:LINKUSDC' },
            { name: 'BITGET:DAIUSDC' },
            { name: 'OKX:UNIUSDC' },
            { name: 'BYBIT:ARBUSDC' },
            { name: 'OKX:OKBUSDC' },
            { name: 'OKX:MANAUSDC' },
            { name: 'OKX:BNBUSDC' },
            { name: 'OKX:MKRUSDC' },
            { name: 'OKX:CROUSDC' },
            { name: 'OKX:AAVEUSDC' },
            { name: 'OKX:SANDUSDC' },
            { name: 'OKX:APEUSDC' },
            { name: 'KRAKEN:USDTCAD' },
            { name: 'OKX:FTMUSDC' },
            { name: 'OKX:NEARUSDC' },
          ],
        },
      ],
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: false,
      locale: 'en',
    });

  let doc=  document.getElementById('tradingview-widget-container').appendChild(script);

    return () => {
      if(doc && document.getElementById('tradingview-widget-container')){
      document.getElementById('tradingview-widget-container').removeChild(script);
      }
      doc=null
    };
  }, []);

  return (
    <div id="tradingview-widget-container" className="tradingview-widget-container " >
      <div className="tradingview-widget-container__widget h-40%" ></div>
      <div className="tradingview-widget-copyright bg-black">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;


