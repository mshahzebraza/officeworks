tid


// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;

const mwoSchema = new mgSchema({
  tid: { type: String, unique: true },
  type: String,
  product: String,
  id: String,
  qty: Number,
  intent: String,
  party: String,
  date: String,
  remarks: String,
  initiator: String,
})

const model_MWO = mongoose.models.MWO || mongoose.model('MWO', mwoSchema);
export default model_MWO;
