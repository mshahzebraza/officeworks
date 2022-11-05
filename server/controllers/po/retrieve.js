import poModel from "../../models/poModel";
import { invalidResponse } from "../../../helpers/refactored/invalidResponse";

// retrieve single or all POs
export const retrievePOs = async (req, res) => {
    const { poUUID } = req.query;

    //? Retrieve a single PO if a UUID is provided
    if (poUUID) {
        const po = await poModel.findById(poUUID);
        if (!deletedPO) return invalidResponse(res, "Unsuccessful to retrieve PO");

        return res.status(200).json({
            success: true,
            error: null,
            message: "PO Retrieved",
            data: { po }
        });
    }

    //? Retrieve All POs
    const poList = await poModel.find({});
    if (!poList) return invalidResponse(res, "Unsuccessful to retrieve List of POs");

    res.status(200).json({
        success: true,
        error: null,
        message: "List of POs Retrieved",
        data: { poList }
    })
};
