'use client'
import React, { useEffect, useState } from 'react'
import TabApp from '../Antd/TabApp'
import { TabsProps } from 'antd'
import SkeletonApp from '../Antd/SkeletonApp'

function OrderDataTabApp({items}:{items:TabsProps['items']}) {

    const [loading,setLooding]=useState(true)
    useEffect(() => {
     setLooding(false)
    }, [loading])
    
  return (
    <>
    {loading?<div className='w-full h-full bg-white py-6'><SkeletonApp paragraph={true} rows={2} width='100%' /></div>:<TabApp tabItems={items} />}
    </>
    )
}

export default OrderDataTabApp