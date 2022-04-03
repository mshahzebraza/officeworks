import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import mwoModel from "../models/mwoModel";

// Fetch all MWOs
export const fetchMWOs = CatchAsyncErrors(async (req, res) => {

     const { mwoUUID } = req.query;

     // Fetch a single MWO if a UUID is provided
     if (mwoUUID) {
          const mwo = await mwoModel.findById(mwoUUID).exec();

          // throw error if MWO not found
          if (!mwo) throw new Error("MWO not found");


          return res.status(200).json({
               success: true,
               data: { mwo }
          });
     }

     // Fetch all MWOs
     const mwoList = await mwoModel.find({}).populate("linkedModules");
     return res.status(200).json({
          success: true,
          data: { mwoList }
     })

});
// delete mwo
export const deleteMWO = CatchAsyncErrors(async (req, res) => {
     const { mwoUUID } = req.query;
     if (!mwoUUID) throw new Error('Please provide a valid mwoUUID')

     const deletedMWO = await mwoModel.findByIdAndDelete(mwoUUID, { new: true })
     if (!deletedMWO) throw new Error('Error while deleting MWO')

     res.status(200).json({
          success: true,
          error: null,
          message: 'MWO deleted successfully',
          data: { deletedMWO }
     })

});

// create a mwo
export const createMWO = CatchAsyncErrors(async (req, res) => {
     const { mwoData } = req.body
     if (!mwoData) throw new Error('Please provide valid data to create MWO.')

     const createdMWO = await mwoModel.create(mwoData)
     if (!createdMWO) throw new Error('Unsuccessful to create MWO')

     res.status(200).json({
          success: true,
          data: { createdMWO }
     })

});

// update a mwo
export const updateMWO = CatchAsyncErrors(async (req, res) => {
     const { mwoUUID } = req.query;
     const { mwoData } = req.body
     if (!mwoUUID) throw new Error('mwoUUID is required to update MWO')
     if (!mwoData) throw new Error('mwoData is required to update MWO')

     let updatedMWO = await mwoModel.findByIdAndUpdate(
          mwoUUID,
          { $set: mwoData }, // 'mwoData' alone can also be used
          { new: true }
     )
     if (!updatedMWO) throw new Error('Unsuccessful to update MWO')
     res.status(200).json({
          success: true,
          data: { updatedMWO }
     })

});
