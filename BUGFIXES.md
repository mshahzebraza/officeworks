## 1. Debugging in VSCode

### Reason

Tried using the internal debugging tool of VSCode

### Description

An error was throw

### Fix

Had to delete the `.next` directory. and run `npm run dev` again.

## 2. Can't delete the item in PO - sometimes

### Reason

Deleting current item means nothing can be rendered onto the DOM which breaks the app as there is nothing left to show.

### Description

Sometimes an error is thrown saying can't read the item (which is to be deleted).
Happens only if next or prev buttons are pressed.
bcz when we press next .... then the last item to be deleted is the one that we are currently standing on.
This is not a problem if we are standing on the 1st item bcz when we delete it, the items next to it will replace it.

### Fix

...

<!-- Had to delete the `.next` directory. and run `npm run dev` again. -->

## 3. Pressing Enter Deletes the Detail Pair in Update Forms

### Reason

Enter key by-default connects to the first button (delete in this case) in the container, because by default `type='submit'` for every button.

### Description

- In Update forms there are some delete buttons, with non-compulsory input pairs and therefore pressing enter triggers those delete keys. This can checked by pressing Enter for N times (if N is the no. of delete buttons)
- This problem isn't there for Add form bcz the first button is the SUBMIT button.
- Event Listener on inputs for enter key can be bound to trigger a ref attached to the submit button.
- Tried to make a function that checks the `evt.code` & `evt.target.type` & `evt.target.tagName` to check if an `evt.preventDefault()` is to be called.

### Fix

- Added a `type='button'` to other buttons works.

## 4. Update PO Form removes the items in the PO

### Reason

Submitted data replaces the previous PO entry.

### Description

- New Submitted data only contains summary about the PO and not about the items in the PO. Therefore, as soon as the data replaces the previous PO entry, we lose the items mentioned in the last PO.

### Possible Fixes

- Instead of replacing the previous PO. Try to replace the relevant fields only.
- Try passing the whole data with the items so that they can be saved before replace-update. then the items will again be appended in the original list-item.
- Or just make a reducer that fetches the relevant po-items before deletion and appends them again into the list. Use of Action-Thunks

### Fix

`items` of PO were also passed in the dispatch function, which were saved in a variable prior to splice-update of PO. After the update, the saved items were appended to the PO-state again.

Same was done for `specification` of PO-items.

# `Improve the code of Multiform modals`

### How

A Separate array for datalist may be created. the list Item may pick the dataList item in the array according to current index if it is not empty. Otherwise, the component may run without datalist.

However,this may mean that there will a separate array for `req` and `disabled` field as well.

# Tasks

## Make the forms for editing, deleting, adding the specifications of PO-item as well.

# Buttons for adding items must be visible in itemDetail component even when there is no items

## Check what happens if i try to update an item which doesn't have specifications. (is an error returned from updatePOitem reducer that no specifications is found.)
