# Query DSL

## Query DSL (Domain Specific Language)

The Elasticsearch DSL enable developers to write both basic and complex queries for Elasticsearch

The query consisting of two types of clauses: **Leaf query clauses** and **Compound query clause**.


## Relevance score

By default, Elasticsearch sorts matching search results by **relevance score**, which measures how well each document matches a query. 

The relevance score is a positive floating point number, returned in the `_score` metadata field of the search API.

The higher the `_score`, the more relevant the document.


## Query context & Filter context

### Query context

Query clauses behave differently depending on whether they are used in query context or filter context.

In the query context, a query clause answers the question _"How well does this document match this query clause?"_ Besides deciding whether or not the document matches, the query clause also calculates a relevance score in the `_score` metadata field.

Query context is in effect whenever a query clause is passed to a `query` parameter, such as the `query` parameter in the search API.

### Filter context

In a filter context, a query clause answers the question *"Does this document match this query clause?"* no scores are calculated. Filter context is mostly used for filtering structured data.

Filter context is in effect whenever a query clause is passed to a `filter` parameter, such as the `filter` or `must_not` parameters in the `bool` query, the filter parameter in the `constant_score` query, or the `filter` aggregation.

### Example

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
  "query": {
    "match": { "age": "32" }
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
GET /customers/_search
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

## Match all query

Matches all documents, giving them all a `_score` of 1.0. 

The `_score` can be changed with the `boost` parameter

```json
GET /_search
{
  "query": {
    "match_all": {}
  }
}
```


## Full text queries

The full text queries enable you to search analyzed text fields.

Analysis is conducted on query before execution. The query string is processed using the same analyzer that was applied to the field during indexing.

### Match query

Returns documents that match a provided text, number, date or boolean value. The provided text is analyzed before matching.

The `match` query is the standard query for performing a full-text search, including options for fuzzy matching.

```json
GET /_search
{
  "query": {
    "match": {
      "message": {
        "query": "this is a test"
      }
    }
  }
}
```

Top-level parameters for `match`:

`<field>`: Field you wish to search.

Parameters for `<field>`:

- `query`: (Required) Text, number, boolean value or date you wish to find in the provided `<field>`.
- `operator`: Boolean logic used to interpret text in the query value. Valid values are: `OR` (default), `AND`
- `minimum_should_match`: (Optional, string) Minimum number of clauses that must match for a document to be returned.
- `fuzziness`: allows fuzzy matching based on the type of field being queried

```json
GET /_search
{
  "query": {
    "match": {
      "message": "this is a test"
    }
  }
}
```

### Fuzziness in the match query

```json
GET /articles/_search
{
  "query": {
    "match": {
      "content": {
        "query": "node ks documentatiom",
        "fuzziness": "AUTO"
      }
    }
  }
}
```

### Multi-match query

The `multi_match` query builds on the `match` query to allow multi-field queries:

```json
GET /_search
{
  "query": {
    "multi_match" : {
      "query":    "this is a test", 
      "fields": [ "subject", "message" ] 
    }
  }
}
```

Individual fields can be boosted with the caret (`^`) notation:

```json
GET /_search
{
  "query": {
    "multi_match" : {
      "query" : "this is a test",
      "fields" : [ "subject^3", "message" ] 
    }
  }
}
```

### Match phrase query

The `match_phrase` query analyzes the text and creates a `phrase` query out of the analyzed text.

```json
GET /_search
{
  "query": {
    "match_phrase": {
      "message": "this is a test"
    }
  }
}
```

A phrase query matches terms up to a configurable `slop` (which defaults to 0) in any order. Transposed terms have a slop of 2.

### Match phrase prefix query

Returns documents that contain the words of a provided text, in the **same order** as provided. The last term of the provided text is treated as a prefix, matching any words that begin with that term.

```json
GET /_search
{
  "query": {
    "match_phrase_prefix": {
      "message": {
        "query": "quick brown f"
      }
    }
  }
}
```


## Term-level queries

Term-level queries do not analyze search terms. Instead, term-level queries match the exact terms stored in a field.

### Term query

Returns documents that contain an **exact** term in a provided field.

You can use the term query to find documents based on a precise value such as a price, a product ID, or a username.

```json
GET /_search
{
  "query": {
    "term": {
      "user.id": {
        "value": "kimchy"
      }
    }
  }
}
```

### Terms query

Returns documents that contain one or more **exact** terms in a provided field.

The following search returns documents where the `user.id` field contains `kimchy` or `elkbee`

```json
GET /_search
{
  "query": {
    "terms": {
      "user.id": [ "kimchy", "elkbee" ],
      "boost": 1.0
    }
  }
}
```

### Fuzzy query

Returns documents that contain terms similar to the search term, as measured by a [Levenshtein edit distance](https://en.wikipedia.org/wiki/Levenshtein_distance).

An edit distance is the number of one-character changes needed to turn one term into another. These changes can include:

- Changing a character (**b**ox → **f**ox)
- Removing a character (**b**lack → lack)
- Inserting a character (sic → sic**k**)
- Transposing two adjacent characters (**ac**t → **ca**t)

To find similar terms, the fuzzy query creates a set of all possible variations, or expansions, of the search term within a specified edit distance. The query then returns exact matches for each expansion.

```json
GET /_search
{
  "query": {
    "fuzzy": {
      "user.id": {
        "value": "ki"
      }
    }
  }
}
```

### Exists query

Returns documents that contain an indexed value for a field.

An indexed value may **not exist** for a document’s field due to a variety of reasons:

- The field in the source JSON is `null` or `[]`
- The field has `"index" : false` set in the mapping
- The length of the field value exceeded an `ignore_above` setting in the mapping
- The field value was malformed and `ignore_malformed` was defined in the mapping

These values will indicate the field does **exist**:

- Empty strings, such as `""` or `"-"`
- Arrays containing `null` and another value, such as `[null, "foo"]`
- A custom `null-value`, defined in field mapping

```json
GET /_search
{
  "query": {
    "exists": {
      "field": "user"
    }
  }
}
```

The following search returns documents that are missing an indexed value for the `user.id` field.

```json
GET /_search
{
  "query": {
    "bool": {
      "must_not": {
        "exists": {
          "field": "user.id"
        }
      }
    }
  }
}
```

### Range query

Returns documents that contain terms within a provided range.

The following search returns documents where the `age` field contains a term between `10` and `20`.

```json
GET /_search
{
  "query": {
    "range": {
      "age": {
        "gte": 10,
        "lte": 20,
        "boost": 2.0
      }
    }
  }
}
```

### Wildcard query

Returns documents that contain terms matching a wildcard pattern.

Wildcard queries will not be executed if `search.allow_expensive_queries` is set to `false`.

The following search returns documents where the `user.id` field contains a term that begins with `ki` and ends with `y`. These matching terms can include `kiy`, `kity`, or `kimchy`.

```json
GET /_search
{
  "query": {
    "wildcard": {
      "user.id": {
        "value": "ki*y",
        "boost": 1.0,
        "rewrite": "constant_score"
      }
    }
  }
}
```

### Regexp query

Returns documents that contain terms matching a regular expression.

Regexp queries will not be executed if `search.allow_expensive_queries` is set to `false`.

The following search returns documents where the `user.id` field contains any term that begins with `k` and ends with `y`. Matching terms can include `ky`, `kay`, and `kimchy`.

```json
GET /_search
{
  "query": {
    "regexp": {
      "user.id": {
        "value": "k.*y",
        "flags": "ALL",
        "case_insensitive": true,
        "max_determinized_states": 10000,
        "rewrite": "constant_score"
      }
    }
  }
}
```

## Joining queries

Performing full SQL-style joins in a distributed system like Elasticsearch is prohibitively expensive. Instead, Elasticsearch offers two forms of join which are designed to scale horizontally.

### `nested` query

Search [nested](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/nested.html) fields.

Nested fields are used to index arrays of objects

If an object matches the search, the `nested` query returns the root parent document.

To use the nested query, your index must include a nested field mapping.

```json
PUT /my-index-000001
{
  "mappings": {
    "properties": {
      "obj1": {
        "type": "nested"
      }
    }
  }
}
```

```json
GET /my-index-000001/_search
{
  "query": {
    "nested": {
      "path": "obj1",
      "query": {
        "bool": {
          "must": [
            { "match": { "obj1.name": "blue" } },
            { "range": { "obj1.count": { "gt": 5 } } }
          ]
        }
      },
      "score_mode": "avg"
    }
  }
}
```


### `has_child` query

The `has_child` query returns parent documents whose child documents match the specified query,

To use the `has_child` query, your index must include a [join](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/parent-join.html) field mapping.

```json
PUT /my-index-000001
{
  "mappings": {
    "properties": {
      "my-join-field": {
        "type": "join",
        "relations": {
          "parent": "child"
        }
      }
    }
  }
}
```

Example query:

```json
GET /_search
{
  "query": {
    "has_child": {
      "type": "child",
      "query": {
        "match_all": {}
      },
      "max_children": 10,
      "min_children": 2,
      "score_mode": "min"
    }
  }
}
```

### `has_parent` query

The `has_parent` query returns child documents whose parent document matches the specified query.

To use the `has_parent` query, your index must include a [join](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/parent-join.html) field mapping.

```json
PUT /my-index-000001
{
  "mappings": {
    "properties": {
      "my-join-field": {
        "type": "join",
        "relations": {
          "parent": "child"
        }
      },
      "tag": {
        "type": "keyword"
      }
    }
  }
}
```

Example query:

```json
GET /my-index-000001/_search
{
  "query": {
    "has_parent": {
      "parent_type": "parent",
      "query": {
        "term": {
          "tag": {
            "value": "Elasticsearch"
          }
        }
      }
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