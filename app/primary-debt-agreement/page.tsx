import React from 'react'

const page = () => {
  return (
    <article className='py-24 selectedScroll ' style={{width:'99%',margin:'auto'}} id="debt_agreement" >
<h1 className=' text-xl'>Direct Private Offers</h1>
<h3 className=' text-xl'>Email: adsco@directprivateoffers.com</h3>
<h3 className=' text-xl'>Tel: 1-647-393-8417</h3>

<h3 className='font-bold text-2xl text-center'>Direct Private Offers Debt Agreement</h3> 

<div className='text-xl' style={{lineHeight:'40px'}} >
This Debt Agreement (the &quot;Agreement&quot;) is made and entered into as of, {String(new Date(Date.now()))}, by and between Direct Private Offers (DPO), a corporation duly organized and existing under the laws of Canada, and the investor(s) (hereinafter collectively referred to as the &quot;Investor&quot;).
<br />
<br />
WHEREAS, the Investor wishes to enter into a debt offering with DPO, and DPO agrees to issue convertible notes representing the debt to the Investor;
<br />
<br />
NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, DPO and the Investor (collectively, the &quot;Parties&quot;) hereby agree as follows:
<br /><br /><br />
<h4 className='font-bold'>Convertible Notes Offering:</h4> 
<br />
1.1 Debt Instrument: DPO agrees to issue convertible notes (the &quot;Notes&quot;) to the Investor for the principal amount specified in Exhibit A attached hereto.
<br />
1.2 Offer Price: The offer price per Note shall be USD 870 (Eight Hundred Seventy US Dollars).
<br />
1.3 Face Value: The face value of each Note shall be USD 1000 (One Thousand US Dollars).
<br />
1.4 Maturity Date: The maturity date of the Notes shall be 365 days from the date of issuance.

<br /><br />
<h4 className='font-bold'>Terms of Conversion:</h4> 
<br />
2.1 Redemption Option: On or after the maturity date, DPO may, at its sole discretion, either redeem the Notes at their face value or convert them into common shares represented by DPO tokens, subject to the terms and conditions outlined in this Agreement.
<br />
2.2 Conversion Ratio: The conversion ratio for the Notes shall be based on the value of (1) DPO token at maturity.
<br />
2.3 Notice of Conversion: In the event that DPO elects to convert the Notes into common shares, it shall provide written notice to the Investor within [number] days of the maturity date.
<br /><br />
<h4 className='font-bold'> Payment Terms:</h4>
<br />
3.1 Payment of Offer Price: The Investor shall pay the offer price per Note (USD 870) to DPO upon execution of this Agreement. DPO shall issue the Notes to the Investor promptly after receipt of the payment.
<br />
3.2 Payment at Maturity: If DPO chooses to redeem the Notes at their face value, DPO shall pay the Investor the face value of the Notes (USD 1000) within [number] days from the maturity date.
<br /><br />
<h4 className='font-bold'> Representations and Warranties:</h4>
<br />
4.1 DPO&apos;s Representations: DPO represents and warrants that it is a validly existing corporation, duly organized and in good standing under the laws of [State/Country]. DPO has the full power and authority to issue the Notes in accordance with the terms of this Agreement.
<br />
4.2 Investor&apos;s Representations: The Investor represents and warrants that it has the legal capacity and authority to enter into this Agreement. The Investor acknowledges that it has conducted its due diligence and is aware of the risks associated with the investment in DPO.
<br /><br /><br />
The Parties agree that the maturity date of the Notes, as specified in Section 1.4, can be updated if an Investor, who already possesses Notes, purchases additional Notes in the future. In such cases, the maturity date shall be adjusted to be 365 days from when the last Notes were purchased by that specific Investor.

For the avoidance of doubt, if an Investor purchases more Notes after their initial purchase, the maturity date for all Notes owned by that Investor shall be recalculated based on the date of the last Notes acquired.
</div>
    </article>
  )
}

export default page