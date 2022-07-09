import { invalidResponse } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import projectModel from "../models/projectModel";


//? Updates summary of project
export const updateProject = CatchAsyncErrors(async (req, res) => {
    const { projectUUID } = req.query;
    const { projectSummary } = req.body;
    if (!projectSummary) return invalidResponse(res, "Please provide a valid projectSummary")
    if (!projectUUID) return invalidResponse(res, "Please provide a valid projectUUID")


    const updatedProject = await projectModel.findByIdAndUpdate(
        projectUUID,
        { $set: { summary: projectSummary } },
        { new: true }
    )
    // if update fails, return invalid response
    if (!updatedProject) return invalidResponse(res, "Project Data could not be updated!")

    // return success response
    res.status(200).json({
        message: "Project Summary Updated successfully!",
        error: null,
        success: true,
        data: {
            updatedProject
        }
    })

});

export const updatePart = CatchAsyncErrors(async (req, res) => {
    const { projectUUID, partID } = req.query;
    const { partData } = req.body;
    if (!projectUUID) return invalidResponse(res, "Please provide a valid projectUUID");
    if (!partID) return invalidResponse(res, "Please provide a valid partID");

    const updatedProject = await projectModel.findByIdAndUpdate(
        projectUUID,
        { $set: { "parts.$[matchPart]": partData } },
        {
            arrayFilters: [
                { "matchPart.id": partID }
            ],
            new: true,
            runValidators: true
        }
    )
    if (!updatedProject) return invalidResponse(res, "Part could not be updated");
    const { parts: updatedParts } = updatedProject;

    res.status(200).json({
        success: true,
        message: "Part updated successfully",
        error: null,
        data: {
            updatedParts
        }
    })
});

export const updateAssembly = CatchAsyncErrors(async (req, res) => {
    const { projectUUID, assemblyID } = req.query;
    const { assemblyData } = req.body;
    if (!projectUUID) return invalidResponse(res, "Please provide a valid projectUUID");
    if (!assemblyID) return invalidResponse(res, "Please provide a valid assemblyID");

    const updatedProject = await projectModel.findByIdAndUpdate(
        projectUUID,
        {
            $set: {
                "assemblies.$[assembly]": assemblyData
            }
        },
        {
            arrayFilters: [{ "assembly.id": assemblyID }],
            new: true,
            runValidators: true
        }
    )
    if (!updatedProject) return invalidResponse(res, "Assembly could not be updated");
    const { assemblies: updatedAssemblies } = updatedProject;

    res.status(200).json({
        success: true,
        message: "Assembly updated successfully",
        error: null,
        data: {
            updatedAssemblies
        }
    })
});

