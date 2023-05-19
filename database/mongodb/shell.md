# The `mongo` shell

## Start the `mongo` shell and Connect to MongoDB

```sh
mongo
mongo "mongodb://alice@mongodb0.examples.com:28015/?authSource=admin"
mongo "mongodb://mongodb0.example.com.local:27017,mongodb1.example.com.local:27017,mongodb2.example.com.local:27017/?replicaSet=replA"
```


## Basic commands:

```js
// display the database you are using
db

// list the available databases
show dbs

// switch databases
use <database>

// see the list of collections in the current database
show collections

db.myCollection.insertOne( { x: 1 } );

// insert documents into a collection
// The operation returns a document that contains the acknowledgement indicator
// and an array that contains the _id of each successfully inserted documents.
db.inventory.insertMany([
  { item: "journal", qty: 25, status: "A", size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
  { item: "notebook", qty: 50, status: "A", size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
  { item: "paper", qty: 10, status: "D", size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] },
  { item: "planner", qty: 0, status: "D", size: { h: 22.85, w: 30, uom: "cm" }, tags: [ "blank", "red" ] },
  { item: "postcard", qty: 45, status: "A", size: { h: 10, w: 15.25, uom: "cm" }, tags: [ "blue" ] }
]);

// get all documents in a collection.
db.inventory.find().pretty()

// get all documents where status field equals "D":
db.inventory.find( { status: "D" } );

// get all documents where the tags array contains "red" as one of its elements:
db.inventory.find( { tags: "red" } )

// list methods available on the collection objects
db.collection.help()
```


## Exit the Shell

To exit the shell, type `quit()` or use the `<Ctrl-C>` shortcut.

