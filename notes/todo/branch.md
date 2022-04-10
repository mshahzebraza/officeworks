# Troubleshooting

## State manipulation

- handle the state manipulation according to new "state.list" structure

- Earlier the problem with the state update was this that the moduleList was being fetched later than the poList and execution had started by then. This caused an error to be thrown when the logic required the moduleList data as it was not available.
  - To tackle the problem, state.fetched property was used which signals that the state data has been fetched successfully for both poState and moduleState. Now the data for both states was made available at the time of execution.
  - However, when adding a new module to the state, the states need to refresh again.
  - It seems like, the refresh behavior is just like the fetching behavior, and the refresh(update) in moduleState is taking place after the poState.
  - To be exact, the activePO passed in for population does contain the reference to the newly created module, but the moduleList passed to match and replace the replace does not contain the matching module against the reference present in activePO's linkedModules.
- This lag in state updates doesn't only take place at initialization, but at every type of state update.

- The deletion of modules is absolute. (No linking, directly removing it)
  the state contains the updated state with added po item

## Delete PO item

- Deleting the exclusive item from the poState, still only unlinks it instead of removing it.

## Add Duplicate Module in other PO

- The PO refs of moduleState are not updated properly, they even point to non-existent POs sometimes.
- 'Upon deletion, the last linkedPO ref of the module is replaced by the linkedPO\'s refID instead of \_id '

## Inconsistency in server response

While looking at the server responses of moduleController, it is found that

- for update and add operations, server returns `added/updated module-specific module data` along with `source-specific module data` in the response.
- However, for delete operations, server returns `deleted module-specific module data` along with the `source of deleted module` only.

TODO: Fix the inconsistency in server response. Preferred fix is to have the server respond all requests by returning the complete source data, so that state manipulation in client can be done easily. However, check all the types of server requests to check if the inconsistency is a requirement
