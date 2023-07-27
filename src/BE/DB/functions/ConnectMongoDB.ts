import  Mongoose  from "mongoose"

const URI =process.env.MONGOURL!

export const connectMongo=async()=>{
    console.log('connecting')
await Mongoose.connect(URI)
console.log('connected')

}

export const disconnectMongo=async()=>{
    console.log('disconnecting')
await Mongoose.disconnect()
console.log('disconnected')

}