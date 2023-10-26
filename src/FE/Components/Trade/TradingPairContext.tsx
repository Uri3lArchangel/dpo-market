'use client'
import React, { createContext, useState } from 'react'

export const FullTradingPairContextKey = createContext<{keyPropVal:number,setKeyPropVal?: React.Dispatch<React.SetStateAction<number>>}>({keyPropVal:0}) 
const TradingPairContext = ({children}:{children:React.ReactNode}) => {
    const [keyPropVal,setKeyPropVal]=useState(0)
  return (
    <FullTradingPairContextKey.Provider value={{keyPropVal,setKeyPropVal}}>
        {children}
    </FullTradingPairContextKey.Provider>
  )
}

export default TradingPairContext