import { Schema, model, models } from "mongoose";
import crypto from 'crypto'

const userSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    default:`DPOx${crypto.randomBytes(24).toString("hex")}`
},
  wallet: [{
 
    currencyName: {
      type: String,
      required: true,
    },
    currencySymbol: {
      type: String,
      required: true,
    },
    currencyAmount: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['fiat', 'crypto'],
      required: true,
    },
    pendingAmount:{
      type: Number,
      default: 0,
    }
  }],
  merchantID:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserWallet = models.User || model('User', userSchema);
export default UserWallet
