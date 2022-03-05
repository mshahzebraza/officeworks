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

  const { summary: updatedSummary } = await projectModel.findByIdAndUpdate(
    projectUUID,
    { $set: { summary: summaryData } },
    { new: true }
  )


  res.status(200).json({
    success: true,
    data: updatedSummary
  })

});


// Project.Parts
export const fetchParts = CatchAsyncErrors(async (req, res) => {

  const { projectUUID } = req.query;

  const { parts = [] } = await projectModel.findById(projectUUID)

  res.status(200).json({
    success: true,
    data: parts
  })
});

export const deletePart = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { partID } = req.body;

  await projectModel.findByIdAndUpdate(
    projectUUID,
    { $pull: { parts: { _id: partID } } },
    { new: true, runValidators: true }
  )

  res.status(200).json({
    success: true,
    data: 'Part deleted'
  })
});

export const createPart = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { partData } = req.body;

  const { parts = [] } = await projectModel.findByIdAndUpdate(
    projectUUID,
    { $push: { parts: partData } },
    { new: true, runValidators: true }
  )

  const addedPart = parts[parts.length - 1];

  res.status(200).json({
    success: true,
    data: addedPart
  })
});

export const updatePart = CatchAsyncErrors(async (req, res) => {
  const { projectUUID, partID } = req.query;
  const { partData } = req.body;

  const { parts = [] } = await projectModel.findByIdAndUpdate(
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

  const updatedTarget = parts.find(part => part.id === partID);

  res.status(200).json({
    success: true,
    data: updatedTarget
  })
});


// Project.Assemblies
export const fetchAssemblies = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { assemblies = [] } = await projectModel.findById(projectUUID)

  res.status(200).json({
    success: true,
    data: assemblies
  })
});

export const deleteAssembly = CatchAsyncErrors(async (req, res) => {
  const { projectUUID, assemblyID } = req.query;

  const data = await projectModel.findByIdAndUpdate(
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

  res.status(200).json({
    success: true,
    data: 'deletion successful'
  })
});

export const createAssembly = CatchAsyncErrors(async (req, res) => {
  const { projectUUID } = req.query;
  const { assemblyData } = req.body;

  const { assemblies = [] } = await projectModel.findByIdAndUpdate(
    projectUUID,
    { $push: { assemblies: assemblyData } },
    {
      arrayFilters: [{ "assembly.id": assemblyID }],
      new: true,
      runValidators: true
    }
  )
  const addedAssembly = assemblies[assemblies.length - 1]

  res.status(200).json({
    success: true,
    data: addedAssembly
  })
});

export const updateAssembly = CatchAsyncErrors(async (req, res) => {
  const { projectUUID, assemblyID } = req.query;
  const { assemblyData } = req.body;

  const { assemblies = [] } = await projectModel.findByIdAndUpdate(
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
  const updatedAssembly = assemblies.find(assembly => assembly.id === assemblyID);

  res.status(200).json({
    success: true,
    data: updatedAssembly
  })
});

