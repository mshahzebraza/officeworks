import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";
import mwoModel from "../models/mwoModel";
import projectModel from "../models/projectModel";


export const fetchPOs = CatchAsyncErrors(async (req, res) => {
  const poList = await poModel.find({})
  res.status(200).json({
    success: true,
    data: poList
  })

});

export const deletePO = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.query;
  const po = await poModel.findByIdAndDelete(poUUID)
  res.status(200).json({
    success: true,
    data: po
  })
});

export const createPO = CatchAsyncErrors(async (req, res) => {
  const { poData } = req.body;
  // create method
  const createdPO = await poModel.create(poData)

  res.status(200).json({
    success: true,
    data: createdPO
  })
});

export const updatePO = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.query;
  const { poData } = req.body;

  // overwrite + save method -- error
  let updatedPO = await poModel.findByIdAndUpdate(poUUID, poData, { new: true, runValidators: true })

  // return RESPONSE
  res.status(200).json({
    success: true,
    data: updatedPO
  })
});

export const fetchItems = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.query;
  let { items: itemList } = await poModel.findById(poUUID)

  res.status(200).json({
    success: true,
    data: itemList
  })

});

export const deleteItem = CatchAsyncErrors(async (req, res) => {
  const { poUUID, itemUUID } = req.query;

  const poData = await poModel.findById(poUUID)
  const remainingItems = poData.items.filter((item) => item._id.toString() !== itemUUID)

  // Save method
  poData.items = remainingItems;
  const { items: itemList } = await poData.save();

  res.status(200).json({
    success: true,
    data: itemList
  })

});

export const createItem = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.query;
  const { itemData } = req.body;


  /* // findByIdAndUpdate method
    let poData = await poModel.findByIdAndUpdate(
      poId,
      { $push: { items: itemData } }
    ); */

  // save method
  let poData = await poModel.findById(poUUID);
  const lengthOfList = poData.items.push(itemData);
  const { items: itemList } = await poData.save()

  res.status(200).json({
    success: true,
    data: itemList[lengthOfList - 1]
  })
});

export const updateItem = CatchAsyncErrors(async (req, res) => {
  const { poUUID, itemUUID } = req.query;
  const { itemData } = req.body;



  const poData = await poModel.findById(poUUID);
  const targetIndex = poData.items.findIndex((item) => item._id.toString() === itemUUID)

  poData.items.splice(targetIndex, 1, itemData)
  // poData.items[targetIndex].markModified("specification") // not necessary as all of the doc is changed anyway


  /* // findById method
    const updatedPOdata = await poModel.findById(poId, poData); */

  // save method
  const { items: itemList } = await poData.save();

  res.status(200).json({
    success: true,
    data: itemList[targetIndex]
  })
});

export const updateSpecification = CatchAsyncErrors(async (req, res) => {
  const { poUUID, itemUUID } = req.query;
  const { specData } = req.body;

  let poData = await poModel.findById(poUUID);
  const targetIndex = poData.items.findIndex((item) => item._id.toString() === itemUUID)
  // Data Manipulation
  poData.items[targetIndex].specification = specData
  poData.items[targetIndex].markModified("specification");

  // Advanced Destructuring
  const { items: { [targetIndex]: { specification: updatedSpecs } } } = await poData.save();

  res.status(200).json({
    success: true,
    data: updatedSpecs
  })
});
