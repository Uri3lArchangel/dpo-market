'use client'
import React, { useEffect } from 'react';

const TickerTape = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "description": "",
          "proName": "KRAKEN:BTCCAD"
        },
        {
          "description": "",
          "proName": "KRAKEN:ETHCAD"
        },
        {
          "description": "",
          "proName": "KRAKEN:USDCCAD"
        },
        {
          "description": "",
          "proName": "OKX:SHIBUSDC"
        },
        {
          "description": "",
          "proName": "OKX:MATICUSDC"
        },
        {
          "description": "",
          "proName": "OKX:LINKUSDC"
        },
        {
          "description": "",
          "proName": "UNISWAP3POLYGON:DAIUSDC"
        },
        {
          "description": "",
          "proName": "OKX:UNIUSDC"
        },
        {
          "description": "",
          "proName": "BYBIT:ARBUSDC"
        },
        {
          "description": "",
          "proName": "OKX:OKBUSDC"
        },
        {
          "description": "",
          "proName": "OKX:MANAUSDC"
        },
        {
          "description": "",
          "proName": "OKX:BNBUSDC"
        },
        {
          "description": "",
          "proName": "OKX:MKRUSDC"
        },
        {
          "description": "",
          "proName": "OKX:CROUSDC"
        },
        {
          "description": "",
          "proName": "OKX:AAVEUSDC"
        },
        {
          "description": "",
          "proName": "SANDUSDC"
        },
        {
          "description": "",
          "proName": "APEUSDC"
        },
        {
          "description": "",
          "proName": "USDTCAD"
        },
        {
          "description": "",
          "proName": "FTMUSDC"
        },
        {
          "description": "",
          "proName": "NEARUSDC"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    });

    const container = document.getElementById('tradingview-widget-container');

    if (container) {
      const existingScript = container.querySelector('script');
      if (existingScript) {
        container.removeChild(existingScript);
      }
    }
  
    container.appendChild(script);
  
    // Return a cleanup function
    return () => {
      if (container) {
        const existingScript = container.querySelector('script');
        if (existingScript) {
          container.removeChild(existingScript);
        }
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container absolute w-full top-0 z-10" >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TickerTape;
