# Aggregation

## Concepts

The MongoDB aggregation pipeline consists of **stages**. Each stage transforms the documents as they pass through the pipeline, they may generate new documents or filter out documents.

Some pipeline stages take a **pipeline expression** as the operand. Pipeline expressions specify the transformation to apply to the input documents. Generally, expressions are stateless and are only evaluated when seen by the aggregation process with one exception: **accumulator expressions**.

The accumulators, used in the `$group` stage, maintain their state (e.g. totals, maximums, minimums, and related data) as documents progress through the pipeline.

The aggregation pipeline provides better performance and a more coherent interface than map-reduce.


## Aggregation Pipeline Behavior

In MongoDB, the aggregate command operates on a single collection, logically passing the entire collection into the aggregation pipeline. To optimize the operation, wherever possible, use the following strategies to avoid scanning the entire collection.

### Pipeline Operators and Indexes

The following pipeline stages can take advantage of indexes:

- `$match`
- `$sort`
- `$group`
- `$geoNear`

### Early Filtering

Use the `$match`, `$limit`, and `$skip` stages to restrict the documents that enter **at the beginning of the pipeline**.


## Examples

### Zip Code Data Set

https://docs.mongodb.com/manual/tutorial/aggregation-zip-code-data-set/

```js
// Return States with Populations above 10 Million
db.zipcodes.aggregate( [
  { $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
  { $match: { totalPop: { $gte: 10*1000*1000 } } }
] )

// Return Average City Population by State
db.zipcodes.aggregate( [
  { $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } },
  { $group: { _id: "$_id.state", avgCityPop: { $avg: "$pop" } } }
] )

// Return Largest and Smallest Cities by State
db.zipcodes.aggregate( [
  { $group:
    {
      _id: { state: "$state", city: "$city" },
      pop: { $sum: "$pop" }
    }
  },
  { $sort: { pop: 1 } },
  { $group:
    {
      _id : "$_id.state",
      biggestCity:  { $last: "$_id.city" },
      biggestPop:  { $last: "$pop" },
      smallestCity: { $first: "$_id.city" },
      smallestPop:  { $first: "$pop" }
    }
  },

  // the following $project is optional, and
  // modifies the output format.

  { $project:
   { _id: 0,
    state: "$_id",
    biggestCity:  { name: "$biggestCity",  pop: "$biggestPop" },
    smallestCity: { name: "$smallestCity", pop: "$smallestPop" }
   }
  }
] )
```

### User Preference Data

https://docs.mongodb.com/manual/tutorial/aggregation-with-user-preference-data/

```js
// Normalize and Sort Documents
db.users.aggregate(
  [
    { $project : { name:{$toUpper:"$_id"} , _id:0 } },
    { $sort : { name : 1 } }
  ]
)

// Return Usernames Ordered by Join Month
db.users.aggregate(
  [
    { $project :
       {
         month_joined : { $month : "$joined" },
         name : "$_id",
         _id : 0
       }
    },
    { $sort : { month_joined : 1 } }
  ]
)

// Return Total Number of Joins per Month
db.users.aggregate(
  [
    { $project : { month_joined : { $month : "$joined" } } } ,
    { $group : { _id : {month_joined:"$month_joined"} , number : { $sum : 1 } } },
    { $sort : { "_id.month_joined" : 1 } }
  ]
)

// Return the Five Most Common “Likes”
db.users.aggregate(
  [
    { $unwind : "$likes" },
    { $group : { _id : "$likes" , number : { $sum : 1 } } },
    { $sort : { number : -1 } },
    { $limit : 5 }
  ]
)
```


### Project, group, sort, limit, skip

```
db.articles.aggregate(
	{"$project" : {"tags" : 1}},
	{"$group" : {"_id" : "$author", "count" : {"$sum" : 1}}},
	{"$sort" : {"count" : -1}},
	{"$limit" : 5},
	{"$skip" : 3}
)
```

1. Project the authors out of each article document
2. Groups the authors by name and increments
3. Reorders the result documents by the "count" field from greatest to least
4. Limits the result set to the first five result documents.

### Rename field `_id` to `userId`

```
db.users.aggregate({"$project" : {"userId" : "$_id", "_id" : 0}})
```

**Note**: try to utilize indexes before changing the names of fields

### Project expressions

| Type | Expressions |
| -- | -- |
| Mathematical expressions | add, subtract, multiply, divide, mod |
| Date expressions | year, month, week, dayOfMonth, dayOfWeek, dayOfYear, hour, minute, second |
| String expressions | substr, concat, toLower, toUpper |
| Logical expressions | cmp, strcasecmp, eq, ne, lt, lte, gt, gte |
| Boolean expressions | and, or, not |
| Control statements | cond, ifnull |

```
db.employees.aggregate(
{
	"$project" : {
		"totalPay" : {
			"$subtract" : [{"$add" : ["$salary", "$bonus"]}, "$401k"]
		},
		"hiredIn" : {"$month" : "$hireDate"},
		"email" : {
			"$concat" : [
				{"$substr" : ["$firstName", 0, 1]},
				".",
				"$lastName",
				"@example.com"
			]
		},
		"grade" : {
			"$cond" : [
				"$teachersPet",
				100, // if
				{ // else
					"$add" : [
						{"$multiply" : [.1, "$attendanceAvg"]},
						{"$multiply" : [.3, "$quizzAvg"]},
						{"$multiply" : [.6, "$testAvg"]}
					]
				}
				]
			}
		}
	}
})
```

### Grouping operators

| Type | Operators |
| -- | -- |
| Arithmetic operators | sum, avg |
| Extreme operators | max, min, first, last |
| Array operators | addToSet, push |


### $unwind

Unwinding turns each elements (or fields) of an array into a separate document.

For example, return all comments in post collections (not getting post data), then filter it by author:

```
db.blog.aggregate(
	{"$project" : {"comments" : "$comments"}},
	{"$unwind" : "$comments"},
	{"$match" : {"comments.author" : "Mark"}}
)
```

### $sort

If you are sorting a non-trivial number of documents, it is highly recommended that you do the sort at the beginning of the pipeline and have an index it can use. Otherwise, the sort may be slow and take a lot of memory.

This example would sort employees by compensation, from highest to lowest, and then name from A-Z.

```
db.employees.aggregate(
{
	"$project" : {
		"compensation" : {
			"$add" : ["$salary", "$bonus"]
		},
		"name" : 1
	}
},
{
	"$sort" : {"compensation" : -1, "name" : 1}
})
```

### Best practice

Attempt to filter out as many documents (and as many fields from the documents) as possible at the beginning of your pipeline before hitting any "$project", "$group", or "$unwind" operations.