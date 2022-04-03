The purpose of this branch is to restructure APIs (and the related code) to

- receive parameters i.e. req.query instead of in req.body
- normalizing of nested objects like po.items

<!-- ! NEXT: Create restructureNavigation to change the way of Client Side Navigation and use the NEXT features -->
<!-- Install -->

Morgan dependency is required for logging.

<!-- TODO: Update the Apollo Handlers to request using query params -->

> Due to the complexity of the reference sub-documents, we are using the embedded sub-documents, for now!.

# Current Issues

- newly added items do not reflect ui changes if specs are updated. however, refresh after creating them and you'll see the changes.
