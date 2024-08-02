import { UserWalletmodel } from '@/declarations'
import { verifyWalletAddressJWTSign } from '@/src/BE/web2/functions/jwt'
import Portfolio from '@/src/FE/components/portfolio/Portfolio'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'

export async function generateMetadata(
  
    ): Promise<Metadata> {
      
    
      return {
        title:'DPO Markets | Investor Portfolio ',
        description: "Explore our impressive portfolio showcasing DPO Markets' successful projects and client case studies in the financial services industry. Discover how we excel in providing investment solutions and serving our clients in the finance sector.",
        keywords: [
            "DPO Markets portfolio",
            "DPO Markets projects",
            "DPO Markets work",
            "Financial services portfolio",
            "Investment solutions",
            "Client success stories",
            "DPO Markets case studies",
            "Finance industry projects",
            "DPO Markets showcase",
            "DPO Markets achievements",
          ]
      }
    }

     const fetchUserData=async()=>{
        const cookie = cookies().get('dpo-session-base')
        if(!cookie || !cookie.value){
            return null
        }
    let res = await fetch(process.env.BASEURL!+"/api/userdata",{method:'POST',next:{revalidate:false,tags:[process.env.CACHETAG!]},body:JSON.stringify({cookie:cookie.value})})
    let data = (await res.json()).data
    return data

    }
    const fetchWalletData = async()=>{
        const cookie = cookies().get('_gt_0_')
        if(!cookie || !cookie.value){
            return null
        }
        if(!verifyWalletAddressJWTSign(cookie.value)){
            return null

        }
        let res = await fetch(process.env.BASEURL!+"/api/fetchUserWalletData",{method:'POST',next:{revalidate:false,tags:[process.env.CACHETAG!]},body:JSON.stringify({address:verifyWalletAddressJWTSign(cookie.value)})})
        let [success,error] = await res.json()
        if(error){
            return null;
        }
        return success as UserWalletmodel
    }


const page = async() => {
const data = await fetchUserData()
const userWallet = await fetchWalletData()

    return(
    <main>
        <Portfolio equityOffers={data.equityOffer} debtOffers={data.debtOffer} wallet={userWallet}/>
    </main>
    )
  
 
}

export default page