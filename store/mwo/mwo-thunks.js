// Thunks are used to use backend/side-effects inside the action-creators. Or to use other reducer type action-creators first.

// To update backend state
export const updateData = (data) => {
  // The async function is there just to show that async code can go inside. Its not a set structure.  
  return async (dispatch) => {
    // Set a loading State

  };
};

// To download backend state
export const fetchData = () => {
};
