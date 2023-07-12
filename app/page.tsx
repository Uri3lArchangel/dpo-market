import Header from '@/src/FE/components/landing/section1/Index'
import StepsToINvesting from '@/src/FE/components/landing/section2/StepsToINvesting'
import Goals from '@/src/FE/components/landing/section3/Goals'
import AboutDPO from '@/src/FE/components/landing/section4/AboutDPO'
import AllBlockchains from '@/src/FE/components/landing/section5/AllBlockchains'
import React from 'react'


const page = () => {
  
  return (
  <>
  <Header />
  <main>
    <StepsToINvesting />
    <Goals />
    <AboutDPO />
    <AllBlockchains />
  </main>
  </>
  )
}

export default page