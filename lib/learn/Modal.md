# Modal

### Background Elements are still visible / touchable

The `Backdrop` or `Modal-Content` Element often has fixed/absolute position. Therefore, if there is any other element to which we have assigned a fixed/absolute position, then that element also comes at the same level in hierarchy as the `Modal` or `Backdrop`, even if it is actually on a different level in the DOM. This makes it necessary to assign decide the level by assigning z-index to them.

### Stop propagation

After mapping the close-modal-state to backdrop of the modal, it was observed that the clicks on modal's content (indirectly on backdrop-as backdrop was the parent) were also triggering the modal-close-state.
To solve the issue, an event listener was set on the modal-content to stop the event propagation upwards.
