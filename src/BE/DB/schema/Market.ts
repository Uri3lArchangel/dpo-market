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
    },
    deposits:[
        {
          
            ownerEmail:String,
            expiresAt:{
                type:Number,
                default:(Date.now() + 30 * 60 *1000)
            },
            address:String,
            method:String
        }
    ]
})

let Market = models.MarketData || model("MarketData",Marketschema)

export default Market