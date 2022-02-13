#### Title

#### Problem

- **Stage 01**
  - Changing the POs after the status of any PO has been set to "Closed" is not possible.
  - Looks like it happens once a transaction has been made
- **Stage 02**
  - Commenting the section which triggers the transaction-creation in `poApollo.js` works.
  - This implies that error is related to txn-creation. Maybe something in the txn-handler, database or state related logic, is wrong.
- **Stage 03**
  - Commenting the add-txn-to-db code and running the add-txn-to-state works.
  - The transaction-data added to txn-state is coming directly from po-manipulation-functions. (mapPOtoTXN)
- **Stage 03**
  - Uncommented the add-txn-to-db code.
  - The state data is still being fed from forms directly (NOT from returned data of db update)
  - However, still the error is produced.
  - It seems that just the fact that http request is made to transactionDB will create the error.
- **Stage 04**
  - Changed the method of http request to "GET" to check if it is just about talking to DB or about the return values from database.
  - Working (even though it threw an error once)
  -
- **Stage 05**
  - Replace the request method back to "POST" but changed the body to trigger a single transaction post (earlier it was posting multiple transactions)
  - It is noted that the error is shown when PO is edited (Edit doesn't necessarily have to be in PO.status)**After** status is changed **TO "Closed"** (Not FROM "Closed") .
  - Still Not Working
    ![Screenshot of error in console](../../public/screenshots/stage_5_hard_bug_02.png)

##### Changes Progress

#### learning

- `patch` request fails and is pointed to absence of `get` request. (when i commented out the fetch controller). The `Patch` requests start working as soon as the Fetch-data controller is uncommented.

#### Solution(s)

### Resources

1. This [Youtube Video](https://www.youtube.com/watch?v=01RTj1MWec0) tells more about Solution #02.
