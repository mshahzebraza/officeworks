# Tasks/Issues

- **Breadcrumbs:** create at the top of each page.
- **Standardize IDs:** define a strict pattern of ID for standard modules like screw
  - For instance, **`id:`**`[headType] M {head}x{length}`
  - parts filtered as `otherParts`, (other than mfg, std etc.) are not being used anywhere. Try to show these items somewhere.
- **Consistent Summary Styles:** for every kind of summary data. Right now, projectSummary Modal shows very different styles than poSummary Modal.
- **Auto-Summary Generator**: to map through key-values and arrays as well.
- **Improve Form Updates:** Make forms unable to submit without data change. (use of **isDirty** property of formik)
- **Consistent Nomenclature:** Instead of Spec,Std & Mfg, use Spec-Std, Std & Mfg. Follow the same convention everywhere.

- **Stop version overwrite:** In the update functions, the document version (from mongo) is often overwritten by the previous copy (thus remains unchanged).
- **Projects Component**

  - Deleting an assembly must delete parts related to it as well.
  - parts don't show their parent assembly directly in the entry bar. (There's enough space for that as well)
  - No Summary component for project parts.
  - "Reset Target" button is not working yet

- **Limit Data Fetching** Create a structure that instead of loading all the data from data base... the data is fetched on requirement from database.
  - Use Foreign Keys in purchase parts (normalize the data)
  - Make queries in graphql for the specific data requests for each UI. Also, load data of each page when the page is loaded.
- **Populate On-Demand:** Restructure the PO Parts separately using population in mongoose.(Parts can be repeated in multiple POs) Do this for project and modules also. (Standard Modules are repeated across multiple projects)
- **Bug Spotted:** Upon adding a new po-item to an empty-po. the delete button becomes visible without selecting any po-item. and clicking it in this position throws an error.
- **Bug Spotted:** After deleting the project assembly, the Project Parts associated with it are not deleted.
- **Bug Spotted:** \_id field is visible in PO Specs form. It should be deleted before it makes it to the form. Also the API should accommodate the same.
- **Inventory collection:** Structure BE such that inventory is stored in a separate collection and updated dynamically on every transaction
- **Bug Spotted:** Only qty is being returned by API after PO is updated. The payload submits 'item' and 'qty' fields and not the remaining fields to server.
-
