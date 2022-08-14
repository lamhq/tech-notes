# Search your data

## Run a search

You can use the [search API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-search.html) to search and aggregate data stored in Elasticsearch data streams or indices. The API’s query request body parameter accepts queries written in Query DSL.

A search consists of one or more queries that are combined and sent to Elasticsearch. Documents that match a search’s queries are returned in the _hits_, or _search results_, of the response.


_Example: Search documents with a `address` value of `lane` of index `accounts`_

```json
GET /accounts/_search
{
  "query": {
    "match": { "address": "lane" }
  }
}
```

## Search API

Reference: https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-search.html

**Request**

```
GET /<target>/_search

GET /_search

POST /<target>/_search

POST /_search
```

**Request body**

- `from`: (Optional, integer) Starting document offset. Defaults to `0`.
- `query`: (Optional, query object) Defines the search definition using the Query DSL.
- `size`: (Optional, integer) The number of hits to return. Defaults to 10.

**Response body**

```json
{
  "took": 15,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 16,
      "relation": "eq"
    },
    "max_score": 4.1042743,
    "hits": [
      {
        "_index": "accounts",
        "_type": "_doc",
        "_id": "1",
        "_score": 4.1042743,
        "_source": {
          ...
        }
      },
    ]
  }
}
```

- `hits`: (object) Contains returned documents and metadata.
  - `total`: (object) Metadata about the number of returned documents.
    - `value`: (integer) Total number of returned documents.
    - `relation`: (string) whether the number of returned documents is accurate (`eq`) or a lower bound (`gte`).
  - `hits`: (array of objects) Array of returned document objects.
    - `_index`: (string) Name of the index containing the returned document.
    - `_id`: (string) Unique identifier for the returned document.
    - `_score`: (float) number used to determine the relevance of the returned document.
    - `_source`: (object) Original JSON body passed for the document at index time.
  - `max_score`: (float) Highest returned document `_score`.This value is null for requests that do not sort by `_score`.
- `took`: (integer) Milliseconds it took Elasticsearch to execute the request.
- `_shards`: (object) Contains a count of shards used for the request.


## Highlighting

Highlighters enable you to get highlighted snippets from one or more fields in your search results so you can show users where the query matches are.

When you request highlights, the response contains an additional `highlight` element for each search hit that includes the highlighted fields and the highlighted fragments.

_Example, get highlights for the `address` field in each search hit using the default highlighter, include a `highlight` object in the request body that specifies the `address` field:_

```json
GET /_search
{
  "query": {
    "match": { "address": "lane" }
  },
  "highlight": {
    "fields": {
      "address": {}
    }
  }
}
```

**Configure highlighting tags:**

```json
GET /_search
{
  "query" : {
    "match": { "user.id": "kimchy" }
  },
  "highlight" : {
    "pre_tags" : ["<tag1>"],
    "post_tags" : ["</tag1>"],
    "fields" : {
      "body" : {}
    }
  }
}
```

See more:
- Highlighter types: 
  - Unified highlighter
  - Plain highlighter
  - Fast vector highlighter
- How highlighters work internally
- Offsets strategy
- Highlighting settings
- Override global settings for individual fields
- Specify a highlight query
- Set highlighter type
- Highlight on source
- Highlight in all fields
- Combine matches on multiple fields
- Control highlighted fragments
- Specify a fragmenter for the plain highlighte


## Paginate search results

By default, searches return only the top 10 matching hits. To page through a larger set of results, you can use the search API's `from` and `size` parameters:

- The `from` parameter defines the number of hits to skip, defaulting to `0`.
- The `size` parameter is the maximum number of hits to return.

Avoid using `from` and `size` to page too deeply or request too many results at once. For deep pages or large sets of results, these operations can significantly increase memory and CPU usage, resulting in degraded performance or node failures.

By default, you cannot page through more than 10,000 hits using the from and size parameters. To page through more hits, use the `search_after` parameter.

```json
GET /_search
{
  "from": 5,
  "size": 20,
  "query": {
    "match": { "address": "lane" }
  }
}
```

See more:
- Search after


## Search multiple data streams and indices

Searches the `index-1` and `index-2` indices:

```
GET /index-1,index-2/_search
```

Searches any data streams or indices in the cluster that start with `my-index-`:

```
GET /my-index-*/_search
```

To search all data streams and indices in a cluster, omit the target from the request path:

```
GET /_search
```

See more:
- Index boost


## Sort search results

Allows you to add one or more sorts on specific fields. The sort is defined on a per field level, with special field name for `_score` to sort by score, and `_doc` to sort by index order.

```json
GET /accounts/_search
{
  "query": {
    "match": {
      "address": "lane"
    }
  },
  "sort" : [
    { "age": "asc" },
    { "city.keyword" : "desc" }
  ]
}
```

See more:
- Sort values
- Sort mode
- Sorting numeric fields
- Sorting within nested objects
- Missing values
- Ignoring unmapped fields
- Geo distance sorting
- Script based sorting
- Track Scores
- Memory considerations


## Retrieve inner hits

Returns additional nested hits (per search hit in the search response) that caused a search hit to match in a different scope.

**Create index & initialize data**

```json
PUT test
{
  "mappings": {
    "properties": {
      "comments": {
        "type": "nested"
      }
    }
  }
}

PUT test/_doc/1?refresh
{
  "title": "Test title",
  "comments": [
    {
      "author": "kimchy",
      "number": 1
    },
    {
      "author": "nik9000",
      "number": 2
    }
  ]
}
```

Search by nestest documents and retrive nested hits:

```json
POST test/_search
{
  "query": {
    "nested": {
      "path": "comments",
      "query": {
        "match": { "comments.number": 2 }
      },
      "inner_hits": {} 
    }
  }
}
```

Sample response:

```json
{
  ...,
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 1.0,
    "hits": [
      {
        "_index": "test",
        "_type": "_doc",
        "_id": "1",
        "_score": 1.0,
        "_source": ...,
        "inner_hits": {
          "comments": { 
            "hits": {
              "total": {
                "value": 1,
                "relation": "eq"
              },
              "max_score": 1.0,
              "hits": [
                {
                  "_index": "test",
                  "_type": "_doc",
                  "_id": "1",
                  "_nested": {
                    "field": "comments",
                    "offset": 1
                  },
                  "_score": 1.0,
                  "_source": {
                    "author": "nik9000",
                    "number": 2
                  }
                }
              ]
            }
          }
        }
      }
    ]
  }
}
```

## Retrieve selected fields

The search response’s `hit.hits` property includes the full document `_source` for each hit. To retrieve only a subset of the `_source` or other fields, see [Retrieve selected fields](elastic.co/guide/en/elasticsearch/reference/7.17/search-fields.html).


## Quickly check for matching docs

If you only want to know if there are any documents matching a specific query, you can set the `size` to 0 to indicate that we are not interested in the search results.

You can also set `terminate_after` to `1` to indicate that the query execution can be terminated whenever the first matching document was found (per shard).

The response will not contain any hits as the size was set to 0. 

The hits.total will be either equal to 0, indicating that there were no matching documents, or greater than 0 meaning that there were at least as many documents matching the query when it was early terminated. 

Also if the query was terminated early, the terminated_early flag will be set to true in the response.

## Track total hits

The `track_total_hits` parameter allows you to control how the total number of hits should be tracked.

The default is set to 10,000. This means that requests will count the total hit accurately up to 10,000 hits. It is a good trade off to speed up searches if you don’t need the accurate number of hits after a certain threshold.

When set to `true` the search response will always track the number of hits that match the query accurately

```json
GET my-index-000001/_search
{
  "track_total_hits": true,
  "query": {
    "match" : {
      "user.id" : "elkbee"
    }
  }
}
```
