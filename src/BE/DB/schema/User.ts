import { Schema, SchemaType, model, models } from "mongoose";

 const UserSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },password:{
        type:String,
        required:true,
        unique:true
    },
    isAccredited:{
        type:Boolean,
        default:true,
        required:true
    },
    equityOffer:{
        walletAddress:{
            type:String,
            lowercase:true
        },
        amountInvested:Number,
        totalTokensToReceive:Number,
        isActive:{
            type:Boolean,
            default:false
        }
    },
    debtOffer:{
        walletAddress:{
            type:String,
            lowercase:true
        },
        totalNotesOwned:Number,
        totalFaceValue:Number,
        maturityPeriodInDays:Number,
        maturityDate:Date,
        totalInvestment:Number,
        isActive:{
            type:Boolean,
            default:false
        }
    },
    wallet:{
        
        type:[
            {
        coinName:String,
        amount:Number,
        pending:Number
    }],
    depositAddress:String
    },
    secondary:{
        type:{
            orders:[
                {
                    type:String,
                    pair:String,
                    entryPrice:Number,
                    amount:Number,
                    targetPrice:Number,
                    canceled:Boolean
                }
            ]

        }
    }
})

let User = models.Users || model('Users',UserSchema)

export default User