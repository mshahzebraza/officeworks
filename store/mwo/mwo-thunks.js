import { mwoActions } from "./mwo-slice";

// Thunks are used to use backend/side-effects inside the action-creators. Or to use other reducer type action-creators first.

// To add backend state
export const addMWO_Thunk = (payload) => async (dispatch, getState) => {
  // The async function is there just to show that async code can go inside. Its not a set structure.  

  let answer = 'yes', isClosed = false;

  // check if status is closed
  // if (payload.status === 'Closed') {
  //   isClosed = true;
  //   answer = prompt(`Type "yes" to continue.`)
  // }
  if (isClosed && answer !== "yes") return

  dispatch(poActions.addPO(payload))

  if (payload.status === 'Closed') {
    console.log(`Closed PO Data`, payload);
    // Right now the New PO form doesn't allow this. But later in development, try to handle this case like updatePO_Thunk.
  }

  dispatch(mwoActions.addMWO(payload))
};

// To update backend state
export const updateMWO_Thunk = (payload) => /* async  */(dispatch, getState) => {

  dispatch(mwoActions.updateMWO(payload))
};
