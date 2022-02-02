// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)

const poItemSchema = new Schema({
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

const poSchema = new Schema({
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
  items: [{
    // type: ObjectId,
    // ref: poItemSchema
  }]
})


// export default mongoose.model('poModel', poSchema)
const modal_PO = mongoose.models.PO || mongoose.model('PO', poSchema);
// Search "Mongoose Models" for a Model name 'poModal' and create one if not present already.
export default modal_PO;