import { createSlice } from "@reduxjs/toolkit";
import projectsDb from '../../db/projects'
import { genLog } from "../../helpers/reusable";

const initialState = [
  ...projectsDb
];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject(projectState, action) {
      // Check PO List for duplicates
      // const duplicateIndex = projectState.findIndex(el => el.refId === action.payload.refId)
      // Add the new PO
      // duplicateIndex < 0 ? projectState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deleteProject(projectState, action) {
      // Delete the whole category if there is the element to be deleted is the last element of the category

      // Confirmation deletion

      // Find PO entry index against the input poId

      // delete the PO from the projectState slice
    },

    updateProject(projectState, { payload: [formData, oldItems] }) { // action.payload = [formData, oldItems]

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
