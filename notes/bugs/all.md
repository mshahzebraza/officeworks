# Bugs Summary

Following is the summary of solved issues.

1. [ObjectId defined as string](<(#objectid-definition)>) (wrong method chosen for data-seeding)
2. [.save() not working](#save-not-working) with documents
3. [insert(single/multiple) subDocuments](#insert-subdocs-in-array) into a subDocuments array.
4. [Updating Mixed Schema Type](#insert-subdocs-in-array) without using `doc.markModified`.
5. [Adding objectId in Object of Flexible-Mixed Schema](#objectid-not-defined-in-mixed-schema-object)

# Bug Details

## ObjectId Definition

[Github Report](https://github.com/Automattic/mongoose/issues/9054)

## .save() not working

[Github Report](https://stackoverflow.com/questions/35733647/mongoose-instance-save-not-working)

## Insert SubDocs in array

[Link Here](https://docs.mongodb.com/v3.0/reference/operator/update/push/)

## Insert SubDocs in array

Turns out that i was using `specifications` (plural) in my logic. After the correction, the document was being saved without the use of `doc.markModified`.
Maybe because all of the document was changed anyway and mongo knew that the document needs to be updated.
However, this may not work if only the field with `mixed` datatype was changed.
[Stack Overflow Link Here](https://stackoverflow.com/questions/10145608/how-to-define-a-generic-nested-object-in-mongoose/26875117)

## ObjectID not defined in Mixed Schema object

Had a schema of following type

```
{
  ...
  nestedSchema: {}
  ...
}
```

But upon adding or updating the model instances, ObjectId (even when passed explicitly) was being stored as random string.
So i had to use the **SubDocument** method of defining schema instead of **Nested** method, because _former_ way automatically assigns the objectId to instances whereas none nested schemas have any ObjectId.
