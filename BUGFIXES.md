## 1. Debugging in VSCode not working

### Reason

...

### Description

- After trying to use VScode debugger, i couldn't use start the local-server again. `npm run dev` wouldn't work!
- Had to delete the `.next` directory. and run `npm run dev` again.

## 2. Can't delete the current item in PO - partial

### Reason

Deleting current item means nothing can be rendered onto the DOM which breaks the app as there is nothing left to show.

### Description

- Sometimes an error is thrown saying can't read the item (which is to be deleted).
- Happens for the curItemIndex > 0 .
- Doesn't happen if current Item is the first item. But it happens if the current Item is the 2nd or more.

## 3. Pressing Enter Deletes the Detail Pair in Update Forms [FIXED]

### Reason

Enter key by-default connects to the first button (delete in this case) in the container, because by default `type='submit'` for every button.

### Description

- In Update forms there are some delete buttons, with non-compulsory input pairs and therefore pressing enter triggers those delete keys. This can checked by pressing Enter for N times (if N is the no. of delete buttons)
- This problem isn't there for Add form bcz the first button is the SUBMIT button.
- Event Listener on inputs for enter key can be bound to trigger a ref attached to the submit button.
- Tried to make a function that checks the `evt.code` & `evt.target.type` & `evt.target.tagName` to check if an `evt.preventDefault()` is to be called.

### Fix

- Added a `type='button'` to other buttons works.

## 4. Update PO Form removes the items in the PO [FIXED]

### Reason

Submitted data replaces the previous PO entry.

### Description

- Submit Data from `updateForm` only contains PO data and not PO-items data.
- Therefore, as soon as the data replaces the previous PO entry, we lose the items mentioned in the last PO.

### Fix

- `PO-items` data for the current PO was passed in the dispatch function
- The `PO-items` were then saved in a variable prior to splice-update of PO.
- After the update, the saved items were appended to the PO-state again.

Same was done for `specification` of PO-items.

<!--
## 4. Title

### Reason

Reason here.

### Description / Notes

- Note # 01.

### Possible / Other Fixes

- Fix # 01.

### Fix

Final Solution here.
 -->

# Tasks

## `Improve the code of Form modals`

- A Separate array for datalist may be created. the list Item may pick the dataList item in the array according to current index if it is not empty. Otherwise, the component may run without datalist.

- However,this may mean that there will a separate array for `req` and `disabled` field as well.

- make the form generate the fields dynamically by reading the length of entries.

## Update/Add Spec behaves differently if there is an empty object inside the item.specs

## Refactoring the styles of Entry-Bar

- Make the space of entry bar dependent on helper classes that can be added from js files. otherwise generate items according to no. of item-components in the js-files.
- This will ensure that no repeating html code is written.

## Pass a type prop to inputs of form modals to decided the type of input.

## There should be breadcrumbs at the top of each page.

## create the Primary Inventory Page

- will contain the Special Purchase parts + Mfg parts

## Create the project Page.

- First the data will have to be created
- then a redux slice
- the layout

## Separate page for Project Page & ProjectDetail Page

## create a function to create a different list of std ,spec & mfg parts and create separate components for them

## create an object to make the versions of an object based on the difference of a specific key inside the main object

- An Object containing Many projects with 3 different values for the type key
- When transformed, turns into 3 different objects each with the relevant projects.

## make the detail items such that they show colors only if they are empty or if they are opened

- detail styles shall be applied if it is open or empty (not when a child item is clicked or active)
- active item styles should applicable based on a prop passed with the conditional logic for activation like `isActiveFor` or according to the click (state toggles on each click)

## give a category key in th screws data structure

- either a strict data entry protocol must be used for the entry of standard parts OR
<!--
id: [id_headType] M {id_head}x{id_length}
  and the data shall be collected by 3 separate input fields of screw entry

 -->

- a new field must be add to

## otherParts are not being used in projectDetail.js

## create a replica of a pre made form with formik

first the key value generator (with delete option) must be created

## CANNOT GO TO DETAIL PAGE OF LAST 2 POs

solved: was caused because items in POs were not being read if they were empty...And last two were empty

## Summary should have a uniform styling all over

## Why do items go back to the same index in the list when they are updated and reverted back (even after id change)? What decides the order of items?

## standardize all data base strings to be of lowercase and camelCase and apply transformations when displaying and saving.

## Change the formikSubmit such that the form submission is disabled until the form is dirty

## standardize all the parts to Special-Standard, Standard, Manufactured

## Make the Project Detail fetch the project data based on the ActiveProjectIndex instead of ActiveProjectID

this would result in the display of index instead of the nomenclature in the side nav... Therefore changes in the detail & detailItem have to be made in order to accommodate an object instead of a string of type {key,value}... The data storage would be handled by the key but the only the value would be rendered on screen.
