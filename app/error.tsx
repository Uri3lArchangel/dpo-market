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
    <section className='selectedScroll py-10' id='error'>
    <App reset={reset} errorCause={error.cause} errorName={error.name} />
    </section>
  )
}

export default globalError