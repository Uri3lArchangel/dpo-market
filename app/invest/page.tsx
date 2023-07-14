import PrimaryMarket from '@/src/FE/components/invest/section1/PrimaryMarket'
import SecondaryMarket from '@/src/FE/components/invest/section2/SecondaryMarket'
import Nav from '@/src/FE/components/utils/Nav'
import React from 'react'

const page = () => {
  return (
    <main>
        <Nav />
        <PrimaryMarket />
        <SecondaryMarket />
    </main>
  )
}

export default page