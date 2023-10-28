'use client'
import React, { ReactNode, createContext } from 'react'


export const CoinNameContextHandler = createContext("")
function CoinNameContext({children,value}:{children:ReactNode;value:string}) {
  return (
   <CoinNameContextHandler.Provider  value={value}>{children}</CoinNameContextHandler.Provider>
  )
}

export default CoinNameContext