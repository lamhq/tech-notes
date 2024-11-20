# MongoDB Shell (`mongosh`)

## Connect to MongoDB

```sh
mongosh
mongosh "mongodb://localhost:27017"
mongosh "mongodb://testadmin:123123@localhost:27017/test"
```


## Basic commands

Show current database:
```js
db
```

List available databases
```js
show dbs
```

Switch databases:
```js
use <database>
```

List collections in the current database:
```js
show collections
```

Collection manipulation:
```js
db.myCollection.insertOne( { x: 1 } );

// insert documents into a collection
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

To exit the shell, type `quit()` or use the `<control+d>` shortcut.
