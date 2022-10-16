**Current Issues:**

- [ ] <strong>Bug:</strong> Solve the issue of config-to-components for nested fields - the name is not being converted from 'items.itemId' to 'items[0].itemId'

  - check if the FAentry is responsible for the feature
  - check if keeping the parent and nested field's names separate and merging them only in FAentry works

- [ ] compare the prev code of `getObjectWithValuesAt` and structure of `field-config`

  - nested-fields of `field-config-object` had the validation logic separated and the nested-logics were then wrapped in the object's validation-logic
  -

  **Issues:**

- Access Form-Submit Handler outside the form to use the Submit-Button inside Modal-Footer
- Access the FormikProps outside the form to change the text of Submit-Button inside Modal-Footer
- figure out the submit binding solution (search keyword: "submit outside formik form")
- solve the issue of forwardRef for customComponents inside MUI components
