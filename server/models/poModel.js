// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; // to give ids to mongo objects (assigned automatically if not defined)

/**
 * Data Required to register complete information about a Purchase Order
 * @param  {String} refType CST | Bill | PO | Requisition | Delivery Note
 * @param  {String} refId e.g. IE-LP-MN-28/21-22
 * @param  {String} category Single Quotation | Repeat Order | LT-I | LT-SP | LT-DPS
 * @param  {String} fulfillmentSource Foreign || Local
 * @param  {String} currency USD / RMB / HKD / CNY
 * @param  {Number} totalCost 21,12,000
 * @param  {String} status Not Started / Under Process etc.
 * @param  {Number} initiatorId Emp-ID
 * @param  {String} supplier PPC || Chengdu
 * @param  {Object} items - {itemId,qty,unitPrice,remarks}
 * @param  {String} remarks
 */
const poSchema = new Schema({
    // _id: mongoose.ObjectId, // auto-generated if not set to "false" explicitly
    refType: String,
    refId: { type: String, required: true, unique: true },
    category: String,
    fulfillmentSource: String,
    currency: String,
    totalCost: Number,
    status: { type: Number, default: 0 },
    initiatorId: { type: Number, default: 0 },
    supplier: String,
    items: [
        {
            // module: { type: ObjectId, ref: 'Module' },
            id: String,
            qty: Number,
            unitPrice: Number,
            remarks: String, // purchase remarks
            // no mongoose _id required for the document
            _id: false,
        }
    ],
    remarks: String,
})

// Search "Mongoose Models" for a Model name 'poModel' and create one if not present already.
const model_PO = mongoose.models.PO || mongoose.model('PO', poSchema);
export default model_PO;
