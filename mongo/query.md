### Specify which keys to return
```
db.users.find({}, {"username" : 1, "email" : 1, "age":0 })
```

### lt, lte, gt, gte, ne, in, nin, or, and, nor, exists, mod
```
db.users.find({"age" : {"$gte" : 18, "$lte" : 30}})
db.users.find({"username" : {"$ne" : "joe"}})
db.users.find({"age" : {"$in" : [20,21,22]}})
db.users.find({"age" : {"$nin" : [20,21,22]}})
db.users.find({"$or" : [{"age" : 20}, {"username" : "joe"}]})
db.users.find({"$not" : {"age" : 20}})
db.users.find({"a" : {"$mod" : [5, 1]}})
```

### Find documents that have key
```
db.users.find({"a" : {"$exists" : true}})
```

### Find documents that have key or key's value is null
```
db.users.find({"a" : null})
```

### Regular expression (regex)
```
db.users.find({"name" : /joe/i})
```

### Query on array

#### Return a sub set of array

```
db.blog.posts.findOne({}, {"comments" : {"$slice" : 10}})
db.blog.posts.findOne({}, {"comments" : {"$slice" : -10}})
db.blog.posts.findOne({}, {"comments" : {"$slice" : [23, 10]}})
db.blog.posts.findOne({}, {"comments.$" : 1})
```

#### Array contains all elements in condition

```
db.food.insert({"_id" : 1, "fruit" : ["apple", "banana", "peach"]})
db.food.insert({"_id" : 2, "fruit" : ["apple", "kumquat", "orange"]})
db.food.insert({"_id" : 3, "fruit" : ["cherry", "banana", "apple"]})

db.food.find({fruit : {$all : ["apple", "banana"]}})
```

#### Array match an other array (same keys and same key's order)

```
db.food.find({"fruit" : ["apple", "banana", "peach"]})
```

#### Query on specific element of an array

```
db.food.find({"fruit.2" : "peach"})
```

### Query by array's size
```
db.food.find({"size" : {"$gt" : 3}})
```

### Element in array must match all keys in query object
```
db.test.insert({"x" : [5, 25]})
db.test.insert({"x" : [15, 19]})
db.test.find({"x" : {"$elemMatch" : {"$gt" : 10, "$lt" : 20}}})
```

### Query on embed documents

```
db.posts.insert({
	"content" : "...",
	"comments" : [
		{
			"author" : "joe",
			"score" : 3,
			"comment" : "nice post"
		},
		{
			"author" : "mary",
			"score" : 6,
			"comment" : "terrible post"
		}
	]
})

db.posts.find({"comments.name" : "bob"})
db.people.find({"name.first" : "Joe", "name.last" : "Schmoe"})

// find comments by Joe and has score at least 5
db.posts.find({"comments" : {"$elemMatch" : {"author" : "joe", "score" : {"$gte" : 5}}}})
```

When using `$elemMatch`, an element in array must match all keys in query object

### Execute arbitrary JavaScript as part of your query. 

Return documents where any two of the fields are equal

```
db.foo.insert({"apple" : 1, "banana" : 6, "peach" : 3})
db.foo.insert({"apple" : 8, "spinach" : 4, "watermelon" : 4})

db.foo.find({"$where" : function () {
	for (var current in this) {
		for (var other in this) {
			if (current != other && this[current] == this[other]) {
				return true;
			}
		}
	}
	return false;
}});
```

`$where` queries should not be used unless strictly necessary: they are much slower than regular queries.

If possible, an index will be used to filter based on the non $where clauses; the `$where` expression will be used only to fine-tune the results.

#### Limit, skip, sort
```
var cursor = db.foo.find().skip(10).limit(1).sort({username : 1, age : -1});
```

#### Avoiding large skips
For a large number of results, skip can be slow, since it has to find and then discard all the skipped results.

#### Paginating results without skip

Suppose we want to display documents in descending order based on "date". We can get the first page of results with the following:

```
var page1 = db.foo.find().sort({"date" : -1}).limit(100)
```

Then, we can use the "date" value of the last document as the criteria for fetching the next page:

```
var latest = null;
// get the latest record
while (page1.hasNext()) {
	latest = page1.next();
}
// get next page
var page2 = db.foo.find({"date" : {"$gt" : latest.date}});
page2.sort({"date" : -1}).limit(100);
```

#### Getting Consistent Results

If we pull result from Mongo, change it in some way, and then save it again, then continue pulling data, MongoDB can return the same result on the next pulling, example:

```
cursor = db.foo.find();
while (cursor.hasNext()) {
	// doc may be the result of the previous processing
	var doc = cursor.next();
	doc = process(doc);
	db.foo.save(doc);
}
```

Now, when we do a find, the cursor starts returning results from the beginning of the collection and moves right. 

When you save them back to the database, if a document does not have the padding available to grow to its new size, it needs to be relocated. Usually, a document will be relocated to the end of a collection.

Now our program continues to fetch batches of documents. When it gets toward the
end, it will return the relocated documents again.

The solution to this problem is to snapshot your query. If you add the option, the query will be run by traversing the "_id" index, which guarantees that you’ll only return each document once:

```
db.foo.find().snapshot()
```

Snapshotting makes queries slower, so only use snapshotted queries when necessary.