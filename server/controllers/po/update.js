import poModel from "../../models/poModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

export const updatePO = async (req, res) => {
    const { poUUID } = req.query;
    const { poData } = req.body;
    if (!poUUID) return invalidResponse(res, "No PO UUID provided");
    if (!poData) return invalidResponse(res, "No PO data provided");

    const updatedPO = await poModel.findByIdAndUpdate(
        poUUID,
        poData,
        { new: true, runValidators: true }
    );
    if (!updatedPO) return invalidResponse(res, 'error updating PO', err);

    // return successful Response
    return res.status(200).json({
        success: true,
        message: "PO updated",
        data: { updatedPO },
        error: null
    })
};
