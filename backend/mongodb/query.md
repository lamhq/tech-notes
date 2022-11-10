# Query Documents

## Query on Embedded/Nested Documents

```js
// Select All Documents in a Collection
db.inventory.find( {} )

// Specify Equality Condition
db.inventory.find( { status: "D" } )
db.inventory.find( { status: { $in: [ "A", "D" ] } } )

// Specify AND Conditions
db.inventory.find( { status: "A", qty: { $lt: 30 } } )

// Specify OR Conditions
db.inventory.find( { $or: [
	{ status: "A" },
	{ qty: { $lt: 30 } }
] } )

// Specify AND as well as OR Conditions
db.inventory.find( {
	status: "A",
	$or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
} )

// Query on Nested Field
db.inventory.find( { "size.uom": "in", "size.h": { $lt: 15 } } )
```

## Query an Array of primitive value

```js
// Match array that contains all elements
db.inventory.find( { tags: { $all: ["red", "blank"] } } )

// Match array that contains at least one element with the specified value
db.inventory.find( { tags: "red" } )

// Match array that contains at least one element meets the conditions
db.inventory.find( { dim_cm: { $gt: 25 } } )

// Query an Array with Compound Filter Conditions on the Array Elements
// query for documents where the dim_cm array contains
// one element can satisfy the greater than 15 condition
// and another element can satisfy the less than 20 condition,
// or a single element can satisfy both
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )

// Query for an Array Element that Meets Multiple Criteria
// query for documents where the dim_cm array contains
// at least one element that is both greater than 22 and less than 30
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

// Query for an Element by the Array Index Position
// query for all documents where
// the second element in the array dim_cm is greater than 25
db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

// Query an Array by Array Length
// query for all documents where the array tags has 3 elements
db.inventory.find( { "tags": { $size: 3 } } )
```

## Query an Array of Embedded Documents

```js
// Specify a Query Condition on a Field Embedded in an Array of Documents
// query for all documents where the instock array has
// at least one embedded document that contains
// the field qty whose value is less than or equal to 20
db.inventory.find( { 'instock.qty': { $lte: 20 } } )

// Use the Array Index to Query for a Field in the Embedded Document
// query for all documents where the instock array has as
// its first element a document that contains the field qty
// whose value is less than or equal to 20:
db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )

// A Single Nested Document Meets Multiple Query Conditions on Nested Fields
// query for documents where the instock array has
// at least one embedded document that contains both the field
// qty equal to 5 and the field warehouse equal to A:
db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )

// query for documents where the instock array has
// at least one embedded document that contains
// the field qty equal to 5 and at least one embedded document
// (but not necessarily the same embedded document)
// that contains the field warehouse equal to A:
db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )
```


## Query for Null or Missing Fields

```js
// query for documents that either contain the `item` field
// whose value is `null` or that do not contain the `item` field.
db.inventory.find( { item: null } )

// query for documents that contain the item field whose value is null
db.inventory.find( { item : { $type: 10 } } )

// query for documents that do not contain the item field
db.inventory.find( { item : { $exists: false } } )
```


## Project Fields to Return from Query

```js
// The following operation returns all documents that match the query.
// In the result set, only the item, status and,
// by default, the _id fields return in the matching documents.
db.inventory.find( { status: "A" }, { item: 1, status: 1 } )

// Suppress _id Field
db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } )

// Return All But the Excluded Fields
db.inventory.find( { status: "A" }, { status: 0, instock: 0 } )

// Return Specific Fields in Embedded Documents
db.inventory.find(
  { status: "A" },
  { item: 1, status: 1, "size.uom": 1 }
)

// Suppress Specific Fields in Embedded Documents
db.inventory.find(
  { status: "A" },
  { "size.uom": 0 }
)

// Project Specific Array Elements in Array
// use the $slice projection operator to return the last element in the instock array
db.inventory.find( { status: "A" }, { item: 1, status: 1, instock: { $slice: -1 } } )
```


## Iterate a Cursor in the mongo Shel

In the mongo shell, when you assign the cursor returned from the `find()` method to a variable using the `var` keyword, the cursor does not automatically iterate.

```js
var myCursor = db.users.find( { type: 2 } );

while (myCursor.hasNext()) {
  printjson(myCursor.next());
}

myCursor.forEach(printjson);
```

In the mongo shell, you can use the `toArray()` method to iterate the cursor and return the documents in an array:

```js
var myCursor = db.inventory.find( { type: 2 } );
var documentArray = myCursor.toArray();
var myDocument = documentArray[3];
```

By default, the server will automatically close the cursor after 10 minutes of inactivity, or if client has exhausted the cursor.


# Text search

To perform text search, MongoDB uses a text index and the `$text` operator.

## Text Index

A collection can only have one text search index, but that index can cover multiple fields.

For example you can run the following in a mongo shell to allow text search over the name and description fields:

```js
db.stores.createIndex( { name: "text", description: "text" } )
```

## $text Operator

`$text` will tokenize the search string using whitespace and most punctuation as delimiters, and perform a logical **OR** of all such tokens in the search string.

```js
// query all documents containing any terms from the list "coffee", "shop", and "java"
db.stores.find( { $text: { $search: "java coffee shop" } } )

// Exact Phrase
db.stores.find( { $text: { $search: "\"coffee shop\"" } } )

// Term Exclusion
db.stores.find( { $text: { $search: "java shop -coffee" } } )
```

## Sorting

text search queries will compute a relevance score for each document that specifies how well a document matches the query. To sort the results in order of relevance score, you must explicitly project the $meta textScore field and sort on it

```js
db.stores.find(
  { $text: { $search: "java coffee shop" } },
  { score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } )
```

## Aggregation Pipeline

In the aggregation pipeline, text search is available via the use of the `$text` query operator in the `$match` stage.

text search in the aggregation pipeline has the following restrictions:

- The `$match` stage that includes a `$text` must be the first stage in the pipeline.
- A text operator can only occur once in the stage.
- The text operator expression cannot appear in `$or` or `$not` expressions.
- The text search, by default, does not return the matching documents in order of matching scores. To sort by descending score, use the `$meta` aggregation expression in the `$sort` stage.

```js
// matches on either the term cake or tea,
// sorts by the textScore in descending order
// returns only the title field in the results set.
db.articles.aggregate(
  [
    { $match: { $text: { $search: "cake tea" } } },
    { $sort: { score: { $meta: "textScore" } } },
    { $project: { title: 1, _id: 0 } }
  ]
)

// matches on either the term cake or tea
// projects the title and the score fields
// returns only those documents with a score greater than 1.0
db.articles.aggregate(
  [
    { $match: { $text: { $search: "cake tea" } } },
    { $project: { title: 1, _id: 0, score: { $meta: "textScore" } } },
    { $match: { score: { $gt: 1.0 } } }
  ]
)

// searches in spanish
// matches on the term saber but not the term claro
// calculates the total views for the matching documents
db.articles.aggregate(
  [
    { $match: { $text: { $search: "saber -claro", $language: "es" } } },
    { $group: { _id: null, views: { $sum: "$views" } } }
  ]
)
```


## Geospatial Queries

In MongoDB, you can store geospatial data as [GeoJSON objects](https://docs.mongodb.com/manual/reference/geojson/). To specify GeoJSON data, use an embedded document with:

- a field named type that specifies the GeoJSON object type and
- a field named coordinates that specifies the object's coordinates (longitude first and then latitude).

```js
location: {
  type: "Point",
  coordinates: [-73.856077, 40.848447]
}
```

- Valid longitude values are between **-180** and **180**, both inclusive.
- Valid latitude values are between **-90** and **90**, both inclusive.

### Geospatial Indexes

**2dsphere**

2dsphere indexes support queries that calculate geometries on an earth-like sphere.

```js
db.collection.createIndex( { <location field> : "2dsphere" } )
```

**2d**

2d indexes support queries that calculate geometries on a two-dimensional plane.

```js
db.collection.createIndex( { <location field> : "2d" } )
```