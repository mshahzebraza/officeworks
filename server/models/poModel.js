// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)


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
  }]
})

/* 
      SpecMix = new Schema ({
      any : mongoose.Mixed
      }) 

      // Example
      /* {
        pitch: {
          type: String,
          required: [true, 'remarks is a required property'],
          default: 0.0, // ''
        },
        pitch: {
          type: String,
          required: [true, 'remarks is a required property'],
          default: 0.0, // ''
        },
      } 
*/

export default mongoose.model('poModel', poSchema)