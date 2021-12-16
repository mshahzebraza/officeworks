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

## `Improve the code of Multiform modals`

A Separate array for datalist may be created. the list Item may pick the dataList item in the array according to current index if it is not empty. Otherwise, the component may run without datalist.

However,this may mean that there will a separate array for `req` and `disabled` field as well.

## Make the forms for editing, deleting, adding the specifications of PO-item as well.

## Buttons for adding items must be visible in itemDetail component even when there is no items

## Remove the sublevel functionality from the MultiForm bcz the sublevel data not passed as the form data

- Data shows that it contains the specs if it is logged directly from form. however not in the po-slice
- Also, the updateItemForm lets you enter the specs but doesn't fetch the old specs in the form.

## use fromEntries() in helper functions

## make the form generate the fields dynamically by reading the length of entries.

## Deleting of certain specs work but adding new specs don't work in the updateForm.
