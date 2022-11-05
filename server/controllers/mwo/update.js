import mwoModel from "../../models/mwoModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

// update a mwo
export const updateMWO = async (req, res) => {
    const { mwoUUID } = req.query;
    const { mwoData } = req.body
    if (!mwoUUID) return invalidResponse(res, "Please provide valid 'mwoUUID' to update MWO");
    if (!mwoData) return invalidResponse(res, "Please provide valid 'mwoData' to update MWO");

    let updatedMWO = await mwoModel.findByIdAndUpdate(
        mwoUUID,
        { $set: mwoData }, // 'mwoData' alone can also be used
        { new: true }
    )
    if (!updatedMWO) return invalidResponse(res, "Unsuccessful to update MWO");

    res.status(200).json({
        success: true,
        error: null,
        message: 'MWO updated',
        data: { updatedMWO }
    })

};
