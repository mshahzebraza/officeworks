import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import mwoModel from "../models/mwoModel";

// Fetch all MWOs
export const getAllMWOs = CatchAsyncErrors(async (req, res) => {
  const mwoList = await mwoModel.find({})
  res.status(200).json({
    success: true,
    data: mwoList
  })

});
// delete mwo
export const deleteMWO = CatchAsyncErrors(async (req, res) => {
  const { mwoUUID } = req.query;
  const mwo = await mwoModel.findByIdAndDelete(mwoUUID)

  res.status(200).json({
    success: true,
    data: mwo
  })

});

// create a mwo
export const createMWO = CatchAsyncErrors(async (req, res) => {
  const { mwoData } = req.body

  const mwo = await mwoModel.create(mwoData)

  res.status(200).json({
    success: true,
    data: mwo
  })

});

// update a mwo
export const updateMWO = CatchAsyncErrors(async (req, res) => {
  const { mwoUUID } = req.query;
  const { mwoData } = req.body

  let mwo = await mwoModel.findById(mwoUUID)
  await mwo.overwrite(mwoData)
  const updatedMWO = await mwo.save()

  res.status(200).json({
    success: true,
    data: updatedMWO
  })

});
