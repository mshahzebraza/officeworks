import poModel from "../../models/poModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

export const deletePO = async (req, res) => {
    const { poUUID } = req.query;
    if (!poUUID) return invalidResponse(res, "Please provide valid 'poUUID' to delete PO");

    // ?? delete/unlink all linked items from the deleted PO
    const deletedPO = await poModel.findByIdAndDelete(poUUID, { new: true });
    if (!deletedPO) return invalidResponse(res, "Unsuccessful to delete PO");

    // return success message
    res.status(200).json({
        success: true,
        message: "PO deleted",
        data: { deletedPO },
        error: null
    })

};
