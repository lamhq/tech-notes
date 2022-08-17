# Query DSL

## Query DSL (Domain Specific Language)

The Elasticsearch DSL enable developers to write both basic and complex queries for Elasticsearch

The query consisting of two types of clauses: **Leaf query clauses** and **Compound query clause**.


## Query context & Filter context

### Relevance score

By default, Elasticsearch sorts matching search results by **relevance score**, which measures how well each document matches a query. 

The relevance score is a positive floating point number, returned in the `_score` metadata field of the search API.

The higher the `_score`, the more relevant the document.


### Query context

Query clauses behave differently depending on whether they are used in query context or filter context.

In the query context, a query clause answers the question _"How well does this document match this query clause?"_ Besides deciding whether or not the document matches, the query clause also calculates a relevance score in the `_score` metadata field.

Query context is in effect whenever a query clause is passed to a `query` parameter, such as the `query` parameter in the search API.

### Filter context

In a filter context, a query clause answers the question *"Does this document match this query clause?"* no scores are calculated. Filter context is mostly used for filtering structured data.

Filter context is in effect whenever a query clause is passed to a `filter` parameter, such as the `filter` or `must_not` parameters in the `bool` query, the filter parameter in the `constant_score` query, or the `filter` aggregation.

## Example

This query will match documents where all of the following conditions are met:

- The `title` field contains the word search.
- The `content` field contains the word elasticsearch.
- The `status` field contains the exact word published.
- The `publish_date` field contains a date from 1 Jan 2015 onwards.

```json
GET /_search
{
  "query": { 
    "bool": { 
      "must": [
        { "match": { "title":   "Search"        }},
        { "match": { "content": "Elasticsearch" }}
      ],
      "filter": [ 
        { "term":  { "status": "published" }},
        { "range": { "publish_date": { "gte": "2015-01-01" }}}
      ]
    }
  }
}
```

- The `query` parameter indicates query context.
- The `bool` and two `match` clauses are used in query context, which means that they are used to score how well each document matches.
- The `filter` parameter indicates filter context. Its `term` and `range` clauses are used in filter context. They will filter out documents which do not match, but they will not affect the score for matching documents.


## Leaf query clauses

Search for a particular value in a particular field, such as the `match`, `term` or `range` queries.

```json
GET /customers/_search
{
  "query: {
    "match_all": { "age": "32" }
  }
}
```

## Compound query clauses

Compound queries are combinations of leaf query clauses and other compound queries.

Either to combine their results and scores, to change their behaviour, or to switch from query to filter context.

### Boolean query

The default query for combining multiple leaf or compound query clauses.

Matches documents matching boolean combinations of other queries. 

It is built using one or more boolean clauses, each clause with a typed occurrence:

- `must`: The clause (query) must appear in matching documents.
- `should`: The clause (query) should appear in the matching document.
- `filter`: The clause (query) must appear in matching documents. Scoring is ignored.
- `must_not`: The clause (query) must not appear in the matching documents. Scoring is ignored.


```json
POST _search
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "user" : "kimchy" }
      },
      "filter": {
        "term" : { "tag" : "tech" }
      },
      "must_not" : {
        "range" : {
          "age" : { "gte" : 10, "lte" : 20 }
        }
      },
      "should" : [
        { "term" : { "tag" : "wow" } },
        { "term" : { "tag" : "elasticsearch" } }
      ],
      "minimum_should_match" : 1,
      "boost" : 1.0
    }
  }
}
```

- `must` and `should` clauses have their scores combined
 - `must_not` and `filter` clauses are executed in filter context.

### Boosting query

Return documents which match a `positive` query.

Reduce the score of documents which match a `negative` query.

You can use the boosting query to demote certain documents without excluding them from the search results.

```json
GET /_search
{
  "query": {
    "boosting": {
      "positive": {
        "term": {
          "text": "apple"
        }
      },
      "negative": {
        "term": {
          "text": "pie tart fruit crumble tree"
        }
      },
      "negative_boost": 0.5
    }
  }
}
```

### Constant Score query

Wraps a **filter query** and returns every matching document with a relevance score equal to the `boost` parameter value.

```json
GET /_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": { "user.id": "kimchy" }
      },
      "boost": 1.2
    }
  }
}
```

### Disjunction max query

Returns documents matching one or more wrapped queries

If a returned document matches multiple query clauses, the `dis_max` query assigns the document the highest relevance score from any matching clause, plus a tie breaking increment for any additional matching subqueries.

```json
GET /_search
{
  "query": {
    "dis_max": {
      "queries": [
        { "term": { "title": "Quick pets" } },
        { "term": { "body": "Quick pets" } }
      ],
      "tie_breaker": 0.7
    }
  }
}
```

### Function Score query

Allows you to modify the score of documents that are retrieved by a query

```json
GET /_search
{
  "query": {
    "function_score": {
      "query": { "match_all": {} },
      "boost": "5",
      "random_score": {}, 
      "boost_mode": "multiply"
    }
  }
}
```

## Full text queries

The full text queries enable you to search analyzed text fields.

The query string is processed using the same analyzer that was applied to the field during indexing.



## Term-level queries

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
        "field": "title"
    }
}
```

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
    "sort": [
    	{ "balance": { "order": "desc" } },
        { "_score": { "order": "desc" }}
    ],
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



## Expensive queries

Certain types of queries will generally execute slowly. Those queries can be categorised as follows:

- Queries that need to do linear scans to identify matches:
  - `script` queries
- Queries that have a high up-front cost:
  - `fuzzy` queries (except on `wildcard` fields)
  - `regexp` queries (except on `wildcard` fields)
  - `prefix` queries (except on `wildcard` fields or those without `index_prefixes`)
  - `wildcard` queries (except on `wildcard` fields)
  - `range` queries on text and keyword fields
- Joining queries
- Queries on deprecated geo-shapes
- Queries that may have a high per-document cost:
  - `script_score` queries
  - `percolate` queries