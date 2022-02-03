import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";

export const fetchAll = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const poList = await poModel.find()
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: poList
  })

});

export const createPO = CatchAsyncErrors(async (req, res) => {
  // Separate requests for po & po item

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



export const createPOitem = CatchAsyncErrors(async (req, res) => {
  // Separate requests for po & po item

  const po = await poModel.create(req.body.data)
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: po
  })
});


export const fetchAllItems = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const { poId } = req.body;
  const poItems = await poModel.findOne(
    { refId: poId },
    { _id: 0, "items.id": 1 }
  )

  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: poItems
  })

});

export const deleteItem = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const { poId, itemId } = req.body;
  const poData = await poModel.findOne(
    { refId: poId },
    { _id: 0, refId: 1, "items.id": 1, "items._id": 1 }
  )
  const remainingItems = poData.items.filter((item) => item.id != itemId)

  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: remainingItems
  })

});
