import React from 'react'

const page = () => {
  return (
   <section className='selectedScroll' id='reset-pass'>
    <main style={{height:'50vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <h1 className='text-xl font-bold'>Reset Password:</h1>
        <br />
        <input type="text" name="" id="" placeholder='Enter your email address' className='border h-12 px-4 border-gray-400 outline-none w-4/4 md:w-2/4 lg:w-1/4 sm:w-full'  />
        <button className='bg-green-400 px-10 py-3 my-6'>Reset</button>
    </main>
   </section>
  )
}

export default page