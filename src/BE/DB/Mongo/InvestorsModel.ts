import { Schema, model, models } from "mongoose";

const InvestorSchema = new Schema({
  Image: String,
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  Location: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  PhoneNumber: {
    type: String,
    require: true,
  },
  Plan: {
    type: String,
    require: true,
  },
  Wallet: {
    type: String,
    require: true,
  },
  Company: String,
  Status:String,
  Date:String,
  Approvals:Number,
  Rejections:Number,
  ApprovedByBoard:Boolean

});

let Investor = models.investor || model('investor',InvestorSchema)

export default Investor