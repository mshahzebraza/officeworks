import moduleModel from "../../models/moduleModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

// ? retrieve single or all modules
export const retrieveModules = async (req, res) => {
    const { moduleUUID } = req.query;

    //? Retrieve a single matching module (based on UUID: _id)
    if (moduleUUID) {
        const module = await moduleModel.findById(moduleUUID);
        if (!module) return invalidResponse(res, "Unsuccessful to retrieve Module");

        return res.status(200).json({
            success: true,
            message: "Module retrieved",
            error: null,
            data: { module },
        });
    }
    //? Retrieve list of all modules
    else {
        const moduleList = await moduleModel.find()
        if (!moduleList) return invalidResponse(res, "Unsuccessful to retrieve List of Modules");

        return res.status(200).json({
            success: true,
            error: null,
            message: "List of Modules retrieved",
            data: { moduleList },
        })
    }

};