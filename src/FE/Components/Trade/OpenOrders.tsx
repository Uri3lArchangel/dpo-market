'use client'

import React from 'react'
import TableApp, { DataType } from '../Antd/TableApp'
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';

const columns: ColumnsType<DataType> = [
    {
        title: 'Type',
        dataIndex: 'marketType',
        key: 'marketType',
        render: (text) => text=="BUY"?<p className='bg-green-500 py-2 px-4 w-fit text-white rounded-lg'>{text}</p>:<p className='bg-red-500 py-2 px-4 w-fit text-white rounded-lg'>{text}</p>,
      },
  {
    title: 'Pair',
    dataIndex: 'pair',
    key: 'pair',
    render: (text) => <a>{text.pairname}</a>,
  },
  {
    title: 'Entry Price',
    dataIndex: 'entryPrice',
    key: 'entryPrice',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Target Price',
    dataIndex: 'targetPrice',
    key: 'targetPrice',
  },
  {
    title: 'P/L (%)',
    dataIndex: 'pnl',
    key: 'pnl',
    render:(data)=><p>{data}</p>
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <button className='border-red-500 px-4 py-2 text-red-500 border rounded-lg'>Cancel Order</button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    marketType:"BUY",
    pair: {fullname:"kar:BTCCAD",pairname:"BTC/CAD"},
    entryPrice: 16.8,
    amount: 10,
    targetPrice:17.8,
    pnl:10
  },

];
function OpenOrders() {
  return (
    <div>
        <TableApp columns={columns} data={data}/>
    </div>
  )
}

export default OpenOrders