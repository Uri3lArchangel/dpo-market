'use client'
import React from 'react';
import portfolio from "../../../../../styles/portfolio/portfolio.module.css";
import { Button, Space, Table, Tag } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { CoinMap } from '@/src/Data/CoinImgMap';


const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  coinName: string
  amount: number;
  pending:number
}


const TableApp = ({wallet}:{wallet:any}) => {
  const data: DataType[] = wallet;
  


  return(
  <Table dataSource={data} scroll={{x:true}}>
    
      <Column title="Coin"  key="coinName" dataIndex="coinName" render={(coin:string)=>{
        return (
        <div className='flex space-x-2 items-center'>
          <Image className='w-8 h-8 rounded-full' src={CoinMap[coin].img} alt={coin} />
          <p>{CoinMap[coin].full} ({coin})</p>
        </div>
      )}} />
    <Column title="Amount" dataIndex="amount" key="amount" />
    <Column title="Pending" dataIndex="pending" key="pending" />
    <Column
      title=""
      key="action"
      render={(_: any) => (
        <Space size="middle">
          <Button>Withdraw</Button>
        </Space>
      )}
    />
   
  </Table>
  )
      }
      ;

export default TableApp;