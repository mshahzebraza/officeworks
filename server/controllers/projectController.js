import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import projectModel from "../models/projectModel";


// Project.Summary
export const fetchProjects = CatchAsyncErrors(async (req, res) => {
  const projectList = await projectModel.find({})

  res.status(200).json({
    success: true,
    data: projectList
  })

});

export const deleteProject = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;

  const deletedProject = await projectModel.findByIdAndDelete(projectUUID)

  res.status(200).json({
    success: true,
    data: deletedProject
  })

});
// Creates summary and 02x assemblies of project
export const createProject = CatchAsyncErrors(async (req, res) => {
  const { projectData } = req.body;

  const addedProject = await projectModel.create(projectData)

  res.status(200).json({
    success: true,
    data: addedProject
  })

});
// Updates summary of project
export const updateProject = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { summaryData } = req.body;


  let project = await projectModel.findById(projectUUID);
  project.summary = { /* ...project.summary, */ ...summaryData }
  // const { summary: updatedSummary } = await project.save()
  const { summary: updatedSummary } = await project.save()

  res.status(200).json({
    success: true,
    data: updatedSummary
  })

});


// Project.Parts
export const fetchParts = CatchAsyncErrors(async (req, res) => {

  const { projectUUID } = req.query;
  // const project = await projectModel.findById(projectUUID)
  const { parts = [] } = await projectModel.findById(projectUUID)
  res.status(200).json({
    success: true,
    data: parts
  })
});

export const deletePart = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { partID } = req.body;


  const project = await projectModel.findById(projectUUID)
  const { parts } = project;
  const targetIndex = parts && parts.findIndex(part => part.id === partID)
  const [target] = parts.splice(targetIndex, 1);
  await project.save();

  res.status(200).json({
    success: true,
    data: target
  })
});

export const createPart = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { partData } = req.body;

  const project = await projectModel.findById(projectUUID)
  const { parts = [] } = project;
  const newPartIndex = parts.push(partData);
  const { parts: { [newPartIndex - 1]: addedPart } } = await project.save();
  await project.save();

  res.status(200).json({
    success: true,
    data: addedPart
  })
});

export const updatePart = CatchAsyncErrors(async (req, res) => {
  const { projectUUID, partID } = req.query;
  const { partData } = req.body;


  const project = await projectModel.findById(projectUUID)
  const { parts = [] } = project;
  const targetIndex = parts.findIndex(part => part.id === partID);
  parts.splice(targetIndex, 1, partData)
  const { parts: { [targetIndex]: updatedTarget } } = await project.save()

  res.status(200).json({
    success: true,
    data: updatedTarget
  })
});


// Project.Assemblies
export const fetchAssemblies = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const project = await projectModel.findById(projectUUID)
  const { assemblies = [] } = project;

  res.status(200).json({
    success: true,
    data: assemblies
  })
});

export const deleteAssembly = CatchAsyncErrors(async (req, res) => {
  const { projectUUID, assemblyID } = req.query;
  const project = await projectModel.findById(projectUUID)
  const { assemblies = [] } = project;
  const targetIndex = assemblies.findIndex(assembly => assembly.id === assemblyID);
  const [target] = assemblies.splice(targetIndex, 1)
  await project.save()

  res.status(200).json({
    success: true,
    data: target
  })
});

export const createAssembly = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { assemblyData } = req.body;
  const project = await projectModel.findById(projectUUID)
  const { assemblies = [] } = project;
  const newAssemblyIndex = assemblies.push(assemblyData)
  const { assemblies: { [newAssemblyIndex - 1]: addedAssembly } } = await project.save()

  res.status(200).json({
    success: true,
    data: addedAssembly
  })
});

export const updateAssembly = CatchAsyncErrors(async (req, res) => {
  const { projectUUID, assemblyID } = req.query;
  const { assemblyData } = req.body;
  const project = await projectModel.findById(projectUUID)
  const { assemblies = [] } = project;

  const targetIndex = assemblies.findIndex(assembly => assembly.id === assemblyID);
  assemblies.splice(targetIndex, 1, assemblyData)
  const { assemblies: { [targetIndex]: updatedAssembly } } = await project.save()
  console.log("updatedAssembly", updatedAssembly);

  res.status(200).json({
    success: true,
    data: updatedAssembly
  })
});

