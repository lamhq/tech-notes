### Constructing
```
var Tank = mongoose.model('Tank', yourSchema);

var small = new Tank({ size: 'small' });
small.save(function (err) {
	if (err) return handleError(err);
	// saved!
})
```

### Querying

- Model.findById(id, callback)
- Model.findOne(conditions, callback)
- Model.find(conditions, callback)

```
Person.find({name: "Ayush", age: 20}, 
	function(err, response){
		console.log(response);
});
```

### Removing

- Model.findByIdAndRemove(id, [callback])
- Model.findOneAndRemove(condition, [callback])
- Model.remove(condition, [callback])

```
Person.remove({age:20});
```

### Updating

- Model.findByIdAndUpdate(id, updates, callback)
- Model.findOneAndUpdate(condition, updates, callback)
- Model.update(condition, updates, callback)

if we don't need the document returned in our application and merely want to update a property in the database directly, use `Model.update`

```
Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);

// update and return the updated document
Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, 
function (err, tank) {
	if (err) return handleError(err);
	res.send(tank);
});
```

### Mass assign: set method
```
Tank.findById(id, function (err, tank) {
  if (err) return handleError(err);
  
  tank.set({ size: 'large' });
  tank.save(function (err, updatedTank) {
    if (err) return handleError(err);
    res.send(updatedTank);
  });
});
```