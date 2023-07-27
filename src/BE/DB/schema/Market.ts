import { Schema, model, models } from "mongoose";

const Marketschema = new Schema({
    primaryMarket:{
        status:{
            type:Boolean,
            default:true
        },
        progress:{
            type:Number,
            default:0
        }
    },
    secondaryMarket:{
        status:{
            type:Boolean,
            default:false
        },
        orders:{
            type:[
                {
                    orderID:String,
                    ownerID:String,
                    orderType:String,
                    price:Number,
                    amount:Number,
                    amountLeftToComplete:Number,
                    completed:{type:Boolean,default:false}
                }
            ]
        },
        dpoPrice:{
            value:Number,
            direction:String,
        }
    }
})

let Market = models.MarketData || model("MarketData",Marketschema)

export default Market