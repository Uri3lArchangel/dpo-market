import User from "@/src/BE/DB/schema/User";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";

export const returnUserWalletData = async (email: string) => {
  const userData = await User.findOne({ email });
  return userData.wallet;
};

export const retrieveUserWalletData = async(cookieToken: string) => {
  const data = jwtdecodebase(cookieToken);
  if (!data) return null;
  if (!data.Email) return null;
  const wallet = await returnUserWalletData(data.Email)

  return wallet
};

export const updateUserWalletDataBid=async(email:string,coinName:string,amountPaid:number)=>{
 let walletData = await returnUserWalletData(email)
 console.log(walletData,amountPaid,coinName)
 if(walletData.length ==0 ){
  return {status:"error",msg:"insufficient balance"}

 }
 for(let i=0;i<walletData.length;i++){
  if(walletData[i].coinName == coinName){
  if(walletData[i].amount < amountPaid){
    return {status:"error",msg:"insufficient balance"}
  }
}else{
  return {status:"error",msg:"insufficient balance"}
}
}
const userWallet = await User.findOne({email})
  await User.updateOne({email},{$push:{wallet:{coinName,pending:userWallet.wallet.pending+amountPaid,amount:userWallet.wallet.amount-amountPaid}}})

  return {status:"success"}
}