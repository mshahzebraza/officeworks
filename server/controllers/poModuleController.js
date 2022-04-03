import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";
import moduleModel from "../models/moduleModel";


// create four methods for CRUD operations for POmodules
// 1. fetchPOmodules
// 2. createPOmodule
// 3. updatePOmodule
// 4. deletePOmodule

export const fetchPOmodules = CatchAsyncErrors(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "PO modules fetched successfully",
    data: {
      poModules: await poModel.find({}).populate("linkedModules")
    },
    error: null
  })
})

export const createPOmodule = CatchAsyncErrors(async (req, res) => {
  const { poData } = req.body;
  const createdPO = await poModel.create(poData);

  // !filter the form data into module-specific & source-specific data
  // 


  // Dummy response
  res.status(200).json({
    success: true,
    message: "PO module created successfully",
    data: { createdPO },
    error: null
  })
})

export const updatePOmodule = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.query;
  const { poData } = req.body;
  const updatedPO = await poModel.findByIdAndUpdate(poUUID, poData, { new: true }).exec();
  res.status(200).json({
    success: true,
    message: "PO module updated successfully",
    data: { updatedPO },
    error: null
  })
})

export const deletePOmodule = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.query;
  const deletedPO = await poModel.findByIdAndDelete(poUUID);
  res.status(200).json({
    success: true,
    message: "PO module deleted successfully",
    data: { deletedPO },
    error: null
  })
})