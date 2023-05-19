# Views

A MongoDB view is a queryable object whose contents are defined by an aggregation pipeline on other collections or views.


## Use cases

- Create a view on a collection of employee data to exclude any private or personal information. Applications can query the view for employee data that does not contain any PII.
- Create a view on a collection of collected sensor data to add computed fields and metrics. Applications can use simple find operations to query the data.
- Create a view that joins two collections containing inventory and order history respectively. Applications can query the joined data without managing or understanding the underlying complex pipeline.


## Create View

```js
db.createView(
  "<viewName>",
  "<source>",
  [<pipeline>],
  {
    "collation" : { <collation> }
  }
)
```


## Drop a View

To remove a view, use the `db.collection.drop()` method on the view.


## Behavior

### Read Only

MongoDB does not support write operations against views.

The following read operations can support views:

- db.collection.find()
- db.collection.findOne()
- db.collection.aggregate()
- db.collection.countDocuments()
- db.collection.estimatedDocumentCount()
- db.collection.count()
- db.collection.distinct()


### Index Use and Sort Operations

You cannot create, drop or re-build indexes on the view directly nor get a list of indexes on the view.

Starting in MongoDB 4.4, you can specify specify a $natural sort when running a find command on a view.

`find()` operations on views do not support the following projection operators:

- $
- $elemMatch
- $slice
- $meta

You cannot rename views.

MongoDB does not persist the view contents to disk. A view’s content is computed on-demand when a client queries the view.

Views do not support operations such as:

- `db.collection.mapReduce()`
- `$text` operator, since `$text` operation in aggregation is valid only for the first stage
- `$geoNear` pipeline stage.

Views are considered sharded if their underlying collection is sharded.

Operations that lists collections, such as `db.getCollectionInfos()` and `db.getCollectionNames()`, include views in their outputs.


## On-Demand Materialized Views

Starting in version 4.2, MongoDB adds the `$merge` stage for the aggregation pipeline. This stage can merge the pipeline results to an existing collection instead of completely replacing the collection.

On-demand materialized views are views where the content of the output collection can be updated each time the pipeline is run.
