#### Title

Next Hot-Reloading was not working

#### Problem Summary

- Upon reloading or saving the changes in the page-component-file, changes were not being shown on the UI until the server was restarted using `npm run dev`.
- Was happening with only one of the page component.

#### Problem Diagnosis

- Tried to recreate the same issue on another page but that page did not produce the same error.
- Upon checking if the component name in the file-explorer is ok, it was found that the component Name was starting from a lowercase letter
- Also the casing in the import statement and the actual filename was different.
- Correcting the mistake solved the issue.

### Conclusion

- All the pages need to named as 'index.js'
- All the components to be named as 'Index.js' (first letter capital)
