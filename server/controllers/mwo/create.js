import mwoModel from "../../models/mwoModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

// create a mwo
export const createMWO = async (req, res) => {
    const { mwoData } = req.body
    if (!mwoData) return invalidResponse(res, "Please provide valid 'mwoData' to create MWO");

    const createdMWO = await mwoModel.create(mwoData)
    if (!createdMWO) return invalidResponse(res, "Unsuccessful to create MWO");

    res.status(200).json({
        success: true,
        error: null,
        message: 'MWO created',
        data: { createdMWO }
    })

};
