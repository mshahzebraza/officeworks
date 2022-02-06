# Tasks

- There should be breadcrumbs at the top of each page.
- create the Primary Inventory Page
  - will contain the Special Purchase parts + Mfg parts
- define a strict pattern of ID for standard modules like screw
  - For instance, **`id:`**`[headType] M {head}x{length}`
  - parts filtered as `otherParts`, (other than mfg, std etc.) are not being used anywhere. Try to show these items somewhere.
  - create a uniform styles file to show summary data. Right now, projectSummary Modal shows very different styles than poSummary Modal.
  - Right now, Update forms can be submitted without making any change. This causes an unnecessary update-request. Make use of **isDirty** property of formik to solve the issue.
  - Instead of Spec,Std & Mfg, use Spec-Std, Std & Mfg. Follow the same convention everywhere. Right now there is inconsistency of terms among components.
  - Array Entries are shown without any header. This makes it difficult to know at what position does a specific information lie. (Tables should have a header row for poList, txnLis, mwoList etc.)
  - Try to create an auto-summary Generator
    - This must be able to map through key-values and arrays as well.
- ~~Create a function to identify if `_id` is present in the poSpecs. If it is present then disable the editing of `_id`.~~
- Understand the working of advanced field props and custom fields of FORMIK
- **Upon closing a PO, the change is registered in PO backend but not in transaction backend.**
