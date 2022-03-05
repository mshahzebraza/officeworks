import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";


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

  let updatedPO = await poModel.findByIdAndUpdate(
    poUUID,
    poData,
    { new: true, runValidators: true }
  )

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

  const { items: itemList } = await poModel.findByIdAndUpdate(
    poUUID,
    {
      $pull: { items: { _id: itemUUID } }
    },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    success: true,
    data: itemList
  })

});

export const createItem = CatchAsyncErrors(async (req, res) => {
  const { poUUID } = req.query;
  const { itemData } = req.body;


  let { items: itemList } = await poModel.findByIdAndUpdate(
    poUUID,
    {
      $push: { items: itemData }
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: itemList[itemList.length - 1]
  })
});

export const updateItem = CatchAsyncErrors(async (req, res) => {
  const { poUUID, itemUUID } = req.query;
  const { itemData } = req.body;


  // Update the item with the new itemData but use findByIdAndUpdate method and $set
  const { items: itemList } = await poModel.findByIdAndUpdate(
    poUUID,
    {
      $set: {
        "items.$[matchItem]": { // ? $[] let's us name the positional items as it is often used on multiple operations
          _id: itemUUID, //? _id needs to passed for sub-documents bcz _ids of sub-documents are not static but dynamic (changes every time)
          ...itemData
        }
      }
    },
    {
      arrayFilters: [ //? can be skipped if we use findOneAndUpdate method
        { "matchItem._id": itemUUID }
      ],
      new: true,
      runValidators: true
    }
  )

  res.status(200).json({
    success: true,
    data: itemList.find((item) => item._id.toString() === itemUUID)
  })
});

export const updateSpecification = CatchAsyncErrors(async (req, res) => {
  const { poUUID, itemUUID } = req.query;
  const { specData } = req.body;

  const poData = await poModel.findByIdAndUpdate(
    poUUID,
    {
      $set: {
        "items.$[matchItem].specification": specData
      }
    },
    {
      arrayFilters: [
        { "matchItem._id": itemUUID }
      ],
      new: true,
      runValidators: true
    }
  )
  // poData.items[targetIndex].markModified("specification"); // ? markModified is not required in this case because we are not changing it, but REPLACING IT COMPLETELY.

  const updatedSpecs = poData.items.find((item) => item._id.toString() === itemUUID).specification
  // *Advanced Destructuring - Not being used now :(
  // const { items: { [targetIndex]: { specification: updatedSpecs } } } = poData;

  res.status(200).json({
    success: true,
    data: updatedSpecs
  })
});
