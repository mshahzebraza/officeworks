
export { fetchModules } from './retrieve';
export { updateModule } from './update';
export { createModule } from './create';
export { deleteModule } from './delete';

{
    // ? work in process
    const updateInventory = (async (req, res) => {
        let { isIncrement } = req.query;
        const { txnList } = req.body;
        if (isIncrement === undefined) return invalidResponse(res, "isIncrement is not defined. isIncrement is required");
        if (!txnList) return invalidResponse(res, "txnList is not defined. txnList is required");

        if (isIncrement === "true") isIncrement = true;
        if (isIncrement === "false") isIncrement = false;

        console.log('isIncrement:', isIncrement);

        const updatedModules = [];
        // call the updateMany function of the moduleModule for each product in the txnList
        await asyncForEach(txnList, async (txn, index) => {
            const { product: { uuid: productUUID }, partIDs } = txn;

            //  call the updateMany function of the moduleModel for each product in the txnList
            const updatedModule = await moduleModel.findByIdAndUpdate(
                productUUID,
                {
                    // TODO: should check if the inventory is less than 0.
                    $inc: {
                        "inv.total": isIncrement ? partIDs.length : -partIDs.length, // ! WORKING !!!
                        // TODO: Next is the same logic for decrementing the inventory in deleteTransaction Apollo
                    }
                },
                { new: true }
            )
            if (!updatedModule) return invalidResponse(res, "Module for update not found in database");
            updatedModules.push(updatedModule);
        })

        if (!updatedModules) return invalidResponse(res, "Module not found in database");

        return res.status(200).json({
            success: true,
            error: null,
            message: "Module Inventory incremented",
            data: {
                updatedModules
            }
        })
    });


    // TODO: create another function: updateModuleSpecification
    // TODO: Do the following
    // 1. Create source-specific versions of all 4 functions above.
    // 2. Link 4 with po-module-api and mwo-module-api each
    // 3. The module apollo functions with link with three different api paths. (po-module-api, mwo-module-api, module-api)
    // 4. Finish copying the above functions and change them to the source-specific versions.

    const fetchPOmodules = (async (req, res) => {
        const { poUUID, mwoUUID, moduleUUID, moduleId } = req.query;
        // TODO: add the following functionality to the function
        if (poUUID && mwoUUID) return invalidResponse(res, "Cannot fetch modules for both PO and MWO");
        if ((poUUID && moduleUUID) || (poUUID && moduleUUID)) return invalidResponse(res, "Cannot fetch a single module for from a source");
        // 1. moduleUUID is provided return the module with the matching UUID only
        // 2. if poUUID is provided return the list of modules for the matching PO
        // 3. if both are provided return the module with the matching UUID for the matching PO
        // 4. if neither is provided return the list of all modules

        // Fetch all modules of the source
        if (poUUID || mwoUUID && !moduleUUID) {
            const query = poUUID ? { linkedPOs: poUUID } : { linkedMWOs: mwoUUID };
            const moduleList = await moduleModel.find(query).exec();

            return res.status(200).json({
                success: true,
                message: "Module list fetched successfully",
                error: null,
                data: {
                    moduleList,
                },
            });
        }
        // Find a single matching module (based on UUID: _id)
        else if (!poUUID && !mwoUUID && moduleUUID) {
            const module = await moduleModel.findById(moduleUUID).exec();

            return res.status(200).json({
                success: true,
                message: "Module fetched successfully",
                error: null,
                data: {
                    module,
                },
            });

        }
        // Find a single matching module (based on id)
        else if (!poUUID && !mwoUUID && moduleId) {
            const module = await moduleModel.findOne({ id: moduleId }).exec();

            if (!module) return invalidResponse(res, "Module not found");

            return res.status(200).json({
                success: true,
                message: "Module fetched successfully",
                error: null,
                data: {
                    module,
                },
            });

        }
        // Find list of all modules
        else {
            const moduleList = await moduleModel.find().exec()/* .populate("linkedMWOs linkedPOs") */

            return res.status(200).json({
                success: true,
                error: null,
                message: "List of All Modules fetched successfully",
                data: {
                    moduleList,
                },
            })
        }

    });
    const deletePOmodule = 1;
    const createPOmodule = 1;
    const updatePOmodule = 1;

    const fetchMWOmodules = (async (req, res) => {
        const { poUUID, mwoUUID, moduleUUID, moduleId } = req.query;
        // TODO: add the following functionality to the function
        if (poUUID && mwoUUID) return invalidResponse(res, "Cannot fetch modules for both PO and MWO");
        if ((poUUID && moduleUUID) || (poUUID && moduleUUID)) return invalidResponse(res, "Cannot fetch a single module for from a source");
        // 1. moduleUUID is provided return the module with the matching UUID only
        // 2. if poUUID is provided return the list of modules for the matching PO
        // 3. if both are provided return the module with the matching UUID for the matching PO
        // 4. if neither is provided return the list of all modules

        // Fetch all modules of the source
        if (poUUID || mwoUUID && !moduleUUID) {
            const query = poUUID ? { linkedPOs: poUUID } : { linkedMWOs: mwoUUID };
            const moduleList = await moduleModel.find(query).exec();

            return res.status(200).json({
                success: true,
                message: "Module list fetched successfully",
                error: null,
                data: {
                    moduleList,
                },
            });
        }
        // Find a single matching module (based on UUID: _id)
        else if (!poUUID && !mwoUUID && moduleUUID) {
            const module = await moduleModel.findById(moduleUUID).exec();

            return res.status(200).json({
                success: true,
                message: "Module fetched successfully",
                error: null,
                data: {
                    module,
                },
            });

        }
        // Find a single matching module (based on id)
        else if (!poUUID && !mwoUUID && moduleId) {
            const module = await moduleModel.findOne({ id: moduleId }).exec();

            if (!module) return invalidResponse(res, "Module not found");

            return res.status(200).json({
                success: true,
                message: "Module fetched successfully",
                error: null,
                data: {
                    module,
                },
            });

        }
        // Find list of all modules
        else {
            const moduleList = await moduleModel.find().exec()/* .populate("linkedMWOs linkedPOs") */

            return res.status(200).json({
                success: true,
                error: null,
                message: "List of All Modules fetched successfully",
                data: {
                    moduleList,
                },
            })
        }

    });
    const deleteMWOmodule = 1;
    const createMWOmodule = 1;
    const updateMWOmodule = 1;
}