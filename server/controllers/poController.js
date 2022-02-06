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

  // create method
  const po = await poModel.create(req.body.data)

  /* // save method
  const po = new poModel(req.body.data)
  po.save()
 */
  res.status(200).json({
    success: true,
    data: po
  })
});

export const updatePO = async (req, res) => {
  console.log('update PO Ran');
  // findByIdAndUpdate() method
  const updatedPO = await poModel.findByIdAndUpdate(
    req.body.id, // old Id
    req.body.data, // replacement
    { new: true } // to get the updated value back
  )

  /* // findOne + save method -- error
  let po = await poModel.findOne({ _id: req.body.id })
  po = { ...req.body.data }; // replaces the po successfully but no .save() method remains in prototype.
  const updatedPO = await po.save();
  console.log('updated', updatePO);
   */

  // return RESPONSE
  res.status(200).json({
    success: true,
    data: updatedPO
  })
};




export const fetchAllItems = CatchAsyncErrors(async (req, res) => {
  const { poId } = req.body;
  let { items: itemList } = await poModel.findById(poId)

  res.status(200).json({
    success: true,
    data: itemList
  })

});

export const deletePOitem = CatchAsyncErrors(async (req, res) => {
  const { poId, itemId } = req.body;

  const poData = await poModel.findById(poId)
  const remainingItems = poData.items.filter((item) => item._id.toString() !== itemId)

  // Save method
  poData.items = remainingItems;
  const { items: itemList } = await poData.save();

  res.status(200).json({
    success: true,
    data: itemList
  })

});

export const createPOitem = CatchAsyncErrors(async (req, res) => {
  const { poId, itemData } = req.body;

  /* // findByIdAndUpdate method
    let poData = await poModel.findByIdAndUpdate(
      poId,
      { $push: { items: itemData } }
    ); */

  // save method
  let poData = await poModel.findById(poId);
  const lengthOfList = poData.items.push(itemData);
  const { items: itemList } = await poData.save()

  res.status(200).json({
    success: true,
    data: itemList[lengthOfList - 1]
  })
});

export const updatePOitem = CatchAsyncErrors(async (req, res) => {
  const { poId, itemId, itemData } = req.body;

  const poData = await poModel.findById(poId);
  const targetIndex = poData.items.findIndex((item) => item._id.toString() === itemId)

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

export const updatePOitemSpec = CatchAsyncErrors(async (req, res) => {
  const { poId, itemId, specData } = req.body;

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
