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
// find an array that contains both the elements "red" and "blank"
db.inventory.find( { tags: { $all: ["red", "blank"] } } )

// query for all documents where tags is an array that contains the string "red" as one of its elements
db.inventory.find( { tags: "red" } )

// query for all documents where the array dim_cm contains at least one element whose value is greater than 25
db.inventory.find( { dim_cm: { $gt: 25 } } )

// query for documents where the dim_cm array contains
// one element can satisfy the greater than 15 condition
// and another element can satisfy the less than 20 condition,
// or a single element can satisfy both
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )

// query for documents where the dim_cm array contains
// at least one element that is both greater than 22 and less than 30
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

// query for all documents where
// the second element in the array dim_cm is greater than 25
db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

// query for all documents where the array tags has 3 elements
db.inventory.find( { "tags": { $size: 3 } } )
```

## Query an Array of Embedded Documents

```js
// query for all documents where the instock array has
// at least one embedded document that contains
// the field qty whose value is less than or equal to 20
db.inventory.find( { 'instock.qty': { $lte: 20 } } )

// query for all documents where the instock array has as
// its first element a document that contains the field qty
// whose value is less than or equal to 20:
db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )

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