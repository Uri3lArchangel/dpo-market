import React, { useContext } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { CiMenuKebab } from 'react-icons/ci';
import { GiChart, GiMoneyStack, GiPayMoney } from 'react-icons/gi';
import {FcDebt} from 'react-icons/fc'
import Link from 'next/link';
import { BsCurrencyExchange, BsFillBriefcaseFill } from 'react-icons/bs';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { AiOutlineControl } from 'react-icons/ai';
import nav from '../../../../../../styles/nav.module.css'
import { message } from "antd";
import { NotificationContext } from "../../antd/notification/Note";


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



 

export const CollapsedNav = ({Username}:{Username:string|null}) => {
  const noteContext =  useContext(NotificationContext)
  const signOut = async()=>{
    try{message.loading('Signing Out')
    let res =await fetch(process.env.NODE_ENV == "development"?'/api/signout':window.location.origin+"/api/signout")
    let data = await res.json()
    
    noteContext!(data)
    window.location.href=window.location.origin+'/'
  }catch(err:any){
  console.error(err)
    }
   }
  const items: MenuProps['items'] = [
    {
        key: '1',
        label:   <Link href={{pathname:'/portfolio'}}>My Portfolio</Link>,
        icon:<BsFillBriefcaseFill />
      },
      {
        key: '2',
        label:  <Link href="/">Home</Link>,
        children:[
            {
                key: '2-1',
                label: <Link onClick={smoothScoll} href={"/#steps-to-invest"}>How To Invest?</Link>,
                
              },
              {
                key: '2-2',
                label: <Link onClick={smoothScoll} href="/#our-goals">What Are Our Goals?</Link>,
              
              },
              {
                key: '2-3',
                label: <Link onClick={smoothScoll} href="/#about-us">What is DPO</Link>,
              },{
                key: '3-4',
                label: <Link onClick={smoothScoll} href="/#blockchains">All DPO Supported Blockchains</Link>,
              },
            
        ]
      },
  {
    key: '3',
    label: <Link href="">Invest</Link>,
    children: [
      {
        key: '3-1',
        label:<Link onClick={smoothScoll} href="/invest#primary-market"> Primary Market</Link>,
        children:[
            {
                key:'3-1-1',
                label:<Link href={
                  {pathname:'/invest/primary-market',
                    query:{offer:'equity'}
                  }
                }>Equity Offer</Link>,
               icon: <GiMoneyStack />
            },{
                key: '3-1-2',
                label: <Link  href={
                  {pathname:'/invest/primary-market',
                    query:{offer:'debt'}
                  }
                }>Debt Offer</Link>,
                icon:<FcDebt />
              },

        ]
      },{
        key: '3-2',
        label: <Link onClick={smoothScoll} href="/invest#secondary-market">Secondary Market</Link>,
        icon:<GiChart />
      },

      
    ],
  },
  
  {
    key: '4',
    label:   "Our Ecosystem",
    children:[
        {
            key: '4-1',
            label: <Link target='_blank' href="https://directprivateoffers.net">Visit Official Site</Link>,
            icon:<HiOutlineBuildingOffice2 />
          },
          {
            key: '4-2',
            label: <Link target='_blank' href="https://dpo-swap.vercel.app/">Visit Crypto Swap</Link>,
            icon:<BsCurrencyExchange />
          },
          {
            key: '4-3',
            label: <Link target='_blank' href="https://dpo-central-pannel.vercel.app/">Visit Central Dashboard</Link>,
            icon:<AiOutlineControl />
          },
          {
            key: '4-4',
            label: <Link target='_blank' href="https://www.directprivateoffers.net/dpo">OTC:MNZO</Link>,
            icon:<AiOutlineControl />
          },
          {
            key: '4-5',
            label: <Link target='_blank' href="https://dpo-dao.vercel.app/">DAO</Link>,
            icon:<AiOutlineControl />
          }
         
    ]
  },
  {
    key: '5',
    label: !Username?<Link href={{pathname:'/auth/sign-in'}}>Login</Link>:<p>{Username}</p>,
  },
  {
    key: '6',
    label:!Username?<Link href={{pathname:'/auth/sign-up'}}>Sign Up</Link>: <button onClick={signOut} className="bg-red-500 px-6 py-2 mx-3" >
    Sign Out
    </button>,
  }
];
  return(
  <Dropdown menu={{ items }} className={nav.dropdown_sm}>
      <Space>
       <Link href=" " style={{fontSize:'1.4rem'}}>
        Menu
        <CiMenuKebab />
        </Link>
      </Space>
  </Dropdown>
  )
};

