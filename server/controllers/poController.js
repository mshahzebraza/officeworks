import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";
import mwoModel from "../models/mwoModel";
import projectModel from "../models/projectModel";


export const fetchPOs = CatchAsyncErrors(async (req, res) => {
  console.log('fetch po ran');
  const poList = await poModel.find({})
  console.log('pos', poList[0]);
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
  // create method
  const po = await poModel.create(poData)
  // create runs validators as well as .save(), whereas insert doesn't run validators

  res.status(200).json({
    success: true,
    data: po
  })
});

export const updatePO = CatchAsyncErrors(async (req, res) => {
  console.log('update PO Ran');
  const { poUUID, poData } = req.body;

  // replaceOne is what we should use for this 
  /*   const updatedPO = await poModel.replaceOne(
      req.body.id, // old Id
      req.body.data, // replacement
      { new: true } // to get the updated value back
    )
   */
  // overwrite + save method -- error
  let po = await poModel.findById(poUUID)
  await po.overwrite(poData) // replaces the po successfully but no .save() method remains in prototype.
  const updatedPO = await po.save();
  console.log('updated', updatePO);


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
