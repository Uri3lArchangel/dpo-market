import { connectMongoWallet, disconnectMongoWallet } from "@/src/BE/DB/functions/ConnectWalletMongo";
import UserWallet from "@/src/BE/DB/schema/Wallet";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json()
    await connectMongoWallet()
    console.log({address})
    const userWallet = await UserWallet.findOne({ address })
    console.log({userWallet})
    await disconnectMongoWallet()
    return NextResponse.json([userWallet, null] ,{ status: 200 });
  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json([null, err.message])
  }
}
