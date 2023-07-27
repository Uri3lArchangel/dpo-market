'use client'
import React from 'react';
import portfolio from "../../../../../styles/portfolio/portfolio.module.css";
import { Button, Space, Table, Tag } from 'antd';
import Image, { StaticImageData } from 'next/image';

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  token: {name:string,img:StaticImageData};
  amount: number;
  value: string;
}


const TableApp = ({wallet}:{wallet:any}) => {
  const data: DataType[] = wallet;
  


  return(
  <Table dataSource={data} scroll={{x:true}}>
    
      <Column title="Coin" dataIndex="token" key="token" render={(token: {name:string,img:StaticImageData})=>(
        <div className={portfolio.coin}>
       <Image src={token.img} alt={token.name}/>
       <p>{token.name}</p>
        </div>
)} />
    <Column title="Amount" dataIndex="amount" key="amount" />
    <Column title="Value" dataIndex="value" key="value" />
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