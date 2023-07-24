'use client'
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js'
import React from 'react'

function PaypalCustomProvider({children,key,clientID,currency}:{children:React.ReactNode;key:React.Key;clientID:string;currency:string}) {
  return (
   <PayPalScriptProvider key={key} options={{clientId:clientID,currency:currency}}>
    {children}
   </PayPalScriptProvider>
  )
}

export default PaypalCustomProvider