import { createSlice } from "@reduxjs/toolkit";
import workOrdersDb from '../../db/workOrders'

const initialState = [
  // Initial State Here
  ...workOrdersDb
];

const mwoSlice = createSlice({
  name: "mwo",
  initialState,

  reducers: {
    updateMWO(mwoState, { payload: formData }) {
      // Get the data and related mwoId
      // map the mwoList for matching mwo
      // Change the data of prev MWO
      const matchIndex = mwoState.findIndex(MWO => {
        return MWO.mwoId === formData.mwoId
      })
      mwoState[matchIndex] = formData
    },

    addMWO(mwoState, action) {
    },
    removeMWO(mwoState, action) {
    },
  },
});

export const mwoActions = mwoSlice.actions;

export default mwoSlice;
