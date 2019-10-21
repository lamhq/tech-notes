# Search

## Search response

- `hits`: contains the `total` number of documents that matched our query, and a `hits` array containing the first 10 of those matching documents.
- `took`: how many milliseconds the entire search request took to execute.
- `shards`: the total number of `shards` that were involved in the query and, of them, how many were `successful` and how many `failed`.
- `timeout`: whether the query timed out


## Search in multiple index, type

```
GET /_all/_search
GET /_search
GET /gb,us/_search
GET /g*,u*/_search
GET /gb,us/user,tweet/_search
```


## Pagination
- `size`: Indicates the number of results that should be returned, defaults to 10
- `from`: Indicates the number of initial results that should be skipped, defaults to 0

```
GET /_search?size=5&from=10
```

## Most Important Queries and Filters

### term Filter

The `term` filter is used to filter by exact values

```json
{ "term": { "age": 26 }}
```


### terms Filter

The `terms` filter is the same as the term filter, but allows you to specify multiple values to match

```json
{ "terms": { "tag": [ "search", "full_text", "nosql" ] }}
```


### range Filter

The `range` filter allows you to find numbers or dates that fall into a specified range:

```json
{ "range": { "age": { "lte":23, "gt":20 } } }
```

### exists and missing Filters

The `exists` and `missing` filters are used to find documents in which the specified field either has one or more values (`exists`) or doesn’t have any values (`missing`).

```json
{
    "exists": {
        "field":    "title"
    }
}
```

### bool Filter

The bool filter is used to combine multiple filter clauses using Boolean logic. It accepts three parameters:

- `must`: These clauses must match, like and.
- `must_not`: These clauses must not match, like not.
- `should`: At least one of these clauses must match, like or.


### match Query

query for a full-text on a text field

```json
{ "match": { "tweet": "About Search" }}
```


### multi_match Query

The multi_match query allows to run the same match query on multiple fields:

```json
{
    "multi_match": {
        "query": "full text search", "fields": ["title","body"]
    }
}
```

## Combine query and filter

This query search for account which `address` contains words `490` or `street` and `age` is `22`, while exclude account whose `firstname` contains `Keri`

```
GET /bank/account/_search
{
    "from": 0,
    "size": 10,
    "query": {
    	"bool": {
    		"must": [
    			{ "match": { "address": "490 street" } },
    			{ "term": { "age": 22 } }
    		],
    		"must_not": { "match": { "firstname": "Keri" } }
    	}
    },
    "highlight": {
        "fields": {
            "address": {}
        }
    }
}
```


## Validating Queries

```json
GET /gb/tweet/_validate/query?explain
{
    "query": {
        "tweet" : {
            "match" : "really powerful"
        }
    } 
}
```