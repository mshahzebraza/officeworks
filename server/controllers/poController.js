import { ObjectId } from "mongodb";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";

export const fetchAll = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const poList = await poModel.find({})

  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: poList
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

export const createPO = CatchAsyncErrors(async (req, res) => {
  // Separate requests for po & po item

  const po = await poModel.create(req.body.data)
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



export const fetchAllItems = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const { poId } = req.body;
  // console.log('poId', poId);
  let poData = await poModel.findById(
    poId
  )

  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: poData
  })

});

export const deleteItem = CatchAsyncErrors(async (req, res) => {
  // perform ACTION based on MODEL
  const { poId, itemId } = req.body;
  const poData = await poModel.findById(
    poId
  )

  const remainingItems = poData.items.filter((item) => item._id.toString() !== itemId)
  poData.items = remainingItems;
  await poModel.findByIdAndUpdate(poId, poData);

  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: remainingItems
  })

});

export const createPOitem = CatchAsyncErrors(async (req, res) => {
  // Separate requests for po & po item
  const { poId, itemData } = req.body;

  // const po = await poModel.create(req.body.data)
  const poData = await poModel.findByIdAndUpdate(
    poId,
    { $push: { items: itemData } }
  );
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: poData
  })
});

// edit this


export const updatePOitem = CatchAsyncErrors(async (req, res) => {
  // Separate requests for po & po item
  const { poId, itemData } = req.body;

  // const po = await poModel.create(req.body.data)
  const poData = await poModel.findByIdAndUpdate(
    poId,
    { $push: { items: itemData } }
  );
  // return a RESPONSE based on ACTION
  res.status(200).json({
    success: true,
    data: poData
  })
});
