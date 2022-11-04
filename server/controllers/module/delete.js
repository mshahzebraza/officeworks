import moduleModel from "../../models/moduleModel";
import { asyncForEach, invalidResponse } from "../../../helpers/reusable";
import { ObjectId } from "mongodb";


const deleteModule = async (req, res) => {
    const { moduleUUID } = req.query; // use poUUID for unlinking

    if (!moduleUUID) return invalidResponse(res, "No module UUID provided. Cannot delete module");


    if (moduleUUID) {
        // ? 1. Delete the module
        const deletedModule = await moduleModel.findByIdAndDelete(moduleUUID, { new: true });
        // ? 2. Unlink current module ID from all linked PO's
        await asyncForEach(deletedModule.linkedPOs, async (linkedPOid) => {
            await poModel.findByIdAndUpdate(
                linkedPOid,
                {
                    $pull: {
                        items: {
                            item: ObjectId(moduleUUID)
                        }
                    }
                }
            );
        })
        // ? 3. Unlink current module ID from all linked MWO's
        await asyncForEach(deletedModule.linkedMWOs, async (linkedMWOid) => {
            await mwoModel.findByIdAndUpdate(
                linkedMWOid,
                {
                    $pull: {
                        items: {
                            item: ObjectId(moduleUUID)
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


};

export default deleteModule;