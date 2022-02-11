// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;
// Project.summary
const summarySchema = new mgSchema(
  {
    nomenclature: { type: String, unique: true },
    type: String,
    application: [String],
    target: Number,
    stock: Number,
    status: String
  }
  , { _id: false }
)
// Project.assemblies
const assembliesSchema = new mgSchema(
  {
    nomenclature: String,
    id: String,
    parent: String
  }
  , { _id: false }
)
// Project.parts
const partsSchema = new mgSchema(
  {
    parentAssemblyId: String,
    type: String,
    nomenclature: String,
    id: String,
    qty: Number,
  }
  , { _id: false }
)

// Project
const projectSchema = new mgSchema({
  summary: summarySchema,
  assemblies: [assembliesSchema],
  parts: [partsSchema],
})

const model_Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default model_Project;
