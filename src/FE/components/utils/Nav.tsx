'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import logo from "../../../../public/images_/dpologo.png";
import Link from "next/link";
import { InvestDropdownApp } from "../landing/section1/antd/InvestDropdown";
import { EcoDropdownApp } from "../landing/section1/antd/EcosystemDropdown";
import { AboutDropdownApp } from "../landing/section1/antd/AboutUs";
import nav from '../../../../styles/nav.module.css'
import { CollapsedNav } from "./antd/sm/CollapsedNav";
import { CollapsedNavMD } from "./antd/md/CollapsedNavMD";
import Aos from 'aos'


const Nav = () => {
 useEffect(()=>{

  let element = document.querySelector('.selectedScroll')
  let id = element?.id;

  if(id){
  const navs = document.querySelectorAll('#top_sm_md_lg_nav') as NodeListOf<HTMLDivElement>;
  const section2 = document.getElementById(id!) as HTMLDivElement;
  const section2RectTop = (section2.getBoundingClientRect()).top

  if(section2RectTop <= 100){
    for(let i=0;i<navs.length;i++){
      navs[i].classList.add('scrolledNav')
    }
  }else{
    for(let i=0;i<navs.length;i++){
      navs[i].classList.remove('scrolledNav')
    }
  }
}


  
  document.onscroll=()=>{
    let element = document.querySelector('.selectedScroll')
    let id = element?.id;

    if(id){
    const navs = document.querySelectorAll('#top_sm_md_lg_nav') as NodeListOf<HTMLDivElement>;
    const section2 = document.getElementById(id!) as HTMLDivElement;
    const section2RectTop = (section2.getBoundingClientRect()).top

    if(section2RectTop <= 100){
      for(let i=0;i<navs.length;i++){
        navs[i].classList.add('scrolledNav')
      }
    }else{
      for(let i=0;i<navs.length;i++){
        navs[i].classList.remove('scrolledNav')
      }
    }
  }
  
}
 },[])
  return (<>
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
        <Link href="">
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
      <div className={nav.div_authButton_container}>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </nav>
    <nav id="top_sm_md_lg_nav" className={nav.nav_sm}>
    <figure>
    <Link href="/"> 

        <figcaption>
          DPO <text>Market</text>
        </figcaption>
        </Link>
      </figure>
      <CollapsedNav />
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
      <div className={nav.div_authButton_container}>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </nav>
    </>
  );
};

export default Nav;
