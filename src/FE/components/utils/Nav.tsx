'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import logo from "../../../../public/images_/dpologo.png";
import Link from "next/link";
import header from "../../../../styles/landing/header.module.css";
import { InvestDropdownApp } from "../landing/section1/antd/InvestDropdown";
import { EcoDropdownApp } from "../landing/section1/antd/EcosystemDropdown";
import { AboutDropdownApp } from "../landing/section1/antd/AboutUs";
import { Observe, Unobserve } from "../landing/section1/functions/navcolor";
import nav from '../../../../styles/nav.module.css'

const Nav = () => {
  // useEffect(() => {
  //   Observe()

  //   return ()=>{
  //     Unobserve()
  //   }

  // }, [])
  return (
    <nav id="top_md_lg_nav" className={nav.nav_level0_NavContainer}>
      <figure>
        <div>
          <Image src={logo} alt="DPO Markets Logo" />
        </div>
        <figcaption>
          DPO <text>Market</text>
        </figcaption>
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
                   <InvestDropdownApp />

        </li>
        <li>
        <AboutDropdownApp />
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
  );
};

export default Nav;
