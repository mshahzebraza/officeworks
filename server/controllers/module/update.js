import moduleModel from "../../models/moduleModel";
import { invalidResponse } from "../../../helpers/reusable";
import { separateModuleAndSourceData } from "../../../helpers/specific";



const updateModule = async (req, res) => {
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
            { _id: poUUID/* , "items.item": moduleUUID */ }, // find the module in which the items array of the contains an item with the moduleUUID
            {
                $set: {
                    "items.$[matchingModule]": {
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
            { _id: mwoUUID/* , "items.item": moduleUUID  */ }, // find the module in which the items array of the contains an item with the moduleUUID
            {
                $set: {
                    "items.$[matchingModule]": {
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

};

export default updateModule;