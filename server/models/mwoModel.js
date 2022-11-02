// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const mwoSchema = new Schema({
    mwoType: String,
    mwoId: { type: String, unique: true },
    title: String,
    status: { type: Number, default: 0 },
    initiatorId: { type: Number, default: 0 },
    remarks: String,
    items: [
        {
            // module: { type: ObjectId, ref: 'Module' },
            id: String,
            qty: Number,
            remarks: String, // purchase remarks
            // no mongoose _id required for the document
            _id: false,
        }
    ],
    // supplier: PPC, MSS, etc
    // TODO: add other fields like MWO report, etc. (and the ones mentioned in the MWO report)
})

const model_MWO = mongoose.models.MWO || mongoose.model('MWO', mwoSchema);
export default model_MWO;
