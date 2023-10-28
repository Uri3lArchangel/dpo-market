import React from 'react'
import { TabsProps } from 'antd';
import OpenOrders from './OpenOrders';
import OrderDataTabApp from './OrderDataTabApp';


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
    <div className='px-4 '>
      <OrderDataTabApp items={items} />
    </div>
  )
}

export default OrderData