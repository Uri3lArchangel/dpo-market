import React from 'react'
import dpo from '../public/images_/dpologo.png'
import Image from 'next/image'

const Loading = () => {
  return (
    <section className='loadingContainer'>
        <Image src={dpo} alt='dpo' />
    </section>
  )
}

export default Loading