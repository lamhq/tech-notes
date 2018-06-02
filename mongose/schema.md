### Define schema

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```

The permitted SchemaTypes are:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array


### Define model

```
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);
```

The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name. Thus, for the example above, the model `Tank` is for the `tanks` collection in the database.

If you create a custom connection, use that connection's model() function instead.

```
var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Tank = connection.model('Tank', yourSchema);
```


### Add method to document (Instance methods)
```javascript
// define a schema
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};

// define model
var Animal = mongoose.model('Animal', animalSchema);

// create an instance from model
var dog = new Animal({ type: 'dog' });

// call the added method on instance
dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs); // woof
});
```


### Add method to model (Statics)
```javascript
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

// call the static method
var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
  console.log(animals);
});
```


### Add query chaining method (Query Helpers)

```javascript
animalSchema.query.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.find().byName('fido').exec(function(err, animals) {
  console.log(animals);
});
```


### Create Index

With mongoose, we define these indexes within our Schema at the path level or the schema level.

```javascript
// define these index on field level
var animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true } 
});

// define these index on schema level
// necessary when creating compound indexes.
animalSchema.index({ name: 1, type: -1 }); 
```


### Virtuals (get/set methods)
```javascript
personSchema.virtual('fullName').
  get(function() { return this.name.first + ' ' + this.name.last; }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

console.log(axl.fullName);
```


### Set collection name when defining schema

```javascript
var dataSchema = new Schema({..}, { collection: 'data' });
```


### Skip attributes that were not specified in schema when saving

```javascript
var dataSchema = new Schema({..}, { strict: true });
```


### Add timestamp attribute to schema

If set `timestamps`, mongoose assigns `createdAt` and `updatedAt` fields to your schema.

```javascript
var thingSchema = new Schema({..}, { timestamps: { createdAt: 'createdAt' } });
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing();
thing.save(); // createdAt & createdAt will be included
```


### Schema types
```
var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array:      [],
  ofString:   [String],
  ofNumber:   [Number],
  ofDates:    [Date],
  ofBuffer:   [Buffer],
  ofBoolean:  [Boolean],
  ofMixed:    [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays:   [[]]
  ofArrayOfNumbers: [[Number]]
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})

var Thing = mongoose.model('Thing', schema);
var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = new Buffer(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.save(callback);
```


### Schema type options

#### All types

- required: boolean
- default: function. sets a default value for the path
- validate: function, adds a validator function for this property
- get: function, defines a custom getter for this property
- set: function, defines a custom setter for this property
- index: boolean, whether to define an on this property.
- unique: boolean, whether to define a unique index on this property.
- sparse: boolean, whether to define a sparse index on this property.

#### String

- lowercase: boolean
- uppercase: boolean
- trim: boolean
- match: RegExp
- enum: Array

#### Number, Date

- min: Number/Date
- max: Number/Date


To "tell" Mongoose that the value of a Mixed type has changed, call the .markModified(path) method of the document passing the path to the Mixed type you just changed.

```
person.anything = { x: [3, 4, { y: "changed" }] };
person.markModified('anything');
person.save(); // anything will now get saved
```


### Sub doc

```
var childSchema = new Schema({ name: 'string' });

var parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments. Caveat: single nested subdocs only work
  // in mongoose >= 4.2.0
  child: childSchema
});
```

Subdocuments are similar to normal documents. Nested schemas can have middleware, custom validation logic, virtuals, and any other feature top-level schemas can use. The major difference is that subdocuments are not saved individually, they are saved whenever their top-level parent document is saved.