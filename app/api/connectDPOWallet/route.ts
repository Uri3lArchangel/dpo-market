import { NextRequest, NextResponse } from "next/server";
import { krakenRequest } from '../../../src/FE/Functions/Helpers/BE/KrakenApiReq'
import { UpdateMarketDeposit } from "@/app/auth/sign-up/db";
import { cookies } from "next/headers";
import { jwtdecodebase, walletAddressJWTSign } from "@/src/BE/web2/functions/jwt";
import { disconnectMongo } from "@/src/BE/DB/functions/ConnectMongoDB";
import { connectMongoWallet, disconnectMongoWallet } from "@/src/BE/DB/functions/ConnectWalletMongo";
import UserWallet from "@/src/BE/DB/schema/Wallet";
import { passwordHasher } from "@/src/FE/Functions/Helpers/FE/PasswordHasher";
import { UserWalletmodel } from "@/declarations";
import { walletCookie } from "@/src/BE/web2/functions/Cookie";
import { revalidateTag } from "next/cache";


export async function POST(req: NextRequest) {

    try {
        const { email, password } = await req.json()
        const cookie = cookies().get("dpo-session-base")
        if (!cookie || !cookie.value) return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl))
        const user = jwtdecodebase(cookie.value)
        if (!user) return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl))

        await connectMongoWallet()
        const hash = passwordHasher(password)
        const userWallet = await UserWallet.findOne({ email, password: hash }) as UserWalletmodel | null
        if (!userWallet) {
            return NextResponse.json(["null", null])

        }
        await disconnectMongoWallet()
        const token = walletAddressJWTSign(userWallet.address)
        walletCookie(token)
        revalidateTag("WalletDataTag_001")
        return NextResponse.json([true, null])

    } catch (err: any) {
        console.error(err)
        await disconnectMongoWallet()

        return NextResponse.json([null, err.message])

    }
}