import moduleModel from "../../models/moduleModel";
import { invalidResponse } from "../../../helpers/reusable";



const createModule = async (req, res, next) => {
    const { moduleData } = req.body;

    if (!moduleData) return invalidResponse(res, "No moduleData provided");


    // Check For & find existing linked module (by moduleId)
    const duplicateModule = await moduleModel.findOne({ id: moduleData?.id }/* , { id: 1, linkedPOs: 1, linkedMWOs: 1 } */)
    // ?  Already present in moduleList. Check if the module is linked to the current PO/MWO otherwise add it to the linkedPO/MWO
    if (!!duplicateModule) return invalidResponse(res, `Module with id "${duplicateModule.id}" already exists in the current PO/MWO`);

    // ?  Totally New Data. Add module to moduleList and link it to the current PO or MWO

    const addedModule = await moduleModel.create({
        ...moduleData
    });

    return res.status(200).json({
        success: true,
        message: `Module added!`,
        error: null,
        data: {
            createdModule: addedModule,
        }
    })



};

export default createModule;