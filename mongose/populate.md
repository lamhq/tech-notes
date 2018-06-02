### Define using `ref` attribute

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
```

### Population

```
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });

// Field Selection
Story.
  findOne({ title: /casino royale/i }).
  populate('author', 'name'). // only return the Persons name
  exec(function (err, story) {
    if (err) return handleError(err);

    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"

    console.log('The authors age is %s', story.author.age);
    // prints "The authors age is null'
  });

// Populating Multiple Paths
Story.
  find(...).
  populate('fans').
  populate('author').
  exec();

// Query conditions and other options
Story.
  find(...).
  populate({
    path: 'fans',
    match: { age: { $gte: 21 }},
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id',
    options: { limit: 5 }
  }).
  exec();

// Populating an existing document
doc.populate(...)

// Populating multiple existing documents
Model.populate()
```


### Dynamic References
```
var userSchema = new Schema({
  name: String,
  connections: [{
    kind: String,
    item: { type: ObjectId, refPath: 'connections.kind' }
  }]
});

var organizationSchema = new Schema({ name: String, kind: String });

var User = mongoose.model('User', userSchema);
var Organization = mongoose.model('Organization', organizationSchema);
```

The `refPath` property above means that mongoose will look at the `connections.kind` path to determine which model to use for `populate()`. In other words, the `refPath` property enables you to make the `ref` property dynamic.