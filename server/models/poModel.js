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
    // auto-generated if not set to "false" explicitly
    // _id: mongoose.ObjectId,
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

/* 
Object Version

const poData = {
    refType: "Bill",
    refId: "de-lp-mn/21-22",
    category: "Repeat Order",
    fulfillmentSource: "Local",
    currency: "RMB",
    totalCost: 11221,
    status: 0,
    initiatorId: "7320",
    supplier: "Wuhan",
    items: [
        {
            "id": "J88SY350A",
            "qty": 25,
            "unitPrice": 1500,
            "remarks": "the item had a shorter shaft than required"
        }
    ],
    remarks: "the purchase was delayed due to a budget constraint"
}


 */


/* 
JSON Version
{
    "refType": "Bill",
    "refId": "de-lp-mn/21-22",
    "category": "Repeat Order",
    "fulfillmentSource": "Local",
    "currency": "RMB",
    "totalCost": 11221,
    "status": 0,
    "initiatorId": "7320",
    "supplier": "Wuhan",
    "items": [
        {
            "id": "J88SY350A",
            "qty": 25,
            "unitPrice": 1500,
            "remarks": "the item had a shorter shaft than required"
        }
    ],
    "remarks": "the purchase was delayed due to a budget constraint"
}

 */