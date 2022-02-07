// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;

const mwoSchema = new mgSchema({
  mwoId: { type: String, unique: true },
  application: String,
  itemId: String,
  itemName: String,
  qty: Number,
  title: String,
  status: String,
  remarks: String,
})

const model_MWO = mongoose.models.MWO || mongoose.model('MWO', mwoSchema);
export default model_MWO;
