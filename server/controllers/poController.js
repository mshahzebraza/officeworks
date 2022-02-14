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
  const { poUUID } = req.body;
  const po = await poModel.findByIdAndDelete(poUUID)
  res.status(200).json({
    success: true,
    data: po
  })
});

export const createPO = CatchAsyncErrors(async (req, res) => {
  const { poData } = req.body;
  // console.log('poData', poData);
  // create method
  const createdPO = await poModel.create(poData)

  res.status(200).json({
    success: true,
    data: createdPO
  })
});

export const updatePO = CatchAsyncErrors(async (req, res) => {
  const { poUUID, poData } = req.body;

  // replaceOne is what we should use for this  -
  /* const updatedPO = await poModel.replaceOne((
    poUUID, // old Id
    poData, // replacement
    { new: true } // return the new document
  )) */

  // overwrite + save method -- error
  let updatedPO = await poModel.findByIdAndUpdate(poUUID, poData, { new: true, runValidators: true })

  // return RESPONSE
  res.status(200).json({
    success: true,
    data: updatedPO
  })
});

export const fetchItems = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.body;
  let { items: itemList } = await poModel.findById(poUUID)

  res.status(200).json({
    success: true,
    data: itemList
  })

});

export const deleteItem = CatchAsyncErrors(async (req, res) => {
  const { poUUID, itemUUID } = req.body;

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
  const { poUUID, itemData } = req.body;

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
  const { poUUID, itemUUID, itemData } = req.body;

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
  const { poUUID, itemUUID, specData } = req.body;

  let poData = await poModel.findById(poId);
  const targetIndex = poData.items.findIndex((item) => item._id.toString() === itemId)
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
