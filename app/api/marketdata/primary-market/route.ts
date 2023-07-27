import { returnTotalInvestments } from "@/app/invest/primary-market/db";
import { NextResponse } from "next/server";

export async function GET(){
  const progress =  await returnTotalInvestments()
  return NextResponse.json({Progress:progress})
}