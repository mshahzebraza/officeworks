// !NOTE: Create a Snippet of the following Code

import poSlice from "./po/po-slice";
import mwoSlice from "./mwo/mwo-slice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    po: poSlice.reducer,
    mwo: mwoSlice.reducer,
  },
});
