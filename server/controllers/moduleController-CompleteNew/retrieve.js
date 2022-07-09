import CatchAsyncErrors from "../../middlewares/CatchAsyncErrors";
import poModel from "../../models/poModel";
import mwoModel from "../../models/mwoModel";
import moduleModel from "../../models/moduleModel";
import { asyncForEach, invalidResponse } from "../../../helpers/reusable";
import { filterMWOmoduleData, filterPOmoduleData, separateModuleAndSourceData } from "../../../helpers/specific";
import _, { isNumber } from "lodash";
import errorCatch from "../../middlewares/errorCatch";
import { Route } from "react-router-dom";
import { Suspense } from "react";

// ? = fetchModules (fetchModules should return the list of all modules regardless of the linked PO)
const fetchModules = async (req, res) => {
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

};

export default fetchModules;