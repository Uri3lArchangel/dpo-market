'use client'
import React, { useEffect } from "react";
import about from '../../../../../styles/landing/about.module.css'
import Aos from 'aos'

const AboutDPO = () => {
  useEffect(() => {
    if(window.innerWidth > 940){
      Aos.init({duration:800,easing:'ease-in'})

    }else{
      Aos.init({duration:300,easing:'ease-in'})

    }

     }, [])
  return (
    <section id="about-us" className={about.sect_mainContainer}> 
      <div>
        <article> 
          <h3 data-aos="fade-right">About Us</h3>
          <p data-aos="fade-right">
            Direct Private Offers is a decentralised &quot;Expert Global Market&quot;
            Funding Portal where investors can invest in great “up and coming”
            companies; and established going concerns. DPO attracts a wide range
            of businesses, from seed and start-up stage companies to more
            established growth companies, companies that are income-producing
            and going concerns, and those that may already be reporting
            companies and/or quoted on OTC Markets. Direct Private Offers helps
            ventures seeking access to growth capital and provides a convenient
            forum to connect with potential investors and other stakeholders.
            Direct Private Offers offers &apos;&quot;custom listing solutions&quot; to Real
            Estate Projects and Syndications, and Joint Venture seekers that may
            require the listing to be listed &apos;confidentially, and privately&apos;.
            Issuers are able to resource our Institutional Investor, Accredited
            Investor, and Global Retail, and Institutional Investor databases.
          </p>
          <section className={about.sect_approach} data-aos="fade-up" data-aos-delay="100">
          <h4>Our Approach</h4>
          <p>
            Direct Private Offers is a niche Funding Portal that uses technology
            to maintain competitive advantages over competitors. We leverage
            Social Media, Digital Marketing channels, and active personal
            touch marketing to attract Investors to Innovative Prospectus
            Exempt Direct Private Offers. We record and monitor website traffic
            to the respective listings. Analyzing these metrics allows us to
            support our Issuers by helping them focus their marketing efforts.
            DPO deploys well-informed staff and partners and is dedicated to
            employing state of the art solutions.
          </p>
          </section>
        </article>
      </div>
    </section>
  );
};

export default AboutDPO;
