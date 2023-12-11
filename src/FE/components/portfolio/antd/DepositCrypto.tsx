"use client";
import ModalApp from "@/src/FE/Components/Antd/ModalApp";
import React, { useContext, useState } from "react";
import depositcoins from '../../../../Data/DepositCoinsSelect.json'
import { CoinMap } from "@/src/Data/CoinImgMap";
import Image from "next/image";
import { URLresolve } from "@/src/FE/Functions/Helpers/FE/FetchUrlResolve";
import { NotificationContext } from "../../utils/antd/notification/Note";
import { message } from "antd";

function DepositCrypto() {
  const [selectCryptoState, setSelectCryptoState] = useState(false);
  const [generateDepositAddressState,setGenerateDepositAddressState] = useState(false)
  const [selectedCryptoSymbol,setSelectedCryptoSymbol]=useState("")
  const [methods,setMethods]=useState<[{method:string,fee:string,minimum:string}] | undefined>()
  const [selectedMethodData,setSelectedMethodData]=useState<{fee:number,min:string}>({fee:0,min:"0"})

  const noteContext =  useContext(NotificationContext)!

const getDepositCryptoMethod =async () => {
  message.destroy()
  let sym= (document.getElementById("coinselect") as HTMLSelectElement).value
console.log(sym)
  if(sym == ""){
    return
  }
  let symbol = sym.toUpperCase()
  if(symbol == "BTC") symbol = "XBT";
  message.loading("Generating Methods",10000000)
  const res = await fetch(URLresolve("/api/generateDepositMethod"),{method:"POST",mode:"no-cors",body:JSON.stringify({asset:symbol})})
  const data = await res.json()
  if(res.status != 200){
    message.destroy()
    noteContext({type:"error",description:data.result, message:"An Error Occured"})
    return
  }

  message.destroy()
  noteContext({type:"success", message:"Success",description:"Method Generated"})
  setMethods(data.result)

}
const filterFees = (e:React.ChangeEvent<HTMLSelectElement>)=>{
const methodVal = e.currentTarget.value
console.log()
if(!methodVal || !methods){
  return
}
methods.map((e)=>{
  if(e.method == methodVal){

  setSelectedMethodData({fee:Number(e.fee),min:e.minimum})
}})
}


  return (
    <>
      <button
        className="border border-blue-500 rounded-lg px-6 py-2 text-blue-500"
        onClick={() => {
          setSelectCryptoState(true);
        }}
      >
        Deposit Crypto
      </button>

      <ModalApp
        state={selectCryptoState}
        setState={setSelectCryptoState}
        mask={true}
      >
        <div className=" flex justify-between w-[80%] items-center">
          <select
            name=""
            id="coinselect"
            className=" block cursor-pointer my-4 bg-[#efefef77] px-6 py-2 rounded-md border-0 outline-none"
          
          >
            <option value="">--Select Crypto--</option>
            {depositcoins.map((i,n)=>(<option  value={i.symbol} onClick={()=>{setSelectedCryptoSymbol(i.symbol);alert(1)}} className="py-2 cursor-pointer"><Image src={CoinMap[i.symbol].img} alt={i.fullname+ " image"} className="w-8" /><div >{i.fullname}</div></option>))}
          </select>
          <button className="bg-black text-white  h-fit px-4 py-2" onClick={getDepositCryptoMethod}>Select</button>
        </div>
       {!methods? <div className=" flex justify-between w-[80%] items-center">
          <select
            name=""
            id=""
            className=" block cursor-pointer my-4 bg-[#efefef77] px-6 py-2 rounded-md border-0 outline-none"
          >
            <option value="">--Select Blockchain Method--</option>
          </select>
          <button className="bg-black text-white  h-fit px-4 py-2">Generate</button>

        </div>:<div className=" flex justify-between w-[80%] items-center">
          <select
            name=""
            id=""
            onChange={filterFees}
            className=" block cursor-pointer my-4 bg-[#efefef77] px-6 py-2 rounded-md border-0 outline-none"
          >
            <option value="">--Select Blockchain Method--</option>
            {methods.map((i,n)=>(<option value={i.method}>{i.method}</option>))}

          </select>
          <button className="bg-black text-white  h-fit px-4 py-2">Generate</button>

        </div>}
        <div className="w-[80%]">
          <input type="text" placeholder="enter amount you want to deposit" className="w-full" />
        </div>
        <div>
          <p>Fee: {selectedMethodData.fee}</p>
          <p>Minimum: {selectedMethodData.min}</p>
        </div>
      </ModalApp>
      <ModalApp mask={false} setState={setGenerateDepositAddressState} state={generateDepositAddressState}>
        <p>Deposit Address: </p>
        <p>This address is only valid for 30 mins</p>
      </ModalApp>
    </>
  );
}

export default DepositCrypto;
