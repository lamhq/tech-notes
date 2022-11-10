# MongoDB CRUD Operations

## Create Operations

`insertOne` returns a document that includes the newly inserted document's `_id` field value

```js
// db.collection.insertOne(document)
db.inventory.insertOne(
  { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)

db.inventory.insertMany([
  { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
  { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
  { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])
```


## Read Operations

```js
// db.collection.find(query criteria, projection).limit(n)
db.inventory.find(
	{ status: "A", qty: { $lt: 30 } },
	{ name: 1, address: 1 }
).limit(5)
```


## Update Operations

To update a document, MongoDB provides update operators, such as `$set`, to modify field values.

```js
{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
}
```

```js
// Update a Single Document
// uses the `$set` operator to update the value of the field
// uses the `$currentDate` operator to update
// the value of the field to the current date.
db.inventory.updateOne(
	{ item: "paper" },
	{
		$set: { "size.uom": "cm", status: "P" },
		$currentDate: { lastModified: true }
	}
)

// Update Multiple Documents
db.inventory.updateMany(
	{ "qty": { $lt: 50 } },
	{
		$set: { "size.uom": "in", status: "P" },
		$currentDate: { lastModified: true }
	}
)

// Replace a Document
db.inventory.replaceOne(
	{ item: "paper" },
	{ item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)
```

If update operations includes option `upsert : true` and no documents match the specified filter, then the operation creates a new document and inserts it. If there are matching documents, then the operation modifies or replaces the matching document or documents.

### Updates with Aggregation Pipeline

Starting in MongoDB 4.2, you can use the aggregation pipeline for update operations. With the update operations, the aggregation pipeline can consist of the following stages:

- $addFields
- $set
- $project
- $unset
- $replaceRoot
- $replaceWith

```js
// sets the `modified` field to the current datetime by using the aggregation variable `NOW`
db.students.updateOne( { _id: 3 }, [ { $set: { "test3": 98, modified: "$$NOW"} } ] )

// set default values for the quiz1, quiz2, test1 and test2 fields.
// The aggregation variable ROOT refers to the current document being modified
db.students2.updateMany( {},
  [
    { $replaceRoot: { newRoot:
			{ $mergeObjects: [ { quiz1: 0, quiz2: 0, test1: 0, test2: 0 }, "$$ROOT" ] }
    } },
    { $set: { modified: "$$NOW"}  }
  ]
)

// update the documents with the calculated grade average and letter grade.
db.students3.updateMany(
   { },
   [
     { $set: { average : { $trunc: [ { $avg: "$tests" }, 0 ] }, modified: "$$NOW" } },
     { $set: { grade: { $switch: {
                           branches: [
                               { case: { $gte: [ "$average", 90 ] }, then: "A" },
                               { case: { $gte: [ "$average", 80 ] }, then: "B" },
                               { case: { $gte: [ "$average", 70 ] }, then: "C" },
                               { case: { $gte: [ "$average", 60 ] }, then: "D" }
                           ],
                           default: "F"
     } } } }
   ]
)

// append values to the array field `quizzes`
db.students4.updateOne( { _id: 2 },
  [ { $set: { quizzes: { $concatArrays: [ "$quizzes", [ 8, 6 ]  ] } } } ]
)

// add a new field `tempsF` with the value calculated from field `tempsC`
db.temperatures.updateMany( { },
  [
    { $addFields: { "tempsF": {
          $map: {
             input: "$tempsC",
             as: "celsius",
             in: { $add: [ { $multiply: ["$$celsius", 9/5 ] }, 32 ] }
          }
    } } }
  ]
)
```


## Delete Operations

- Delete operations do not drop indexes, even if deleting all documents from a collection.

```js
// Delete All Documents
db.inventory.deleteMany({})

// Delete All Documents that Match a Condition
db.inventory.deleteMany({ status : "A" })

// Delete Only One Document that Matches a Condition
db.inventory.deleteOne( { status: "D" } )
```


## Bulk Write Operations

Bulk write operations can be either ordered or unordered.

When ordered, operations are executed serially. If an error occurs in any operations, MongoDB will return without processing any remaining write operations in the list.

When unordered, operations are executed in parallel. If an error occurs in any operations, MongoDB will continue to process remaining write operations in the list.

Executing an ordered list of operations on a sharded collection will generally be slower than executing an unordered list since with an ordered list

```js
db.characters.bulkWrite(
  [
    {
      insertOne:
      {
        "document":
        {
          "_id": 4, "char": "Dithras", "class": "barbarian", "lvl": 4
        }
      }
    },
    {
      insertOne:
      {
        "document":
        {
          "_id": 5, "char": "Taeln", "class": "fighter", "lvl": 3
        }
      }
    },
    {
      updateOne:
      {
        "filter": { "char": "Eldon" },
        "update": { $set: { "status": "Critical Injury" } }
      }
    },
    {
      deleteOne:
        { "filter": { "char": "Brisbane" } }
    },
    {
      replaceOne:
      {
        "filter": { "char": "Meldane" },
        "replacement": { "char": "Tanys", "class": "oracle", "lvl": 4 }
      }
    }
  ]
);
```


## Retryable Writes

Retryable writes allow MongoDB drivers to automatically retry certain write operations a single time if they encounter network errors, or if they cannot find a healthy primary in the replica sets or sharded cluster.

Retryable writes require a replica set or sharded cluster, and do not support standalone instances.

Retryable writes require a storage engine supporting document-level locking, such as the WiredTiger or in-memory storage engines.

The official MongoDB 4.2-compatible drivers enable Retryable Writes by default. To enable retryable writes in the mongo shell, use the `--retryWrites` command line option:

```sh
mongo --retryWrites
```

## Retryable Reads

Retryable reads allow MongoDB drivers to automatically retry certain read operations a single time if they encounter certain network or server errors.

Official MongoDB drivers compatible with MongoDB Server 4.2 and later support retryable reads.

Drivers can only retry read operations if connected to MongoDB Server 3.6 or later.