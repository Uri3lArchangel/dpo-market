import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB"
import User from "@/src/BE/DB/schema/User"
import { HashPassword } from "@/src/BE/web2/functions/HashPasswords"
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