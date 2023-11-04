import PrimaryMarket from '@/src/FE/components/invest/section1/PrimaryMarket'
import SecondaryMarket from '@/src/FE/components/invest/section2/SecondaryMarket'
import { Metadata } from 'next'
import React from 'react'


export async function generateMetadata(
  
  ): Promise<Metadata> {
    
  
    return {
      title:'DPO Markets | Invest ',
      description:"Explore investment opportunities in the primary and secondary markets with DPO Markets Invest. Discover strategies for investing in stocks, IPOs, and more to build a diversified investment portfolio.",
      keywords:[
        "DPO Markets Invest",
        "Primary and Secondary Market Investments",
        "Investing in Primary Market",
        "Investing in Secondary Market",
        "DPO Investment Opportunities",
        "Investment Strategies",
        "Stock Market Investments",
        "Initial Public Offering (IPO)",
        "Secondary Market Trading",
        "Investment Portfolio Diversification",
        "Stock Market Analysis",
        "Financial Investments",
        "Economic Growth Investment",
        "Long-Term Investment Planning",
        "Investment Opportunities",
        "Investment Solutions",
      ]
      
    }
  }
const page = () => {
  return (
    <main>
        <PrimaryMarket />
        <SecondaryMarket />
    </main>
  )
}

export default page