import { invalidResponse } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import projectModel from "../models/projectModel";


//? Creates summary and 02x assemblies of project
export const createProject = CatchAsyncErrors(async (req, res) => {
    const { projectSummary, projectAssemblies } = req.body;
    if (!projectSummary) return invalidResponse(res, "Please provide a valid projectSummary")
    if (!projectAssemblies) return invalidResponse(res, "Please provide valid projectAssemblies")

    // create method
    const createdProject = await projectModel.create({
        summary: projectSummary,
        assemblies: projectAssemblies
    })
    // if creation fails, return invalid response
    if (!createdProject) return invalidResponse(res, "Unsuccessful to create project!")

    // return success response
    res.status(200).json({
        success: true,
        message: "Project created successfully",
        error: null,
        data: {
            createdProject
        }
    })

});

export const createPart = CatchAsyncErrors(async (req, res) => {
    const { projectUUID } = req.query;
    const { partData } = req.body;
    if (!projectUUID) return invalidResponse(res, "Please provide a valid projectUUID");
    if (!partData) return invalidResponse(res, "Please provide a valid partData");

    const updatedProject = await projectModel.findByIdAndUpdate(
        projectUUID,
        { $push: { parts: partData } },
        { new: true, runValidators: true }
    )
    if (!updatedProject) return invalidResponse(res, "Part could not be created");
    const { parts } = updatedProject;
    const createdPart = parts[parts.length - 1];

    res.status(200).json({
        message: "Part created successfully",
        success: true,
        error: null,
        data: {
            createdPart
        }
    })
});

export const createAssembly = CatchAsyncErrors(async (req, res) => {
    const { projectUUID } = req.query;
    const { assemblyData } = req.body;
    if (!projectUUID) return invalidResponse(res, "Please provide a valid projectUUID");
    if (!assemblyData) return invalidResponse(res, "Please provide a valid assemblyData");

    const updatedProject = await projectModel.findByIdAndUpdate(
        projectUUID,
        { $push: { assemblies: assemblyData } },
        {
            new: true,
            runValidators: true
        }
    )
    if (!updatedProject) return invalidResponse(res, "Assembly could not be created");
    const { assemblies } = updatedProject;
    const createdAssembly = assemblies[assemblies.length - 1]

    res.status(200).json({
        success: true,
        message: "Assembly created successfully",
        error: null,
        data: {
            createdAssembly
        }
    })
});