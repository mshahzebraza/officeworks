import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";

export const fetchAll = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const poList = await poModel.find()/* .populate() */
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: poList
  })
  /* onError this should be returned 
  res.status(404).json({
    success: false,
    error
  }
   */
});

export const createPO = CatchAsyncErrors(async (req, res) => {
  const po = await poModel.create(req.body.data)
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: po
  })
});

export const deletePO = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const po = await poModel.findByIdAndDelete(req.body.id)
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: po
  })
});

export const updatePO = async (req, res) => {
  // perform ACTION based on MODEL
  const po = await poModel.findByIdAndUpdate(req.body.id, req.body.data)
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: po
  })
};
