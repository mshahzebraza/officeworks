import moduleModel from "../../models/moduleModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

export const deleteModule = async (req, res) => {
    const { moduleUUID } = req.query; // use poUUID for unlinking
    if (!moduleUUID) return invalidResponse(res, "Please provide valid 'moduleUUID' to delete Module")

    // ? 1. Delete the module
    const deletedModule = await moduleModel.findByIdAndDelete(moduleUUID, { new: true });
    if (!deletedModule) return invalidResponse(res, "Unsuccessful to delete Module")

    // return response
    return res.status(200).json({
        success: true,
        data: { deletedModule },
        error: null,
        message: "Module deleted"
    })

};