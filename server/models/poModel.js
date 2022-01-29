// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)

const poSchema = new Schema({
  // _id: ObjectId,
  refType: {
    type: String,
    required: [true, 'refType is required'],
    default: 0.0
    // trim:true,
  },
  refId: {
    type: String,
    required: [true, 'refId is required'],
    default: 0.0
    // trim:true,
  },
  category: {
    type: String,
    required: [true, 'category is required'],
    default: 0.0
    // trim:true,
  },
  fulfillmentSource: {
    type: String,
    required: [true, 'Required'],
    default: 0.0
    // trim:true,
  },
  currency: {
    type: String,
    required: [true, 'currency is required'],
    default: 0.0
    // trim:true,
  },
  totalCost: {
    type: String,
    required: [true, 'totalCost is required'],
    default: 0.0
    // trim:true,
  },
  supplier: {
    type: String,
    required: [true, 'supplier is required'],
    default: 0.0
    // trim:true,
  },
  status: {
    type: String,
    required: [true, 'status is required'],
    default: 0.0
    // trim:true,
  },
  remarks: {
    type: String,
    required: [true, 'remarks is required'],
    default: 0.0
    // trim:true,
  },
  // Embedded method
  items: [{
    name: {
      type: String,
      required: [true, 'name is a required property'],
      default: 0.0, // 'Ball Lead Screw'
    },
    type: {
      type: String,
      required: [true, 'type is a required property'],
      default: 0.0, // special
    },
    id: {
      type: String,
      required: [true, 'id is a required property'],
      default: 0.0, // 'NRS BF 220x2 1502'
    },
    qty: {
      type: String,
      required: [true, 'qty is a required property'],
      default: 0.0, // 200
    },
    unitPrice: {
      type: String,
      required: [true, 'unitPrice is a required property'],
      default: 0.0, // 450
    },
    remarks: {
      type: String,
      required: [true, 'remarks is a required property'],
      default: 0.0, // ''
    },
    // Reference Schema method
    // specifications: {
    //   any: mongoose.Schema.Mixed,
    // type: mongoose.Schema.ObjectId,
    // ref: SpecMix

    // }
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

export default mongoose.model('po', poSchema)