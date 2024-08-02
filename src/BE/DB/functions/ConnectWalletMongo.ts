import  Mongoose  from "mongoose"

const URI =process.env.MONGOURL_WALLET!

export const connectMongoWallet=async()=>{
    console.log('connecting')
await Mongoose.connect(URI)
console.log('connected')

}

export const disconnectMongoWallet=async()=>{
    console.log('disconnecting')
await Mongoose.disconnect()
console.log('disconnected')

}