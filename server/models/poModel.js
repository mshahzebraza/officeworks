// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;
const mgObjectId = mongoose.Types.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)
const mgMixed = mgSchema.Types.Mixed; // to give ids to mongo objects (assigned automatically if not defined)


const poItemSpecSchema = new mgSchema(
  {},
  {
    strict: false,
    _id: false
  }
) // SubDocument is preferred over nested schema to enable the creation of _id as ObjectId 

const poItemSchema = new mgSchema({
  name: String,
  type: String,
  id: String,
  qty: Number,
  unitPrice: Number,
  remarks: String,
  specification: poItemSpecSchema //  = {},mgMixed , both are equivalent to Setting mixed
})

const poSchema = new mgSchema({
  // _id: mongoose.ObjectId,
  refType: String,
  refId: { type: String, unique: true },
  category: String,
  fulfillmentSource: String,
  currency: String,
  totalCost: Number,
  supplier: String,
  status: String,
  remarks: String,
  items: [
    poItemSchema // NOT { poItemSchema }
  ]
})

// console.log(mongoose.modelNames())


// Search "Mongoose Models" for a Model name 'poModel' and create one if not present already.
const model_PO = mongoose.models.PO || mongoose.model('PO', poSchema);
export default model_PO;