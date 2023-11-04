import { fetchUserByUnmame } from "@/app/auth/sign-up/db";
import {
  connectMongo,
  disconnectMongo,
} from "@/src/BE/DB/functions/ConnectMongoDB";
import { jwtdecodebase } from "@/src/BE/web2/functions/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cookie } = await req.json();
    const cookieData = jwtdecodebase(cookie);

    if (!cookieData) {
      return NextResponse.json({ data: null, status: false });
    }
    await connectMongo();
    const user = await fetchUserByUnmame(cookieData.Username);
    await disconnectMongo();
    return NextResponse.json({ data: user, status: true });
  } catch (err: any) {
    await disconnectMongo();

    return NextResponse.json({ data: err.message, status: false });
  }
}
