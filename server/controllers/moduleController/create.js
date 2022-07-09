import CatchAsyncErrors from "../../middlewares/CatchAsyncErrors";
import poModel from "../../models/poModel";
import mwoModel from "../../models/mwoModel";
import moduleModel from "../../models/moduleModel";
import { asyncForEach, invalidResponse } from "../../../helpers/reusable";
import { filterMWOmoduleData, filterPOmoduleData, separateModuleAndSourceData } from "../../../helpers/specific";
import _, { isNumber } from "lodash";


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

        console.log('old createModule was hit!!!');

        if (!!poUUID && !!mwoUUID) return invalidResponse(res, "Please provide either a PO UUID or an MWO UUID. Not both!");
        // if (!mwoUUID && !poUUID) return invalidResponse(res, "Neither mwoUUID nor poUUID is defined. One of them is required.");
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
            // If neither poUUID nor mwoUUID is defined, 
            else {
                const addedModule = await moduleModel.create({
                    ...moduleData
                });

                return res.status(200).json({
                    success: true,
                    message: `Module added!`,
                    error: null,
                    data: {
                        createdModule: addedModule,
                    }
                })
            }

        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
});
