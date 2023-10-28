import { connectMongo, disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB";
import { retrieveUserWalletData } from "@/src/FE/Functions/Helpers/BE/UserWalletDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get('dpo-session-base')

  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json({wallet:[]}, {status: 200});
  }
  await connectMongo()
  let wallet = await retrieveUserWalletData(sessionCookie.value);
  if(!wallet)wallet =[]
  await disconnectMongo()
  return NextResponse.json({ wallet }, { status: 200 });
}
