import mwoModel from "../../models/mwoModel";

// Fetch all MWOs
export const fetchMWOs = async (req, res) => {

    const { mwoUUID } = req.query;

    // Fetch a single MWO if a UUID is provided
    if (mwoUUID) {
        const mwo = await mwoModel.findById(mwoUUID).exec();

        // throw error if MWO not found
        if (!mwo) throw new Error("MWO not found");


        return res.status(200).json({
            success: true,
            data: { mwo }
        });
    }

    // Fetch all MWOs
    const mwoList = await mwoModel.find({}).populate("items");
    return res.status(200).json({
        success: true,
        data: { mwoList }
    })

};