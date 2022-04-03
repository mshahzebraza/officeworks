// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)


const poSchema = new Schema({
  // _id: mongoose.ObjectId,
  refType: String, // mwo/po/cst
  refId: { type: String, required: true, unique: true }, // mwoId
  category: String, // Imprest || Spot || Repeat || Limited Tender // External || Internal, etc
  fulfillmentSource: String, // null || Foreign || Local
  currency: String, // USD / RMB / HKD / etc
  totalCost: Number, // free || totalCost
  supplier: String, // PPC || Chengdu || etc
  status: String,
  remarks: String,
  linkedModules: [
    {
      item: { type: ObjectId, ref: 'Module' },
      qty: Number, // subject to change
      unitPrice: Number, // subject to change
      remarks: String, // purchase remarks
      // no mongoose _id required for the document
      _id: false,
    }
  ]
})
/* 

linkedItems: [
  specs: {}, // ?item related
  type, // purchase related
  qty, // purchase related
  unitPrice, // purchase related
  remarks // purchase related
]

 */


// Search "Mongoose Models" for a Model name 'poModel' and create one if not present already.
const model_PO = mongoose.models.PO || mongoose.model('PO', poSchema);
export default model_PO;