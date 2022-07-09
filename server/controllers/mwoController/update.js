import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import mwoModel from "../models/mwoModel";

// update a mwo
export const updateMWO = CatchAsyncErrors(async (req, res) => {
    const { mwoUUID } = req.query;
    const { mwoData } = req.body
    if (!mwoUUID) throw new Error('mwoUUID is required to update MWO')
    if (!mwoData) throw new Error('mwoData is required to update MWO')

    let updatedMWO = await mwoModel.findByIdAndUpdate(
        mwoUUID,
        { $set: mwoData }, // 'mwoData' alone can also be used
        { new: true }
    )
    if (!updatedMWO) throw new Error('Unsuccessful to update MWO')
    res.status(200).json({
        success: true,
        error: null,
        message: 'MWO updated successfully',
        data: { updatedMWO }
    })

});
