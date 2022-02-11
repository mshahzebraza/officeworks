import { makeVar } from "@apollo/client";
import { httpParams } from "../../helpers/reusable";
const projectApollo = makeVar([
  // Data is initialized on App Load
])


// Target: Project
export const deleteProjHandler = async (projectNomenclature) => { // received project nomenclature

  let projectList = [...projectApollo()]

  // Find the matching Project ID
  const targetIndex = projectList.findIndex(pj => pj?.summary?.nomenclature === projectNomenclature)
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    const targetUUID = projectList[targetIndex]._id;
    // Delete the Project Data
    // 1. Database Delete
    await httpParams('http://localhost:3000/api/project', 'DELETE', { projectUUID: targetUUID })

    // 2. Local State Delete
    projectList.splice(targetIndex, 1)

  } else {
    console.log(`No Target found`);
  }

  projectApollo(projectList)
}
// Target: Project.summary
export const updateProjectSummaryHandler = async (summaryData) => {

  let projectList = [...projectApollo()]

  const targetIndex = projectList.findIndex(project => project.summary.nomenclature === summaryData.nomenclature)
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    const targetUUID = projectList[targetIndex]?._id;
    // Update the summary data
    // 1. Database update
    const res = await httpParams(
      'http://localhost:3000/api/project',
      "PATCH",
      {
        projectUUID: targetUUID,
        summaryData
      }
    )
    const { data: updatedSummary } = await res.json();

    // 2. Local state update
    projectList[targetIndex].summary = updatedSummary

  } else {
    console.log(`No Target found`);
  }

  projectApollo(projectList)
}
export const addProjectSummaryHandler = async (summaryData) => {
  let projectList = [...projectApollo()]

  const targetIndex = projectList.findIndex(pj => pj.summary.nomenclature === summaryData.nomenclature)
  const isUnique = targetIndex === -1;

  if (isUnique) {
    // Default Assemblies for new Projects
    const defaultAssemblies = [
      { nomenclature: 'Main Assembly', id: '0000', parent: null },
      { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' }
    ]
    // Create the Project Data
    // 1. Database Create
    const res = await httpParams(
      'http://localhost:3000/api/project',
      "POST",
      {
        projectData: {
          summary: summaryData,
          assemblies: defaultAssemblies
        }
      }
    )
    const { data: newProject } = await res.json();

    // 2. Local state Create
    projectList.push(newProject)

  } else { console.log(`Project Id matches one of existing Projects`) }

  projectApollo(projectList)
}

// Target: Project.parts[x]
export const deleteProjModHandler = async ([pjCatName, pjId, partId]) => {
  let projectList = [...projectApollo()]

  const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
  const targetParentUUID = targetParent?._id;

  const targetIndex = targetParent?.parts?.findIndex(part => part.id === partId)
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    const targetID = targetParent.parts[targetIndex].id;
    // Delete the Project Part
    // 1. Database Delete
    const res = await httpParams(
      'http://localhost:3000/api/project-part',
      "DELETE",
      {
        projectUUID: targetParentUUID,
        partID: targetID
      }

    )
    // 2. Local State Delete
    targetParent.parts.splice(targetIndex, 1)

  } else {
    console.log(`No Target found`);
  }
  projectApollo(projectList)
}
export const updateProjModHandler = async ([pjCatName, pjId, formData]) => {
  let projectList = [...projectApollo()]

  // Check Matching Project
  const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
  const targetParentUUID = targetParent?._id;

  // Get Matching Part Index
  const targetIndex = targetParent?.parts?.findIndex(part => part.id === formData.id)
  const targetExists = targetIndex >= 0;

  if (targetExists) { // if module is found 
    const targetID = targetParent.parts[targetIndex].id;
    // Update the Part Data
    // 1. Database Update
    const res = await httpParams(
      'http://localhost:3000/api/project-part',
      "PATCH",
      {
        projectUUID: targetParentUUID,
        partID: targetID,
        partData: formData
      }
    )
    const { data: updatedPart } = await res.json();

    // 2. Local state Update
    targetParent.parts[targetIndex] = updatedPart

  } else {
    console.log(`No Target found`);
  }
  projectApollo(projectList)

}
export const addProjModHandler = async ([pjCatName, pjId, formData]) => {
  let projectList = [...projectApollo()]

  const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
  const targetParentUUID = targetParent?._id;

  // Check for duplicates id
  const targetIndex = targetParent?.parts?.findIndex(part => part.id === formData.id)
  const isUnique = targetIndex === -1;

  if (isUnique) {
    // Create the Project Part in existing Parts Set
    // 1. Database Create
    const res = await httpParams(
      'http://localhost:3000/api/project-part',
      "POST",
      {
        projectUUID: targetParentUUID,
        partData: formData
      }
    )
    const { data: newPart } = await res.json();

    // 2. Local state Create
    targetParent.parts
      ? targetParent.parts.push(newPart) // if parts array exists
      : targetParent.parts = [newPart] // if parts array does not exist

  } else {
    console.log(`Duplicate Part Id`);
  }

  projectApollo(projectList)
}

// Target: Project.assemblies[x]
export const deleteProjAssyHandler = async ([pjCatName, pjId, removeAssemblyId]) => { // action.payload = [formData, =>ldItems]
  let projectList = [...projectApollo()]
  const targetParent = projectList.find(pj => pj.summary.nomenclature === pjId)
  const targetParentUUID = targetParent?._id;

  // Break if duplicate assembly is not found
  const targetIndex = targetParent?.assemblies?.findIndex(assembly => assembly.id === removeAssemblyId)
  const targetExists = targetIndex !== -1;

  if (targetExists) {
    const targetID = targetParent?.assemblies[targetIndex].id;
    // Delete the Project Part
    // 1. Database Delete
    const res = await httpParams(
      'http://localhost:3000/api/project-assembly',
      "DELETE",
      {
        projectUUID: targetParentUUID,
        assemblyID: targetID
      }
    )
    // 2. Local State Delete
    targetParent.assemblies.splice(targetIndex, 1)

  } else {
    console.log('Assembly Id not found');
  }
  projectApollo(projectList)
}
export const addProjAssyHandler = async ([pjCatName, pjId, formData]) => { // action.payload = [formData, =>ldItems]
  let projectList = [...projectApollo()]

  // Check the matching type
  const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
  const targetParentUUID = targetParent?._id;

  // Break if duplicate assembly Id is found
  const targetIndex = targetParent?.assemblies?.findIndex(assemblyItem => assemblyItem.id === formData.id)
  const isUnique = targetIndex === -1;

  if (isUnique) {
    // Create a project assembly in the existing assemblies set
    // 1. Database Create
    const res = await httpParams(
      'http://localhost:3000/api/project-assembly',
      "POST",
      {
        assemblyData: formData,
        projectUUID: targetParentUUID
      }
    )
    const { data: newAssembly } = await res.json();
    // 2. Local state Create
    targetParent.assemblies.push(newAssembly)
  } else {
    console.log('Assembly Id not unique');
  }
  // Update the Local State
  projectApollo(projectList)
}
export const updateProjAssyHandler = async ([pjCatName, pjId, formData]) => { // action.payload = [formData, =>ldItems]
  let projectList = [...projectApollo()]

  const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
  const targetParentUUID = targetParent?._id;

  const targetIndex = targetParent?.assemblies?.findIndex(assembly => assembly.id === formData.id)
  const targetExists = targetIndex !== -1;
  // Break if duplicate assembly is not found
  if (targetExists) {
    const targetID = targetParent.assemblies[targetIndex].id;

    // Update the Project Part
    // 1. Database Update
    const res = await httpParams(
      'http://localhost:3000/api/project-assembly',
      "PATCH",
      {
        projectUUID: targetParentUUID,
        assemblyID: targetID,
        assemblyData: formData
      }
    )
    const { data: updatedAssembly } = await res.json();
    // 2. Local state Update
    targetParent.assemblies.splice(targetIndex, 1, updatedAssembly)
  } else {
    console.log('Assembly Id not found');
  }
  // Update the Local State
  projectApollo(projectList)
}


export default projectApollo;