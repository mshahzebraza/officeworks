import mwoModel from "../../models/mwoModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

// delete mwo
export const deleteMWO = async (req, res) => {
    const { mwoUUID } = req.query;
    if (!mwoUUID) return invalidResponse(res, "Please provide valid 'mwoUUID' to delete MWO");

    const deletedMWO = await mwoModel.findByIdAndDelete(mwoUUID, { new: true })
    if (!deletedMWO) return invalidResponse(res, "Unsuccessful to delete MWO");

    res.status(200).json({
        success: true,
        error: null,
        message: 'MWO deleted',
        data: { deletedMWO }
    })

};
