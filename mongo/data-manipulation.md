### Insert
```
db.foo.insert({"bar" : "baz"})
db.foo.batchInsert([{"_id" : 0}, {"_id" : 1}, {"_id" : 2}])
```


### Removing
```
db.foo.remove()
db.posts.remove({"name" : "abc"})
```


### Update

Always use `$` operators for modifying individual key/value pairs.

```
var joe = db.users.findOne({"name" : "joe"});
db.people.update({"_id" : joe._id}, joe)

db.analytics.update({"url" : "www.example.com"}, {"$inc" : {"pageviews" : 1}})
db.users.update({"_id" : "1234"}, {"$set" : {"favorite book" : "War and Peace"}})
db.users.update({"name" : "joe"}, {"$unset" : {"favorite book" : 1}})
db.posts.update({"author.name" : "joe"}, {"$set" : {"author.name" : "joe schmoe"}})

// update multiple documents
db.users.update({"birthday" : "10/13/1978"}, {"$set" : {"gift" : "Happy Birthday!"}}, false, true)
```


### Push elements to array

```
db.posts.update({"_id" : "1234"}, {"$push" : {"comments" : {"name" : "bob", "email" : "bob@example.com", "content" : "good post."}}})

// push multiple values to array
db.ticker.update({"_id" : "GOOG"}, {"$push" : {
	"hourly" : { "$each" : [1, 2, 3, 4] }
}})

// push and prevent an array from growing beyond a certain size
db.movies.find({"genre" : "horror"}, {"$push" : {
	"top10" : { 
		"$each" : ["Nightmare on Elm Street", "Saw"], 
		"$slice" : -10
	}
}})

// only adding values if they are not present
db.papers.update({"authors" : {"$ne" : "Richie"}}, {$push : {"authors" : "Richie"}})
db.users.update({"_id" : "1234"}, {"$addToSet" : {"emails" : "joe@hotmail.com"}})
db.users.update({"_id" : "1234"}, {"$addToSet" : {
	"emails" : {"$each" : ["joe@php.net", "joe@example.com", "joe@python.org"]}
}})
```


### Remove elements from array
```
// remove element from the end
db.lists.update({}, {"$pop" : {"name" : 1}})

// remove element from the beginning
db.lists.update({}, {"$pop" : {"name" : -1}})

// remove elements of an array that match the given criteria
db.lists.update({}, {"$pull" : {"name" : "laundry"}})
```


### Update element in array by position
```
db.blog.update({"post" : post_id}, {"$inc" : {"comments.0.votes" : 1}})
```


### Update element in array by condition
```
db.blog.update({"comments.author" : "John"}, {"$set" : {"comments.$.author" : "Jim"}})
```

When you start inserting documents into MongoDB, it puts each document right next to the previous one on disk. Thus, if a document gets bigger, it will no longer fit in the space it was originally written to and will be moved to another part of the collection.

Moving documents is slow. MongoDB has to free the space the document was in and
write the document somewhere else. Thus, you should try to keep the padding factor
as close to 1 as possible. You can design a schema that does not depend on documents growing arbitrarily large.


### Upsert

Insert if not exists, else: update

```
db.analytics.update({"url" : "/blog"}, {"$inc" : {"pageviews" : 1}}, true)
```

`save` is a shell function that lets you insert a document if it doesn’t exist and update it if it does. It takes one argument: a document. If the document contains an `_id` key, save will do an upsert. Otherwise, it will do an insert

```
var x = db.foo.findOne()
x.num = 42
db.foo.save(x)
```
