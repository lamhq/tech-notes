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
```javascript
var Blog = mongoose.model('Blog', blogSchema);
```

The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name. Thus, for the example above, the model `Blog` is for the `blogs` collection in the database.


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

