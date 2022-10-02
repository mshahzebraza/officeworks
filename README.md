**Issues:**

- Access Form-Submit Handler outside the form to use the Submit-Button inside Modal-Footer
- Access the FormikProps outside the form to change the text of Submit-Button inside Modal-Footer
- figure out the submit binding solution (search keyword: "submit outside formik form")
- solve the issue of forwardRef for customComponents inside MUI components

**Commit Description prev:**

fix: resolves the issue of data not being available for the update forms

Reason: the issue arises if the Form (from 'formik') is not a direct child of Formik (from 'formik'), as in this case where Form was placed under Modal before placing under Formik

Solutions:
One way to solve it is to
"Put the Form directly under Formik"
and use Modal as the Overall Wrapping Component. However, this means you cannot use the Formik render methods ( isValid, isDirty etc. ) inside your Modal (to style Modal-Submit-Btn)

Another solution, which lets us pass is to
"Connect/Hook the form-component with the formik using formikProps.handleSubmit and formikProps.handleReset
