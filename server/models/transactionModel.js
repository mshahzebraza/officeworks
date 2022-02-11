

// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;

const txnSchema = new mgSchema({
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

const model_TXN = mongoose.models.Transaction || mongoose.model('Transaction', txnSchema);
export default model_TXN;
