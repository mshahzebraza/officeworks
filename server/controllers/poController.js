import { deepClone } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";
import mwoModel from "../models/mwoModel";

export const fetchPOs = CatchAsyncErrors(async (req, res) => {

     const { poUUID } = req.query;
     // Fetch a single PO if a UUID is provided
     if (poUUID) {
          const po = await poModel.findById(poUUID).exec();
          if (!po) throw new Error("PO not found");

          return res.status(200).json({
               success: true,
               error: null,
               message: "PO fetched successfully",
               data: { po }
          });
     }


     // Fetch All POs
     const poList = await poModel.find({}).populate("linkedModules");
     res.status(200).json({
          success: true,
          error: null,
          message: "List of All POs fetched successfully",
          data: { poList }
     })

});

export const deletePO = CatchAsyncErrors(async (req, res) => {
     const { poUUID } = req.query;
     if (!poUUID) throw new Error('Please provide a valid poUUID')

     // ?? delete/unlink all linked items from the deleted PO
     const deletedPO = await poModel.findByIdAndDelete(poUUID, { new: true });

     // if deletion fails, return error
     if (!deletedPO) throw new Error('Unsuccessful to delete PO!')

     // return success message
     res.status(200).json({
          success: true,
          message: "PO deleted successfully",
          data: { deletedPO },
          error: null
     })

});

export const createPO = CatchAsyncErrors(async (req, res) => {

     const { poData } = req.body;
     if (!poData) throw new Error('Please provide a valid poData')
     // create method
     const createdPO = await poModel.create(poData)

     res.status(200).json({
          success: true,
          message: "PO created successfully",
          data: { createdPO },
          error: null
     })
});

export const updatePO = CatchAsyncErrors(async (req, res) => {

     const { poUUID } = req.query;
     const { poData } = req.body;

     if (!poUUID) throw new Error("No PO UUID provided");
     if (!poData) throw new Error("No PO data provided");

     delete poData.linkedModules;
     delete poData._id;
     delete poData.__v;

     const updatedPO = await poModel.findByIdAndUpdate(
          poUUID,
          poData,
          { new: true, runValidators: true }
     ).exec()/* .clone() */;
     if (!updatedPO) throw new Error('error updating PO', err);


     // return successful Response
     return res.status(200).json({
          success: true,
          message: "PO updated successfully",
          data: { updatedPO },
          error: null
     })
});
