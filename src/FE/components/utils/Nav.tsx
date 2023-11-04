'use client'
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/images_/dpologo.png";
import Link from "next/link";
import { InvestDropdownApp } from "../landing/section1/antd/InvestDropdown";
import { EcoDropdownApp } from "../landing/section1/antd/EcosystemDropdown";
import { AboutDropdownApp } from "../landing/section1/antd/AboutUs";
import nav from '../../../../styles/nav.module.css'
import { CollapsedNav } from "./antd/sm/CollapsedNav";
import { CollapsedNavMD } from "./antd/md/CollapsedNavMD";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { NotificationContext } from "./antd/notification/Note";
import Aos from 'aos'

const Nav = ({Username}:{Username:string|null}) => {
const router = useRouter()
const noteContext =  useContext(NotificationContext)
const [isActiveScroll,setScroll]=useState(false)
 useEffect(()=>{

    if(window.innerWidth <1024){
      Aos.init({duration:0,easing:'ease-out',disable:window.innerWidth<1024,delay:0,once:true})
    }else{
      Aos.init({duration:500,easing:'ease-out',disable:window.innerWidth<1024,once:true})
    
    
    }
if(document.querySelector("#sec-trade")){
  const navs = document.querySelectorAll('#top_sm_md_lg_nav') as NodeListOf<HTMLDivElement>;
    for(let i=0;i<navs.length;i++){
      navs[i].classList.add('scrolledNav_trade')
     
    }
  return
}

  
  document.onscroll=()=>{
    let element = document.getElementById('navtriger_main') as HTMLDivElement;

    const navs = document.querySelectorAll('#top_sm_md_lg_nav') as NodeListOf<HTMLDivElement>;
    const triggerTop = (element.getBoundingClientRect()).top
    console.log(triggerTop,"scroll")
    if(triggerTop <= 0){
      setScroll(true)
      console.log("add")
      for(let i=0;i<navs.length;i++){
        navs[i].classList.add('scrolledNav')
      }
    }else{
      console.log("remv")
      setScroll(false)
      for(let i=0;i<navs.length;i++){
        navs[i].classList.remove('scrolledNav')
      }
    }
  }
  

 },[isActiveScroll])

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
  return (
  <section>
  <div className="absolute w-[1px] h-[1px] left-0 top-[80px] z-[50]" id="navtriger_main"></div>
    <nav id="top_sm_md_lg_nav" className={nav.nav_level0_NavContainer+ ' overflow-x-hidden'}>
      <figure>
        <Link href="/"> 
        <div>
          <Image src={logo} alt="DPO Markets Logo" /> 
        </div>
        <figcaption>
          DPO <text>Market</text>
        </figcaption>
        </Link>
      </figure>
      <ul className={nav.ul_level0_linksConteainer}>
        <li>
        <Link href={{pathname:'/portfolio'}}>
            <div>
              <p>My Portfolio</p>
            </div>
          </Link>
        </li>
       
        <li>
        <AboutDropdownApp />
        </li>
        <li>
          <InvestDropdownApp />
        </li>
        <li>
         <EcoDropdownApp />
        </li>
        
      </ul>
      {!Username?<div className={nav.div_authButton_container}>
        <button onClick={()=>{
          router.push('/auth/sign-in')
        }}>Login</button>
        <button onClick={()=>{
          router.push('/auth/sign-up')
        }}>Sign Up</button>
      </div>:
      <div className="flex text-white items-center">
        <p className={"text-xl font-bold "+ nav.username}>{Username}</p>
        <button onClick={signOut} className="bg-red-500 px-6 py-2 mx-3" >
        Sign Out
        </button>
        </div>}
    </nav>
    <nav id="top_sm_md_lg_nav" className={nav.nav_sm}>
    <figure>
    <Link href="/"> 

        <figcaption>
          DPO <text>Market</text>
        </figcaption>
        </Link>
      </figure>
      <CollapsedNav Username={Username} />
    </nav>
    <nav id="top_sm_md_lg_nav" className={nav.nav_md}>
    <figure>
    <Link href="/"> 

        <figcaption>
          DPO <text>Market</text>
        </figcaption>
        </Link>
      </figure>
    <CollapsedNavMD />
    {!Username?<div className={nav.div_authButton_container}>
        <button onClick={()=>{
          router.push('/auth/sign-in')
        }}>Login</button>
        <button onClick={()=>{
          router.push('/auth/sign-up')
        }}>Sign Up</button>
      </div>:
      <div className="flex text-white items-center">
        <p className={"text-xl font-bold "+ nav.username}>{Username}</p>
        <button onClick={signOut} className="bg-red-500 px-6 py-2 mx-3" >
        Sign Out
        </button>
        </div>}
    </nav>
    </section>
  );
};

export default Nav;
