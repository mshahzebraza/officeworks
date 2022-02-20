

// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;

const txnSchema = new mgSchema({
  // tid: { type: String, unique: true },
  txnType: String, // 'deposit' or 'withdrawal'
  productNomenclature: String, // deposited/withdrawn product nomenclature
  productId: String, // deposited/withdrawn product id
  partIDs: [String], // ids array need to be assigned to each item in the po.
  // qty: Number, // deposited/withdrawn qty
  intent: String, // reason of transaction (MWO#, PO#, initiate a service (with TSR ID), service completed etc)
  party: String, // party involved in transaction
  date: String, // date of transaction (Auto-generated if not provided)
  remarks: String,
  // initiator: String,
})

const model_TXN = mongoose.models.Transaction || mongoose.model('Transaction', txnSchema);
export default model_TXN;

// 1. deposit from PO
// 2. deposit from MWO
// 3. withdraw for assembly
// 4. withdraw for repair/rework/service issue
// 5. deposit after repair/rework/service completion

