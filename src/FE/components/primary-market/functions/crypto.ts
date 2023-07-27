import sha256 from 'crypto-js/sha256' 

export const hashData = (data:{DpoPurchased:string,AmountInvested:string,WalletAddress:string},secret:string)=>{
const {DpoPurchased,AmountInvested,WalletAddress} = data
const dataWithSecret = DpoPurchased+secret+AmountInvested+secret+WalletAddress+secret
const hash = sha256(dataWithSecret)
const hashSig = hash.toString()
return hashSig
}

export const hashData2 = (data:{NotesPurchased:string,AmountInvested:string,WalletAddress:string,faceValue:string},secret:string)=>{
    const {NotesPurchased,AmountInvested,WalletAddress,faceValue} = data
    const dataWithSecret = NotesPurchased+secret+AmountInvested+secret+WalletAddress+secret+faceValue
    const hash = sha256(dataWithSecret)
    const hashSig = hash.toString()
    return hashSig
    }

