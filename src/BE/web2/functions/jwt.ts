import JWT from 'jsonwebtoken'

export const jwtsign = (email:string,uname:string)=> {
const token = JWT.sign({Email:email,Username:uname},process.env.JWTSECRET!)
return token
}
export const jwtdecodebase = (token:string)=>{
    const decodedData = JWT.decode(token) as {Email:string,Username:string}
    return decodedData
}

export const jwtverify = (data:{
    DpoPurchased:string,
    AmountInvested:string
    WalletAddress:string
    Key:string
    
})=>{
const verifingToken=JWT.sign({DpoPurchased:data.DpoPurchased,AmountInvested:data.AmountInvested,WalletAddress:data.WalletAddress},data.Key)

return verifingToken
}