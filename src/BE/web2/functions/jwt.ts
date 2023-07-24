import JWT from 'jsonwebtoken'

export const jwtsign = (email:string,uname:string)=> {
const token = JWT.sign({Email:email,Username:uname},process.env.JWTSECRET!)
return token
}
export const jwtdecodebase = (token:string)=>{
    const decodedData = JWT.decode(token) as {Email:string,Username:string}
    return decodedData
}
