import { invalidResponse } from "../../helpers/reusable";
import projectModel from "../models/projectModel";


// Project.Summary
export const fetchProjects = async (req, res) => {
    const projectList = await projectModel.find({})
    if (!projectList) return invalidResponse(res, "No project found")

    res.status(200).json({
        success: true,
        data: {
            projectList
        }
    })

};

// Project.Parts
export const fetchParts = async (req, res) => {
    const { projectUUID } = req.query;
    if (!projectUUID) return invalidResponse(res);

    const project = await projectModel.findById(projectUUID)
    if (!project) return invalidResponse(res, "Project could not be found")
    const { parts } = project;

    res.status(200).json({
        success: true,
        message: "Project Parts fetched successfully",
        error: null,
        data: {
            partList: parts
        }
    })
};


// Project.Assemblies
export const fetchAssemblies = async (req, res) => {
    const { projectUUID } = req.query;
    const { assemblies = [] } = await projectModel.findById(projectUUID)
    if (!projectUUID) return invalidResponse(res);
    if (!assemblies) return invalidResponse(res, "No assemblies found");

    res.status(200).json({
        success: true,
        message: "Project Assemblies fetched successfully",
        error: null,
        data: {
            assemblyList: assemblies
        }
    })
};
