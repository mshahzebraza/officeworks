// !NOTE: Create a Snippet of the following Code

import poSlice from "./po/po-slice";
import mwoSlice from "./mwo/mwo-slice";
import projectSlice from "./project/project-slice";

import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./transaction/transaction-slice";

export const store = configureStore({
  reducer: {
    poList: poSlice.reducer,
    mwoList: mwoSlice.reducer,
    projectList: projectSlice.reducer,
    transactionList: transactionSlice.reducer,
  },
});
