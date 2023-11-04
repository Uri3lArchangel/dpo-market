
export const EmailTemplateResendPasswordReset = ({username,PasswordResetToken}:{username:string,PasswordResetToken:string})=>{
    return(
        <div>
            <h1 style={{fontSize:"1.9rem",color:"#6ec761",textAlign:"center"}}>DIRECT <span style={{color:"black"}}>PRIVATE</span>  OFFERS</h1>
            
            <h1 style={{fontSize:"1.2rem"}}>Hello {username},A password reset request was initiated</h1>
            <p style={{fontSize:"1.2rem"}}>Follow the link below to reset password, if you did not request this please ignore it</p>
            <p style={{fontSize:"1.2rem"}}>It is only valid for 30minutes</p>
            <p style={{fontSize:"1.2rem"}}>{`${process.env.BASEURL}/resetpasswordconfirmation?username=${username}&verifytoken=${PasswordResetToken}`}</p>
        </div>
    )
    }