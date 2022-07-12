import mwoModel from "../../models/mwoModel";

// create a mwo
export const createMWO = async (req, res) => {
    const { mwoData } = req.body
    if (!mwoData) throw new Error('Please provide valid data to create MWO.')

    const createdMWO = await mwoModel.create(mwoData)
    if (!createdMWO) throw new Error('Unsuccessful to create MWO')

    res.status(200).json({
        success: true,
        error: null,
        message: 'MWO created successfully',
        data: { createdMWO }
    })

};
