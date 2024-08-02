import JWT from 'jsonwebtoken'

export const jwtsign = (email:string,uname:string,status:boolean)=> {
    const rand = String(Math.random()*10000)
const token = JWT.sign({Email:email,Username:uname,status,Random:rand},process.env.JWTSECRET!+rand)
return token
}

export const jwtdecodebase = (token:string)=>{
    const decodedData = JWT.decode(token) as {Email:string,Username:string,status:boolean,Random:string}
    const verifiedData = JWT.verify(token,process.env.JWTSECRET!+decodedData.Random) as {Email:string,Username:string,status:boolean,Random:string}
    return verifiedData
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

export const jwtchecksum = (a:any,b:any,c:any,d:any,e:any,secret?:string)=> {
    const rand = String(Math.random()*10000)
const token = JWT.sign({a,b,c,d,e,Random:rand},secret?secret+rand:process.env.JWTSECRET!+rand)
return token
}
export const jwtverifychecksum = (token:string)=>{
    const decodedData = JWT.decode(token) as any
    const verifiedData = JWT.verify(token,process.env.JWTSECRET!+decodedData.Random)
    return verifiedData
}

export const walletAddressJWTSign=(address:string)=>{
    const token = JWT.sign({walletAddress:address},process.env.JWTSECRET!)
    return token
}
export const verifyWalletAddressJWTSign=(token:string)=>{
    const address = JWT.verify(token,process.env.JWTSECRET!) as {walletAddress:string}
    return address.walletAddress
}