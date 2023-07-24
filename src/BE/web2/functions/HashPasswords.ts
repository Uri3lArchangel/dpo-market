import crypto from 'crypto'


export const HashPassword =(password:string)=>{
    const preHash = crypto.createHash('sha512').update(process.env.SALT+password+process.env.SALT).digest('hex')
    return crypto.createHash('sha256').update(preHash).digest('hex')
}