import moduleModel from "../../models/moduleModel";
import { invalidResponse } from "../../../helpers/reusable";

export const updateModule = async (req, res) => {
    const { moduleUUID } = req.query; //poUUID is not needed (un/linking is not required as neither the moduleId is changed nor is module deleted)
    const { moduleData } = req.body;
    if (!moduleUUID) invalidResponse(res, "Please provide valid 'moduleUUID' to delete Module")
    if (!moduleData) invalidResponse(res, "Please provide valid 'moduleData' to delete Module")

    // Update the module - doesn't matter if the source (PO or MWO) is defined or not
    const updatedModule = await moduleModel.findByIdAndUpdate(
        moduleUUID,
        moduleData,
        { new: true }
    );
    if (!updateModule) return invalidResponse(res, "Unsuccessful to update Module");

    // return response
    return res.status(200).json({
        success: true,
        error: null,
        message: "Module updated",
        data: { updatedModule }
    })
};