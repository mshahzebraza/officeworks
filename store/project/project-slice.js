import { createSlice } from "@reduxjs/toolkit";
// import projectsDb from '../../db/projects'
import { deepClone, genLog } from "../../helpers/reusable";

const initialState = [
  // ...projectsDb
];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {

    // Project Part
    addProjectPart(pjState, { payload: [pjCatName, pjId, formData] }) {
      console.log('addProjectPart running...');

      const matchPj = pjState.find(pj => pj.summary.nomenclature === pjId)


      if (matchPj.parts) { // if parts array exists

        // Check for duplicates id
        const matchModuleIdx = matchPj.parts.findIndex(part =>
          part.id === formData.id
        )

        if (matchModuleIdx < 0) { // if no duplicate exists 
          matchPj.parts.push(formData)
        }

        else {
          console.log(`Module Id already exists`);
        }

      } else {
        // create a new parts array
        matchPj.parts = [
          formData
        ]
      }

    },
    updateProjectPart(pjState, { payload: [pjCatName, pjId, formData] }) {
      console.log('updateProjectPart running...');

      // Check the matching Project
      const matchPj = pjState.find(pj => pj.summary.nomenclature === pjId)

      if (matchPj.parts) { // always exist in case of update

        // Check for duplicates id
        const matchModuleIdx = matchPj.parts.findIndex(part =>
          part.id === formData.id
        )


        if (matchModuleIdx >= 0) { // if module is found 
          matchPj.parts.splice(matchModuleIdx, 1, formData)
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

      const matchPj = pjState.find(pj => pj.summary.nomenclature === pjId)

      const matchPartIdx = matchPj.parts.findIndex(part => part.id === partId)
      const matchPart = matchPj.parts[matchPartIdx];

      if (matchPartIdx >= 0) {

        const confirmText = `Delete ${matchPart.nomenclature}`
        const inputText = prompt(`Type "${confirmText}"`)
        inputText === confirmText
          && matchPj.parts.splice(matchPartIdx, 1)
          || console.log(`Deletion Failed! Confirmation Text didn't match the input`);
      }
      else {
        console.log(`Deletion failed! ${pjId} doesn't contain any part of ID: ${partId}`);
      }

    },

    // Project / ProjectSummary
    // aka updateProject
    updateProjectSummary(pjState, { payload: [summaryData] }) {

      // Type match: Find the matching nomenclature
      const matchPjIdx = pjState.findIndex(pj => pj.summary.nomenclature === summaryData.nomenclature)
      const matchPj = pjState[matchPjIdx];

      if (matchPjIdx >= 0) {
        // Nomenclature Match: override the old keys

        pjState[matchPjIdx].summary = {
          ...summaryData
          // ...matchPj,
          // summary: {
          // }
        }
      } else {
        alert(`Project Id doesn't match existing Projects`);
        // and Ask to dispatch the addPJov action with the received form Data
      }

    },
    // aka addProject
    addProjectSummary(pjState, { payload: [summaryData] }) {


      const matchPjIdx = pjState.findIndex(pj => pj.summary.nomenclature === summaryData.nomenclature)

      if (matchPjIdx === -1) {
        // Nomenclature Unique: add the project

        pjState.push({
          summary: {
            ...summaryData
          },
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



      // Check PO List for duplicates
      // const duplicateIndex = projectState.findIndex(el => el.refId === action.payload.refId)
      // Add the new PO
      // duplicateIndex < 0 ? projectState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deleteProject(pjState, { payload: pjId }) {

      // // Check the matching Project ID
      const matchPjIdx = pjState.findIndex(pj => pj.summary.nomenclature === pjId)
      const matchPj = pjState[matchPjIdx];

      if (matchPjIdx >= 0) {

        // Optional: Delete the whole category if there is the element to be deleted is the last element of the category
        // Confirmation deletion
        const confirmText = `Delete ${matchPj.summary.nomenclature}`
        const inputText = prompt(`Type "${confirmText}"`)

        inputText === confirmText
          // delete the project from the projectState slice
          && pjState.splice(matchPjIdx, 1)
          || console.log(`Deletion Failed! Confirmation Text didn't match the input`);
      }
      else {
        console.log(`Deletion failed! ${pjId} doesn't contain any part of ID`);
      }
    },

    addAssembly(pjState, { payload: [pjCatName, pjId, formData] }) { // action.payload = [formData, oldItems]

      // // Check the matching type
      const matchPjIdx = pjState.findIndex(pj => pj.summary.nomenclature === pjId)
      const matchPj = pjState[matchPjIdx];

      // Break if duplicate assembly Id is found
      const duplicateIndex = matchPj.assemblies.findIndex(assemblyItem => assemblyItem.id === formData.id)
      if (duplicateIndex !== -1) return;

      matchPj.assemblies.push(formData)

    },
    updateAssembly(pjState, { payload: [pjCatName, pjId, formData] }) { // action.payload = [formData, oldItems]

      const matchPjIdx = pjState.findIndex(pj => pj.summary.nomenclature === pjId)
      const matchPj = pjState[matchPjIdx];

      const updateAssemblyIndex = matchPj.assemblies.findIndex(assemblyItem => assemblyItem.id === formData.id)
      // Break if duplicate assembly is not found
      if (updateAssemblyIndex === -1) return;

      matchPj.assemblies.splice(updateAssemblyIndex, 1, formData)

    },
    deleteAssembly(pjState, { payload: [pjCatName, pjId, removeAssemblyId] }) { // action.payload = [formData, oldItems]

      const matchPjIdx = pjState.findIndex(pj => pj.summary.nomenclature === pjId)
      const matchPj = pjState[matchPjIdx];

      // Break if duplicate assembly is not found
      const deleteAssemblyIndex = matchPj.assemblies.findIndex(assemblyItem => assemblyItem.id === removeAssemblyId)
      if (deleteAssemblyIndex === -1) return;

      matchPj.assemblies.splice(deleteAssemblyIndex, 1)

    },

  },
});

export const projectActions = projectSlice.actions;
export default projectSlice;
