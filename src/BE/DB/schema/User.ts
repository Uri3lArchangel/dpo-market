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
    pendingDeposit:[{
    
        asset:String,
        minTime:Number,
        maxTime:Number,
        method:String,
        depositAddress:String,
        active:{
            type:Boolean,default:false
        },
    }],
    wallet:{
        
        type:[
            {
        coinName:String,
        amount:Number,
        pending:Number
    }],
    depositAddress:String
    },
    Verified:{
        type:Boolean,
        default:false
    },
    token:{
        type:{
            emailVerifier:{
                token:String,
                expiration:{
                    type:Date,
                    default:new Date(Date.now()+(30 * 3600 * 1000)),
                },
                cc:{
                    type:Number,
                    default:1
                },

                cooldown:{
                    type:Date,
                default:new Date(Date.now())
                }

            },
            withdrawVrifier:{
                token:String,
                expiration:{
                    type:Date,
                    default:new Date(Date.now()+(30 * 3600 * 1000)),
                }
            },
                passwordreset:{
                token:{
                    type:String,
                    default:""
                },
                expiration:{
                    type:Date,
                    default:new Date(Date.now()+(30 * 3600 * 1000)),
                },
                cc:{
                    type:Number,
                    default:1
                },

                cooldown:{
                    type:Date,
                default:new Date(Date.now())
                }

            },
            },
        },
    secondary:{
        type:{
            orders:[
                {
                    marketType:String,
                    pair:String,
                    entryPrice:Number,
                    amount:Number,
                    targetPrice:Number,
                    canceled:Boolean,
                    isFullfiled:Boolean
                }
            ]

        }
    }
})

let User = models.Users || model('Users',UserSchema)

export default User