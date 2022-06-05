import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";
import mwoModel from "../models/mwoModel";
import moduleModel from "../models/moduleModel";
import { asyncForEach, invalidResponse } from "../../helpers/reusable";
import { filterMWOmoduleData, filterPOmoduleData, separateModuleAndSourceData } from "../../helpers/specific";
import _, { isNumber } from "lodash";

// ? = fetchModules (fetchModules should return the list of all modules regardless of the linked PO)
export const fetchModules = CatchAsyncErrors(async (req, res) => {
     const { poUUID, mwoUUID, moduleUUID, moduleId } = req.query;
     // TODO: add the following functionality to the function
     if (poUUID && mwoUUID) return invalidResponse(res, "Cannot fetch modules for both PO and MWO");
     if ((poUUID && moduleUUID) || (poUUID && moduleUUID)) return invalidResponse(res, "Cannot fetch a single module for from a source");
     // 1. moduleUUID is provided return the module with the matching UUID only
     // 2. if poUUID is provided return the list of modules for the matching PO
     // 3. if both are provided return the module with the matching UUID for the matching PO
     // 4. if neither is provided return the list of all modules

     // Fetch all modules of the source
     if (poUUID || mwoUUID && !moduleUUID) {
          const query = poUUID ? { linkedPOs: poUUID } : { linkedMWOs: mwoUUID };
          const moduleList = await moduleModel.find(query).exec();

          return res.status(200).json({
               success: true,
               message: "Module list fetched successfully",
               error: null,
               data: {
                    moduleList,
               },
          });
     }
     // Find a single matching module (based on UUID: _id)
     else if (!poUUID && !mwoUUID && moduleUUID) {
          const module = await moduleModel.findById(moduleUUID).exec();

          return res.status(200).json({
               success: true,
               message: "Module fetched successfully",
               error: null,
               data: {
                    module,
               },
          });

     }
     // Find a single matching module (based on id)
     else if (!poUUID && !mwoUUID && moduleId) {
          const module = await moduleModel.findOne({ id: moduleId }).exec();

          if (!module) return invalidResponse(res, "Module not found");

          return res.status(200).json({
               success: true,
               message: "Module fetched successfully",
               error: null,
               data: {
                    module,
               },
          });

     }
     // Find list of all modules
     else {
          const moduleList = await moduleModel.find().exec()/* .populate("linkedMWOs linkedPOs") */

          return res.status(200).json({
               success: true,
               error: null,
               message: "List of All Modules fetched successfully",
               data: {
                    moduleList,
               },
          })
     }

});

export const deleteModule = CatchAsyncErrors(async (req, res) => {
     const { mwoUUID, poUUID, moduleUUID, preserveIntegrity = true } = req.query; // use poUUID for unlinking
     console.log('this was hit!!!');

     //? providing mwoUUID or poUUID is optional
     // if mwoUUID or poUUID is provided, delete the module from the linked list of the respective model
     if (poUUID && mwoUUID) return invalidResponse(res, "Both PO and MWO UUID provided. Please provide only one");
     if (!poUUID && !moduleUUID && !mwoUUID) return invalidResponse(res, "No UUID (MWO, PO or module) provided. Cannot delete module");
     // if (!poUUID && !mwoUUID) return invalidResponse(res, "Neither PO nor MWO UUID provided. At least one is required");

     // ? functionality implementation
     // 1. no params => delete all modules and unlink all modules from all PO's
     // 2. poUUID, moduleUUID => unlink module from PO
     // 3. moduleUUID => unlink from all PO's (delete module if preserveIntegrity is false, otherwise just unlink)
     // TODO: following functionality is not implemented yet
     // 4. poUUID => unlink PO from all modules (delete all of its modules and unlink the deleted modules if preferUnlink is false)


     //? code for unlinking module  can be configured to remove the module if it is not linked to any other PO
     // Do not delete the module if preserveIntegrity is true
     if (preserveIntegrity && preserveIntegrity !== "false") { //? Check If it is specifically set to true by default or changed

          // 2. unlink current module from current PO only
          if (moduleUUID && poUUID && !mwoUUID) {
               // unlink the moduleID from the current PO
               const unlinkedPO = await poModel.findOneAndUpdate(
                    { _id: poUUID }, // make sure to return the module with nested linkedModule
                    { $pull: { linkedModules: { item: moduleUUID } } },
                    { new: true }
               );
               if (!unlinkedPO) return invalidResponse(res, "Module could not be unlinked from PO");

               // unlink the poID from the current module
               const unlinkedModule = await moduleModel.findOneAndUpdate(
                    { _id: moduleUUID, linkedPOs: poUUID }, // make sure to return the module with nested linkedPO
                    { $pull: { linkedPOs: poUUID } },
                    { new: true }
               );
               // delete the module if it is not linked to any other MWO or PO
               if (!(
                    unlinkedModule.linkedMWOs.length
                    || unlinkedModule.linkedPOs.length
               )) {
                    var message = "Module deleted as it is not linked to any other MWO or PO";
                    await unlinkedModule.remove()
               };

               // return response
               return res.status(200).json({
                    success: true,
                    // data: { module: unlinkedModule, po: unlinkedPO },
                    data: {
                         deletedModule: unlinkedModule, // to match the moduleState item in the frontend
                         moduleSource: unlinkedPO
                    },
                    message: message || "Module unlinked from PO",
                    error: null
               })

          }
          // 2. unlink current module from current MWO only
          else if (moduleUUID && mwoUUID && !poUUID) {
               // unlink the moduleID from the current MWO
               const unlinkedMWO = await mwoModel.findOneAndUpdate(
                    { _id: mwoUUID }, // make sure to return the module with nested linkedModule
                    { $pull: { linkedModules: { item: moduleUUID } } },
                    { new: true }
               );
               if (!unlinkedMWO) return invalidResponse(res, "Module could not be unlinked from MWO");
               // unlink the mwoID from the current module
               const unlinkedModule = await moduleModel.findOneAndUpdate(
                    { _id: moduleUUID, linkedMWOs: mwoUUID }, // make sure to return the module with nested linkedMWO
                    { $pull: { linkedMWOs: mwoUUID } },
                    { new: true }
               );
               // delete the module if it is not linked to any other MWO or PO
               if (!(
                    unlinkedModule.linkedMWOs.length
                    || unlinkedModule.linkedPOs.length
               )) {
                    var message = "Module deleted as it is not linked to any other MWO or PO";
                    await unlinkedModule.remove()
               };
               // return response
               return res.status(200).json({
                    success: true,
                    // data: { module: unlinkedModule, mwo: unlinkedMWO },
                    data: {
                         deletedModule: unlinkedModule, // to match the moduleState item in the frontend
                         moduleSource: unlinkedMWO
                    },
                    message: message || "Module unlinked from MWO",
                    error: null
               })

          }
          // 3.A. unlink current module from all POs and MWOs
          else if (moduleUUID && !poUUID && !mwoUUID) {
               console.log("Deleting module completely.");

               // check if module exists
               const moduleExists = await moduleModel.exists({ _id: moduleUUID });
               if (!moduleExists) return invalidResponse(res, "Module not found for deletion");
               // unlink all poIDs from the current module
               const unlinkedModule = await moduleModel.findByIdAndUpdate(
                    moduleUUID,
                    { $set: { linkedPOs: [], linkedMWOs: [] } },
                    { new: true }
               );
               // if (unlinkedModule) return invalidResponse(res, "Module to unlink not found in database");

               // Unlink the unlinked module from all POs
               await asyncForEach(unlinkedModule.linkedPOs, async (poId) => {
                    await poModel.findByIdAndUpdate(
                         poId,
                         { $pull: { linkedModules: moduleUUID } },
                         { new: true }
                    );
               })
               // Unlink the unlinked module from all MWOs
               await asyncForEach(unlinkedModule.linkedMWOs, async (mwoId) => {
                    await mwoModel.findByIdAndUpdate(
                         mwoId,
                         { $pull: { linkedModules: moduleUUID } },
                         { new: true }
                    );
               })

               // return response
               return res.status(200).json({
                    success: true,
                    message: "Module unlinked from all POs & MWOs",
                    data: {
                         deletedModule: unlinkedModule // to match the moduleState item in the frontend
                    },
                    error: null
               })
          }
     }
     // ? preferDelete : delete the module completely and remove it and its linked PO's from the moduleState
     else { // doesn't need to have any poUUID or mwoUUID
          // 3.B delete the current module (upon deletion of the module, the linked PO's and MWOs will be removed as well as there is no way to get to the module from POs and MWOs once it is deleted)
          if (moduleUUID) {
               const deletedModule = await moduleModel.findByIdAndDelete(moduleUUID, { new: true });
               // unlink current module ID from all linked PO's
               await asyncForEach(deletedModule.linkedPOs, async (linkedPOid) => {
                    await poModel.findByIdAndUpdate(
                         linkedPOid,
                         { $pull: { linkedModules: moduleUUID } }
                    );
               })
               // unlink current module ID from all linked MWO's
               await asyncForEach(deletedModule.linkedMWOs, async (linkedMWOid) => {
                    await mwoModel.findByIdAndUpdate(
                         linkedMWOid,
                         { $pull: { linkedModules: moduleUUID } }
                    );
               })
               // return response
               return res.status(200).json({
                    success: true,
                    data: { deletedModule },
                    error: null,
                    message: "Module deleted successfully and unlinked from all linked POs and MWOs"
               })
          }
          // no specific moduleUUID provided, delete all modules in the current PO
          else if (!moduleUUID && poUUID) {
               return invalidResponse(res, "Module deletion not supported for all modules of the current PO");
               // TODO: create Code Snippet 02
          }
          // no specific moduleUUID provided, delete all modules in the current MWO
          else if (!moduleUUID && mwoUUID) {
               return invalidResponse(res, "Module deletion not supported for all modules of the current MWO");
               // TODO: create Code Snippet 03
          }
     }

});

export const createModule = CatchAsyncErrors(async (req, res) => {
     try {
          const {
               poUUID = null,
               mwoUUID = null,
               // preserveIntegrity = true,
               // existingModule: moduleExists = false,
               // overrideModule = null,
          } = req.query;
          const { moduleData: moduleDataMixed } = req.body;

          if (!!poUUID && !!mwoUUID) return invalidResponse(res, "Please provide either a PO UUID or an MWO UUID. Not both");
          if (!mwoUUID && !poUUID) return invalidResponse(res, "Neither mwoUUID nor poUUID is defined. One of them is required.");
          // TODO: Unlinked data creation would cause the data like qty, unitPrice etc. to be lost. However, if a separate form for item is used which doesn't contain these data, then the data can be added to the moduleList
          if (!moduleDataMixed) return invalidResponse(res, "No moduleData provided");


          // Check For & find existing linked module (by moduleId)
          const existingModule = moduleDataMixed.id
               ? await moduleModel.findOne({ id: moduleDataMixed.id }/* , { id: 1, linkedPOs: 1, linkedMWOs: 1 } */)
               : null;
          // ? sourceData: module data exclusively for the current source (PO/MWO) i.e. qty, unitPrice etc.
          const [moduleData, sourceData] = (poUUID)
               ? filterPOmoduleData(moduleDataMixed)
               : filterMWOmoduleData(moduleDataMixed);


          // ?  Already present in moduleList. Check if the module is linked to the current PO/MWO otherwise add it to the linkedPO/MWO
          if (!!existingModule) {


               { // ? Check: duplicate in current source
                    // Module already linked to the current MWO.
                    const existsInCurrentSource = poUUID
                         ? existingModule.linkedPOs.includes(poUUID)
                         : existingModule.linkedMWOs.includes(mwoUUID);

                    // Throw an error if the module already exists in the current source
                    console.assert(!existsInCurrentSource, 'Should have been stopped in the frontend already')
                    if (existsInCurrentSource) return invalidResponse(res, `Module with id "${moduleData.id}" already exists in the current PO/MWO`);
               }

               let updatedSource;

               if (poUUID) {
                    // link the poUUID to the existing module
                    existingModule.linkedPOs.push(poUUID)

                    // Link PO to existing moduleUUID
                    updatedSource = await poModel.findOneAndUpdate(
                         { _id: poUUID },
                         {
                              $push: {
                                   linkedModules: {
                                        item: existingModule._id, // module data is already saved in the list of modules
                                        ...sourceData // qty, unitPrice etc.
                                   }
                              }
                         },
                         { new: true }
                    );
                    if (!updatedSource) return invalidResponse(res, "error while linking PO to module");

               }
               else if (mwoUUID) {
                    // link the mwoUUID to the existing module
                    existingModule.linkedMWOs.push(mwoUUID)

                    // Link MWO to existing module
                    updatedSource = await mwoModel.findOneAndUpdate(
                         { _id: mwoUUID },
                         {
                              $push: {
                                   linkedModules: {
                                        item: existingModule._id,
                                        ...sourceData
                                   }
                              }
                         },
                         { new: true }
                    );
                    if (!updatedSource) return invalidResponse(res, "error while linking MWO to module");
               }
               // save the module db entry
               existingModule.save();

               // return response
               return res.status(200).json({
                    success: true,
                    data: {
                         createdModule: existingModule,
                         sourceModuleData: sourceData,
                         // TODO: add the updatedSource to the response
                         moduleSource: updatedSource
                    },
                    message: `Module linked to ${poUUID ? 'PO' : 'MWO'} with existing data`,
                    error: null
               })


          }
          // ?  Totally New Data. Add module to moduleList and link it to the current PO or MWO
          else if (!existingModule) {

               let updatedSource;
               // If poUUID,as a source, is defined, create & link module to PO
               if (poUUID) {

                    // check if a document exists in the poModel with the poUUID
                    // TODO: use 'exists' to perform this check
                    await poModel.exists({ _id: poUUID }).catch(
                         (err) => { return invalidResponse(res, "PO, to link the module with, does not exist") }
                    );

                    // add the module to the moduleList
                    // TODO: some of the module data should go to the nested structure as well.
                    const addedModule = await moduleModel.create({
                         linkedPOs: [poUUID],
                         ...moduleData //? will most likely only contain 'id' at the time of module creation. can be updated though  
                    });

                    // 2. UPDATE PO: in po collection with new module ID, to link it with the new id
                    updatedSource = await poModel.findByIdAndUpdate(
                         poUUID,
                         {
                              $push: {
                                   linkedModules:
                                   {
                                        item: addedModule._id,
                                        ...sourceData
                                   }
                              }
                         },
                         { new: true, runValidators: true }
                    ).catch(err => {
                         return invalidResponse(res, "Error while updating PO with new module");
                    });


                    return res.status(200).json({
                         success: true,
                         message: `Module added to PO with id ${poUUID}`,
                         error: null,
                         data: {
                              createdModule: addedModule,
                              sourceModuleData: sourceData,
                              // TODO: add the updatedSource to the response
                              moduleSource: updatedSource
                         }
                    })
               }
               // If mwoUUID, as a source, is defined, create & link module to MWO
               else if (mwoUUID) {
                    // check if a document exists in the mwoModel with the mwoUUID
                    const mwoExists = await mwoModel.exists({ _id: mwoUUID }).catch(
                         (err) => { return invalidResponse(res, "MWO, to link the module with, does not exist") }
                    );;

                    // add the module to the moduleList
                    const addedModule = await moduleModel.create({
                         linkedMWOs: [mwoUUID],
                         ...moduleData
                    });

                    // 2. Update mwo in mwo collection with new module ID, to link it with the new id
                    updatedSource = await mwoModel.findByIdAndUpdate(
                         mwoUUID,
                         {
                              $push: {
                                   linkedModules:
                                   {
                                        item: addedModule._id,
                                        ...sourceData
                                   }
                              }
                         },
                         { new: true, runValidators: true }
                    ).exec()

                    return res.status(200).json({
                         success: true,
                         message: `Module added to MWO with id ${mwoUUID}`,
                         error: null,
                         data: {
                              createdModule: addedModule,
                              sourceModuleData: sourceData,
                              // TODO: add the updatedSource to the response
                              moduleSource: updatedSource

                         }
                    })
               }

          }

     } catch (error) {
          return res.status(500).json(error.message);
     }
});

export const updateModule = CatchAsyncErrors(async (req, res) => {
     const { moduleUUID, poUUID, mwoUUID } = req.query; //poUUID is not needed (un/linking is not required as neither the moduleId is changed nor is module deleted)
     let { moduleData } = req.body;
     let sourceData;
     // Unpractical to set the source-specific data in more than one source. Could've been possible for module-specific data only. 
     if (!!mwoUUID && !!poUUID)
          return invalidResponse(res, "Both mwoUUID and poUUID are defined. Only one of them is allowed")
     // To update the module, the moduleData specific to source replaces the moduleData in the source
     // ?  To update the module irrespective of the parent, moduleUUID without poUUID or mwoUUID has to be allowed
     // if (!mwoUUID && !poUUID) return invalidResponse(res, "Neither mwoUUID nor poUUID is defined. One of them is required");
     if (!moduleUUID) return invalidResponse(res, "moduleUUID is not defined. moduleUUID is required");
     if (!moduleData) return invalidResponse(res, "moduleData is not defined. moduleData is required");

     // console.log('moduleData - without filtering:', moduleData);

     // These fields cannot be updated (to avoid mutating the unique data)
     delete moduleData.__v; // TODO: Is it required to delete this? It may not even be present.

     // Filter source/module specific data according to the type of source (PO/MWO) - skip if no source is defined
     if (poUUID) {
          [moduleData, sourceData] = separateModuleAndSourceData(moduleData, 'PO'); //? picks up qty, unitPrice, remarks, etc.
     } else if (mwoUUID) {
          [moduleData, sourceData] = separateModuleAndSourceData(moduleData, 'MWO'); //? picks up qty, remarks, etc.
     }

     // Update the module - doesn't matter if the source (PO or MWO) is defined or not
     const updatedModule = await moduleModel.findByIdAndUpdate(
          moduleUUID,
          moduleData,
          { new: true }
     );

     // if (!updateModule) return invalidResponse(res, "Module for update not found in database");
     if (!updateModule) return invalidResponse(res, "Module for update not found in database");


     if (!poUUID && !mwoUUID) { //? if no source is defined, return the updated module without running source specific code
          // return response
          return res.status(200).json({
               success: true,
               error: null,
               message: "Module updated",
               data: {
                    updatedModule
               }
          })
     }
     // update the source with the new module data
     if (poUUID) {
          // update the module in the moduleList
          const updatedSource = await poModel.findOneAndUpdate(
               { _id: poUUID/* , "linkedModules.item": moduleUUID */ }, // find the module in which the linkedModules array of the contains an item with the moduleUUID
               {
                    $set: {
                         "linkedModules.$[matchingModule]": {
                              item: updatedModule._id,
                              ...sourceData
                         },
                    }
               },
               {
                    new: true,
                    arrayFilters: [
                         { "matchingModule.item": moduleUUID }
                    ]
               }
          );
          // if (!updatedSource) return invalidResponse(res, "PO for update not found in database");
          if (!updatedSource) return invalidResponse(res, "PO for update not found in database");

          // return response
          return res.status(200).json({
               success: true,
               error: null,
               message: "Module updated",
               data: {
                    updatedModule,
                    sourceModuleData: sourceData,
                    // TODO: add the updatedSource to the response
                    moduleSource: updatedSource
               }
          })
     } else if (mwoUUID) {
          // update the module in the moduleList
          const updatedSource = await mwoModel.findOneAndUpdate(
               { _id: mwoUUID/* , "linkedModules.item": moduleUUID  */ }, // find the module in which the linkedModules array of the contains an item with the moduleUUID
               {
                    $set: {
                         "linkedModules.$[matchingModule]": {
                              item: updatedModule._id,
                              ...sourceData
                         },
                    }
               },
               {
                    new: true,
                    arrayFilters: [
                         { "matchingModule.item": moduleUUID }
                    ]
               }
          );
          if (!updatedSource) return invalidResponse(res, "MWO for update not found in database");

          // return response
          return res.status(200).json({
               success: true,
               error: null,
               message: "Module updated",
               data: {
                    updatedModule,
                    sourceModuleData: sourceData,
                    // TODO: add the updatedSource to the response
                    moduleSource: updatedSource
               }
          })
     }

});

export const updateInventory = CatchAsyncErrors(async (req, res) => {
     let { isIncrement } = req.query;
     const { txnList } = req.body;
     if (isIncrement === undefined) return invalidResponse(res, "isIncrement is not defined. isIncrement is required");
     if (!txnList) return invalidResponse(res, "txnList is not defined. txnList is required");

     if (isIncrement === "true") isIncrement = true;
     if (isIncrement === "false") isIncrement = false;

     console.log('isIncrement:', isIncrement);

     const updatedModules = [];
     // call the updateMany function of the moduleModule for each product in the txnList
     await asyncForEach(txnList, async (txn, index) => {
          const { product: { uuid: productUUID }, partIDs } = txn;

          //  call the updateMany function of the moduleModel for each product in the txnList
          const updatedModule = await moduleModel.findByIdAndUpdate(
               productUUID,
               {
                    // TODO: should check if the inventory is less than 0.
                    $inc: {
                         "inv.total": isIncrement ? partIDs.length : -partIDs.length, // ! WORKING !!!
                         // TODO: Next is the same logic for decrementing the inventory in deleteTransaction Apollo
                    }
               },
               { new: true }
          )
          if (!updatedModule) return invalidResponse(res, "Module for update not found in database");
          updatedModules.push(updatedModule);
     })

     if (!updatedModules) return invalidResponse(res, "Module not found in database");

     return res.status(200).json({
          success: true,
          error: null,
          message: "Module Inventory incremented",
          data: {
               updatedModules
          }
     })
});


// TODO: create another function: updateModuleSpecification
// TODO: Do the following
// 1. Create source-specific versions of all 4 functions above.
// 2. Link 4 with po-module-api and mwo-module-api each
// 3. The module apollo functions with link with three different api paths. (po-module-api, mwo-module-api, module-api)
// 4. Finish copying the above functions and change them to the source-specific versions.

export const fetchPOmodules = CatchAsyncErrors(async (req, res) => {
     const { poUUID, mwoUUID, moduleUUID, moduleId } = req.query;
     // TODO: add the following functionality to the function
     if (poUUID && mwoUUID) return invalidResponse(res, "Cannot fetch modules for both PO and MWO");
     if ((poUUID && moduleUUID) || (poUUID && moduleUUID)) return invalidResponse(res, "Cannot fetch a single module for from a source");
     // 1. moduleUUID is provided return the module with the matching UUID only
     // 2. if poUUID is provided return the list of modules for the matching PO
     // 3. if both are provided return the module with the matching UUID for the matching PO
     // 4. if neither is provided return the list of all modules

     // Fetch all modules of the source
     if (poUUID || mwoUUID && !moduleUUID) {
          const query = poUUID ? { linkedPOs: poUUID } : { linkedMWOs: mwoUUID };
          const moduleList = await moduleModel.find(query).exec();

          return res.status(200).json({
               success: true,
               message: "Module list fetched successfully",
               error: null,
               data: {
                    moduleList,
               },
          });
     }
     // Find a single matching module (based on UUID: _id)
     else if (!poUUID && !mwoUUID && moduleUUID) {
          const module = await moduleModel.findById(moduleUUID).exec();

          return res.status(200).json({
               success: true,
               message: "Module fetched successfully",
               error: null,
               data: {
                    module,
               },
          });

     }
     // Find a single matching module (based on id)
     else if (!poUUID && !mwoUUID && moduleId) {
          const module = await moduleModel.findOne({ id: moduleId }).exec();

          if (!module) return invalidResponse(res, "Module not found");

          return res.status(200).json({
               success: true,
               message: "Module fetched successfully",
               error: null,
               data: {
                    module,
               },
          });

     }
     // Find list of all modules
     else {
          const moduleList = await moduleModel.find().exec()/* .populate("linkedMWOs linkedPOs") */

          return res.status(200).json({
               success: true,
               error: null,
               message: "List of All Modules fetched successfully",
               data: {
                    moduleList,
               },
          })
     }

});
export const deletePOmodule = 1;
export const createPOmodule = 1;
export const updatePOmodule = 1;

export const fetchMWOmodules = CatchAsyncErrors(async (req, res) => {
     const { poUUID, mwoUUID, moduleUUID, moduleId } = req.query;
     // TODO: add the following functionality to the function
     if (poUUID && mwoUUID) return invalidResponse(res, "Cannot fetch modules for both PO and MWO");
     if ((poUUID && moduleUUID) || (poUUID && moduleUUID)) return invalidResponse(res, "Cannot fetch a single module for from a source");
     // 1. moduleUUID is provided return the module with the matching UUID only
     // 2. if poUUID is provided return the list of modules for the matching PO
     // 3. if both are provided return the module with the matching UUID for the matching PO
     // 4. if neither is provided return the list of all modules

     // Fetch all modules of the source
     if (poUUID || mwoUUID && !moduleUUID) {
          const query = poUUID ? { linkedPOs: poUUID } : { linkedMWOs: mwoUUID };
          const moduleList = await moduleModel.find(query).exec();

          return res.status(200).json({
               success: true,
               message: "Module list fetched successfully",
               error: null,
               data: {
                    moduleList,
               },
          });
     }
     // Find a single matching module (based on UUID: _id)
     else if (!poUUID && !mwoUUID && moduleUUID) {
          const module = await moduleModel.findById(moduleUUID).exec();

          return res.status(200).json({
               success: true,
               message: "Module fetched successfully",
               error: null,
               data: {
                    module,
               },
          });

     }
     // Find a single matching module (based on id)
     else if (!poUUID && !mwoUUID && moduleId) {
          const module = await moduleModel.findOne({ id: moduleId }).exec();

          if (!module) return invalidResponse(res, "Module not found");

          return res.status(200).json({
               success: true,
               message: "Module fetched successfully",
               error: null,
               data: {
                    module,
               },
          });

     }
     // Find list of all modules
     else {
          const moduleList = await moduleModel.find().exec()/* .populate("linkedMWOs linkedPOs") */

          return res.status(200).json({
               success: true,
               error: null,
               message: "List of All Modules fetched successfully",
               data: {
                    moduleList,
               },
          })
     }

});
export const deleteMWOmodule = 1;
export const createMWOmodule = 1;
export const updateMWOmodule = 1;


