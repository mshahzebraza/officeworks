import poModel from "../../models/poModel";
import mwoModel from "../../models/mwoModel";
import moduleModel from "../../models/moduleModel";
import { asyncForEach, invalidResponse } from "../../../helpers/reusable";
import { filterMWOmoduleData, filterPOmoduleData, separateModuleAndSourceData } from "../../../helpers/specific";


export const deleteModule = async (req, res) => {
    const { mwoUUID, poUUID, moduleUUID, preserveIntegrity = false } = req.query; // use poUUID for unlinking

    //? providing mwoUUID or poUUID is optional
    // if mwoUUID or poUUID is provided, delete the module from the linked list of the respective model
    if (poUUID && mwoUUID) return invalidResponse(res, "Both PO and MWO UUID provided. Please provide only one");
    if (!poUUID && !moduleUUID && !mwoUUID) return invalidResponse(res, "No UUID (MWO, PO or module) provided. Cannot delete module");
    // if (!poUUID && !mwoUUID) return invalidResponse(res, "Neither PO nor MWO UUID provided. At least one is required");

    // ? functionality implementation
    // 1. no params => delete all modules and unlink all modules from all PO's //! this is not implemented yet
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
        // 3.B delete the current module (upon deletion of the module, the linked modules of all PO's and MWOs will be removed as well as there is no way to get to the module from POs and MWOs once it is deleted from the module list)
        if (moduleUUID) {
            const deletedModule = await moduleModel.findByIdAndDelete(moduleUUID, { new: true });
            // unlink current module ID from all linked PO's
            await asyncForEach(deletedModule.linkedPOs, async (linkedPOid) => {
                await poModel.findByIdAndUpdate(
                    linkedPOid,
                    {
                        $pull: {
                            linkedModules: {
                                item: moduleUUID
                            }
                        }
                    }
                );
            })
            // unlink current module ID from all linked MWO's
            await asyncForEach(deletedModule.linkedMWOs, async (linkedMWOid) => {
                await mwoModel.findByIdAndUpdate(
                    linkedMWOid,
                    {
                        $pull: {
                            linkedModules: {
                                item: moduleUUID
                            }
                        }
                    }
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

};
