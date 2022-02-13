#### Problem

Pressing Enter Deletes the Detail Pair in Update Forms **[FIXED]**

##### Reason

Enter key by-default connects to the first button (delete in this case) in the container, because by default `type='submit'` for every button.

##### Description

- In Update forms there are some delete buttons, with non-compulsory input pairs and therefore pressing enter triggers those delete keys. This can checked by pressing Enter for N times (if N is the no. of delete buttons)
- This problem isn't there for Add form bcz the first button is the SUBMIT button.
- Event Listener on inputs for enter key can be bound to trigger a ref attached to the submit button.
- Tried to make a function that checks the `evt.code` & `evt.target.type` & `evt.target.tagName` to check if an `evt.preventDefault()` is to be called.

##### Fix

- Added a `type='button'` to other buttons works.
