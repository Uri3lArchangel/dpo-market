'use client'
import React from 'react';
import portfolio from "../../../../../styles/portfolio/portfolio.module.css";
import { Button, Space, Table, Tag } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { CoinMap } from '@/src/Data/CoinImgMap';
import { UserWalletmodel } from '@/declarations';
import {FiatMap} from '../../../../Data/FiatMap'
import Flags, {ICurrencyFlagProps} from 'react-currency-flags'



const { Column } = Table;



const TableApp = ({wallet}:{wallet:UserWalletmodel|null}) => {
  const walletData = wallet?wallet.wallet : []

  return(
  <Table dataSource={walletData} scroll={{x:true}}>
    
      <Column title="Coin"  key="currencySymbol" dataIndex="currencySymbol" render={(coin:string)=>{

        return (
        <div className='flex space-x-2 items-center'>
         {FiatMap[coin.toUpperCase()]? <Flags currency={coin} />:<Image className='w-8 h-8 rounded-full' src={CoinMap[coin].img} alt={coin} />}
          <p>{FiatMap[coin]} ({coin})</p>
        </div>
      )}} />
    <Column title="Amount" dataIndex="currencyAmount" key="currencyAmount" render={(num:number)=>(
      num.toLocaleString()
    )} />
    <Column title="Pending" dataIndex="pendingAmount" key="pendingAmount" render={(num:number)=>(
      num.toLocaleString()
    )} />
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