import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BsChevronDoubleDown, BsCurrencyExchange } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const smoothScoll=(e:React.MouseEvent<HTMLAnchorElement>)=>{

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
    label: <Link onClick={smoothScoll} href={"/#steps-to-invest"}>How To Invest?</Link>,
    
  },
  {
    key: '2',
    label: <Link onClick={smoothScoll} href="/#our-goals">What Are Our Goals?</Link>,
  
  },
  {
    key: '3',
    label: <Link onClick={smoothScoll} href="/#about-us">What is DPO</Link>,
  },{
    key: '4',
    label: <Link onClick={smoothScoll} href="/#blockchains">All DPO Supported Blockchains</Link>,
  },

 
];


export const AboutDropdownApp = () => (
  <Dropdown menu={{ items }}>
      <Space>
       <Link href=" " >Learn 
        <BsChevronDoubleDown />
        </Link>
      </Space>
  </Dropdown>
);

