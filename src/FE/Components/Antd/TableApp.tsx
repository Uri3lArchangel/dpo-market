'use client'
import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
  key: string;
  marketType:"BUY" | "SELL"
  pair: {fullname:string,pairname:string};
  entryPrice: number;
  amount: number;
  targetPrice:number;
  pnl:number
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Type',
        dataIndex: 'marketType',
        key: 'marketType',
        render: (text) => text=="BUY"?<p className='bg-green-500 rounded-lg w-fit block'>{text}</p>:<p className='bg-red-500 rounded-lg'>{text}</p>,
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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <button>Cancel Order</button>
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

const TableApp = ({columns,data}:{columns:ColumnsType<DataType>,data:DataType[]}) => {
return(
<Table columns={columns} dataSource={data} />
)
};

export default TableApp;