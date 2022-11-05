import poModel from "../../models/poModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

export const createPO = async (req, res) => {
    const { poData } = req.body;
    if (!poData) return invalidResponse(res, "Please provide valid 'poData' to create PO");

    // create method
    const createdPO = await poModel.create(poData)
    if (!createdPO) return invalidResponse(res, "Unsuccessful to create PO");

    res.status(200).json({
        success: true,
        message: "PO created",
        data: { createdPO },
        error: null
    })
};
