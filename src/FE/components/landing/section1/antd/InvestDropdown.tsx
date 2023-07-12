import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { GiChart, GiPayMoney } from 'react-icons/gi';
import {FcDebt} from 'react-icons/fc'
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Primary Market',
    children: [
      {
        key: '1-1',
        label:<Link href=" "> Equity Offer</Link>,
        icon:<GiPayMoney />
      },
      {
        key: '1-2',
        label: <Link href=" ">Debt Offer</Link>,
        icon:<FcDebt />
      },
    ],
  },
  {
    key: '2',
    label: <Link href=" ">Secondary Market</Link>,
    icon:<GiChart />
  },
  
 
];


export const InvestDropdownApp = () => (
  <Dropdown menu={{ items }}>
      <Space>
       <Link href=" ">Invest
        <BsChevronDoubleDown />
        </Link>
      </Space>
  </Dropdown>
);

