import React from "react";
import portfolio from "../../../../styles/portfolio/portfolio.module.css";
import { BiBriefcase } from "react-icons/bi";
import Image from "next/image";
import { BsBriefcaseFill } from "react-icons/bs";
import logo from '../../../../public/images_/dpologo.png'
import TableApp from "./antd/Table";
function Portfolio() {
  return (
    <section className={portfolio.mainContainer+ ' selectedScroll'} id="portfolio">
      <div>
        <section className={portfolio.total}>
          <div className={portfolio.titleContainer}>
            <BsBriefcaseFill className={portfolio.headerIcon} />
            <h3>Portfolio</h3>
          </div>
          <div className={portfolio.stats}>
            <div><h3>Total Investment:</h3>  <p>$0.00</p></div>
          </div>
          <div className={portfolio.value}>
            <h3>Current Value</h3>
            <p>$0.00</p>
          </div>
        </section>
        <section className={portfolio.dpoHolding}>
          <div className={portfolio.titleContainer}>
            <Image src={logo} alt="dpo token" className={portfolio.headerIcon} />
            <h3>DPO Tokens Purchased</h3>
          </div>
          <div className={portfolio.stats}>
            <div><h3>Total Balance in (USD)</h3> <p>$0.00</p></div>
          </div>
          <div className={portfolio.value}>
            <h3>Token Balance</h3>
            <p>0</p>
          </div>
        </section>
        <section className={portfolio.debtOverview}>
            <h4>Current Debt Offer Overview</h4>
            <ul>
              <li><h4>Convertible Notes Owned:</h4> <p>0</p></li>
              <li><h4>Total Notes Face Value:</h4> <p>$0.00</p></li>
              <li><h4>Maturity Date:</h4> <p>N/A</p></li>
              <li><h4>Maturity Period:</h4> <p>Nil</p></li>
            </ul>
        </section>
        <section className={portfolio.coinsHoldings}>
            <h3>Wallet Balance</h3>

            <TableApp />
        </section>
      </div>
    </section>
  );
}

export default Portfolio;
