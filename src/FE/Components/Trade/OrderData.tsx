import React from 'react'
import TabApp from '../Antd/TabApp'
import { TabsProps } from 'antd';
import OpenOrders from './OpenOrders';


const items: TabsProps["items"] = [
    {
      key: "1",
      label: "OPEN ORDERS",
      children: <OpenOrders />,
    },
    {
      key: "2",
      label: "ORDER HISTORY",
      children: "Content of Tab Pane 2",
    },

  ];
  
const OrderData = () => {
  return (
    <div className='px-4'>
        <TabApp tabItems={items} />
    </div>
  )
}

export default OrderData