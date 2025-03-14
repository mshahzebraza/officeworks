// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moduleSchema = new Schema(
    {
        id: { type: String, required: true, unique: true }, // defined
        name: String, // defined
        // application: [String], // project specific (should be checked dynamically against the available projects by matching with the module id with project modules/module-alias)
        type: String, // module specific
        // inv: {
        //     total: {
        //         type: Number,
        //         default: 0,
        //     },
        //     qualified: {
        //         type: Number,
        //         default: 0,
        //     },
        // }, // quantity in inventory (added or subtracted upon transactions)
        specs: {},
    },
    {
        strict: false, // set to "false" to allow for additional properties to be added to the schema
    }
)


const model_Module = mongoose.models.Module || mongoose.model('Module', moduleSchema);
export default model_Module;