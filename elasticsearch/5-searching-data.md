# Search your data

## Run a search

You can use the [search API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-search.html) to search and aggregate data stored in Elasticsearch data streams or indices. The API’s query request body parameter accepts queries written in Query DSL.

A search consists of one or more queries that are combined and sent to Elasticsearch. Documents that match a search’s queries are returned in the _hits_, or _search results_, of the response.


_Example: Search documents with a `user.id` value of `kimchy` of index `my-index-000001`_

```json
GET /my-index-000001/_search
{
  "query": {
    "match": {
      "user.id": "kimchy"
    }
  }
}
```

## Search API

```
GET /<target>/_search

GET /_search

POST /<target>/_search

POST /_search
```


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

### Configure highlighting tags

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

## Paginate search results

By default, searches return only the top 10 matching hits.  To page through a larger set of results, you can use the search API's `from` and `size` parameters:

- The `from` parameter defines the number of hits to skip, defaulting to `0`.
- The `size` parameter is the maximum number of hits to return.

Avoid using `from` and `size` to page too deeply or request too many results at once. For deep pages or large sets of results, these operations can significantly increase memory and CPU usage, resulting in degraded performance or node failures.


## Common search options

### Query DSL

### Aggregations

### Search multiple data streams and indices

You can use comma-separated values and grep-like index patterns to search several data streams and indices in the same request. You can even boost search results from specific indices.

### Retrieve selected fields

The search response’s `hit.hits` property includes the full document `_source` for each hit. To retrieve only a subset of the `_source` or other fields, see Retrieve selected fields.

### Sort search results

By default, search hits are sorted by `_score`, a relevance score that measures how well each document matches the query. 

To customize the calculation of these scores, use the `script_score` query. 

To sort search hits by other field values, see Sort search results.

### Run an async search

### Search timeout

### Track total hits

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

### Quickly check for matching docs

If you only want to know if there are any documents matching a specific query, you can set the `size` to 0 to indicate that we are not interested in the search results.

You can also set `terminate_after` to `1` to indicate that the query execution can be terminated whenever the first matching document was found (per shard).

The response will not contain any hits as the size was set to 0. 

The hits.total will be either equal to 0, indicating that there were no matching documents, or greater than 0 meaning that there were at least as many documents matching the query when it was early terminated. 

Also if the query was terminated early, the terminated_early flag will be set to true in the response.


## Response fields

The `took` time in the response contains the milliseconds that this request took for processing, beginning quickly after the node received the query, up until all search related work is done and before the above JSON is returned to the client.