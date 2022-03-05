The purpose of this branch is to restructure APIs (and the related code) to

- receive parameters i.e. req.query instead of in req.body
- normalizing of nested objects like po.items

<!-- ! NEXT: Create restructureNavigation to change the way of Client Side Navigation and use the NEXT features -->
<!-- Install -->

Morgan dependency is required for logging.

<!-- TODO: Update the Apollo Handlers to request using query params -->

<!-- ? Current API Paths -->

P.G.P.D: POST, GET, PATCH, DELETE

<!--* PUT must be used to replace -->

1. /api/initialize
2. /api/mwo
   1. GET All MWOs: **path/**
   2. GET Single: **path/:uuid**
   3. POST Single: **path/**
   4. PATCH Single: **path/:uuid**
   5. DELETE Single: **path/:uuid**
3. /api/po
   1. GET All PO: **path/**
   2. GET Single: **path/:uuid**
   3. POST Single: **path/**
   4. PATCH Single: **path/:uuid**
   5. DELETE Single: **path/:uuid**
   6.
4. /api/po-item
5. /api/po-item-spec
6. /api/project
7. /api/project-assembly
8. /api/project-part
9. /api/transaction
10. /api/inventory (not created)
