import { invalidResponse } from "../../helpers/reusable";
import projectModel from "../models/projectModel";

export const deleteProject = async (req, res) => {
    const { projectUUID } = req.query;
    if (!projectUUID) return invalidResponse(res);

    const deletedProject = await projectModel.findByIdAndDelete(projectUUID)
    if (!deletedProject) return invalidResponse(res, 'Project could not be deleted');

    res.status(200).json({
        success: true,
        message: `Project ${deletedProject.summary.nomenclature} deleted successfully`,
        error: null,
        data: {
            deletedProject
        }
    })

};

export const deletePart = async (req, res) => {
    const { projectUUID, partID } = req.query;
    if (!projectUUID) return invalidResponse(res, "Please provide a valid projectUUID");
    if (!partID) return invalidResponse(res, "Please provide a valid partID");

    console.log('received partID: ', partID);
    // remove part from project matching partID
    const updatedProject = await projectModel.findByIdAndUpdate(
        projectUUID,
        { $pull: { parts: { id: partID } } },
        { new: true, runValidators: true }
    )
    if (!updatedProject) return invalidResponse(res, "Part could not be deleted");
    const { parts: updatedParts } = updatedProject;

    res.status(200).json({
        message: "Part deleted successfully",
        success: true,
        error: null,
        data: {
            updatedParts
        }
    })
};

export const deleteAssembly = async (req, res) => {
    const { projectUUID, assemblyID } = req.query;
    if (!projectUUID) return invalidResponse(res, "Please provide a valid projectUUID");
    if (!assemblyID) return invalidResponse(res, "Please provide a valid assemblyID");

    const updatedProject = await projectModel.findByIdAndUpdate(
        projectUUID,
        {
            $pull: {
                assemblies: { id: assemblyID }
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
    if (!updatedProject) return invalidResponse(res, "Assembly could not be deleted");
    const { assemblies: updatedAssemblies } = updatedProject;


    res.status(200).json({
        success: true,
        message: "Assembly deleted successfully",
        error: null,
        data: {
            updatedAssemblies
        }
    })
};