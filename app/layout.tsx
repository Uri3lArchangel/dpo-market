import Nav from '@/src/FE/components/utils/Nav'
import '../styles/globals.css'
import Raleway from 'next/font/local'
import Footer from '@/src/FE/components/utils/Footer'
import "aos/dist/aos.css"
import Note from '@/src/FE/components/utils/antd/notification/Note'
import { cookies } from 'next/headers'
import { jwtdecodebase } from '@/src/BE/web2/functions/jwt'



const raleway = Raleway({
  src:[
    {
      path:'../public/fonts/raleway/Raleway-Thin.ttf',
      weight:'200'
    },{
      path:'../public/fonts/raleway/Raleway-Regular.ttf',
      weight:'500'

    },{
      path:'../public/fonts/raleway/Raleway-Bold.ttf',
      weight:'700'

    },{
      path:'../public/fonts/raleway/Raleway-ExtraBold.ttf',
      weight:'900'
    }
  ]
})

export const metadata = {
  title: 'DPO Markets | Invest and trade DPO Tokens',
  description: 'Direct Private Offets Markets allows investors to hold DPO shares in form of DPO tokens via primary amrket investment and also secondary market trade, enter debt offer agreement and receive convertible notes ',
  keywords:"DPO,TOKENS,MONEY,EQUITY,DEBT,ISSUE,SECURITY,BLOCKCHAIN,TOKENIZATION,TRADE,PRIMARY MARKET,STO"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let data:string|null=null
  let cookie =  cookies().get('dpo-session-base')
  if(cookie){
    data = (jwtdecodebase(cookie.value)).Username 
    
  }

  return (
    <html lang="en">
      <body style={{overflowX:'hidden'}} className={raleway.className}>
        <Note>
      <Nav Username={data} />
        {children}
        <Footer />  
        </Note>
        </body>
    </html>
  )
}
