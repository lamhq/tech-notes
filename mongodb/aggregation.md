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