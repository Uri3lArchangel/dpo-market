import { cookies } from 'next/headers'
export const setSessionCookie = (cookieToken: string) => {
    cookies().delete('dpo-session-base')
    cookies().set({
        name: 'dpo-session-base',
        value: cookieToken,
        secure: true,
        httpOnly: true,
        maxAge: 3600 * 2,
        expires: 3600 * 2
    })
}

export const signout = () => {
    if (cookies().get('dpo-session-base')) {
        cookies().delete('dpo-session-base')
        return { 'message': 'Sign Out Successful', 'description': '', 'type': 'success' }
    }
    return { 'message': 'You are not signed in so you cannot sign out', 'description': '', 'type': 'info' }
}

export const walletCookie = (token: string) => {
    cookies().delete("_gt_0_")
    cookies().set("_gt_0_", token, {
        secure: true,
        httpOnly: true,
        maxAge: 3600 * 2,
        expires: 3600 * 2
    })
}