import mwoModel from "../../models/mwoModel";


// delete mwo
export const deleteMWO = async (req, res) => {
    const { mwoUUID } = req.query;
    if (!mwoUUID) throw new Error('Please provide a valid mwoUUID')

    const deletedMWO = await mwoModel.findByIdAndDelete(mwoUUID, { new: true })
    if (!deletedMWO) throw new Error('Error while deleting MWO')

    res.status(200).json({
        success: true,
        error: null,
        message: 'MWO deleted successfully',
        data: { deletedMWO }
    })

};
