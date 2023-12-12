"use client";
import ModalApp from "@/src/FE/Components/Antd/ModalApp";
import React, { useContext, useRef, useState } from "react";
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
  const [selectedMethod,setSelectedMethod]=useState("")
  const [selectedMethodData,setSelectedMethodData]=useState<{fee:number,min:string}>({fee:0,min:"0"})
  const [addressGen,setAddressGen]=useState("")
  const amountRef = useRef<HTMLInputElement>(null)
  const noteContext =  useContext(NotificationContext)!

const getDepositCryptoMethod =async () => {
  message.destroy()
  let sym= (document.getElementById("coinselect") as HTMLSelectElement).value
  if(sym == ""){
    return
  }
  let symbol = sym.toUpperCase()
  if(symbol == "BTC") symbol = "XBT";
  setSelectedCryptoSymbol(symbol)
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

if(!methodVal || !methods){
  return
}
setSelectedMethod(methodVal)
methods.map((e)=>{
  if(e.method == methodVal){

  setSelectedMethodData({fee:Number(e.fee),min:e.minimum})
}})
}

const generateDepositAddress=async()=>{
  if(!amountRef || !amountRef.current) return
  let sym= ((document.getElementById("coinselect") as HTMLSelectElement).value).toUpperCase()
  if(sym == "BTC") sym="XBT"
  console.log(sym)
  if(!selectedMethod) return
  message.destroy()
  message.loading("Generating Address")
  if(selectedMethod == "Bitcoin Lightning" && !amountRef.current.value) {
    message.destroy()
    noteContext({type:"error",message:"Input Error",description:"Bitcoin Lightning method requires the amount to be deposited to be specified"})
    return
  }
  const res=await fetch(URLresolve("/api/generateDepositAddress"),{method:'POST',mode:"no-cors",body:JSON.stringify({asset:sym,method:selectedMethod,amount:amountRef.current.value,sym})})
  const data = await res.json()
  if(res.status == 201){
    message.destroy()

    noteContext({type:"success",message:"Generated",description:""})

    setAddressGen(data.address)
    setSelectCryptoState(false)
    setGenerateDepositAddressState(true)

  }
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
            {depositcoins.map((i,n)=>(<option key={n} value={i.symbol} onClick={()=>{setSelectedCryptoSymbol(i.symbol);alert(1)}} className="py-2 cursor-pointer"><Image src={CoinMap[i.symbol].img} alt={i.fullname+ " image"} className="w-8" /><div >{i.fullname}</div></option>))}
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
            {methods.map((i,n)=>(<option key={n} value={i.method}>{i.method}</option>))}

          </select>
          <button className="bg-black text-white  h-fit px-4 py-2" onClick={generateDepositAddress}>Generate</button>

        </div>}
        <div className={selectedMethod == "Bitcoin Lightning"?"w-[80%]":"hidden"}>
          <input type="text" ref={amountRef} placeholder="enter amount you want to deposit" className="w-full outline-none bg-[#cfcfcf99] p-2 rounded-sm" />
        </div>
        <div>
          <p>Fee: {selectedMethodData.fee}</p>
          <p>Minimum: {selectedMethodData.min}</p>
        </div>
      </ModalApp>
      <ModalApp mask={false} setState={setGenerateDepositAddressState} state={generateDepositAddressState} classname="text-center">
        <p>Deposit Address: {addressGen}</p>
        <p>This address is only valid for 30 minutes, <span className="text-red-500"> DO NOT DEPOSIT TO THIS ADDRESS AFTER 30 MINUTES</span></p>
      </ModalApp>
      
    </>
  );
}

export default DepositCrypto;
