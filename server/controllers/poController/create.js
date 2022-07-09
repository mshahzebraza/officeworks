import { deepClone } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import poModel from "../models/poModel";
import mwoModel from "../models/mwoModel";

export const createPO = CatchAsyncErrors(async (req, res) => {

    const { poData } = req.body;
    if (!poData) throw new Error('Please provide a valid poData')
    // create method
    const createdPO = await poModel.create(poData)

    res.status(200).json({
        success: true,
        message: "PO created successfully",
        data: { createdPO },
        error: null
    })
});
