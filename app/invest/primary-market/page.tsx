
import React, { Suspense } from 'react'
import MainPage from '@/src/FE/components/primary-market/page/MainPage'

const page = () => {
  return (
    <main>
        <MainPage jwtsecretverifier={process.env.JWTVERIFIERSECRET!} clientID={process.env.CLIENTID!} />
    </main>
  )
}

export default page