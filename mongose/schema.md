### Define schema

```
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

### Define model
```
var Blog = mongoose.model('Blog', blogSchema);
```

The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name. Thus, for the example above, the model `Blog` is for the `blogs` collection in the database.


### Instance methods
```
// define a schema
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
	return this.model('Animal').find({ type: this.type }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function(err, dogs) {
	console.log(dogs); // woof
});
```

### Statics method
```
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function(err, animals) {
	console.log(animals);
});
```

### Virtuals get/set methods
```
personSchema.virtual('fullName').
	get(function() { return this.name.first + ' ' + this.name.last; }).
	set(function(v) {
		this.name.first = v.substr(0, v.indexOf(' '));
		this.name.last = v.substr(v.indexOf(' ') + 1);
	});

console.log(axl.fullName);
```

### Schema Options
```
var schema = new Schema(properties, options);
```

#### Timestamps option

If set `timestamps`, mongoose assigns `createdAt` and `updatedAt` fields to your schema.

```
var thingSchema = new Schema({..}, { timestamps: { createdAt: 'createdAt' } });
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing();
thing.save(); // createdAt & createdAt will be included
```

