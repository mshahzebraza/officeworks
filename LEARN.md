# MultiForm Input Component

#### How do i control the sub-categories?

When using the component, user can specify the number of sub catagories needed in the list. For each sub-category a button will appear below the form which will let us create an input for that specific category. The values from inputs will then be stored in separate categories according to their levels.

#### Why didn't I use onBlur event to handle Input change events?

I wanted to achieve two way binding with my input and state. Since, two-way binding cannot be achieved by using onBlur event, therefore i had to use onChange event.

#### Data List or placeholder values?

An array of default field KEYS is passed to the form component which is then, through a helper function, translated into the required data. However, if we change the input array from string elements to object elements containing the required field caption, placeholder & dataList values then the desired functionality can be achieved.

#### Can i optionally set some default parameters for the form that the user MUST fill?

Yes, if we pass an object with a key of 'req' set to 'true' then the client must fill that piece of data.

#### Problems with form validations?

Don't Ask!

1. First problem i faced was that i had the submit handler on the submit button which was linked to a submitHandler. Now i expected it to let me go to the un-filled 'required' inputs on clicking but instead it didn't respond. The reason was the fact that i had preventDefault running in its handler.
2. Now when i tried deleting the preventDefault, it started to reload and state vanished.
3. Then, I finally understood the problem and added the submitHandler on the parent form element instead of the button and changed the button type to submit to link it to the form submission.

#### Arrays & Objects

##### Named keys in Arrays?

I accidentally found out that arrays can also have named keys. However, the keys will remain in the order in which they are inserted in the array. Cool, right?

##### Named variables inside object?

if you pass an already defined variable (containing value) inside an object, then the variable-name and the value will be stored as key & value pair. However, if the variable is empty, it'll throw an error.

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

# Modal

### Background Elements are still visible / touchable

The `Backdrop` or `Modal-Content` Element often has fixed/absolute position. Therefore, if there is any other element to which we have assigned a fixed/absolute position, then that element also comes at the same level in hierarchy as the `Modal` or `Backdrop`, even if it is actually on a different level in the DOM. This makes it necessary to assign decide the level by assigning z-index to them.

### Stop propagation

After mapping the close-modal-state to backdrop of the modal, it was observed that the clicks on modal's content (indirectly on backdrop-as backdrop was the parent) were also triggering the modal-close-state.
To solve the issue, an event listener was set on the modal-content to stop the event propagation upwards.

# poData undefined

I want to fetch the poDetails before the component loads.

1. I can't use the useEffect as fetching requires using useSelector from redux. But one hook can't be use inside the other.
2. Can't use the useSelector in getStaticProps as it is not allowed there as well.
3. Trying to use the useSelector in function body before render method to fetch the data on every component load and before rendering elements. This works when i fetch the complete data object.
   However, as soon as i try to acccess the nested data, it fails and throws an error.
   This mostly happens with any poData other than the first one. The first entry is actually the initial state and is hard coded in the database.

## structure of PO Data

`poData = { refId, cost, ... etc }`

`poData` can be logged or accessed. However, accessing the 'refId' or 'cost' throws error.

## Component

`

export default function POdetail(pProps) {

const poData = useSelector(state => { return state.po.find(item => item.refId === pProps.pid) })

console.log(poData);<!-- This runs perfectly, and returns the data as usual -->

console.log(poData.refId); <!-- However, as soon as i want to fetch the nested data, the app breaks -->

return (

<main>

      <section  >
        <h1>PO Data:{poData ? poData.refId : 'Not found'} </h1>
        <h1>PO ID:{poData ? poData.refId : 'Not found'} </h1>
      </section>

</main>

)
}

`

# PO Detail Page

Can't delete the PO from within the PO-Detail Page. Bcz after deleting the current PO there is no PO to be rendered and an error is thrown.
A fix would be to check the content presence inside before accessing the data.

# Portal

### need of useEffect

The code would not work bcz it couldn't find the matching selector in the DOM. Therefore, useEffect was needed to wait for the first render and then check for the selector as now, the DOM would have been rendered.

1. Redux to Apollo
2. Lean Page Structure
