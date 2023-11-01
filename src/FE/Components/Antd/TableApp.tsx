'use client'
import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

export interface DataType {
  key: React.Key;
  marketType:"BUY" | "SELL"
  pair: string;
  entryPrice: number;
  amount: number;
  targetPrice:number;
  canceled:boolean,
  isFullfiled:boolean
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



const TableApp = ({columns,data,pagination}:{columns:ColumnsType<DataType>,data:DataType[],pagination?:false| TablePaginationConfig | undefined}) => {
return(
<Table columns={columns} pagination={pagination} dataSource={data} />
)
};

export default TableApp;