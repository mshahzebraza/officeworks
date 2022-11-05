import mwoModel from "../../models/mwoModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

// Retrieve single or all MWOs
export const retrieveMWOs = async (req, res) => {
    const { mwoUUID } = req.query;

    //? Retrieve a single MWO if a UUID is provided
    if (mwoUUID) {
        const mwo = await mwoModel.findById(mwoUUID);
        if (!mwo) invalidResponse("Unsuccessful to retrieve MWO");

        return res.status(200).json({
            success: true,
            error: null,
            message: "MWO retrieved",
            data: { mwo }
        });
    }

    //? Retrieve all MWOs
    const mwoList = await mwoModel.find({});
    if (!mwoList) return invalidResponse(res, "Unsuccessful to retrieve List of MWOs");

    return res.status(200).json({
        success: true,
        error: null,
        message: "List of POs retrieved",
        data: { mwoList }
    })

};