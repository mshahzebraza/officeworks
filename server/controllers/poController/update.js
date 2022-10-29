import poModel from "../../models/poModel";

export const updatePO = async (req, res) => {

    const { poUUID } = req.query;
    const { poData } = req.body;

    if (!poUUID) throw new Error("No PO UUID provided");
    if (!poData) throw new Error("No PO data provided");

    const updatedPO = await poModel.findByIdAndUpdate(
        poUUID,
        poData,
        { new: true, runValidators: true }
    ).exec()/* .clone() */;
    if (!updatedPO) throw new Error('error updating PO', err);


    // return successful Response
    return res.status(200).json({
        success: true,
        message: "PO updated successfully",
        data: { updatedPO },
        error: null
    })
};
