
export const EmailTemplateResend = ({username,verifierToken}:{username:string,verifierToken:string})=>{
    return(
        <div>
            <h1 style={{fontSize:"1.9rem",color:"#6ec761",textAlign:"center"}}>DIRECT <span style={{color:"black"}}>PRIVATE</span>  OFFERS</h1>
            
            <h1 style={{fontSize:"1.2rem"}}>Hello {username},You are required to verify your Email</h1>
            <p style={{fontSize:"1.2rem"}}>Your signup on DPO Markets is successful, please click this link to verify your account</p>
            <p style={{fontSize:"1.2rem"}}>It is only valid for 30minutes</p>
            <p style={{fontSize:"1.2rem"}}>{`${process.env.BASEURL}/api/verifyemail?username=${username}&verifytoken=${verifierToken}`}</p>
        </div>
    )
    }