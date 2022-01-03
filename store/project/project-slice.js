import { createSlice } from "@reduxjs/toolkit";
import projectsDb from '../../db/projects'
import { deepClone, genLog } from "../../helpers/reusable";

const initialState = [
  ...projectsDb
];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {

    // Project Part
    addProjectPart(pjState, { payload: [pjCatName, pjId, formData] }) {

      // // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === pjCatName)
      const matchCat = pjState[matchCatIdx];


      const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === pjId)
      const matchPj = matchCat.projects[matchPjIdx];

      if (matchPj.parts) { // if parts array exists

        // Check for duplicates id
        const matchModuleIdx = matchPj.parts.findIndex(part =>
          part.id === formData.id
        )

        if (matchModuleIdx < 0) { // if no duplicate exists 
          pjState[matchCatIdx].projects[matchPjIdx].parts.push(formData)
        }

        else {
          console.log(`Module Id already exists`);
        }

      } else {
        // create a new parts array
        pjState[matchCatIdx].projects[matchPjIdx].parts = [
          formData
        ]


      }

    },
    updateProjectPart(pjState, { payload: [pjCatName, pjId, formData] }) {
      // formData should contain the id and type of module.
      // also the project data should be passes
      // project data should help us reach the relevant project.
      // check if the Id of the new part doesn't replace or in conflict.
      // 
      // // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === pjCatName)
      const matchCat = pjState[matchCatIdx];


      const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === pjId)
      const matchPj = matchCat.projects[matchPjIdx];

      if (matchPj.parts) { // always exist in case of update

        // Check for duplicates id
        const matchModuleIdx = matchPj.parts.findIndex(part =>
          part.id === formData.id
        )


        if (matchModuleIdx >= 0) { // if module is found 
          pjState[matchCatIdx].projects[matchPjIdx].parts.splice(matchModuleIdx, 1, formData)
        }

        else { // never happens  // unless ID itself is changed
          // pjState[matchCatIdx].projects[matchPjIdx].parts.push(formData)
        }


      } else { // never happens
        // create a new parts array
        // pjState[matchCatIdx].projects[matchPjIdx].parts = [
        //   formData
        // ]
      }

    },

    deleteProjectPart(pjState, { payload: [pjCatName, pjId, partId] }) {

      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === pjCatName)
      const matchCat = pjState[matchCatIdx];


      const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === pjId)
      const matchPj = matchCat.projects[matchPjIdx];

      const matchPartIdx = matchPj.parts.findIndex(part => part.id === partId)
      const matchPart = matchPj.parts[matchPartIdx];

      if (matchPartIdx >= 0) {

        const confirmText = `Delete ${matchPart.nomenclature}`
        const inputText = prompt(`Type "${confirmText}"`)
        inputText === confirmText
          && pjState[matchCatIdx].projects[matchPjIdx].parts.splice(matchPartIdx, 1)
          || console.log(`Deletion Failed! Confirmation Text didn't match the input`);
      }
      else {
        console.log(`Deletion failed! ${pjId} doesn't contain any part of ID: ${partId}`);
      }


    },

    // Project / ProjectSummary
    // aka updateProject
    updateProjectSummary(pjState, { payload: [summaryData] }) {

      // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === summaryData.type)
      const matchCat = pjState[matchCatIdx];

      if (matchCatIdx >= 0) {
        // Type match: Find the matching nomenclature
        const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === summaryData.nomenclature)
        const matchPj = matchCat.projects[matchPjIdx];

        if (matchPjIdx >= 0) {
          // Nomenclature Match: override the old keys

          pjState[matchCatIdx].projects[matchPjIdx] = {
            ...matchPj,
            ...summaryData
          }


        } else {
          // Nomenclature Mismatch: create a new project with the nomenclature given
          // Or just log the error 
          alert(`Project Id doesn't match existing Projects`);
          // and Ask to dispatch the addPJov action with the received form Data

        }

      } else {
        // Type Mismatch : Create a new type and add the project to the list.
        // Or just log the error
        alert(`Category doesn't match existing Categories`);
        // and Ask to dispatch the addPJov action with the received form Data (in a newly created category as well)
      }

    },
    // aka addProject
    addProjectSummary(pjState, { payload: [summaryData] }) {


      // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === summaryData.type)
      const matchCat = pjState[matchCatIdx];

      if (matchCatIdx >= 0) {
        // Type match: Find the matching nomenclature
        const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === summaryData.nomenclature)

        if (matchPjIdx === -1) {
          // Nomenclature Unique: add the project

          pjState[matchCatIdx].projects.push({
            ...summaryData,
            assemblies: [
              // these are default assemblies that every project must have
              { nomenclature: 'Main Assembly', id: '0000', parent: null },
              { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: 'Main Assembly' }
            ]
          })


        } else {
          // Nomenclature found: log the error 
          alert(`Project Id matches one of existing Projects`);
          // and Ask to dispatch the addPJov action with the received form Data

        }

      } else {
        // Type Mismatch : Create a new type and add the project to the list.
        // Or just log the error
        alert(`Category doesn't match existing Categories`);
        // and Ask to dispatch the addPJov action with the received form Data (in a newly created category as well)
      }



      // Check PO List for duplicates
      // const duplicateIndex = projectState.findIndex(el => el.refId === action.payload.refId)
      // Add the new PO
      // duplicateIndex < 0 ? projectState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deleteProject(pjState, { payload: [pjCatName, pjId] }) {
      // // Check the matching Project type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === pjCatName)
      const matchCat = pjState[matchCatIdx];

      // // Check the matching Project ID
      const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === pjId)
      const matchPj = matchCat.projects[matchPjIdx];

      if (matchPjIdx >= 0) {

        // Optional: Delete the whole category if there is the element to be deleted is the last element of the category
        // Confirmation deletion
        const confirmText = `Delete ${matchCat.name} ${matchPj.nomenclature}`
        const inputText = prompt(`Type "${confirmText}"`)

        inputText === confirmText
          // delete the project from the projectState slice
          && pjState[matchCatIdx].projects.splice(matchPjIdx, 1)
          || console.log(`Deletion Failed! Confirmation Text didn't match the input`);
      }
      else {
        console.log(`Deletion failed! ${pjId} doesn't contain any part of ID: ${partId}`);
      }
    },

    addAssembly(pjState, { payload: [pjCatName, pjId, formData] }) { // action.payload = [formData, oldItems]

      // // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === pjCatName)
      const matchCat = pjState[matchCatIdx];


      const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === pjId)
      const matchPj = matchCat.projects[matchPjIdx];

      // Break if duplicate assembly Id is found
      const duplicateIndex = matchPj.assemblies.findIndex(assemblyItem => assemblyItem.id === formData.id)
      if (duplicateIndex !== -1) return;

      pjState[matchCatIdx].projects[matchPjIdx].assemblies.push(formData)

    },
    updateAssembly(pjState, { payload: [pjCatName, pjId, formData] }) { // action.payload = [formData, oldItems]

      // // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === pjCatName)
      const matchCat = pjState[matchCatIdx];


      const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === pjId)
      const matchPj = matchCat.projects[matchPjIdx];

      const updateAssemblyIndex = matchPj.assemblies.findIndex(assemblyItem => assemblyItem.id === formData.id)
      // Break if duplicate assembly is not found
      if (updateAssemblyIndex === -1) return;

      pjState[matchCatIdx].projects[matchPjIdx].assemblies.splice(updateAssemblyIndex, 1, formData)

    },
    deleteAssembly(pjState, { payload: [pjCatName, pjId, removeAssemblyId] }) { // action.payload = [formData, oldItems]

      // // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === pjCatName)
      const matchCat = pjState[matchCatIdx];


      const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === pjId)
      const matchPj = matchCat.projects[matchPjIdx];

      // Break if duplicate assembly is not found
      const deleteAssemblyIndex = matchPj.assemblies.findIndex(assemblyItem => assemblyItem.id === removeAssemblyId)
      if (deleteAssemblyIndex === -1) return;

      pjState[matchCatIdx].projects[matchPjIdx].assemblies.splice(deleteAssemblyIndex, 1)

    },

  },
});

export const projectActions = projectSlice.actions;
export default projectSlice;
