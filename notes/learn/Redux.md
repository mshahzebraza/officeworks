# Setting up redux

As in context store set up, we start by creating a context and the change process with the reducer and then to the dispatch actions.
Similarly, a redux store is created here in the first step.
However, in our case the store needs to be split in Slices.

## Slices

Slice in itself is a mini-store.

#### Slice creation

Following syntax is used to setup the slice.
`const sliceA = createSlice({ name, initialState, reducers: { action1, action2 } })`
03 main params are passed in the slice object.

#### Slice Data Manipulation --- Reducers/Action Creators

The 3rd param (reducers) is basically a collection of dispatch-functions (reducers-methods) which can be later used from the components to manipulate data. These functions can be directly used to dispatch a specific actions instead of creating strings, as this is a relatively error free method of performing a certain state change.
These reducers are made accessible to the components by default exporting it with the name of `sliceA-actions`.
Using the appropriate slice-actions with `useDispatch` hook provided by `redux` user can manipulate data.
The state manipulation **INSIDE** the default action-creators/methods/reducers is immutable but if you do it outside these reducer functions then that would result in directly mutating the state, and **MUST NOT BE DONE**.

##### Action Creators: Reducers v/s Thunk

The dispatch calls for a function/method aka 'Action Creators' to manipulate the state.
These action creators / methods are called 'Reducers' if it is a default method inside the 'reducers' key of redux slice.
However, sometimes we want to use a customized method(to use backend code/side-effects inside it). In this case, the custom method / action creator is called Thunk.
`Thunk is a function that delays an 'action' until later.`

<!-- Watch video 259 for clarity -->

##### Slice Data Manipulation --- Custom Actions / Thunks

You must be thinking why is there a separate action file for some slices only. And why is there a need to define these methods (action-creators) out of the slice definition object away from the rest of methods.
The reason is that **SIDE-EFFECTS/backend code** is not supported in default action creator methods and these **reducers** must be kept **side-effect free**. Therefore, special/custom action creators are created if backend code is needed in the action-creator method.

#### Slice Data Fetching

`Redux` provides a `useSelector` hook to fetch the required data from any specific slice
