The data fetched from the mongoDB in API request is incomplete i.e. the `items` array in the `PO` is not returned if that is present. For _POs_ which do not have any `items` array, a blank items array is returned

Looks like there is an error with mongoose schema.
