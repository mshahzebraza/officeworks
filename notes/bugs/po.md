This document is focussed on the code related to purchase orders.

#### Problem #1

While on POdetailPage, clicking the deletePO would throw an error.

##### Reason

Deleting current item means nothing can be rendered onto the DOM which breaks the app as there is nothing left to show.

##### Description

- Sometimes an error is thrown saying can't read the item (which is to be deleted).
- Happens for the curItemIndex > 0 .
- Doesn't happen if current Item is the first item. But it happens if the current Item is the 2nd or more.
