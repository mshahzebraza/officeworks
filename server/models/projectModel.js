// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const mgSchema = mongoose.Schema;
// Project.summary aka Project.specification
const summarySchema = new mgSchema(
  {
    nomenclature: { type: String, unique: true },
    // shortName: { type: String, unique: true },
    type: String,
    application: [String],
    target: { type: Number, default: 0 },
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
    // aliasList: [String], // match the alias list if nomenclature is not matched
    /* 
    Sometimes the IDs of manufactured parts do not match the IDs of the parts in the project. E.g.
    
    Supplier provided part with following specs:
    - Nomenclature: "Housing for PCB"
    - ID: "Part-Spt-CS-0010"
    Specs of the part in the project:
    - Nomenclature: "Housing Assembly"
    - ID: "PEMA-XXX-YK-0020"

    In this case, the aliasList of the part in the project should be updated to include the ID of the part from supplier i.e.
    partInProject = {
      nomenclature: "Housing Assembly"
      aliasList: ["Part-Spt-CS-0010"] 
      *This will help to match the part in the project with the part from supplier and update inventory accordingly
      ID: "PEMA-XXX-YK-0020"
    }
     */
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
