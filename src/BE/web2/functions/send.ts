
import { Resend } from "resend"
import { EmailTemplateResend } from "./email-verificationSignup-template"
import { EmailTemplateResendPasswordReset } from "./passowrd-reset"

const resend = new Resend(process.env.RESENDAPIKEY!)

export async function SENDSIGNUPVERIFICATION(email:string,username:string,verifierToken:string) {
    try {
        console.log('sending mail')
        const data = await resend.emails.send({
            from:"DPOMarket <contact@directprivateoffers.com>",
            to:email,
            subject:"Email Verification",
            react:EmailTemplateResend({username,verifierToken})
        })
        return {status:true,message:"email sent successfully"}
    } catch (error:any) {
        return {status:false,message:error.message}
    }
}

export async function SENDPASSRESET(email:string,username:string,token:string) {
    try {
        console.log('sending mail')
        const data = await resend.emails.send({
            from:"DPOMarket <contact@directprivateoffers.com>",
            to:email,
            subject:"Password Reset",
            react:EmailTemplateResendPasswordReset({username,PasswordResetToken:token})
        })
        return {status:true,message:"email sent successfully"}
    } catch (error:any) {
        return {status:false,message:error.message}
    }
}