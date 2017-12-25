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

### Tell mongoose about the change
```
var Assignment = mongoose.model('Assignment', { dueDate: Date });
Assignment.findOne(function (err, doc) {
  doc.dueDate.setMonth(3);
  doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE
  
  doc.markModified('dueDate');
  doc.save(callback); // works
})
```