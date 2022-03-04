# Tasks/Issues

- **Breadcrumbs:** create at the top of each page.
- **Standardize IDs:** define a strict pattern of ID for standard modules like screw

  - For instance, **`id:`**`[headType] M {head}x{length}`
  - parts filtered as `otherParts`, (other than mfg, std etc.) are not being used anywhere. Try to show these items somewhere.

- **Consistent Nomenclature:** Instead of Spec,Std & Mfg, use Spec-Std, Std & Mfg. Follow the same convention everywhere.

- **PO Item Detail:** Remarks are not shown in item summary.
- **Stop version overwrite:** In the update functions, the document version (from mongo) is often overwritten by the previous copy (thus remains unchanged). (delete the keys in controllers)
- **Projects Component**

  - Deleting an assembly must delete parts related to it as well.
  - parts don't show their parent assembly directly in the entry bar. (There's enough space for that as well)
  - No Summary component for project parts.
  - "Reset Target" button is not working yet

- **Limit Data Fetching** Create a structure that instead of loading all the data from data base... the data is fetched on requirement from database.
  - Use Foreign Keys in purchase parts (normalize the data)
  - Make queries in graphql for the specific data requests for each UI. Also, load data of each page when the page is loaded.
- **Populate On-Demand:** Restructure the PO Parts separately using population in mongoose.(Parts can be repeated in multiple POs) Do this for project and modules also. (Standard Modules are repeated across multiple projects)

- **Bug Spotted:** \_id field is visible in PO Specs form. It should be deleted before it makes it to the form. Also the API should accommodate the same.
- **Inventory collection:** Structure BE such that inventory is stored in a separate collection and updated dynamically on every transaction
- **Bug Spotted:** Only qty is being returned by API after PO is updated. The payload submits 'item' and 'qty' fields and not the remaining fields to server.
- ~~**Bug Spotted:** PO Item Spec form is not updating the PO Item Spec.~~
- **Bug Spotted:** Project Summary form does not get the previous target data.
- **Bug Spotted:** Click the edit button of poEntry and then try to go to poDetail. There is a bug in the code.
- **Bug Spotted:** target field is not being updated in project summary form. However the projectList contains target data until any project is selected. **deletion of certain keys were carried out without cloning the passed in data which was actually the state sometimes**
