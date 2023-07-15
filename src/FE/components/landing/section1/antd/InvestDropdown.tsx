import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { GiChart, GiPayMoney } from 'react-icons/gi';
import {FcDebt} from 'react-icons/fc'
import Link from 'next/link';




const smoothScoll=(e:React.MouseEvent<HTMLAnchorElement>)=>{

  let href = e.currentTarget.href
  const id = (href.split('#'))[1]
  
  const section = document.getElementById(id) as HTMLDivElement;
  
  if(section )
  {
    e.preventDefault()
  
    section.scrollIntoView({behavior:'smooth'})
  }
  }

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link onClick={smoothScoll} href="/invest#primary-market">Primary Market</Link>,
    children: [
      {
        key: '1-1',
        label:<Link href={
          {pathname:'/invest/primary-market',
            query:{offer:'equity'}
          }
        }> Equity Offer</Link>,
        icon:<GiPayMoney />
      },
      {
        key: '1-2',
        label: <Link href={
          {pathname:'/invest/primary-market',
            query:{offer:'debt'}
          }
        }>Debt Offer</Link>,
        icon:<FcDebt />
      },
    ],
  },
  {
    key: '2',
    label: <Link onClick={smoothScoll} href="/invest#secondary-market">Secondary Market</Link>,
    icon:<GiChart />
  },
  
 
];


export const InvestDropdownApp = () => (
  <Dropdown menu={{ items }}>
      <Space>
       <Link href="/invest">Invest
        <BsChevronDoubleDown />
        </Link>
      </Space>
  </Dropdown>
);

