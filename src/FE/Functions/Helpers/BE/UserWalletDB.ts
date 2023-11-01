import User from "@/src/BE/DB/schema/User";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { MongoError } from "mongodb";
import { MongooseDocumentMiddleware } from "mongoose";

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
 try{let walletData = await returnUserWalletData(email)
 let index=0;
 console.log(walletData,amountPaid,coinName)
 if(walletData.length ==0 ){
  return {status:"error",msg:"insufficient balance"}

 }
 for(let i=0;i<walletData.length;i++){
  if(walletData[i].coinName == coinName){
    index=i
  if(walletData[i].amount < amountPaid){
    return {status:"error",msg:"insufficient balance"}
  }
}else{
  return {status:"error",msg:"insufficient balance"}
}
}


  const updateResult= await User.updateOne({email},{
    $inc:{
      'wallet.$[element].amount':-amountPaid,
      'wallet.$[element].pending':amountPaid,
    },
  },
  {
    arrayFilters:[{'element.coinName':coinName}]
  }
  
  )

  if (updateResult.modifiedCount === 0) {
    return { status: "error", msg: "No document was updated" };
  } else {
    console.log("Document updated successfully");
    return { status: "success", msg: "Document updated successfully" };
  }
} catch (err:any) {
  return { status: "error", msg: "Internal Server Error " + err.message };
}
}