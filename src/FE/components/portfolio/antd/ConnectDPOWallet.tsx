"use client";
import ModalApp from "@/src/FE/Components/Antd/ModalApp";
import React, { useContext, useRef, useState } from "react";
import { URLresolve } from "@/src/FE/Functions/Helpers/FE/FetchUrlResolve";
import { NotificationContext } from "../../utils/antd/notification/Note";
import { message } from "antd";

function ConnectWallet() {
  const [connectWallet, setConnectWallet] = useState(false);

const emaillRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);

const ConnectDPOWallet =async () => {

  if(!emaillRef || !emaillRef.current || !passwordRef || !passwordRef.current)return
  message.destroy()
  message.loading("Connecting...",1000000)

  const res=await fetch(URLresolve("/api/connectDPOWallet"),{method:'POST',mode:"no-cors",body:JSON.stringify({email:emaillRef.current.value,password:passwordRef.current.value})})
  const [success,error] = await res.json()
  message.destroy()
if(error){
  message.error(error,4)
  return
}
if(success == "null"){
  message.success("no user wallet account found",4)
  return
}
message.success("Wallet account connected successfully",4)
setConnectWallet(false)
}


  return (
    <>
      <button
        className="border border-blue-500 rounded-lg px-6 py-2 text-blue-500"
        onClick={() => {
          setConnectWallet(true);
        }}
      >
       Connect DPO Wallet
      </button>

      <ModalApp
        state={connectWallet}
        setState={setConnectWallet}
        mask={true}
      >
       <input placeholder="Wallet Account Email" className="h-8 px-2 w-full block rounded-md my-4 outline-none" id="" ref={emaillRef} />
       <input placeholder="wallet Account Password" className="h-8 px-2 w-full block rounded-md my-4 outline-none" id="" ref={passwordRef} />
       <button onClick={ConnectDPOWallet}>Connect</button>
            </ModalApp>
    </>
  );
}

export default ConnectWallet;
