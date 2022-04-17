# Troubleshooting

## Master/Detail Pattern - MWO & PO

- 1st option is to create a detail view for each master view (MWO as well)
- 2nd option is to remove the detail view and render the details in a separate component which can slide between the rows of each entry
  - Compare the component and dependency imports in master & detail page of PO
  - Compare the use of state for both master & detail page of PO
  -

### Master Page - MWO

- Ensure that the mwoEntry displays all the main fields of the MWO entry. (title,id,etc)
- Also try to include, items in the mwoEntry by digging into the nested structure
- Is use of 'Qty' really justified? So far, I don't see the use of it.

### Detail Page - MWO

- Keep working on the detail page of MWO & the components required.
- Ensure the flow of data is correct
- Improvise the Apollo functions to meet the demands of MWO.

### Bonus

- Create new components and function to be reused for both PO and MWO
- Convert the Website Look to a React App Look

## Current Task

- Also key prop is missing in rendering the list of formik somewhere... maybe in the itemForm
- itemForm & poItemForm behave differently. New one discards some fields
  - Bcz when fetching the prev fieldData.... the field other than the current form are also fetched in poItemForm.
  - But even then the poItemForm is unable to avoid this behavior with the flexible fields....
  - Solution 1: Use 'otherSpec' field to contain the flexible fields of the module. And replace this field on every module update
