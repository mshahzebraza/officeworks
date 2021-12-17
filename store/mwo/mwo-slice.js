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
    deleteMWO(mwoState, { payload: deleteMWOid }) {
      // Get the related mwoId
      // map the mwoList for matching mwo
      const matchIndex = mwoState.findIndex(MWO => {
        return MWO.mwoId === deleteMWOid
      })
      mwoState.splice(matchIndex, 1)
      console.log(deleteMWOid);
    },
  },
});

export const mwoActions = mwoSlice.actions;

export default mwoSlice;
