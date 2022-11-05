import moduleModel from "../../models/moduleModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

export const createModule = async (req, res) => {
    const { moduleData } = req.body;
    if (!moduleData) return invalidResponse(res, "Please provide valid 'moduleData' to create Module");

    // ?  Add module to moduleList and link it to the current PO or MWO
    const createdModule = await moduleModel.create(moduleData);
    if (!createdModule) return invalidResponse(res, "Unsuccessful to create Module");

    return res.status(200).json({
        success: true,
        message: `Module created`,
        error: null,
        data: { createdModule }
    })
};