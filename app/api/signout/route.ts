import { signout } from "@/src/BE/web2/functions/Cookie";
import { NextResponse } from "next/server";


export async function GET(){
let response = signout()
return NextResponse.json(response,{status:200})
}