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
    updateProjectOV(pjState, { payload: [ovData] }) {

      // Check the matching type
      const matchCatIdx = pjState.findIndex(pjCat => pjCat.name === ovData.type)
      const matchCat = pjState[matchCatIdx];

      if (matchCatIdx >= 0) {
        // Type match: Find the matching nomenclature
        const matchPjIdx = matchCat.projects.findIndex(pj => pj.nomenclature === ovData.nomenclature)
        const matchPj = matchCat.projects[matchPjIdx];

        if (matchPjIdx >= 0) {
          // Nomenclature Match: override the old keys

          pjState[matchCatIdx].projects[matchPjIdx] = {
            ...matchPj,
            ...ovData
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

    addProject(pjState, action) {
      // Check PO List for duplicates
      // const duplicateIndex = projectState.findIndex(el => el.refId === action.payload.refId)
      // Add the new PO
      // duplicateIndex < 0 ? projectState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deleteProject(pjState, action) {
      // Delete the whole category if there is the element to be deleted is the last element of the category

      // Confirmation deletion

      // Find PO entry index against the input poId

      // delete the PO from the projectState slice
    },

    updateProject(pjState, { payload: [formData, oldItems] }) { // action.payload = [formData, oldItems]

      // Find PO entry index against the input poId

      // Compare the prev and new
      // projectState[poUpdateIndex] v/s formData

      // delete the PO from the projectState slice
      // Update PO
      // Append old PO items
      // Generate log

    },

  },
});

export const projectActions = projectSlice.actions;
export default projectSlice;
