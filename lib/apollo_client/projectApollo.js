import { makeVar } from "@apollo/client";
import { httpParams, request } from "../../helpers/reusable";

const projectApollo = makeVar({
     fetched: false,
     list: [],
})

// Target: Project
export const deleteProjHandler = async (projectNomenclature) => { // received project nomenclature

     const projectState = projectApollo()
     const projectList = [...projectState.list]

     // Find the matching Project ID
     const targetIndex = projectList.findIndex(pj => pj?.summary?.nomenclature === projectNomenclature)
     const targetExists = targetIndex >= 0;

     if (!targetExists) throw new Error("Project not found.")

     const targetUUID = projectList[targetIndex]._id;
     // Delete the Project Data
     // 1. Database Delete
     const { success, data: { deletedProject }, error, message } = await request(
          {
               url: process.env.API.PROJECT,
               method: 'DELETE',
               params: {
                    projectUUID: targetUUID
               }
          }
     )
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local State Delete
     projectList.splice(targetIndex, 1)

     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })
}
// Target: Project.summary
export const updateProjectSummaryHandler = async (projectSummary) => {

     const projectState = projectApollo()
     const projectList = [...projectState.list]

     const targetIndex = projectList.findIndex(project => project.summary.nomenclature === projectSummary.nomenclature)
     const targetExists = targetIndex >= 0;
     if (!targetExists) {
          console.error(`Error: No Target found`);
          throw new Error("No Target found to update")
     }

     const targetUUID = projectList[targetIndex]?._id;
     // Update the summary data
     // 1. Database update
     const { success, message, error, data: { updatedProject } } = await request(
          {
               url: process.env.API.PROJECT,
               method: "PATCH",
               body: {
                    projectSummary
               },
               params: {
                    projectUUID: targetUUID
               }
          }
     )
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local state update
     projectList[targetIndex].summary = updatedProject.summary

     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })
}
export const addProjectSummaryHandler = async (projectSummary) => {
     const projectState = projectApollo();
     const projectStateList = [...projectState.list];

     const targetExists = projectStateList.some(pj => pj.summary.nomenclature === projectSummary.nomenclature)

     if (targetExists) throw new Error(`Project with nomenclature ${projectSummary.nomenclature} already exists`);

     // Default Assemblies for new Projects
     const defaultAssemblies = [
          { nomenclature: 'Main Assembly', id: '0000', parent: null },
          { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' }
     ]
     // Create the Project Data
     // 1. Database Create
     const { success, message, error, data: { createdProject } } = await request(
          {
               url: process.env.API.PROJECT,
               method: 'POST',
               body: {
                    projectSummary,
                    projectAssemblies: defaultAssemblies
               }
          }
     )
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message);

     // 2. Local state Create
     projectStateList.push(createdProject)

     projectApollo({
          fetched: projectState.fetched,
          list: projectStateList
     })
}

// Target: Project.parts[x]
export const deleteProjModHandler = async ([pjCatName, pjId, partId]) => {
     const projectState = projectApollo()
     const projectList = [...projectState.list]

     const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
     const targetParentUUID = targetParent?._id;

     const targetIndex = targetParent?.parts?.findIndex(part => part.id === partId)
     const targetExists = targetIndex >= 0;
     if (!targetExists) throw new Error("Error: Part not found.")

     const targetID = targetParent.parts[targetIndex].id;

     // Delete the Project Part
     // 1. Database Delete
     const { success, data: { updatedParts }, error, message } = await request({
          url: process.env.API.PROJECT_PART,
          method: 'DELETE',
          params: {
               projectUUID: targetParentUUID,
               partID: targetID
          }
     })
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local State Delete
     targetParent.parts = updatedParts

     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })
}
export const addProjModHandler = async ([pjCatName, pjId, formData]) => {
     const projectState = projectApollo()
     const projectList = [...projectState.list]

     const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
     const targetParentUUID = targetParent?._id;

     // Check for duplicates id
     const targetIndex = targetParent?.parts?.findIndex(part => part.id === formData.id)
     const isUnique = targetIndex === -1;
     if (!isUnique) throw new Error("Error: Part ID already exists.")

     // Create the Project Part in existing Parts Set
     // 1. Database Create
     const { success, data: { createdPart }, error, message } = await request({
          url: process.env.API.PROJECT_PART,
          method: 'POST',
          params: {
               projectUUID: targetParentUUID,
          },
          body: {
               partData: formData
          }
     })
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local state Create
     // ? check if parts array exist AND its length is greater than 0
     targetParent.parts?.length
          ? targetParent.parts.push(createdPart) // if parts array exists
          : targetParent.parts = [createdPart] // if parts array does not exist


     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })
}

export const updateProjModHandler = async ([pjCatName, pjId, formData]) => {
     const projectState = projectApollo()
     const projectList = [...projectState.list]

     // Check Matching Project
     const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
     const targetParentUUID = targetParent?._id;

     // Get Matching Part Index
     const targetIndex = targetParent?.parts?.findIndex(part => part.id === formData.id)
     const targetExists = targetIndex >= 0;
     if (!targetExists) throw new Error("Error: Part not found.")

     const targetID = targetParent.parts[targetIndex].id;
     // Update the Part Data
     // 1. Database Update
     const { success, data: { updatedParts }, error, message } = await request({
          url: process.env.API.PROJECT_PART,
          method: 'PATCH',
          params: {
               projectUUID: targetParentUUID,
               partID: targetID
          },
          body: {
               partData: formData
          }
     })
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local state Update
     targetParent.parts = updatedParts

     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })

}

// Target: Project.assemblies[x]
export const deleteProjAssyHandler = async ([pjCatName, pjId, removeAssemblyId]) => { // action.payload = [formData, =>ldItems]
     const projectState = projectApollo()
     const projectList = [...projectState.list]
     const targetParent = projectList.find(pj => pj.summary.nomenclature === pjId)
     const targetParentUUID = targetParent?._id;

     // Break if duplicate assembly is not found
     const targetIndex = targetParent?.assemblies?.findIndex(assembly => assembly.id === removeAssemblyId)
     const targetExists = targetIndex !== -1;

     if (!targetExists) throw new Error("Error: Assembly not found.")

     const targetID = targetParent?.assemblies[targetIndex].id;
     // Delete the Project Part
     // 1. Database Delete
     const { success, data: { updatedAssemblies }, error, message } = await request({
          url: process.env.API.PROJECT_ASSY,
          method: 'DELETE',
          params: {
               projectUUID: targetParentUUID,
               assemblyID: targetID
          }
     })
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local State Delete
     targetParent.assemblies = updatedAssemblies

     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })
}
export const addProjAssyHandler = async ([pjCatName, pjId, formData]) => { // action.payload = [formData, =>ldItems]
     const projectState = projectApollo()
     const projectList = [...projectState.list]

     // Check the matching type
     const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
     const targetParentUUID = targetParent?._id;

     // Break if duplicate assembly Id is found
     const targetIndex = targetParent?.assemblies?.findIndex(assemblyItem => assemblyItem.id === formData.id)
     const isUnique = targetIndex === -1;

     if (!isUnique) throw new Error("Error: Assembly ID already exists.")

     // Create a project assembly in the existing assemblies set
     // 1. Database Create
     const { success, data: { createdAssembly }, error, message } = await request({
          url: process.env.API.PROJECT_ASSY,
          method: 'POST',
          params: {
               projectUUID: targetParentUUID,
          },
          body: {
               assemblyData: formData
          }
     })
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local state Create
     targetParent.assemblies?.length
          ? targetParent.assemblies.push(createdAssembly) // if assemblies array exists
          : targetParent.assemblies = [createdAssembly] // if assemblies array does not exist


     // Update the Local State
     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })
}
export const updateProjAssyHandler = async ([pjCatName, pjId, formData]) => { // action.payload = [formData, =>ldItems]
     const projectState = projectApollo()
     const projectList = [...projectState.list]

     const targetParent = projectList.find(project => project.summary.nomenclature === pjId)
     const targetParentUUID = targetParent?._id;

     const targetIndex = targetParent?.assemblies?.findIndex(assembly => assembly.id === formData.id)
     const targetExists = targetIndex !== -1;

     // Break if duplicate assembly is not found
     if (!targetExists) throw new Error("Error: Assembly not found.")

     const targetID = targetParent.assemblies[targetIndex].id;

     // Update the Project Part
     // 1. Database Update
     const { success, data: { updatedAssemblies }, error, message } = await request({
          url: process.env.API.PROJECT_ASSY,
          method: 'PATCH',
          params: {
               projectUUID: targetParentUUID,
               assemblyID: targetID
          },
          body: {
               assemblyData: formData
          }
     })
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message)

     // 2. Local state Update
     targetParent.assemblies = updatedAssemblies

     // Update the Local State
     projectApollo({
          fetched: projectState.fetched,
          list: projectList,
     })
}


export default projectApollo;