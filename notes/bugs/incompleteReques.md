The data fetched from the mongoDB in API request is incomplete i.e. the `items` array in the `PO` is not returned if that is present. For _POs_ which do not have any `items` array, a blank items array is returned

Looks like there is an error with mongoose schema.

### Problem

Suppose there are 02 POs in mongo:

```
[
  {
    refType: 'One'
  },
  {
    refType: 'Second',
    items: [
      {...item 01 data},
      {...item 02 data},
    ]
  }
]
```

Currently the data returned from mongo is:

```
[
  {
    refType: 'One',
    items: []
  },
  {
    refType: 'Second',
  }
]
```

### Solution

Model of mongoose had a fixed schema for `items` array and of objects in it.
If a loose schema is defined i.e. Schema of `items` is set to an empty array. then the data in mongo will be valid for the said model. Otherwise, changes in model will have to be made to match the existing data completely.

For now, a loose schema will be set for poModel
