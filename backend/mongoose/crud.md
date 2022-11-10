### Model

```js
Model.deleteMany()
Model.deleteOne()

Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndUpdate()

Model.updateMany()
Model.updateOne()
Model.replaceOne()


Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});

Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);

const q = MyModel.updateMany({}, { isDeleted: true }, function() {
  console.log('Update 1');
});

Tank.insertMany([{ size: 'small' }], function(err) {
  if (err) return handleError(err);
  // ...
});

Tank.deleteOne({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});

Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
  // Updated at most one doc, `res.modifiedCount` contains the number
  // of docs that MongoDB updated
});
```


### Document

```js
var Tank = mongoose.model('Tank', yourSchema);
var tnk = new Tank({ size: 'small' });

try {
  tnk.set({ size: 'large' });
  tnk.save();
} catch(err) {
  console.log(err);
}
```