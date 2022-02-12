import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import mwoModel from "../models/mwoModel";

// Fetch all MWOs
export const getAllMWOs = CatchAsyncErrors(async (req, res) => {
  const mwoList = await mwoModel.find({})
  console.log('mwos', mwoList[0].itemName);
  res.status(200).json({
    success: true,
    data: mwoList
  })

});
// delete mwo
export const deleteMWO = CatchAsyncErrors(async (req, res) => {
  const { mwoUUID } = req.body
  const mwo = await mwoModel.findByIdAndDelete(mwoUUID)

  res.status(200).json({
    success: true,
    data: mwo
  })

});

// create a mwo
export const createMWO = CatchAsyncErrors(async (req, res) => {
  console.log('createMWO ran!');
  const { mwoData } = req.body

  const mwo = await mwoModel.create(mwoData)

  res.status(200).json({
    success: true,
    data: mwo
  })

});

// update a mwo
export const updateMWO = CatchAsyncErrors(async (req, res) => {
  console.log('updateMWO ran!');
  const { mwoUUID, mwoData } = req.body

  let mwo = await mwoModel.findById(mwoUUID)
  await mwo.overwrite(mwoData)
  const updatedMWO = await mwo.save()

  res.status(200).json({
    success: true,
    data: updatedMWO
  })

});
