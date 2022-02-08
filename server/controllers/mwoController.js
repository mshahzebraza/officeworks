import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import mwoModel from "../models/mwoModel";

export const fetchMWOs = CatchAsyncErrors(async (req, res) => {
  console.log('fetch mwo ran!');
  const mwoList = await mwoModel.find({})
  console.log('mwos', mwoList[0].itemName);
  res.status(200).json({
    success: true,
    data: mwoList
  })

});

export const deleteMWO = CatchAsyncErrors(async (req, res) => {
  console.log('deleteMWO ran!');
  const { mwoUUID } = req.body
  const mwo = await mwoModel.findByIdAndDelete(mwoUUID)

  res.status(200).json({
    success: true,
    data: mwo
  })

});

export const createMWO = CatchAsyncErrors(async (req, res) => {
  console.log('createMWO ran!');
  const { mwoData } = req.body

  const mwo = await mwoModel.create(mwoData)

  res.status(200).json({
    success: true,
    data: mwo
  })

});

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
