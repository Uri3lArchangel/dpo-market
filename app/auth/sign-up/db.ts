import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB"
import Market from "@/src/BE/DB/schema/Market"
import User from "@/src/BE/DB/schema/User"
import { HashPassword } from "@/src/BE/web2/functions/HashPasswords"
import { CoinMap } from "@/src/Data/CoinImgMap"
import  Mongoose  from "mongoose"

export const SignupDB=async(email:string,uname:string,hash:string)=>{
try{
    const emailVerifiertoken = HashPassword(email+uname+hash+`${Math.random()}`)
const newUserData={
    id:crypto.randomUUID(),
    email:email,
    username:uname,
    password:hash,
    token:{emailVerifier:{token:emailVerifiertoken},passwordreset:{token:null}}
}
const user = await User.create(newUserData)
return user
}catch(err){
console.error(err)
}

}

export const checkIfEmailExist=async(email:string)=>{
    const user = await User.findOne({email:email})
    if(user){
        return true
    }
    return false
}


export const updatePaswordWithUname=async(uname:string,password:string)=>{
    console.log(password)
    const hash = HashPassword(password)
    console.log(hash)
   const user = await User.updateOne({username:uname},{password:hash})
    if(user){
         await User.updateOne({username:uname},{"token.passwordreset.token":null,"token.passwordreset.expiration":null,"token.passwordreset.cc":1})
        return true
    }
    return false
}

export const checkIfUsernameExist=async(uname:string)=>{
   const user = await User.findOne({username:uname})
    if(user){
        return true
    }
    return false
}

export const fetchUserByUnmame=async(uname:string)=>{
    const user = await User.findOne({username:uname})
     if(user){
         return user
     }
     return null
 }

 export const fetchUserByEmail=async(email:string)=>{
    const user = await User.findOne({email})
     if(user){
         return user
     }
     return null
 }

 export const updateVerification=async(username:string)=>{
   const user = await User.updateOne({username},{"token.emailVerifier.token":null,"token.emailVerifier.expiration":null,Verified:true})
     if(user){
         return true
     }
     return false
 }

 export const updateUserPasswordByEmail=async(email:string,password:string)=>{
    const user = await User.findOne({email})
    const hash = HashPassword(password)
if(!user){
    return false
}
    await User.updateOne({email},{password:hash})
    return true
 }


 export const ResetToken=async(Email:string,uname:string)=>{
    const hash =HashPassword(Email+uname+`${Math.random()}`)
    let user = await fetchUserByUnmame(uname)
    if(user.token.emailVerifier.cooldown > (new Date(Date.now())))
    {
        return false
    }
    if(user.token.emailVerifier.cc >= 6 && (new Date(Date.now())) >= user.token.emailVerifier.cooldown){
        await User.updateOne({email:Email},{"token.emailVerifier.cc":0,})
    }
     user = await fetchUserByUnmame(uname)

    if(user.token.emailVerifier.cc < 6){
    await User.updateOne({email:Email},{"token.emailVerifier.token":hash,"token.emailVerifier.expiration":new Date(Date.now()+(30 * 3600 *1000 )),$inc:{"token.emailVerifier.cc":1}})
    return true
    }
   
    await User.updateOne({email:Email},{"token.emailVerifier.cooldown":new Date(Date.now()+(60*3600*10000))})

    return false
  }


 export const ResetTokenPassword=async(Email:string,uname:string)=>{
    const hash =HashPassword(Email+uname+`${Math.random()}`)

   
    let user = await fetchUserByUnmame(uname)
    if(user.token.emailVerifier.cc < 6 && (new Date(Date.now())) >= user.token.passwordreset.cooldown){
    await User.updateOne({email:Email},{"token.passwordreset.token":hash,"token.passwordreset.expiration":new Date(Date.now()+(30 * 3600 *1000 )),$inc:{"token.passwordreset.cc":1}})
    return {status:true,msg:""}
    }
    if(user.token.emailVerifier.cc >= 6){
    await User.updateOne({email:Email},{"token.passwordreset.cooldown":new Date(Date.now()+(3600*10000)),"token.passwordreset.cc":1})
    return {status:false,msg:"Wait for 1 hour to reinitiate a password reset"}
    }
        return {status:false,msg:"Wait for some time to reinitiate a password reset"}
    

  }


  export const ChangeEmail=async(Email:string,newEmail:string)=>{
    await User.updateOne({email:Email},{email:newEmail})
  }


  export const UpdateMarketDeposit = async (address: string, ownerEmail: string, method: string,sym:string) => {
    try {
        const existingMarket = await Market.findOne({ "deposits.address": address });

        if (existingMarket == null) {
          
            await Market.updateOne(
                {},
                { $push: { deposits: { method, address, ownerEmail} } },
                { upsert: true }
            );
            await pendingDepositStateActive(ownerEmail,sym,method,address)

           return address
        } else {
            const filteredObjects =  (existingMarket.deposits.filter((obj:any) => obj.address === address))[0];

            if(filteredObjects.expiresAt >= (Date.now())){ 
                await pendingDepositStateActive(ownerEmail,sym,method,address)

            return address
            }
            // if(filteredObjects.method == method && filteredObjects.ownerEmail == ownerEmail && filteredObjects.expiresAt >= (Date.now())){
            //     return address
            // }
            if(filteredObjects.method == method && filteredObjects.expiresAt <= (Date.now())){
                await Market.updateOne(
                    { "deposit.address": address },
                    {
                        $set: {
                            "deposit.$.method": method,
                            "deposit.$.ownerEmail": ownerEmail,
                            "deposit.$.expiresAt":(Date.now() + 30 * 60 *1000)
                        }
                    })
                   await pendingDepositStateActive(ownerEmail,sym,method,address)
                    return address
            }
            
            return false


        }
    } catch (err) {
        console.error(err);
    }


}; 

export const pendingDepositStateActive = async(email:string,sym:string,method:string,depositAddress:string)=>{
       await User.updateOne({email},{$push:{pendingDeposit:{asset:sym,minTime:Date.now(),maxTime:(Date.now()+30 * 60 * 1000),method,depositAddress,active:true}}}) 
    }

    export const pendingDepositCheck =async (email:string) => {
        const user =await User.findOne({email})
        const filteredObjectArr =  (user.pendingDeposit.filter((obj:any) => obj.active === true));
        return filteredObjectArr 

    }
    
    export const updateWalletCoinsDeposit=async(email:string,amount:number,state:string,sym:string)=>{
        if(state == "p"){await User.updateOne({email},{$push:{wallet:{coinName:CoinMap[sym].full,pending:amount}}})}
        else if(state == "s"){
         await User.updateOne({email},{$push:{wallet:{coinName:CoinMap[sym].full,amount,pending:0}}})
        }else{
            await User.updateOne({email},{$push:{wallet:{coinName:CoinMap[sym].full,amount:0,pending:0}}})
           }
        

    }