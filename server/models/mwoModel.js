// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const mwoSchema = new Schema({
    mwoId: { type: String, unique: true },
    title: String,
    status: { type: Number, default: 0 },
    initiatorId: { type: ObjectId, default: 0 },
    remarks: String,
    // supplier: PPC, MSS, etc

    items: [
        {
            item: { type: ObjectId, ref: 'Module' },
            qty: Number,
            remarks: String,
            // no mongoose _id required for the document
            _id: false,
        }
    ], // assuming only one item per mwo
    // TODO: add other fields like MWO report, etc. (and the ones mentioned in the MWO report)
})

const model_MWO = mongoose.models.MWO || mongoose.model('MWO', mwoSchema);
export default model_MWO;
