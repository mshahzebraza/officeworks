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

## Add PO item

- 1st render, the poState adds the item ref in itself, while moduleState contains old State. therefore matching module is not found for population
- 2nd render, both the state contains the updated state with added po item

## Delete PO item

- 1st render, both the states still contain the deleted po-item
- 2nd render, poState still contains the deleted po-item item Ref data, while the moduleState has deleted the item. This results in an empty list Item being shown in NavList with only the source-specific data displayed in itemDetail.
