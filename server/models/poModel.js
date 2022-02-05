// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;
const mgObjectId = mongoose.Types.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)
const mgMixed = mgSchema.Types.Mixed; // to give ids to mongo objects (assigned automatically if not defined)


const poItemSchema = new mgSchema({
  // _id: mongoose.ObjectId,
  name: String,
  type: String,
  id: String,
  qty: Number,
  unitPrice: Number,
  remarks: String,
  specification: /* mgMixed */ /* OR */ {}, //  = {} , both are equivalent to Setting mixed
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

// export default mongoose.model('poModel', poSchema)
const modal_PO = mongoose.models.PO || mongoose.model('PO', poSchema);
// Search "Mongoose Models" for a Model name 'poModal' and create one if not present already.
export default modal_PO;