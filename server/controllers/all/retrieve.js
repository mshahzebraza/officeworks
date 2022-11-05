import moduleModel from "../../models/moduleModel";
import poModel from "../../models/poModel";
import mwoModel from "../../models/mwoModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

// ? retrieve all complete data
export const retrieveApp = async (req, res) => {

    const moduleList = await moduleModel.find()
    if (!moduleList) return invalidResponse(res, "Unsuccessful to retrieve List of Modules");
    const poList = await poModel.find()
    if (!moduleList) return invalidResponse(res, "Unsuccessful to retrieve List of POs");
    const mwoList = await mwoModel.find()
    if (!moduleList) return invalidResponse(res, "Unsuccessful to retrieve List of MWOs");

    return res.status(200).json({
        success: true,
        error: null,
        message: "List of Modules retrieved",
        data: { moduleList, poList, mwoList },
    })

};