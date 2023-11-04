"use client";
import React, { useContext } from "react";
import Password from "@/src/FE/components/utils/antd/inputs/Passowrd";
import Link from "next/link";
import { onPasswordFieldChange } from "@/src/FE/components/auth/functions/Verifications";
import {
  NotificationContext,
  NotificationDataObject,
} from "@/src/FE/components/utils/antd/notification/Note";
import { message } from "antd";
import { URLresolve } from "@/src/FE/Functions/Helpers/FE/FetchUrlResolve";
import { useRouter, useSearchParams } from "next/navigation";

function Passreset() {
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get("username")!;
  const token = params.get("verifytoken")!;
  const noteContext = useContext(NotificationContext);

  const resetSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let pass = (document.getElementById("password-r") as HTMLInputElement).value;
    let confirmPass = (
      document.getElementById("confpassword-r") as HTMLInputElement
    ).value;
    // client-side checks

    if (pass == "") {
      const notification: NotificationDataObject = {
        type: "error",
        message: "No Password",
        description: "Please input a password",
      };
      noteContext!(notification);
      return;
    }

    if (pass != confirmPass) {
      const notification: NotificationDataObject = {
        type: "error",
        message: "Invalid Confirm Password",
        description: "Password and Confirm Password do not match",
      };
      noteContext!(notification);
      return;
    }
    const body = {
      username,
      password: pass,
      token,
    };
    message.loading("Reseting Password", 10000);

    let res = await fetch(URLresolve("/api/newPassword"), {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      body: JSON.stringify(body),
    });
    const data= await res.json();
    message.destroy();

    if(res.status == 200){
      noteContext!({
        type:"success",
        message: data.msg,
        description: "Success",
      });
    }else{
    noteContext!({
      type:"error",
      message: data.msg,
      description: "Error",
    });
  }
    if (data.type == "success") {
      router.push("/auth/sign-in");
    }
  };
  return (
    <main>
      <form>
        <div id="passwordField-container" className="bg-white">
          <label htmlFor="pass" className="flex items-center text-black" >
            PASSWORD <text className="text-red-500 text-xl">*</text>
          </label>
          <Password id="password-r" onChange={onPasswordFieldChange} />
          <div className="password_strength_container" id="password_strength">
            <p>password strength</p>
              <ul>
              <li id="level-0"></li>
              <li id="level-1"></li>
              <li id="level-2"></li>
              <li id="level-3"></li>
              <li id="level-4"></li>
              </ul>
            <p id="passwordStrengthText"></p>
          </div>
        </div>
      <div>
        <label htmlFor="pass" className="flex items-center text-black">
          CONFIRM PASSWORD <text className="text-red-500 text-xl">*</text>
        </label>
        <Password id="confpassword-r" />
      </div>
      <button onClick={resetSubmit}>Reset</button>
      </form>

    </main>
  );
}

export default Passreset;
