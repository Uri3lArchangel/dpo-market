'use client'
import App from '@/src/FE/components/utils/errors/500'
import React from 'react'

function globalError({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
  return (
    <section className='selectedScroll flex items-center justify-center' style={{minHeight:'100vh'}} id='error'>
    <App reset={()=>{window.location.reload()}} errorCause={error.cause} errorName={error.name} />
    </section>
  )
}

export default globalError