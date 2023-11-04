import {
  SignupDB,
  checkIfEmailExist,
  checkIfUsernameExist,
} from "@/app/auth/sign-up/db";
import {
  connectMongo,
  disconnectMongo,
} from "@/src/BE/DB/functions/ConnectMongoDB";
import { HashPassword } from "@/src/BE/web2/functions/HashPasswords";
import { SENDSIGNUPVERIFICATION } from "@/src/BE/web2/functions/send";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await disconnectMongo();
    await connectMongo();
    const {
      Username,
      Email,
      Password,
    }: { Username: string; Email: string; Password: string } =
      await request.json();
    const emailCheck = await checkIfEmailExist(Email);
    if (emailCheck) {
      await disconnectMongo();

      return NextResponse.json(
        {
          message: "This Email is already exists in our records",
          description:
            "the email you provide is already linked to an accout, you can try logging in",
          type: "error",
        },
        { status: 400 }
      );
    }

    const unameCheck = await checkIfUsernameExist(Username);
    if (unameCheck) {
      await disconnectMongo();

      return NextResponse.json(
        {
          message: "username already exists",
          description:
            "the username you specified is already in use please change it",
          type: "error",
        },
        { status: 400 }
      );
    }

    const hash = HashPassword(Password);

    const user = await SignupDB(Email, Username, hash);
    let d =await SENDSIGNUPVERIFICATION(Email,Username,user.token.emailVerifier.token)
    console.log(d)
    await disconnectMongo();

    return NextResponse.json(
      { message: "Sign Up Successful", description: "", type: "success" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err.message);
    await disconnectMongo();

    return NextResponse.json(
      { message: err.message, description: "", type: "error" },
      { status: 500 }
    );
  }
}
