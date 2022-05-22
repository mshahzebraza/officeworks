import { invalidResponse } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import projectModel from "../models/projectModel";


// Project.Summary
export const fetchProjects = CatchAsyncErrors(async (req, res) => {
     const projectList = await projectModel.find({})
     if (!projectList) return invalidResponse(res, "No project found")

     res.status(200).json({
          success: true,
          data: {
               projectList
          }
     })

});

export const deleteProject = CatchAsyncErrors(async (req, res) => {
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

});

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


// Project.Parts
export const fetchParts = CatchAsyncErrors(async (req, res) => {
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
});

export const deletePart = CatchAsyncErrors(async (req, res) => {
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


// Project.Assemblies
export const fetchAssemblies = CatchAsyncErrors(async (req, res) => {
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
});

export const deleteAssembly = CatchAsyncErrors(async (req, res) => {
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

