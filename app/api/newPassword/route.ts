import {
  fetchUserByUnmame,
  updatePaswordWithUname,
} from "@/app/auth/sign-up/db";
import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password, token } = await req.json();
    console.log(password)

await connectMongo()
    const user = await fetchUserByUnmame(username);
    if(!user){
      await disconnectMongo()
      return NextResponse.redirect(new URL("/auth/sign-up"))
    }
   
    if (!user.token.passwordreset.token  ||
      user.token.passwordreset.token != token 
    ) {
      await disconnectMongo()
      return NextResponse.json(
        { msg: "Invalid token please retry the reset process again" },
        { status: 400 }
      );
    }
    if(new Date(Date.now()) > user.token.passwordreset.expiration){
      await disconnectMongo()
      return NextResponse.json(
        { msg: "Token has expired" },
        { status: 400 }
      );
    }
    const stat = await updatePaswordWithUname(username, password);
    if (!stat) {
      await disconnectMongo()

      return NextResponse.json(
        { msg: "Error chaging password" },
        { status: 400 }
      );
    }
    await disconnectMongo()
    return NextResponse.json({ msg: "Password changed" }, { status: 200 });
  } catch (err: any) {
    if (err.code == "ETIMEOUT") {
      let msg = `Network Error Check Your connection`;
      await disconnectMongo()

      return NextResponse.json({ msg }, { status: 500 });
    }
    await disconnectMongo()
    console.error(err.message)
    return NextResponse.json(
      { msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
