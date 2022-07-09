import { deepClone } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";
import mwoModel from "../models/mwoModel";

export const fetchPOs = CatchAsyncErrors(async (req, res) => {

    const { poUUID } = req.query;
    // Fetch a single PO if a UUID is provided
    if (poUUID) {
        const po = await poModel.findById(poUUID).exec();
        if (!po) throw new Error("PO not found");

        return res.status(200).json({
            success: true,
            error: null,
            message: "PO fetched successfully",
            data: { po }
        });
    }


    // Fetch All POs
    const poList = await poModel.find({}).populate("linkedModules");
    res.status(200).json({
        success: true,
        error: null,
        message: "List of All POs fetched successfully",
        data: { poList }
    })

});
