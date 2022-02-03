// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;
const mgObjectId = mgSchema.Types.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)

const poItemSchema = new mgSchema({
  name: String,
  type: String,
  id: String,
  qty: Number,
  unitPrice: Number,
  remarks: Number,
  specifications: {
    // type: ObjectId,
    // ref: specificationSchema
  }
})

const poSchema = new mgSchema({
  // _id: ObjectId,
  refType: String,
  refId: String,
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