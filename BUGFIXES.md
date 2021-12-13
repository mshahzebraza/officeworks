# 1. Debugging in VSCode

## Reason

Tried using the internal debugging tool of VSCode

## Description

An error was throw

## Fix

Had to delete the `.next` directory. and run `npm run dev` again.

# 2. Can't delete the item in PO - sometimes

## Reason

...

## Description

Sometimes an error is thrown saying can't read the item (which is to be deleted).
Happens only if next or prev buttons are pressed.
bcz when we press next .... then the last item to be deleted is the one that we are currently standing on.
This is not a problem if we are standing on the 1st item bcz when we delete it, the items next to it will replace it.

## Fix

...

<!-- Had to delete the `.next` directory. and run `npm run dev` again. -->

# 3. Pressing Enter Deletes the Detail Pair in Update Forms

## Reason

Enter key by-default connects to the first button (delete in this case) in the container.

## Description

In Update forms there are some delete buttons, with non-compulsory input pairs and therefore pressing enter triggers those delete keys. This can checked by pressing Enter for N times (if N is the no. of delete buttons)
This problem isn't there for Add form bcz the first button is the SUBMIT button.
Event Listener on inputs for enter key can be bound to trigger a ref attached to the submit button.

## Fix

...

<!-- Had to delete the `.next` directory. and run `npm run dev` again. -->

# 4. Update PO Form removes the items in the PO

## Reason

Submitted data replaces the previous PO entry.

## Description

New Submitted data only contains summary about the PO and not about the items in the PO. Therefore, as soon as the data replaces the previous PO entry, we lose the items mentioned in the last PO.

## Fix

Instead of replacing the previous PO. Try to replace the relevant fields only.

...

# `Improve the code of Multiform modals`

## How

A Separate array for datalist may be created. the list Item may pick the dataList item in the array according to current index if it is not empty. Otherwise, the component may run without datalist.

However,this may mean that there will a separate array for `req` and `disabled` field as well.
