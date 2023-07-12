import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BsChevronDoubleDown, BsCurrencyExchange } from 'react-icons/bs';
import Link from 'next/link';
import {HiOutlineBuildingOffice2} from 'react-icons/hi2'
import {AiOutlineControl} from 'react-icons/ai'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href="">Visit Official Site</Link>,
    icon:<HiOutlineBuildingOffice2 />
  },
  {
    key: '2',
    label: <Link href="">Visit Crypto Swap</Link>,
    icon:<BsCurrencyExchange />
  },
  {
    key: '3',
    label: <Link href="">Visit Central Dashboard</Link>,
    icon:<AiOutlineControl />
  },
  {
    key: '4',
    label: <Link target='_blank' href="https://www.directprivateoffers.net/dpo">OTC:MNZO</Link>,
    icon:<AiOutlineControl />
  }
 
];


export const EcoDropdownApp = () => (
  <Dropdown menu={{ items }}>
      <Space>
       <Link href=" ">Our Ecosystem
        <BsChevronDoubleDown />
        </Link>
      </Space>
  </Dropdown>
);

